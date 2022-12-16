import argparse
import csv
import json
import os
import re
import sqlite3
import sys
import datetime

import flask
import pandas as pd
import requests
from expiringdict import ExpiringDict
from flask import jsonify, request, send_file
from flask_cors import CORS, cross_origin
from waitress import serve

from functions import return_info, get_gem_info, get_current_league, get_use_time, get_guide_values
from chrom import calculate

app = flask.Flask(__name__)

parser = argparse.ArgumentParser(description='--env dev to run development server')
parser.add_argument("--env", default='prod', help="Set --env dev for dev server")
args = parser.parse_args()
is_dev = args.env

gem_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gem_availability.csv')
passives_path = path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'passives_with_gems.json')

memory_uri = "file::memory:?cache=shared"

conn = sqlite3.connect(memory_uri)
cur = conn.cursor()
try:
    cur.execute("CREATE TABLE gems (act, vendor, gem, class_name, mission);")
    df = pd.read_csv(gem_path)
    df.to_sql("gems", conn, if_exists='append', index=False)
except:
    pass

conn.commit()

scarab_cache = ExpiringDict(max_len=2, max_age_seconds=21600)
scarab_timing = {'last_updated': datetime.datetime.now()}

guide_values_cache = ExpiringDict(max_len=1, max_age_seconds=21600)
guide_values_timing = {'last_updated': datetime.datetime.now()}

current_league = None

@app.route('/', methods=['GET'])
def home():
    return "nothing to see here."

# @app.route('/api/return-passives/')
# def return_passives():
# 	try:
# 		return send_file("/" + passives_path)
# 	except Exception as e:
# 		return str(e)

@app.route('/api/singleGem', methods=['GET'])
@cross_origin()
def singleGem():
    if 'gemName' in request.args and 'className' in request.args:
        gemName = request.args['gemName']
        class_name = request.args['className']
        gem = {}
        gem['name'] = gemName
        gem['level'] = 'N/A'
        conn = sqlite3.connect(memory_uri)
        cur = conn.cursor()

        gem_details = get_gem_info(cur=cur, gem=gem, class_name = class_name)

        return(gem_details)

@app.route('/api/gems', methods=['GET'])
@cross_origin()
def gems():
    if 'pastebin' in request.args:
        pastebin = request.args['pastebin']
        if pastebin != '':
            try:
                regex = r"(?:pastebin.com\/)([A-Za-z0-9]*)"
                match = re.findall(regex, pastebin)
                if (match != []) & (match != ['']) :
                    pastebin_code = match[0]
                else:
                    return jsonify("Error: Not a valid pastebin link.")
            except:
                return jsonify("Error: Not a valid pastebin link.")
            try:
                returned = return_info(pastebin_code)
            except:
                return jsonify("Error while processing pastebin. Are you sure it's a POE build?")

            gems, class_name = returned
            gems = pd.DataFrame(gems).drop_duplicates().to_dict('r')
        else:
            pass
    else:
        return jsonify("Error: No pastebin field provided. Please specify a pastebin.")

    gem_details = []

    conn = sqlite3.connect(memory_uri)
    cur = conn.cursor()

    with open(passives_path) as f:
        data = json.load(f)

        if pastebin == '':
            return (jsonify(data))
        else:
            for gem in gems:

                gem_details = get_gem_info(cur=cur, gem=gem, class_name=class_name)

                if gem_details != {}:
                    for each in data:
                        if each['act'] == gem_details['act']:
                            each['gems'].append(gem_details)
                            break
                        else:
                            continue
    
    return (jsonify(data))

@app.route('/api/scarabs', methods=['GET'])
@cross_origin()
def scarabs():
    try: 
        if 'tier' in request.args:
            scarab_type = request.args['tier'].capitalize()
        else:
            scarab_type = 'Gilded'
        if scarab_cache.get(scarab_type):
            use_time = get_use_time(scarab_timing)
            scarabs = scarab_cache.get(scarab_type)
            print(f"\n* Cache Exists: Using [{scarab_type}] scarab pricing from [{use_time}].\n")
        else:
            print(f"\n* Cache Does Not Exist: Attempting to get updated pricing for [{scarab_type}] scarabs. \n")
            current_league = get_current_league()
            r = requests.get('https://poe.ninja/api/data/itemoverview?league={}&type=Scarab&language=en'.format(current_league)).json()
            scarabs = []
            if scarab_type == 'Gilded':
                regex = r"(?:Gilded\s)(.*)"
            else:
                regex = r"(?:Winged\s)(.*)"
            for scarab in r["lines"]:
                match = re.findall(regex, scarab["name"])
                if match:
                    name = match[0]
                else:
                    continue
                value = scarab["chaosValue"]
                scarabs.append({"name":name,"value":value})
            df = pd.DataFrame(scarabs)
            df['rank'] = df['value'].rank(method='max', ascending=False)
            if 6 in df['rank'].values:
                yellow_limit = 6
            else:
                yellow_limit = 7
            print(df)
            def rank_scarabs(row):
                rank = row['rank']
                if 0 < rank <= 3:
                    color = "green"
                elif 3 < rank <= yellow_limit:
                    color = "yellow"
                else:
                    color = "gray"
                return(color)
            df['color'] = df.apply(lambda row: rank_scarabs(row), axis=1)
            scarabs = df.to_dict('records')
            scarab_cache[scarab_type] = scarabs
            scarab_timing['last_updated'] = datetime.datetime.today()
            print(f"* Success: Got [{scarab_type}] scarab pricing for [{current_league}]. Cache expires in [6] hours.\n")
        return(jsonify(scarabs))
    except:
        return(jsonify('Error'))

@app.route('/api/chromatic_calculator', methods=['POST'])
@cross_origin()
def chromatic_calculator():
    strength_requirement = int(request.json['strength'])
    dexterity_requirement = int(request.json['dexterity'])
    intelligence_requirement = int(request.json['intelligence'])
    desired_red = int(request.json['red'])
    desired_green = int(request.json['green'])
    desired_blue = int(request.json['blue'])
    total_sockets = int(request.json['sockets'])
    
    response = calculate(strength_requirement, dexterity_requirement, intelligence_requirement, desired_red, desired_green, desired_blue, total_sockets)
    return(jsonify(response))

@app.route('/api/guide_values', methods=['GET'])
@cross_origin()
def guide_values():
    guide_values = guide_values_cache.get('guide_values')
    if guide_values is not None and "#DIV/0!" not in guide_values:
        use_time = get_use_time(guide_values_timing)
        response = guide_values_cache.get('guide_values')
        print(f"\n* Cache Exists: Using guide values from [{use_time}].\n")
    else:
        if guide_values is not None and "#DIV/0!" in guide_values:
            print(f"\n* Cache Exists: Contains bad values. Attempting to get updated guide values. \n")
        else:
            print(f"\n* Cache Does Not Exist: Attempting to get updated guide values. \n")
        response = get_guide_values()
        guide_values_cache['guide_values'] = response
    return(jsonify(response))
    
    


if __name__ == "__main__":
    if is_dev == 'dev':
        app.config["DEBUG"] = True
        CORS(app.run(host="0.0.0.0",port=6000))
    else:
        CORS(serve(app, listen='*:6000'))

# CORS(app.run(host="0.0.0.0",port=6000))
