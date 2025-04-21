"""
API communication and data fetching functions.
"""
import requests
from config import API_BASE_URL, logger

def fetch_courses_from_api(term):
    """Fetch course data for a specific term from the API"""
    url = f"{API_BASE_URL}/{term}"

    try:
        logger.info(f"Fetching courses from API for term {term}")
        response = requests.get(url)
        response.raise_for_status()
        courses = response.json()
        logger.info(f"Successfully fetched {len(courses)} courses for term {term}")
        return courses
    except Exception as e:
        logger.error(f"Error fetching courses for term {term}: {str(e)}")
        return []

def filter_course_sections(courses):
    """
    Filter courses to:
    1. Remove cancelled courses
    2. Keep only section "1" courses
    3. Remove duplicates with the same same_course_id (keeping only one)
    """
    if not courses:
        return []

    # Filter out cancelled courses
    active_courses = [course for course in courses if course.get('extra_info') != "CANCELLED"]
    logger.info(f"Filtered out {len(courses) - len(active_courses)} cancelled courses")

    # Keep only section "1" courses
    section_1_courses = [course for course in active_courses if course.get('section', '').strip() == "1"]
    logger.info(f"Filtered out {len(active_courses) - len(section_1_courses)} non-section-1 courses")

    # Filter out duplicates with the same same_course_id
    unique_courses = {}
    for course in section_1_courses:
        same_course_id = course.get('same_course_id')
        if same_course_id:
            unique_courses.setdefault(same_course_id, course)
        else:
            logger.warning(f"Course missing same_course_id: {course.get('title', 'Unknown Title')}")

    logger.info(f"Filtered out {len(section_1_courses) - len(unique_courses)} duplicate same_course_id courses")
    return list(unique_courses.values())
