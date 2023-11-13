# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`
from urllib.request import urlopen

from firebase_functions import https_fn
from firebase_admin import initialize_app,  auth
from flask import redirect
from xmltodict import parse

initialize_app()


@https_fn.on_request()
def login(req: https_fn.Request) -> https_fn.Response:
    # response=https_fn.Response()

    redirect_url = '''https://secure.its.yale.edu/cas/login?service=http%3A%2F%2F127.0.0.1%3A5001%2Fmajoraudit%2Fus-central1%2Fvalidate'''
    return redirect(redirect_url)

@https_fn.on_request()
def validate(req: https_fn.Request) -> https_fn.Response:
    response=https_fn.Response()

    # redirect_url = '''https://secure.its.yale.edu/cas/login?service=http%3A%2F%2F127.0.0.1%3A5001%2Fmajoraudit%2Fus-central1%2Flogin'''
    if 'ticket' in req.args:
        val_url=f'''https://secure.its.yale.edu/cas/serviceValidate?service=http%3A%2F%2F127.0.0.1%3A5001%2Fmajoraudit%2Fus-central1%2Fvalidate&ticket={req.args['ticket']}'''

        xml_dump = urlopen(val_url).read().strip().decode('utf8', 'ignore')
        try:
            xml_dic = parse(xml_dump)["cas:serviceResponse"]["cas:authenticationSuccess"]
            username=xml_dic["cas:user"]
            resp=username
        except:
            resp='invalid CAS ticket'

    else:
        resp='no ticket found'
    return https_fn.Response(resp)
