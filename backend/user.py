import json


def get_user_courses(netid, db):
    user = db.collection('Users').document(netid)
    courses_taken = set()
    courses_from_db = user.get()._data['courses']
    # print(courses_from_db)
    for semester in courses_from_db:
        semester = json.loads(semester)
        # courses_taken = courses_taken.union(courses_from_db[semester])
        courses_taken = courses_taken.union(semester)

    return courses_taken