
from urllib.request import urlopen
import sys
import datetime
import os

import requests

from flask import make_response

from firebase_functions import firestore_fn, https_fn 
from firebase_admin import initialize_app, firestore 
import google.cloud.firestore
from firebase_functions import https_fn, options

from firebase_functions import https_fn
from firebase_admin import initialize_app,  auth, exceptions
from flask import Flask, redirect, session, current_app, make_response, request, jsonify, abort, render_template
from xmltodict import parse
import secrets
import datetime
import re

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from flask_cors import CORS
from flask_cors import cross_origin

# Ryan
from course import *

cred = credentials.Certificate(r'secrets/majoraudit-firebase-adminsdk-bc6kc-6e9544580c.json')
app = firebase_admin.initialize_app(cred)

db = firestore.client()

allowed_CORS_origins=['http://127.0.0.1:3000', 'http://127.0.0.1:3000/graduation', 'http://127.0.0.1:3000/courses', 'http://127.0.0.1:5000']

class User:
	def __init__(self, netID, onboard, name, degrees, studentCourses):
		self.netID = netID
		self.onboard = onboard
		self.name = name
		self.degrees = degrees
		self.studentCourses = studentCourses

app = Flask(__name__, template_folder='templates')
CORS(app, supports_credentials=True, origins=allowed_CORS_origins)

app.secret_key = secrets.token_urlsafe(16)

# LOGIN
@app.get('/user_login')
def login():
    service=get_redirect_url()
    cookies={}

    if 'NETID' in session:
        redirect_url = 'http://127.0.0.1:3000'

        current_app.logger.info(f'Redirecting: {redirect_url}')
        resp = make_response(redirect(redirect_url))
        for c in cookies:
            resp.set_cookie(c, cookies[c])
        return resp

    login_url=f'''https://secure.its.yale.edu/cas/login?service={service}'''
    redirect_url=login_url

    if 'ticket' in request.args:
        session['CAS_TOKEN'] = request.args['ticket']

    if 'CAS_TOKEN' in session:
        redirect_url = '/'
        validation=validate(session['CAS_TOKEN'], service)
        if validation[0]:

            if 'NETID' in session:
                cookies['wtf']=session['NETID']

            netID = validation[1]
            if db.collection("Users").document(netID).get().exists:
                pass
            else:
                new_user = User(
									netID=netID, 
									onboard=False, 
									name="", 
									degrees=[], 
									studentCourses=[]
                )
                db.collection("Users").document(netID).set(new_user.__dict__)

            redirect_url = 'http://127.0.0.1:3000'

        else:
            token=session['CAS_TOKEN']
            del session['CAS_TOKEN']
            if "NETID" in session:
                del session["NETID"]
            return make_response(f'Failed Validation: {token} @ URL {validation[1]}')

    current_app.logger.info(f'Redirecting: {redirect_url}')
    resp=make_response(redirect(redirect_url))
    for c in cookies:
        resp.set_cookie(c, cookies[c])
    return resp


@app.route('/logout')
def logout():
    service="127.0.0.1:5000/login"
    response = make_response(redirect(f'https://secure.its.yale.edu/cas/logout'))
    response.set_cookie('netid', '', expires=0, path='/') 
    return response


@app.get('/sync')
def sync():
    True
    


@app.get("/CT_Courses")
def get_ct_courses():
    key = request.args.get('key')
    if not key:
        return jsonify({"error": "Missing Param"}), 400

    cookies = { 
        'session': 'enter_session_here', 
        'session.sig': 'enter_session_sig_here' 
    }
    url = f"https://api.coursetable.com/api/catalog/public/{key}"

    try:
        response = requests.get(url, cookies=cookies)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"Error": str(e)}), 500


@app.get('/check_login')
def check_login():
	if "NETID" in session:
		document = db.collection("Users").document(session['NETID']).get()
		onboard = document.to_dict().get("onboard")
		return jsonify({"loggedIn": True, "onboard": onboard})
	else:
		return jsonify({"loggedIn": False, "onboard": False})



def validate(ticket, service):
    validation_url = f'https://secure.its.yale.edu/cas/serviceValidate?service={service}&ticket={ticket}'
    current_app.logger.info(f'attempting to validate login credentials at {validation_url}')
    val_xml = urlopen(validation_url).read().strip().decode('utf8', 'ignore')
    val_dic = parse(val_xml)

    print("valid ",val_dic, flush=True)

    if "cas:authenticationSuccess" not in val_dic["cas:serviceResponse"]:
        return False, validation_url

    val_dic = val_dic["cas:serviceResponse"]["cas:authenticationSuccess"]
    username = val_dic["cas:user"]
    session["NETID"] = username
    session['CAS_ATTRIBUTES'] = val_dic["cas:attributes"]

    return True, username


def get_base_url():
     url=request.url

     base_url=re.search('https?://[^/]+', url)

     if base_url:
         return base_url.group()

     return 'no url found'


def get_redirect_url():
    url = request.url
    if '?' in url:
        url=url[:url.find('?')]

    function_loc=url.rfind('/')

    if '127.0.0.1' in url:
        url = url[:function_loc] + '/majoraudit/us-central1/functions' + url[function_loc:]
    else:
        url=url[:function_loc]+url[function_loc:]

    return url


# SYNC DATA
@app.route("/sync_data", methods = ["POST"])
def sync_data():
    """"""
    # Validate
    loc_netid = session.get("NETID")
    if not loc_netid:
        return make_response(jsonify({"Error": "Not Authenticated"}), 401)
    
    # Check
    data = request.json
    required_fields = ["name", "degree", "major", "coursestable"]
    if not data or not all(field in data for field in required_fields):
        return make_response(jsonify({"Error": "Invalid Data"}), 400)

    # Process
    courses = distill_dacourses(data)

    # Store
    user = User(loc_netid, data["name"].split(" ")[1], data["degree"], data["major"], courses, data["coursestable"])
    db.collection("Users").document(loc_netid).set(user.__dict__)

    # Transfer
    return make_response(jsonify(data), 200)


# GET DATA
@app.route("/get_data", methods = ["GET"])
def get_data():
    # Validate
    loc_netid = session.get("NETID")
    if not loc_netid:
        return make_response(jsonify({"Error": "Not Authenticated"}), 401)

    # Retrieve
    user_doc = db.collection("Users").document(loc_netid).get()

    # Return
    if not user_doc.exists:
        return make_response(jsonify({"Error": "Data Not Found"}), 404)
    
    response_body = jsonify(user_doc.to_dict())
    return make_response(response_body, 200)


def logged_in():
    return "NETID" in session


@app.route('/get_majors', methods=['POST', 'GET'])
def get_majors():
    if logged_in():
        majors = db.collection('Majors').stream()
        data = []
        for m in majors:
            data.append(m.to_dict())
        return jsonify(data)
    return jsonify()


@https_fn.on_request()
def functions(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        pass
        return app.full_dispatch_request()


@https_fn.on_request()
def hello_world(req: https_fn.Request) -> https_fn.Response:
    response = https_fn.Response('hello world')
    return response




