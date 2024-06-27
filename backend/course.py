
from typing import List
from collections import defaultdict
import requests
import json

class Course:
    def __init__(self, codes: List[str], title: str, credit: int, areas: List[str], skills: List[str]):
        self.codes = codes
        self.title = title
        self.credit = credit
        self.areas = areas
        self.skills = skills

    def to_dict(self):
        return {
            "codes": self.codes,
            "title": self.title,
            "credit": self.credit,
            "areas": self.areas,
            "skills": self.skills
        }

class StudentCourse:
    def __init__(self, course: Course, status: str, season: str, year: int):
        self.course = course
        self.status = status
        self.season = season
        self.year = year

    def to_dict(self):
        return {
            "course": self.course.to_dict(),
            "status": self.status,
            "season": self.season,
            "year": self.year
        }
    
# Functions

def process_dacourses(data):
    dacourses = {}
    for table in data["coursestable"]:
        for raw in table["courses"]:
            season, year = raw["term"].split()
            season_map = { "Fall": "01", "Spring": "02" }
            raw["timekey"] = f"{year}{season_map.get(season)}"
            dacourses[raw["id"]] = raw
    dacourses = list(dacourses.values())

    grouped_dacourses = defaultdict(list)
    for dacourse in dacourses:
        grouped_dacourses[dacourse["timekey"]].append(dacourse)
    grouped_dacourses = list(grouped_dacourses.values())

    consolidate = []
    for group in grouped_dacourses:
        # print(group)
        result = coursify(group)
        if result: 
            consolidate.extend(result)

    all = [studentCourse.to_dict() for studentCourse in consolidate]
    return all
    

def coursify(dacourses):
    """DegreeAuditCourse[] (w/ Same Term) -> StudentCourse[]"""

    cookies = { 'session': 'enter_session_here', 'session.sig': 'enter_session_sig_here' }
    timekey = dacourses[0]["timekey"]
    url = f"https://api.coursetable.com/api/catalog/public/{timekey}"

    response = requests.get(url, cookies)
    if response.status_code != 200:
        print(f"{timekey} {response.status_code}")
        return []
    
    student_courses = []
    for dacourse in dacourses:
        # Course Portion
        print(dacourse["id"])
        offering = next((c for c in response.json() if c["course_code"] == dacourse["id"]), None)
        if not offering:
            print("NA Offering")
            continue

        print("FOUND!")
        
        codes = [l["course_code"] for l in offering["course"]["listings"]]
        title = offering["course"]["title"]
        credit = int(dacourse["credit"].strip("()"))
        areas = offering["course"]["areas"]
        skills = offering["course"]["skills"]

        course = Course(codes, title, credit, areas, skills)

        # StudentCourse Portion
        status = dacourse["status"]
        if status not in {"IP", "PROSPECTIVE", "W"}:
            status = "COMPLETE"

        sterm = dacourse["term"].split()
        season = sterm[0]
        year = int(sterm[1])

        student_courses.append(StudentCourse(course, status, season, year))

    return student_courses


# mock = {'coursestable': [{'req': '', 'courses': [{'id': 'CPSC 327', 'name': 'Object-Oriented Programming', 'status': 'A', 'credit': '1', 'term': 'Fall 2023', 'designation': 'Qr'}, {'id': 'ART 136', 'name': 'B&W', 'status': 'A', 'credit': '1', 'term': 'Fall 2023', 'designation': 'Qr'}]}, 
#                          {'req': '', 'courses': [{'id': 'ENGL 376', 'name': 'Theories of the Western Novel', 'status': 'A-', 'credit': '1', 'term': 'Fall 2023', 'designation': 'Hu'}, {'id': 'HIST 277J', 'name': 'Memory', 'status': 'A', 'credit': '1', 'term': 'Fall 2023', 'designation': 'Qr'}]}]}

# def save(data: dict, filename: str):
#     """"""
#     with open(filename, 'w') as file:
#         json.dump(data, file, indent=4)

# if __name__ == "__main__":
#     cookies = { 'session': 'enter_session_here', 'session.sig': 'enter_session_sig_here' }
#     timekey = "202302"
#     url = f"https://api.coursetable.com/api/static/catalogs/public/{timekey}"

#     response = requests.get(url, cookies)
#     if response:
#         print(timekey)
#         save(response.json(), 'public_catalog_data.json')
