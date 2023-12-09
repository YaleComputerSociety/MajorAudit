from cgi import print_arguments
import requests
from bs4 import BeautifulSoup
import time
import re
import json
from requests.adapters import HTTPAdapter
from urllib3.util import Retry

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
cred = credentials.Certificate('D:\\code\\firebase_key\\majoraudit-firebase-adminsdk-bc6kc-6d9a0c8214.json')
app = firebase_admin.initialize_app(cred)

db = firestore.client()

class Major:
    def __init__(self, major_name, major_descriptions):
        self.major_name = major_name
        self.major_description = major_descriptions
        # Could add the required courses information in the class

base_url  = "https://catalog.yale.edu/ycps/subjects-of-instruction/"
all_major_urls = []

def get_major(url):
    session = requests.Session()

    response = session.get(url, timeout = 10)
#        cnt_fail = 0
#       while response.status_code != 200:
#          cnt_fail+=1
#         print("tried and failed ", response.status_code)
#            if cnt_fail>5:
#                print("fatal")
#                break
#            response = session.get(url)
#            time.sleep(3)
#        print("success")

    page_url = BeautifulSoup(response.text, 'html.parser')
    main_content = str(page_url.find('div', role = "main"))
    pattern = "<h1>" + '(.*?)' + "</h1>"
    name = re.findall(pattern, main_content)
        
    description_content = str(page_url.find('div', id = "textcontainer"))

    print(name)
    #print(description_content)
    print("----------------------------")

    major = Major(name[0], description_content)
    return major


def get_majors_and_descriptions(all_major_urls):
    all_major_info = []
    cnt = 0
    for url in all_major_urls:
        time.sleep(1)
        while 1>0:
            try:
                major = get_major(url)
                break
            except:
                print("Error")

        db.collection("Majors").document(major.major_name).set(major.__dict__)

        all_major_info.append(major.__dict__)
    
    return all_major_info

def get_url():
    response = requests.get(base_url)
    page_url = BeautifulSoup(response.text, 'html.parser')
    all_urls = page_url.find_all('a', href = True)
    for element in all_urls:
        url = element['href']
       # print(url)
        
        if not (("/" in url) or ("#" in url) or ("@" in url)):
            all_major_urls.append(base_url + url)
    return all_major_urls

all_info = get_majors_and_descriptions(get_url())
json_info = json.dumps(all_info, indent = 4)

with open("major_info.json", "w") as outfile:
    outfile.write(json_info) 