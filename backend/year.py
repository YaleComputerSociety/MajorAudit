
from typing import List, Dict, Union

class Year:
    def __init__(self, grade: int, terms: List[str], fall: Union[List[Dict], None], spring: Union[List[Dict], None]):
        self.grade = grade 
        self.terms = terms 
        self.fall = fall 
        self.spring = spring 

    def to_dict(self):
        return {
            "grade": self.grade,
            "terms": self.terms,
            "fall": self.fall,
            "spring": self.spring,
        }

def fall_year(year):
    term = year["terms"][0]
    _, year = term.split()
    return int(year)

def term_courses(term_str, courses):
    season, year = term_str.split()
    year = int(year)
    return [course for course in courses if course["season"] == season and course["year"] == year]


def make_years(courses):
    """"""
    terms = list(set(f"{course["season"]} {course["year"]}" for course in courses))


    years = []
    for term in terms:
        match = next((year for year in years if term in year["terms"]), None)
    
        if not match:
            season, year = term.split()
            year = int(year)
            if season == "Spring":
                year -= 1
            term_strs = [f"Fall {year}", f"Spring {year + 1}"]

            fall_courses = term_courses(term_strs[0], courses)
            spring_courses = term_courses(term_strs[1], courses)

            year = Year(
                grade = "",
                terms = term_strs,
                fall = fall_courses if fall_courses else None,
                spring = spring_courses if spring_courses else None
            )

            years.append(year.to_dict())

    years = sorted(years, key=fall_year)
    for idx, year in enumerate(years):
        year['grade'] = idx + 1

    return years
