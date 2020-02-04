import csv
import json
import os
import sqlite3
import sys

import flask
import pandas as pd
from flask import jsonify, request, send_file

from flask_cors import CORS, cross_origin
from functions import return_info

app = flask.Flask(__name__)
app.config["DEBUG"] = True

gem_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gem_availability.csv')
passives_path = path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'passives_with_gems.json')


memory_uri = 'file:database?mode=memory&cache=shared.sqlite'

conn = sqlite3.connect(memory_uri)
cur = conn.cursor()
try:
    cur.execute("CREATE TABLE gems (act, vendor, gem, class_name, mission);")
    df = pd.read_csv(gem_path)
    df.to_sql("gems", conn, if_exists='append', index=False)
except:
    pass

conn.commit()

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
            gems, class_name = return_info(pastebin)
            gems = pd.DataFrame(gems).drop_duplicates().to_dict('r')
        else:
            pass
    else:
        return "Error: No pastebin field provided. Please specify a pastebin."

    gem_details = []

    conn = sqlite3.connect(memory_uri)
    cur = conn.cursor()

    with open(passives_path) as f:
        data = json.load(f)

        if pastebin == '':
            return (jsonify(data))
        else:
            print(gems)

            for gem in gems:

                gem_name = gem['name']
                gem_level = gem['level']

                call = """ SELECT * 
                            FROM gems
                            WHERE class_name = "{}"
                            AND gem = "{}"
                        """.format(class_name, gem_name)

                cur.execute(call)

                rows = cur.fetchall()
                print(gem_name, gem_level)

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

CORS(app.run())
