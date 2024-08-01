
from clone import CPSC_Program

all_programs = [CPSC_Program]

def clone_programs(studentCourses):
  student_course_codes = {code for studentCourse in studentCourses for code in studentCourse.course.codes}
  cloned_programs = []

  for program in all_programs:
    cloned_program = program.copy()  # Make a shallow copy of the program
    for degree in cloned_program['degrees']:
      if not degree["codes"].intersection(student_course_codes):
        continue

      for requirement in degree['requirements']:
        for subsection in requirement['subsections']:
          for i, course_code in enumerate(subsection['courses']):
            for student_course in studentCourses:
              if course_code in student_course.course.codes:
                subsection['courses'][i] = student_course  # Replace course with studentCourse

    cloned_programs.append(cloned_program)
  
  return cloned_programs

