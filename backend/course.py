
from typing import List, Optional

class Course:
    def __init__(self, code: str, title: str, credit: int, seasons, distribution: List[str], description: Optional[str] = None):
        self.code = code
        self.title = title
        self.credit = credit
        self.seasons = seasons
        self.distribution = distribution

    def to_dict(self):
        return {
            "code": self.code,
            "title": self.title,
            "seasons": self.seasons,
            "credit": self.credit,
            "distribution": self.distribution
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

def convert(da_course):
    """"""
    # Course Portion
    credit_str = da_course["credit"].strip("()")
    credit = int(credit_str)

    distribution = []
    if da_course["designation"]:
        distribution = [da_course["designation"]]

    course = Course(
        code = da_course["id"],
        title = da_course["name"],
        credit = credit,
        seasons = [],
        distribution = distribution
    )

    # StudentCourse Portion
    status = da_course["status"]
    if status not in {"IP", "PROSPECTIVE", "W"}:
        status = "COMPLETE"

    term_parts = da_course["term"].split()
    season = term_parts[0]
    year = int(term_parts[1])

    student_course = StudentCourse(
        course = course,
        status = status,
        season = season,
        year = year
    )

    return student_course.to_dict()
