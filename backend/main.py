
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


# Use a service account.
# with open(r'C:\YCS\MajorAudit/cwd.txt', 'w') as outfile:
#     outfile.write(os.getcwd())

cred = credentials.Certificate(r'secrets/majoraudit-firebase-adminsdk-bc6kc-6e9544580c.json')
app = firebase_admin.initialize_app(cred)

db = firestore.client()

allowed_CORS_origins=['http://127.0.0.1:3000', 'http://127.0.0.1:3000/graduation', 'http://127.0.0.1:5000', 'majoraudit.web.app']

class User:
    def __init__(self, netID, courses):
        self.netID = netID
        self.courses = courses

app = Flask(__name__, template_folder='templates')
CORS(app, supports_credentials=True, origins=allowed_CORS_origins)

app.secret_key = secrets.token_urlsafe(16)

@app.get('/sanity')
def sanity():
    return make_response('sanity')

@app.route('/hello_world')
def hello_world():
    return make_response('hello world')

@app.get('/user_login')
def login():
    # print(request.cookies, flush=True)
    # netid = session['NETID']
    # print("netid", netid)
    service=get_redirect_url()
    cookies={}

    if 'NETID' in session:
        if '127.0.0.1' in service:
            redirect_url = 'http://127.0.0.1:3000'
        else:
            redirect_url = 'https://majoraudit.web.app'

        current_app.logger.info(f'Redirecting: {redirect_url}')
        resp = make_response(redirect(redirect_url))
        for c in cookies:
            resp.set_cookie(c, cookies[c])
        return resp

    login_url=f'''https://secure.its.yale.edu/cas/login?service={service}'''
    redirect_url=login_url

    if 'ticket' in request.args:
        session['CAS_TOKEN'] = request.args['ticket']
        print(session['CAS_TOKEN'], file=sys.stderr)

    if 'CAS_TOKEN' in session:
        redirect_url = '/'
        validation=validate(session['CAS_TOKEN'], service)
        if validation[0]:
            print("username", validation[1])
            cookies['hello']='world'
            if 'NETID' in session:
                cookies['wtf']=session['NETID']
            print(session)
            
            user = User(validation[1], "")
            if db.collection("Users").document(validation[1]).get().exists:
                pass
            else:
                db.collection("Users").document(validation[1]).set(user.__dict__)

            if '127.0.0.1' in service:
                redirect_url = 'http://127.0.0.1:3000'
            else:
                redirect_url='https://majoraudit.web.app'

            # response = make_response(redirect('/majoraudit/us-central1/functions/dashboard'))
            # expires = datetime.datetime.now() + datetime.timedelta(days=30)
            # response.set_cookie('netid', user.netID, expires=expires, path='/')

            # return response

        else:
            token=session['CAS_TOKEN']
            del session['CAS_TOKEN']
            if "NETID" in session:
                del session["NETID"]
            return make_response(f'failure to validate: {token} at url {validation[1]}')

    current_app.logger.info(f'Redirecting: {redirect_url}')
    resp=make_response(redirect(redirect_url))
    for c in cookies:
        resp.set_cookie(c, cookies[c])
    return resp






@app.get('/dashboard')
def dashboard():
    netid = session['NETID'] 
    if not netid:
        return redirect('/user_login')
    return render_template('dashboard.html', netid=netid)


@app.route('/logout')
def logout():
    service="127.0.0.1:5000/login"
    response = make_response(redirect(f'https://secure.its.yale.edu/cas/logout'))
    response.set_cookie('netid', '', expires=0, path='/') 
    return response


@app.get('/url_test')
def url_test():
    return make_response(f'{request.url}\n {get_base_url()}')

@app.get('/get_netid1')
def get_netid():
    print("flask get netid")
    print(session)
    if 'NETID' in session:
        print(session["NETID"])
        return session["NETID"]
    else:
        return ''


@app.get('/sync')
def sync():
    True

@app.get('/check_login')
def check_login():
    if 'NETID' in session:
        return jsonify(session['NETID'])
    return jsonify()

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
    session["NETID"] = username # hey hey hey
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

@app.route('/get_data', methods = ['GET'])
def get_data():
#    if req.method == 'OPTIONS':
#        headers = {
#            'Access-Control-Allow-Origin': '*',
#            'Access-Control-Allow-Methods': 'GET',
#            'Access-Control-Allow-Headers': 'Content-Type',
#            'Access-Control-Max-Age': '3600',
#        }
#        return make_response('', 204, headers)
#    headers = {
#        'Access-Control-Allow-Origin': '*',
#    }
#    response_body = "DEFAULT"

    loc_netid = session["NETID"]
    print(loc_netid)

    data = db.collection("Users").document(loc_netid).get()
    if not data.exists:
        response_body = jsonify("No Data")
    else:
        response_body = jsonify(data.to_dict())

    return make_response((response_body, 200))


@app.route('/sync_data', methods = ['POST'])
def sync_data():

#    if req.method == 'OPTIONS':
#        headers = {
#            'Access-Control-Allow-Origin': '*',
#            'Access-Control-Allow-Methods': 'GET',
#            'Access-Control-Allow-Headers': 'Content-Type',
#            'Access-Control-Max-Age': '3600',
#        }
#        return make_response('', 204, headers)
    
#    headers = {
#        'Access-Control-Allow-Origin': '*',
#    }

    #netid = session['NETID']
    #if not netid:
    #    return redirect('/user_login')

    print("main.py: sync_data")
    loc_netid = session.get("NETID")
    if not loc_netid:
        print(session)
        return make_response("Not authenticated", 401)
    print(loc_netid)
    
    data = request.json
    user = User(loc_netid, data)
    db.collection("Users").document(loc_netid).set(user.__dict__)

    print(data, flush=True)
    return make_response((data, 200))


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
