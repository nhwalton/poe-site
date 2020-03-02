import csv
import json
import os
import re
import sqlite3
import sys

import flask
import pandas as pd
import requests
from expiringdict import ExpiringDict
from flask import jsonify, request, send_file
from flask_cors import CORS, cross_origin

from functions import return_info

app = flask.Flask(__name__)
app.config["DEBUG"] = True

gem_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gem_availability.csv')
passives_path = path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'passives_with_gems.json')

memory_uri = 'file::memory:?cache=shared'

conn = sqlite3.connect(memory_uri)
cur = conn.cursor()
try:
    cur.execute("CREATE TABLE gems (act, vendor, gem, class_name, mission);")
    df = pd.read_csv(gem_path)
    df.to_sql("gems", conn, if_exists='append', index=False)
except:
    pass

conn.commit()

scarab_cache = ExpiringDict(max_len=1, max_age_seconds=21600)

@app.route('/', methods=['GET'])
def home():
    return "nothing to see here."

# @app.route('/api/return-passives/')
# def return_passives():
# 	try:
# 		return send_file("/" + passives_path)
# 	except Exception as e:
# 		return str(e)

@app.route('/api/gems', methods=['GET'])
@cross_origin()
def gems():
    if 'pastebin' in request.args:
        pastebin = request.args['pastebin']
        if pastebin != '':
            try:
                regex = r"(?:pastebin.com\/)([A-Za-z0-9]*)"
                match = re.findall(regex, pastebin)
                print(match)
                if (match != []) & (match != ['']) :
                    pastebin_code = match[0]
                else:
                    return jsonify("Error: Not a valid pastebin link.")
            except:
                return jsonify("Error: Not a valid pastebin link.")
            try:
                returned = return_info(pastebin_code)
                # print(returned)
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

                call = """ SELECT * 
                            FROM gems
                            WHERE class_name = "{}"
                            AND gem = "{}"
                        """.format(class_name, gem_name)

                cur.execute(call)

                rows = cur.fetchall()
                # print(gem_name, gem_level)

                earliest = None

                for row in rows:
                    if row == []:
                        continue
                    elif earliest == None:
                        earliest = row
                    if row[0] < earliest[0]:
                        print(row[0], earliest[0])
                        earliest = row

                if earliest == None:
                    continue
                else:
                    print(earliest)
                    gem_details = {
                        "act":earliest[0],
                        "vendor":earliest[1],
                        "gem_name":earliest[2],
                        "mission":earliest[4],
                        "level":gem_level
                        }

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
    if scarab_cache.get('scarabs'):
        print("Cache Exists \n")
        scarabs = scarab_cache.get('scarabs')
    else:
        print("Cache Does Not Exist \n")
        r = requests.get('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=Scarab&language=en').json()
        scarabs = []
        regex = r"(?:Gilded\s)(.*)"
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
        def rank_scarabs(row):
            rank = row['rank']
            if 0 < rank <= 3:
                color = "green"
            elif 3 < rank <= 6:
                color = "yellow"
            else:
                color = "gray"
            return(color)
        df['color'] = df.apply(lambda row: rank_scarabs(row), axis=1)
        scarabs = df.to_dict('records')
        scarab_cache['scarabs'] = scarabs
    return(jsonify(scarabs))

CORS(app.run(host="0.0.0.0",port=6000))
