import requests
import json
import datetime
import time

def scrape_courses():
    #TODO change these to env variables
    cookies = {
        'session': 'enter session',
        'session.sig': 'etner session.sig',
    }

    # response = requests.get('https://api.coursetable.com/api/static/catalogs/202301.json', cookies=cookies)

    course_dic = {}
    for year in range(datetime.datetime.now().year-6, datetime.datetime.now().year + 6 + 1):
        for season in range(1, 4):
            if year not in course_dic:
                course_dic[year]={}

            data_url = f'https://api.coursetable.com/api/static/catalogs/{year}0{season}.json'
            response = requests.get(data_url, cookies=cookies)

            if response.status_code == 404:
                print(f'unable to access {year} {season}')
                continue
            else:
                print(f'scraping {year} {season}')

            course_dic[year][season] = json.loads(response.text)
            time.sleep(1)

    with open('courses.json', 'w') as infile:
        json.dump(course_dic, infile)


if __name__=='__main__':
    scrape_courses()
