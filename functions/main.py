# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`
from urllib.request import urlopen

from firebase_functions import https_fn
from firebase_admin import initialize_app,  auth, exceptions
from flask import redirect, session, current_app, make_response, Flask, request, jsonify, abort
from xmltodict import parse
import secrets
import datetime
import re

initialize_app()

app = Flask(__name__)

app.secret_key = secrets.token_urlsafe(16)
# app.run()
# print('TESTTESTTETSTETSTETSTESTETST')
# raise Exception(app.secret_key)

@app.get('/sanity')
def sanity():
    return make_response('sanity')

# @app.get('/login')
# def log():
#     return make_response('login')


# @https_fn.on_request()
@app.get('/user_login')
def login():
# def login(req: https_fn.Request) -> https_fn.Response:
#     return make_response('logging in')
    # response=https_fn.Response()

    # redirect_url = '''https://secure.its.yale.edu/cas/login?service=http%3A%2F%2F127.0.0.1%3A5001%2Fmajoraudit%2Fus-central1%2Fvalidate'''
    # return redirect(redirect_url)
    service=get_redirect_url()
    # login_url=f'''https://secure.its.yale.edu/cas/login?service=http%3A%2F%2F127.0.0.1%3A5001%2Fmajoraudit%2Fus-central1%2Ffunctions%2Fuser_login'''
    login_url=f'''https://secure.its.yale.edu/cas/login?service={service}'''

    redirect_url=login_url
    cookies={}

    if 'ticket' in request.args:
        # try:
        #     # session['CAS_TOKEN']=req.args['ticket']
        #     cas_token=auth.create_session_cookie(req.args['ticket'])
        #     cookies['CAS_TOKEN']=cas_token
        # except Exception:
        #     return https_fn.Response(app.secret_key)
        session['CAS_TOKEN'] = request.args['ticket']
        # return make_response(str(session))
        # return make_response('success')

        # try:
        #     session['CAS_TOKEN'] = req.args['ticket']
        # except Exception:
        #     return make_response(session)

        # id_token = request.form['idToken']
        # # cas_token = auth.create_session_cookie(req.args['ticket'], expires_in=datetime.timedelta(days=5))
        # cas_token = auth.create_session_cookie(id_token, expires_in=datetime.timedelta(days=5))
        # cookies['CAS_TOKEN'] = cas_token

    if 'CAS_TOKEN' in session:
        redirect_url = '/'
        validation=validate(session['CAS_TOKEN'], service)
        if validation[0]:
            # if info:=get_player_info(session['CAS_USERNAME']):
            #     redirect_url='/'
            #     cookies['user_name']=info[1]
            # else:
            #     redirect_url='/new_user'
            if '127.0.0.1' in service:
                redirect_url='http://127.0.0.1:5000'
            else:
                redirect_url='https://majoraudit.web.app/'
            # cookies['user_name'] = info[1]
        else:
            token=session['CAS_TOKEN']
            del session['CAS_TOKEN']
            if "CAS_USERNAME" in session:
                del session["CAS_USERNAME"]
            return make_response(f'failure to validate: {token} at url {validation[1]}')

    current_app.logger.info(f'redirecting to {redirect_url}')
    resp=make_response(redirect(redirect_url))
    for c in cookies:
        resp.set_cookie(c, cookies[c])
    return resp


@app.get('/url_test')
def url_test():
    return make_response(f'{request.url}\n {get_base_url()}')


# @https_fn.on_request()
# def validate(req: https_fn.Request) -> https_fn.Response:
def validate(ticket, service):
    validation_url = f'https://secure.its.yale.edu/cas/serviceValidate?service={service}&ticket={ticket}'
    current_app.logger.info(f'attempting to validate login credentials at {validation_url}')
    val_xml = urlopen(validation_url).read().strip().decode('utf8', 'ignore')
    val_dic = parse(val_xml)

    if "cas:authenticationSuccess" not in val_dic["cas:serviceResponse"]:
        return False, validation_url

    val_dic = val_dic["cas:serviceResponse"]["cas:authenticationSuccess"]
    username = val_dic["cas:user"]
    session["CAS_USERNAME"] = username
    session['CAS_ATTRIBUTES'] = val_dic["cas:attributes"]

    return True,


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
        return app.full_dispatch_request()




@https_fn.on_request()
def hello_world(req: https_fn.Request) -> https_fn.Response:
    response = https_fn.Response('hello world')
    return response

