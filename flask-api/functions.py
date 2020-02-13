import base64
import urllib
import zlib
from logging import log
from urllib.request import Request

import defusedxml.ElementTree as ET


class CaptchaError(Exception):
    def __init__(self, message):
        self.message = message
 
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
        # print(xml_str)
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
    for skill in xml_skills:
        if "swap" not in skill.attrib['slot'].lower():
            # print("Not a Swap", skill.attrib['slot'])
            for gem in skill:
                gems.append({'name':gem.attrib['nameSpec'],'level':gem.attrib['level']})
        else:
            # print("Is a Swap", skill.attrib['slot'])
            continue
    return gems
 
def return_info(pastebin):
    try:
        raw = get_as_xml(pastebin)
        
        xml = decode_to_xml(raw)
        
        gems = _parse_skills(xml.find('Skills'))
        class_name = xml.find('Build').attrib['className']
        return(gems,class_name)
    except:
        raise(Exception("Error processing pastebin. Are you sure it's a POE build?"))
