from urllib.request import urlopen
import sys
import datetime
import os

from firebase_functions import https_fn
from firebase_admin import initialize_app,  auth, exceptions
from flask import redirect, session, current_app, make_response, Flask, request, jsonify, abort, render_template
from xmltodict import parse
import secrets
import datetime
import re

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

# Use a service account.
# with open(r'C:\YCS\MajorAudit/cwd.txt', 'w') as outfile:
#     outfile.write(os.getcwd())


cred = credentials.Certificate(r'secrets/majoraudit-firebase-adminsdk-bc6kc-9405745a46.json')
app = firebase_admin.initialize_app(cred)

db = firestore.client()
#
# courses=[
#     ['CPSC 472', 'CPSC 202', 'EAST 310', 'PLSC 130'],
#     ['CPSC 470', 'CPSC 223', 'HUMS 037', 'ENGL 120'],
#     ['CPSC 365', 'CPSC 419', 'ASL 110', 'ECON 159'],
#     ['CPSC 323', 'CPSC 484', 'CPSC 338', 'ASL 120', 'APHY 110']
# ]
#
# data={
#     'courses':[json.dumps(c) for c in courses],
#     'majors':['Computer Science']
# }
#
# me=db.collection('Users').document('oag22')
# me.set(data)

# db_course_connection=db.collection('Courses').document('courses')
# courses=db_course_connection.get().to_dict()['json_string']
# print(f'{courses}')


db_course_connection=db.collection('Majors')

# print(type())
# majors_to_keep=[]
# for c in db_course_connection.get():
#     major_name=c.id
#
#     if input(f'{major_name}:\n')=='y':
#         majors_to_keep.append(major_name)
#
# with open('good majors.json', 'w') as outfile:
#     json.dump(majors_to_keep, outfile)

majors=[m.id for m in db_course_connection.get()]
print(majors)



