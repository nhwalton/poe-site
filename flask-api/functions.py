import base64
import datetime
import json
import re
import urllib
import zlib
from urllib.request import Request

import defusedxml.ElementTree as ET
import gspread
import requests
from bs4 import BeautifulSoup
from oauth2client.service_account import ServiceAccountCredentials


class CaptchaError(Exception):
    def __init__(self, message):
        self.message = message

def get_current_league():
    import requests
    r = requests.get('https://poe.ninja/api/data/getindexstate')
    r_json = r.json()
    league = next(x for x in r_json['economyLeagues'] if x['url'] == 'challenge')['name']
    return league

def get_raw_data(url):
    q = Request(url)
    q.add_header('Cache-Control', 'max-age=0')
    try:
        url = urllib.request.urlopen(q)
    except urllib.error.HTTPError as e:
        return None
    content = url.read().decode('utf-8')
    if "Possible Spam Detected" in content:
        raise CaptchaError("Pastebin marked this as possible spam. Please reupload and clear captchas before retrying.")
 
    return content  # read and encode as utf-8
 
def get_as_xml(paste_key):
    raw_url = 'https://pastebin.com/raw/' + paste_key
    # log.debug(f"Retrieved from raw_url={raw_url}")
    data = get_raw_data(raw_url)
    return data
 
def decode_base64_and_inflate(b64string):
    try:
        decoded_data = base64.b64decode(b64string)
        return zlib.decompress(decoded_data)
    except ValueError as err:
        raise ValueError(f"ZLib Error in paste: err={err}. Data={b64string}")
    except ValueError as err:
        raise ValueError(f"Value Error in paste: err={err}")
 
def decode_to_xml(enc, encoding='windows-1252'):
    enc = enc.replace("-", "+").replace("_", "/")
    xml_str = decode_base64_and_inflate(enc)
    # log.debug(f"XML={xml_str}")
    xml = None
    try:
        xml = ET.fromstring(xml_str.decode(encoding))
    except TypeError as err:
        raise(f"Could not parse the pastebin as xml msg={err}")
 
    return xml
 
def get_attrib_if_exists(xml_elem, key):
    """
    Checks if the attrib key exists and returns either the val or none.
    :param xml_elem: xml element to check
    :param key: key of the attribute
    :return:  vale | none
    """
    return xml_elem.attrib[key] if key in xml_elem.attrib else None
 
def _parse_skills(xml_skills):
    gems = []
    # parse skills and the supported gems
    for equipment_piece in xml_skills:
        try:
            if "swap" in equipment_piece.attrib['slot'].lower():
                print(equipment_piece.attrib['slot'])
                swap = True
                print("swap")
            else:
                swap = False
                print("no swap")
        except:
            swap = False
            print("no swap for real")
        if swap == False:
            print("no swap")
            for gem in equipment_piece:
                try:
                    print("gem")
                    gems.append({'name':gem.attrib['nameSpec'],'level':gem.attrib['level']})
                except:
                    continue
        else:
            continue
    print(gems)
    return gems
 
def return_info(pastebin):
    try:
        raw = get_as_xml(pastebin)
        print("raw")
        xml = decode_to_xml(raw)
        print(xml)
        gems = _parse_skills(xml.find('Skills').find('SkillSet'))
        print("gems")
        class_name = xml.find('Build').attrib['className']
        print(f"\n* Success: Got build [{pastebin}] of class [{class_name}].\n")
        return(gems,class_name)
    except:
        print(f"\n* Error: Could not get build [{pastebin}] of class [{class_name}].\n")
        raise(Exception("Error processing pastebin. Are you sure it's a POE build?"))

def get_gem_info(cur, gem, class_name):

    gem_details = {}

    gem_name = gem['name']
    gem_level = gem['level']

    vaal_regex = r"(?:Vaal\s)(.*)"
    vaal_match = re.findall(vaal_regex, gem_name)
    awakened_regex = r"(?:Awakened\s)(.*)"
    awakened_match = re.findall(awakened_regex, gem_name)
    if vaal_match:
        gem_name = vaal_match[0]
    elif awakened_match:
        gem_name = awakened_match[0]

    gem_name = gem_name.replace(" ", "_")

    call = """ SELECT * 
                FROM gems
                WHERE class_name = "{}"
                AND gem = "{}"
            """.format(class_name, gem_name)

    cur.execute(call)

    rows = cur.fetchall()

    earliest = None

    for row in rows:
        if row == []:
            continue
        elif earliest == None:
            earliest = row
        if row[0] < earliest[0]:
            earliest = row
            
    if earliest != None:
        gem_details = {
            "act":earliest[0],
            "vendor":earliest[1],
            "gem_name":earliest[2],
            "mission":earliest[4],
            "level":gem_level
            }
    return gem_details

def get_use_time(scarab_timing):
    now = datetime.datetime.now()
    diff = now - scarab_timing['last_updated']
    diff_hours = diff.seconds / 3600
    diff_minutes = diff.seconds / 60
    if diff_hours > 1:
        use_time = f'{diff_hours:,.0f} hours ago'
    elif 2 > diff_hours > 1:
        use_time = f'{diff_hours:,.0f} hour ago'
    elif diff_minutes > 1:
        use_time = f'{diff_minutes:,.0f} minutes ago'
    elif 2 > diff_minutes > 1:
        use_time = f'{diff_minutes:,.0f} minute ago'
    else:
        use_time = f'{diff.seconds:,.0f} seconds ago'
    return(use_time)

def get_guide_values():
    # use the key in ./keys/poesyn-guide-values.json to get the values from this google sheet https://docs.google.com/spreadsheets/d/1WCOQfO4rrnJ64xjtuIweO5SSpYdwab6REVZ-zQS52Ho/edit#gid=0
    scope = ['https://spreadsheets.google.com/feeds']
    creds = ServiceAccountCredentials.from_json_keyfile_name('./keys/poesyn-guide-values-key.json', scope)
    client = gspread.authorize(creds)
    doc = client.open_by_url('https://docs.google.com/spreadsheets/d/1WCOQfO4rrnJ64xjtuIweO5SSpYdwab6REVZ-zQS52Ho')
    # print(doc)
    worksheet = doc.worksheet('Sheet1')
    values_list = worksheet.col_values(1)
    return values_list
