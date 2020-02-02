import csv
import os
import pandas as pd
import sqlite3
import sys
from flask import request, jsonify
from functions import return_info

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gem_availability.csv')

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE gems (act, vendor, gem, class, mission);")
con.commit()

df = pd.read_csv(path)

df.to_sql("gems", con, if_exists='append', index=False)

cur.execute(""" SELECT * 
                FROM gems
                WHERE 
            """)

rows = cur.fetchall()

def gems(pastebin):
    gems, class_name = return_info(pastebin)
    print(class_name)
    dict_of_gems = { i : gems[i] for i in range(0, len(gems) ) }
    return dict_of_gems

pastebin = 'xaTuiHwH'

gems(pastebin)
