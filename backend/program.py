
from copy import deepcopy

from clone import CPSC_Program

all_programs = [CPSC_Program]

def clone_programs(studentCourses):
    # Extract course codes from student courses
    student_course_codes = {code for studentCourse in studentCourses for code in studentCourse['course']['codes']}
    cloned_programs = []

    for program in all_programs:
        cloned_program = deepcopy(program)  # Make a deep copy of the program to avoid modifying the original

        for degree in cloned_program['degrees']:
            if not degree["codes"].intersection(student_course_codes):
                continue

            for requirement in degree['requirements']:
                for subsection in requirement['subsections']:
                    for i, course in enumerate(subsection['courses']):
                        for studentCourse in studentCourses:
                            if set(course['codes']).intersection(studentCourse['course']['codes']):
                                # print(f"Replacing course {course['codes']} with student course {studentCourse['course']['codes']}")
                                subsection['courses'][i] = studentCourse  # Replace course with studentCourse
                                break  # Break after replacing to avoid multiple replacements

        cloned_programs.append(cloned_program)
    
    return cloned_programs


example_student_courses = [
    {
        "course": {
            "codes": ["CPSC 201"],
            "title": "Introduction",
            "credit": 1,
            "areas": [],
            "skills": [],
            "seasons": []
        },
        "term": 202401,
        "status": "DA_COMPLETE"
    },
    {
        "course": {
            "codes": ["CPSC 202"],
            "title": "Math Tools",
            "credit": 1,
            "areas": [],
            "skills": [],
            "seasons": []
        },
        "term": 202402,
        "status": "DA_PROSPECT"
    }
]
