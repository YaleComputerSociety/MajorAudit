import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
# with open(r'C:\YCS\MajorAudit/cwd.txt', 'w') as outfile:
#     outfile.write(os.getcwd())


cred = credentials.Certificate(r'secrets/majoraudit-firebase-adminsdk-bc6kc-f15a5f23e2.json')
app = firebase_admin.initialize_app(cred)

db = firestore.client()


class CourseList:
    def __init__(self, num_needed=float('inf')):
        self.num_needed=num_needed
        self.courses=[]

    def add_course(self, course):
        self.courses.append(course)

    def to_dict(self):
        ret_dic= {'num_needed': self.num_needed, 'courses': []}

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
            else:
                ret_list.add_course(CourseList.from_dict(c))

        return ret_list

    def __str__(self):
        ret_list=[str(c) for c in self.courses]
        req_str=str(self.num_needed) if self.num_needed<float('inf') else 'all'
        ret_str=f'{req_str} of: ['
        for c in ret_list:
            ret_str+=f'{c}, '

        return ret_str[:-2]+']'

    def get_courses(self):
        return self.courses

    def get_required(self):
        return min(self.num_needed, len(self.courses))


def requirements_completed(courses: CourseList, courses_taken):
    num_completed=0
    # courses_taken=set()
    # courses_from_db=db.get()._data['courses']
    # # print(courses_from_db._data)
    # # return
    # print(courses_from_db)
    # for semester in courses_from_db:
    #     courses_taken=courses_taken.union(semester)
    #
    # print(courses_taken)

    for c in courses.get_courses():
        if type(c) is str:
            if c in courses_taken:
                num_completed+=1

        elif requirements_completed(c, courses_taken):
            num_completed+=1
    # print(num_completed)
    return num_completed>=courses.get_required()




if __name__=='__main__':
    courses=CourseList(1)

    course_group = CourseList()
    course_group.add_course('CPSC 223')
    course_group.add_course('CPSC 323')
    courses.add_course(course_group)

    course_group=CourseList()
    course_group.add_course('CPSC 470')
    course_group.add_course('CPSC 472')
    courses.add_course(course_group)

    course_dic=courses.to_dict()
    courses=CourseList.from_dict(course_dic)

    print(courses)

    me = db.collection('Users').document('oag22')
    courses_taken = set()
    courses_from_db = me.get()._data['courses']
    for semester in courses_from_db:
        courses_taken = courses_taken.union(courses_from_db[semester])

    print(requirements_completed(courses, courses_taken))




