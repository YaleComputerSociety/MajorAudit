
# * * * IMPORTS * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

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
from user import *
from program import *

# * * * APP * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

cred = credentials.Certificate(r'secrets/majoraudit-firebase-adminsdk-bc6kc-6e9544580c.json')
app = firebase_admin.initialize_app(cred)

db = firestore.client()
allowed_CORS_origins=['http://127.0.0.1:3000', 'http://127.0.0.1:3000/graduation', 'http://127.0.0.1:3000/courses', 'http://127.0.0.1:3000/onboard', 'http://127.0.0.1:5000']
app = Flask(__name__, template_folder='templates')

CORS(app, supports_credentials=True, origins=allowed_CORS_origins)
app.secret_key = secrets.token_urlsafe(16)


# * * * LOGIN * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    
# LOGIN
@app.get('/user_login')
def login():
  service = get_redirect_url()
  cookies = {}

  if 'NETID' in session:
    redirect_url = 'http://127.0.0.1:3000'

    current_app.logger.info(f'Redirecting: {redirect_url}')
    resp = make_response(redirect(redirect_url))
    for c in cookies:
      resp.set_cookie(c, cookies[c])
    return resp

  login_url = f'''https://secure.its.yale.edu/cas/login?service={service}'''
  redirect_url = login_url

  if 'ticket' in request.args:
    session['CAS_TOKEN'] = request.args['ticket']

  if 'CAS_TOKEN' in session:
    redirect_url = '/'
    validation = validate(session['CAS_TOKEN'], service)
    if validation[0]:

      if 'NETID' in session:
        cookies['wtf'] = session['NETID']

      netID = validation[1]
      if db.collection("Users").document(netID).get().exists:
        pass
      else:
        new_user = User(
          netID = netID, 
          onboard = False, 
          name = "", 
          degrees = [], 
          studentCourses = [],
          programs = [],
          language = ""
        )
        db.collection("Users").document(netID).set(new_user.__dict__)

      redirect_url = 'http://127.0.0.1:3000'

    else:
      token = session['CAS_TOKEN']
      del session['CAS_TOKEN']
      if "NETID" in session:
        del session["NETID"]
      return make_response(f'Failed Validation: {token} @ URL {validation[1]}')

  current_app.logger.info(f'Redirecting: {redirect_url}')
  resp = make_response(redirect(redirect_url))
  for c in cookies:
    resp.set_cookie(c, cookies[c])
  return resp


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


@app.route('/logout')
def logout():
    service="127.0.0.1:5000/login"
    response = make_response(redirect(f'https://secure.its.yale.edu/cas/logout'))
    response.set_cookie('netid', '', expires=0, path='/') 
    return response


# * * * GET * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

@app.get('/getAuth') 
def getAuth():
	if "NETID" in session:
		document = db.collection("Users").document(session['NETID']).get()
		onboard = document.to_dict().get("onboard")
		return jsonify({"loggedIn": True, "onboard": onboard})
	else:
		return jsonify({"loggedIn": False, "onboard": False})


@app.route("/getUser", methods = ["GET"])
def getUser():
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


@app.get("/getCatalog")
def getCatalog():
    key = request.args.get('key')
    if not key:
        print("Error: Missing 'key' parameter in request.")
        return jsonify({"Error": "Missing Param"}), 400

    try:
        collections = db.collections()
        root_collection_names = [collection.id for collection in collections]

        if 'Catalogs' not in root_collection_names:
            return jsonify({"Error": "Catalogs Nonexistent"}), 404

        print(f"Key: {key}")
        slices_ref = db.collection("Catalogs").document(key).collection("Slices")
        slices_docs = list(slices_ref.stream()) 
        
        print(f"# Slices: {len(slices_docs)}")
        
        combined_list = []
        for slice_doc in slices_docs:
            slice_data = slice_doc.to_dict().get('C', "")

            try:
                parsed_data = json.loads(slice_data)
                combined_list.extend(parsed_data)
            except json.JSONDecodeError as e:
                return jsonify({"Error": f"Invalid JSON Document {slice_doc.id}"}), 500

        if not combined_list:
            return jsonify({"Error": "Data Not Found"}), 404

        return jsonify(combined_list), 200

    except Exception as e:
        print(f"Error Firestore: {str(e)}")
        return jsonify({"Error": str(e)}), 500


# * * * POST * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

@app.route("/onboardUser", methods = ["POST"])
def onboardUser():
	""""""
	# Validate
	loc_netid = session.get("NETID")
	if not loc_netid:
		return make_response(jsonify({"Error": "Not Authenticated"}), 401)

	# Check
	data = request.json
	required_fields = ["name", "degrees", "courses", "language"]
	if not data or not all(field in data for field in required_fields):
		return make_response(jsonify({"Error": "Invalid Data"}), 400)

	# Process
	studentCourses = distill_dacourses(data)
	studentPrograms = clone_programs(studentCourses)
	
	# Store
	user = User(
		netID=loc_netid, 
		onboard=True,
		name=data["name"], 
		degrees=data["degrees"], 
		studentCourses=studentCourses, 
    programs=studentPrograms,
		language=data["language"],
	)
	db.collection("Users").document(loc_netid).set(user.__dict__)

	# Transfer
	return make_response(jsonify(data), 200)


@app.route("/syncUser", methods=["POST"])
def syncUser():
	# Validate
	loc_netid = session.get("NETID")
	if not loc_netid:
		return make_response(jsonify({"Error": "Not Authenticated"}), 401)
     
	print("NETID IN SESSION: ", loc_netid)

	# Parse
	try:
		data = request.get_json()
	except json.JSONDecodeError:
		return make_response(jsonify({"Error": "Invalid JSON"}), 400)

	# Validate
	required_fields = ["netID", "onboard", "name", "degrees", "studentCourses", "programs", "language"]
	if not all(field in data for field in required_fields):
		return make_response(jsonify({"Error": "Invalid Data"}), 400)

	user = User(
	netID=loc_netid, 
	onboard=data["onboard"],
	name=data["name"], 
	degrees=data["degrees"], 
	studentCourses=data["studentCourses"], 
	programs=data["programs"],
	language=data["language"]
	)

	db.collection("Users").document(loc_netid).set(user.__dict__)
	return make_response(jsonify({"Message": "Nice"}), 200)


# * * * OTHER * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

@https_fn.on_request()
def functions(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        pass
        return app.full_dispatch_request()


@https_fn.on_request()
def hello_world(req: https_fn.Request) -> https_fn.Response:
    response = https_fn.Response('hello world')
    return response

