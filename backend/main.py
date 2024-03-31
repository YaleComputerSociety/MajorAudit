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

# Use a service account.
# with open(r'C:\YCS\MajorAudit/cwd.txt', 'w') as outfile:
#     outfile.write(os.getcwd())


cred = credentials.Certificate(r'secrets/majoraudit-firebase-adminsdk-bc6kc-f15a5f23e2.json')
app = firebase_admin.initialize_app(cred)

db = firestore.client()


class User:
    def __init__(self, netID, courses):
        self.netID = netID
        self.courses = courses

app = Flask(__name__, template_folder='templates')

app.secret_key = secrets.token_urlsafe(16)

@app.get('/sanity')
def sanity():
    return make_response('sanity')

@app.get('/user_login')
def login():
    # print(request.cookies, flush=True)
    # netid = session['NETID']
    # print("netid", netid)
    if 'NETID' in session:
        print('sanity', file=sys.stderr)
        return redirect('/majoraudit/us-central1/functions/dashboard')

    service=get_redirect_url()
    login_url=f'''https://secure.its.yale.edu/cas/login?service={service}'''

    redirect_url=login_url
    cookies={}

    if 'ticket' in request.args:
        session['CAS_TOKEN'] = request.args['ticket']
        print(session['CAS_TOKEN'], file=sys.stderr)

    if 'CAS_TOKEN' in session:
        redirect_url = '/'
        validation=validate(session['CAS_TOKEN'], service)
        if validation[0]:
            print("username", validation[1])
            
            user = User(validation[1], "")
            if db.collection("Users").document(validation[1]).get().exists:
                pass
            else:
                db.collection("Users").document(validation[1]).set(user.__dict__)

            if '127.0.0.1' in service:
                redirect_url='http://127.0.0.1:5000/dashboard'
            else:
                redirect_url='https://majoraudit.web.app/dashboard'

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

    current_app.logger.info(f'redirecting to {redirect_url}')
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

@app.route('/sync_data', methods=['POST'])
def sync_data():
    netid = session['NETID']
    if not netid:
        return redirect('/user_login')
    data = request.json
    user = User(netid, data)
    db.collection("Users").document(netid).set(user.__dict__)
    print(data, flush=True)

    return 'Data received'

@app.route('/get_data', methods=['GET'])
def get_data():
    netid = session['NETID']
    if not netid:
        return jsonify({'error': 'User not logged in'}), 401
    data = db.collection("Users").document(netid).get()
    if not data.exists:
        data = "No data"
    data = data._data['courses']
    if data == "":
        data = "No data"
    print("get", data, flush=True)
    return data

@app.route('/logout')
def logout():
    service="127.0.0.1:5000/login"
    response = make_response(redirect(f'https://secure.its.yale.edu/cas/logout'))
    response.set_cookie('netid', '', expires=0, path='/') 
    return response


@app.get('/url_test')
def url_test():
    return make_response(f'{request.url}\n {get_base_url()}')

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
        url=url[:function_loc]+'/functions'+url[function_loc:]

    return url

# @https_fn.on_request()
# @app.get('/session_login')
# def session_login(req: https_fn.Request) -> https_fn.Response:
#     # Get the ID token sent by the client
#     # req.headers.set('Content-Type', 'application/json')
#
#     id_token = req.json['idToken']
#     # Set session expiration to 5 days.
#     expires_in = datetime.timedelta(days=5)
#     try:
#         # Create the session cookie. This will also verify the ID token in the process.
#         # The session cookie will have the same claims as the ID token.
#         session_cookie = auth.create_session_cookie(id_token, expires_in=expires_in)
#         response = make_response('success')
#         # Set cookie policy for session cookie.
#         expires = datetime.datetime.now() + expires_in
#         response.set_cookie(
#             'session', session_cookie, expires=expires, httponly=True, secure=True)
#         return response
#     except exceptions.FirebaseError:
#         return abort(401, 'Failed to create a session cookie')


@https_fn.on_request()
def functions(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        pass
        return app.full_dispatch_request()

@https_fn.on_request()
def hello_world(req: https_fn.Request) -> https_fn.Response:
    response = https_fn.Response('hello world')
    return response

@https_fn.on_request()
def get_courses(req: https_fn.Request) -> https_fn.Response:
    db_course_connection = db.collection('Courses').document('courses').get()
    courses = db_course_connection.to_dict()['json_string']
    response = https_fn.Response(courses)
    return response



# course_after={"CPSC 223":{'CPSC 323':1000, 'CPSC 472':100}}
# # course_before={"CPSC 323":{'CPSC 223':1000}}
#
# num_taken={"CPSC 223": 10000}



