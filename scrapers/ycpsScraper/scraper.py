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
cred = credentials.Certificate(r'C:\YCS\MajorAudit\backend\secrets\majoraudit-firebase-adminsdk-bc6kc-f15a5f23e2.json')
app = firebase_admin.initialize_app(cred)

db = firestore.client()

major_name_dic={}

class Major:
    def __init__(self, major_name, major_descriptions):
        self.major_name = major_name
        self.major_description = major_descriptions
        # Could add the required courses information in the class

base_url  = "https://catalog.yale.edu/ycps/majors-in-yale-college/"

def get_major(name, url):
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
    # print(main_content)
    pattern = "<h1>" + '(.*?)' + "</h1>"
    # name = re.findall(pattern, main_content)
        
    description_content = str(page_url.find('div', id = "textcontainer"))
    print(f'{name}:\n{description_content}')

    #print(description_content)
    print("----------------------------")

    major = Major(name, description_content)
    return major


def get_majors_and_descriptions(all_major_urls):
    all_major_info = []
    for major in all_major_urls:
        time.sleep(1)
        while True:
            try:
                major = get_major(major, all_major_urls[major])
                break
            except:
                print("Error")

        db.collection("Majors").document(major.major_name).set(major.__dict__)

        all_major_info.append(major.__dict__)
    
    return all_major_info

def get_urls():
    response = requests.get(base_url)
    major_dic={}
    # print(response.text)
    page_url = BeautifulSoup(response.text, 'html.parser')
    # print(page_url)
    major_list=page_url.find(id='textcontainer')
    all_urls = major_list.find_all('a', href = True)
    # print(all_urls)
    for element in all_urls:
        url = element['href']
        name=element.text

        major_dic[name]='https://catalog.yale.edu' + url

    return major_dic


all_info = get_majors_and_descriptions(get_urls())
json_info = json.dumps(all_info, indent = 4)

with open("major_info.json", "w") as outfile:
    outfile.write(json_info) 