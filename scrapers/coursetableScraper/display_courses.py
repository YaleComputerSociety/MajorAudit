import json
import argparse


def display_courses():
    with open('courses.json', 'r') as infile:
        courses=json.load(infile)
        new_courses={}
        for year in courses:
            if year not in new_courses:
                new_courses[year] = {}

            for season in courses[year]:
                if season not in new_courses[year]:
                    new_courses[year][season] = {}

                for course in courses[year][season]:
                    for code in course["all_course_codes"]:
                        dep=code.split(' ')[0]
                        num = str(code.split(' ')[1])
                        if dep not in new_courses[year][season]:
                            new_courses[year][season][dep]={}

                        new_courses[year][season][dep][num]=course

        courses=new_courses

    while True:
        request=input('enter course:\n')
        request=request.split(' ')
        if len(request)==2:
            year='2023'
            season='3'
            dep = str(request[0]).upper()
            c_num = str(request[1])
        else:
            year=str(request[0])
            season=str(request[1])
            dep=str(request[2]).upper()
            c_num=str(request[3])

        try:
            course=courses[year][season][dep][c_num]
            print(f'{course["title"]}:')
            print(f'{course["description"]}\n')
            print(f'rating: {course["average_rating"]}')
            print(f'difficulty: {course["average_workload"]}\n')

        except:
            print('invalid course')


if __name__=='__main__':
    display_courses()




