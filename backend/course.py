
from typing import List
from collections import defaultdict
import requests
import json

class Course:
    def __init__(self, codes: List[str], title: str, credit: int, areas: List[str], skills: List[str], seasons: List[str]):
        self.codes = codes
        self.title = title
        self.credit = credit
        self.areas = areas
        self.skills = skills
        self.seasons = seasons

    def to_dict(self):
        return {
            "codes": self.codes,
            "title": self.title,
            "credit": self.credit,
            "areas": self.areas,
            "skills": self.skills,
            "seasons": self.seasons
        }

class StudentCourse:
    def __init__(self, course: Course, status: str, term: int):
        self.course = course
        self.status = status
        self.term = term

    def to_dict(self):
        return {
            "course": self.course.to_dict(),
            "status": self.status,
            "term": self.term
        }
    
# Functions

def distill_dacourses(data):
	dacourses = {}
	season_map = {"Spring": "01", "Fall": "03"}
	
	for c in data["courses"]:
			season, year = c["term"].split()
			c["term"] = f"{year}{season_map.get(season)}"
			dacourses[c["code"]] = c  # Assuming course code is unique

	dacourses = list(dacourses.values())

	grouped_dacourses = defaultdict(list)
	for dacourse in dacourses:
			grouped_dacourses[dacourse["term"]].append(dacourse)
	grouped_dacourses = list(grouped_dacourses.values())

	consolidate = []
	for group in grouped_dacourses:
			result = coursify(group)  # Assuming coursify is a function you defined
			if result: 
					consolidate.extend(result)

	all_courses = [studentCourse.to_dict() for studentCourse in consolidate]
	return all_courses
    

def coursify(dacourses):
    """DegreeAuditCourse[] -> StudentCourse[]"""

    cookies = { 'session': 'enter_session_here', 'session.sig': 'enter_session_sig_here' }
    key = dacourses[0]["term"]
    url = f"https://api.coursetable.com/api/catalog/public/{key}"

    response = requests.get(url, cookies)
    if response.status_code != 200:
        print(f"{key} {response.status_code}")
        return []
    
    student_courses = []
    for dacourse in dacourses:
        # Course Portion
        offering = next((c for c in response.json() if c["course_code"] == dacourse["code"]), None)
        if not offering:
          continue
        
        codes = [l["course_code"] for l in offering["course"]["listings"]]
        title = offering["course"]["title"]
        credit = int(dacourse["credits"])
        areas = offering["course"]["areas"]
        skills = offering["course"]["skills"]
        seasons = ["Fall", "Spring"]
        course = Course(codes, title, credit, areas, skills, seasons)

        # StudentCourse Portion
        status = "DA_COMPLETE" if dacourse["status"] == "COMPLETE" else ("DA_PROSPECT" if dacourse["status"] == "IP" else dacourse["status"])
        student_courses.append(StudentCourse(course, status, key))

    return student_courses


def simplify_CT_courses(course_list):
    transformed_list = []
    for course_obj in course_list:
        transformed_obj = {
            "course_code": course_obj["course_code"],
            "title": course_obj["course"]["title"],
            "credits": course_obj["course"]["credits"],
            "skills": course_obj["course"]["skills"],
            "areas": course_obj["course"]["areas"],
            "listings": [listing["course_code"] for listing in course_obj["course"]["listings"]],
        }
        transformed_list.append(transformed_obj)
    return transformed_list
