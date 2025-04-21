"""
Data extraction and transformation functions.
"""
import json
from config import logger

def extract_distributions(course):
    """Combine areas and skills into a single distributions array."""
    return list(set((course.get('areas') or []) + (course.get('skills') or [])))

def extract_course_codes(listings):
    """Extract course codes from listings array."""
    return [
        f"{listing['subject']} {listing['number']}"
        for listing in listings
        if listing.get('subject') and listing.get('number')
    ]

def try_json_parse(data):
    """Attempt to parse a JSON string into a dictionary, return as-is if already a dict."""
    if isinstance(data, dict):
        return data
    if isinstance(data, str):
        try:
            parsed = json.loads(data)
            if isinstance(parsed, dict):
                return parsed
        except json.JSONDecodeError:
            return None
    return None

def extract_professor_names(professors_data):
    """Extract professor names from possibly stringified JSON or dicts."""
    if not professors_data:
        return []
    return list(filter(None, [
        (parsed := try_json_parse(prof)) and
        (parsed.get("professor", {}).get("name") or parsed.get("name"))
        for prof in professors_data
    ]))

def extract_flag_text(flags_data):
    """Extract flag_texts from possibly stringified JSON or dicts."""
    if not flags_data:
        return []
    return list(filter(None, [
        (parsed := try_json_parse(flag)) and
        (parsed.get("flag", {}).get("flag_text") or parsed.get("flag_text"))
        for flag in flags_data
    ]))

def transform_courses(courses, term):
    """Transform API data into our database structure."""
    logger.info(f"Transforming {len(courses)} courses for term {term}")

    db_courses = []
    db_course_codes = []
    db_course_offerings = []

    for course in courses:
        universal_course_id = course.get('same_course_id')
        if not universal_course_id:
            logger.warning(f"Course missing same_course_id: {course.get('title', 'Unknown Title')}")
            continue

        uid_str = str(universal_course_id)

        course_data = {
            'universal_course_id': uid_str,
            'title': course.get('title'),
            'description': course.get('description'),
            'requirements': course.get('requirements'),
            'credits': course.get('credits'),
            'is_colsem': course.get('colsem', False),
            'is_fysem': course.get('fysem', False),
            'distributions': extract_distributions(course)
        }
        db_courses.append(course_data)

        codes = extract_course_codes(course.get('listings', []))
        for code in codes:
            db_course_codes.append({
                'code': code,
                'first_term_used': term,
                'last_term_used': term,
                'universal_course_id': uid_str
            })

        db_course_offerings.append({
            'universal_course_id': uid_str,
            'term': term,
            'professors': extract_professor_names(course.get('course_professors', [])),
            'flags': extract_flag_text(course.get('course_flags', [])),
        })

    logger.info(f"Transformed into {len(db_courses)} courses, {len(db_course_codes)} course codes, and {len(db_course_offerings)} offerings")
    return db_courses, db_course_codes, db_course_offerings
