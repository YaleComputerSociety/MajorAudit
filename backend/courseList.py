import user
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import copy
import json

# Use a service account.
# with open(r'C:\YCS\MajorAudit/cwd.txt', 'w') as outfile:
#     outfile.write(os.getcwd())


cred = credentials.Certificate(r'secrets/majoraudit-firebase-adminsdk-bc6kc-f15a5f23e2.json')
app = firebase_admin.initialize_app(cred)

db = firestore.client()


class Course:

    def  __init__(self, code='', skills=None):
        self.code=code
        self.skills=set()
        if skills:
            self.skills=self.skills.union(skills)

    def __eq__(self, other):
        if type(other) is str:
            if self.code:
                return self.code==other
            else:
                return other in self.skills

        elif type(other) is Course:
            if self.code and other.code:
                return self.code == other.code
            else:
                return len(self.skills.intersection(other.skills))>0
        else:
            return False

    def __str__(self):
        ret_str=self.code
        if len(self.skills)>0:
            ret_str+='('
            for skill in sorted(self.skills):
                ret_str+=skill+', '
            ret_str=ret_str[:-2]+')'

        return ret_str

    def __hash__(self):
        return hash(str(self))

    def to_dict(self):
        ret_dic={'type':'Course','code':self.code, 'skills':list(self.skills)}
        return ret_dic

    @staticmethod
    def from_dict(source):
        return Course(code=source['code'], skills=source['skills'])

class CourseList:
    def __init__(self, num_needed=float('inf'), courses=None):
        self.num_needed=num_needed
        if courses:
            self.courses=courses
        else:
            self.courses=set()

    def add_course(self, course):
        self.courses.add(course)

    def to_dict(self):
        ret_dic= {'type':'CourseList', 'num_needed': self.num_needed, 'courses': []}

        for c in self.courses:
            if type(c) is str:
                ret_dic['courses'].append(c)
            else:
                ret_dic['courses'].append(c.to_dict())

        return ret_dic

    @staticmethod
    def from_dict(source):
        ret_list = CourseList(num_needed=source['num_needed'])
        for c in source['courses']:
            if type(c) is str:
                ret_list.add_course(c)
            elif c['type']=='Course':
                ret_list.add_course(Course.from_dict(c))
            else:
                ret_list.add_course(CourseList.from_dict(c))

        return ret_list

    def __str__(self):
        ret_list=sorted([str(c) for c in self.courses])
        req_str=str(self.num_needed) if self.num_needed<len(self.get_courses()) else 'all'
        ret_str=f'{req_str} of: ['
        for c in ret_list:
            ret_str+=f'{c}, '

        return ret_str[:-2]+']'

    def get_courses(self):
        return self.courses

    def get_required(self):
        return min(self.num_needed, len(self.courses))

    def remove_course(self, course):
        removed=course in self.courses
        self.courses.discard(course)
        return removed


def requirements_completed(courses: CourseList, courses_taken):
    num_completed=0

    for c in courses.get_courses():
        if type(c) is str or type(c) is Course:
            if c in courses_taken:
                num_completed+=1

        elif requirements_completed(c, courses_taken):
            num_completed+=1
    # print(num_completed)
    return num_completed>=courses.get_required()


def get_remaining_requirements(courses:CourseList, courses_taken):
    remaining_courses=set()
    completed=len(courses.courses)
    # if not requirements_completed(courses, courses_taken):
    for c in courses.get_courses():
        if (type(c) is str or type(c) is Course) and c not in courses_taken:
            remaining_courses.add(c)
            completed-=1
        elif type(c) is CourseList and not requirements_completed(c, courses_taken):
            remaining_courses.add(get_remaining_requirements(c, courses_taken))
            completed-=1

    if completed>=courses.get_required():
        return None

    new_list=CourseList(courses.get_required()-completed, remaining_courses)
    # print(new_list.get_required(), new_list)

    return new_list





if __name__=='__main__':
    courses=CourseList(num_needed=2)

    course_group = CourseList()
    c=Course('CPSC 423', skills=['QR', 'HU'])
    # print(c)

    course_group.add_course(c)
    course_group.add_course(Course('CPSC 323'))
    courses.add_course(course_group)

    course_group=CourseList()
    course_group.add_course(Course('CPSC 470'))
    course_group.add_course(Course('CPSC 472'))
    courses.add_course(course_group)

    courses.add_course(Course('ASL 130'))

    course_dic=courses.to_dict()
    courses=CourseList.from_dict(course_dic)

    print(courses)
    courses_taken=user.get_user_courses('oag22', db)



    # print(courses_taken)
    print(get_remaining_requirements(courses, courses_taken))
    print(requirements_completed(courses, courses_taken))

