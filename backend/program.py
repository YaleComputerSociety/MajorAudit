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
            if not set(degree["codesCore"]).intersection(student_course_codes):
                continue

            for requirement in degree['requirements']:
                for subsection in requirement['subsections']:
                    for course in subsection['courses']:
                        for studentCourse in studentCourses:
                            if set(course['course']['codes']).intersection(studentCourse['course']['codes']):
                                # Update course's term and status if there's a match
                                course['term'] = studentCourse['term']
                                course['status'] = studentCourse['status']
                                break  # Break after updating to avoid multiple updates

        cloned_programs.append(cloned_program)
    
    return cloned_programs
