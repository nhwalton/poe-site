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

                call = """ SELECT *
                            FROM gems
                            WHERE class_name = "{}"
                            AND gem = "{}"
                        """.format(class_name, gem)

                cur.execute(call)

                rows = cur.fetchall()
                print("\n\n\n",rows,"\n\n\n")
                earliest = None

                for row in rows:
                    if row == []:
                        continue
                    elif earliest == None:
                        earliest = row
                    print(row[0], earliest[0])
                    if row[0] < earliest[0]:
                        earliest = row

                if earliest == None:
                    continue
                else:
                    gem_details = {
                        "act":earliest[0],
                        "vendor":earliest[1],
                        "gem_name":earliest[2],
                        "mission":earliest[4]
                        }

                for each in data:
                    if each['act'] == gem_details['act']:
                        each['gems'].append(gem_details)
                        break
                    else:
                        continue

    print("\n\n\n",gems,"\n\n\n")
    print("\n\n\n",class_name,"\n\n\n")
    # dict_of_gems = { i : gems[i] for i in range(0, len(gems) ) }
    return (jsonify(data))

CORS(app.run(host="0.0.0.0",port=5000))
