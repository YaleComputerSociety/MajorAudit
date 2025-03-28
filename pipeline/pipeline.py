"""
Modified pipeline that filters courses with specific subject codes.
"""
import requests
import json
import logging
from collections import defaultdict
from supabase import create_client

# Configuration
SUPABASE_URL = ""
SUPABASE_KEY = ""
API_BASE_URL = "https://api.coursetable.com/api/catalog/public"

# Target term
TARGET_TERM = "202501"

# Filter for specific subject codes
TARGET_SUBJECTS = ["CPSC", "ECON", "MATH"]

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def fetch_courses_from_api(term, limit=None):
    """Fetch course data for a specific term from the API with optional limit"""
    url = f"{API_BASE_URL}/{term}"
    logger.info(f"Fetching data for term {term} from {url}")
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        courses = response.json()
        
        # Limit the number of courses if specified
        if limit and limit > 0 and len(courses) > limit:
            logger.info(f"Limiting courses to {limit} out of {len(courses)} available")
            return courses[:limit]
        return courses
    except Exception as e:
        logger.error(f"API error for term {term}: {e}")
        return []

def filter_course_sections(courses):
    """
    Filter a list of course objects to:
    1. Keep only one section per unique course
    2. Remove any courses marked as CANCELLED
    """
    if not courses:
        return []
    
    # First, filter out cancelled courses
    non_cancelled_courses = []
    for course in courses:
        # Check if the course has been cancelled
        extra_info = course.get('extra_info', '')
        if isinstance(extra_info, str) and 'CANCELLED' in extra_info.upper():
            continue
        non_cancelled_courses.append(course)
    
    # Group non-cancelled courses by same_course_id
    courses_by_same_id = defaultdict(list)
    for course in non_cancelled_courses:
        same_course_id = course.get('same_course_id')
        courses_by_same_id[same_course_id].append(course)
    
    # Define section priority order (for selecting the canonical section)
    # Numbers first, then letters
    section_priority = {
        "1": 1, "2": 2, "3": 3, "4": 4, "5": 5,
        "0": 10,  # Lower priority for section "0"
        "A": 100, "B": 101, "C": 102, "D": 103, "E": 104,
        "F": 105, "G": 106, "H": 107, "I": 108, "J": 109
    }
    
    # Set a high default priority for any section not explicitly listed
    default_priority = 1000
    
    # Keep only the canonical section for each course
    filtered_courses = []
    
    for same_id, course_list in courses_by_same_id.items():
        if len(course_list) == 1:
            # Only one section, keep it
            filtered_courses.append(course_list[0])
            continue
        
        # Multiple sections, select the canonical one
        # 1. Try to find section "1" first
        section_1_course = None
        for course in course_list:
            if course.get('section') == "1":
                section_1_course = course
                break
        
        if section_1_course:
            filtered_courses.append(section_1_course)
            continue
            
        # 2. If no section "1", use our priority order
        sorted_courses = sorted(
            course_list,
            key=lambda c: section_priority.get(c.get('section', ''), default_priority)
        )
        
        # Take the highest priority section
        chosen_course = sorted_courses[0]
        filtered_courses.append(chosen_course)
    
    return filtered_courses

def extract_distributions(course):
    """Combine areas and skills into a single distributions array"""
    areas = course.get('areas', []) or []
    skills = course.get('skills', []) or []
    return list(set(areas + skills))

def extract_course_codes(listings):
    """Extract course codes from listings array"""
    return [f"{listing.get('subject')} {listing.get('number')}" for listing in listings if listing.get('subject') and listing.get('number')]

def filter_target_subjects(courses):
    """
    Filter courses to keep only those with listings containing target subjects
    
    Args:
        courses (list): List of course objects
        
    Returns:
        list: Courses that have at least one listing with a target subject
    """
    filtered_courses = []
    
    for course in courses:
        listings = course.get('listings', [])
        
        # Check if any listing has a subject in our target list
        has_target_subject = False
        for listing in listings:
            subject = listing.get('subject', '')
            if subject in TARGET_SUBJECTS:
                has_target_subject = True
                break
        
        if has_target_subject:
            filtered_courses.append(course)
    
    logger.info(f"Filtered from {len(courses)} courses to {len(filtered_courses)} courses with target subjects {TARGET_SUBJECTS}")
    return filtered_courses

def extract_professor_names(professors_data):
    """Extract just the professor names from the complex professor data structure."""
    professor_names = []
    
    if not professors_data:
        return professor_names
        
    for prof_item in professors_data:
        # Handle case where the data might already be a string containing JSON
        if isinstance(prof_item, str):
            try:
                prof_data = json.loads(prof_item)
                if isinstance(prof_data, dict) and "professor" in prof_data:
                    name = prof_data["professor"].get("name")
                    if name:
                        professor_names.append(name)
            except (json.JSONDecodeError, AttributeError, TypeError):
                # If it's not valid JSON or doesn't have the expected structure,
                # add it as is (might be just a name already)
                if prof_item:
                    professor_names.append(prof_item)
        
        # Handle case where it might already be parsed as a dictionary
        elif isinstance(prof_item, dict):
            if "professor" in prof_item:
                name = prof_item["professor"].get("name")
                if name:
                    professor_names.append(name)
            elif "name" in prof_item:
                # In case the structure is flatter than expected
                name = prof_item.get("name")
                if name:
                    professor_names.append(name)
    
    return professor_names

def extract_flag_text(flags_data):
    """Extract just the flag text from the complex flag data structure."""
    flag_texts = []
    
    if not flags_data:
        return flag_texts
        
    for flag_item in flags_data:
        # Handle case where the data might already be a string containing JSON
        if isinstance(flag_item, str):
            try:
                flag_data = json.loads(flag_item)
                if isinstance(flag_data, dict) and "flag" in flag_data:
                    text = flag_data["flag"].get("flag_text")
                    if text:
                        flag_texts.append(text)
            except (json.JSONDecodeError, AttributeError, TypeError):
                # If it's not valid JSON or doesn't have the expected structure,
                # add it as is (might be just a text already)
                if flag_item:
                    flag_texts.append(flag_item)
        
        # Handle case where it might already be parsed as a dictionary
        elif isinstance(flag_item, dict):
            if "flag" in flag_item:
                text = flag_item["flag"].get("flag_text")
                if text:
                    flag_texts.append(text)
            elif "flag_text" in flag_item:
                # In case the structure is flatter than expected
                text = flag_item.get("flag_text")
                if text:
                    flag_texts.append(text)
    
    return flag_texts

def transform_courses(courses, term):
    """Transform API data into our database structure"""
    db_courses = []
    db_course_codes = []
    db_course_offerings = []
    
    for course in courses:
        # Extract core course data
        course_data = {
            'same_course_id': course.get('same_course_id'),
            'title': course.get('title'),
            'description': course.get('description'),
            'requirements': course.get('requirements'),
            'credits': course.get('credits'),
            'is_colsem': course.get('colsem', False),
            'is_fysem': course.get('fysem', False),
            'distributions': extract_distributions(course)
        }
        
        # Extract course codes
        codes = extract_course_codes(course.get('listings', []))
        
        # Extract professor names from the complex structure
        raw_professors = course.get('course_professors', [])
        professor_names = extract_professor_names(raw_professors)
        
        # Extract flag text from the complex structure
        raw_flags = course.get('course_flags', [])
        flag_texts = extract_flag_text(raw_flags)
        
        # Extract offering data with simplified professor names and flags
        offering_data = {
            'term': term,
            'professors': professor_names,  # Now just a list of names
            'flags': flag_texts,            # Now just a list of flag texts
        }
        
        db_courses.append(course_data)
        
        # Include temporary data to link everything after insertion
        for code in codes:
            db_course_codes.append({
                'code': code,
                'first_term_used': term,
                'last_term_used': term,
                'same_course_id': course.get('same_course_id')  # For linking
            })
        
        db_course_offerings.append({
            'same_course_id': course.get('same_course_id'),  # For linking
            **offering_data
        })
    
    return db_courses, db_course_codes, db_course_offerings

def upsert_courses(courses):
    """Insert or update courses in the database using Supabase"""
    inserted_ids = {}
    
    try:
        logger.info(f"Upserting {len(courses)} courses")
        for course in courses:
            same_course_id = course.get('same_course_id')
            if not same_course_id:
                logger.warning("Skipping course with no same_course_id")
                continue
                
            # Check if course already exists
            result = supabase.table('courses').select('id').eq('same_course_id', same_course_id).execute()
            existing_records = result.data
            
            if existing_records:
                # Update existing course
                course_id = existing_records[0]['id']
                result = supabase.table('courses').update(course).eq('id', course_id).execute()
                if result.data:
                    inserted_ids[same_course_id] = course_id
            else:
                # Insert new course
                result = supabase.table('courses').insert(course).execute()
                if result.data:
                    course_id = result.data[0]['id']
                    inserted_ids[same_course_id] = course_id
        
        logger.info(f"Successfully upserted {len(inserted_ids)} courses")
        return inserted_ids
    except Exception as e:
        logger.error(f"Error upserting courses: {e}")
        raise

def upsert_course_codes(course_codes, course_id_map):
    """Insert or update course codes using Supabase"""
    try:
        logger.info(f"Upserting {len(course_codes)} course codes")
        for code_data in course_codes:
            same_course_id = code_data.pop('same_course_id')
            course_id = course_id_map.get(same_course_id)
            
            if not course_id:
                logger.warning(f"No course ID found for same_course_id {same_course_id}")
                continue
            
            code_data['course_id'] = course_id
            
            # Check if code exists for this course
            result = supabase.table('course_codes').select('id, first_term_used, last_term_used') \
                .eq('course_id', course_id) \
                .eq('code', code_data['code']) \
                .execute()
            existing_records = result.data
            
            if existing_records:
                # Update existing code's term range if needed
                code_id = existing_records[0]['id']
                first_term = existing_records[0]['first_term_used']
                last_term = existing_records[0]['last_term_used']
                
                updates = {}
                if code_data['first_term_used'] < first_term:
                    updates['first_term_used'] = code_data['first_term_used']
                if code_data['last_term_used'] > last_term:
                    updates['last_term_used'] = code_data['last_term_used']
                
                if updates:
                    supabase.table('course_codes').update(updates).eq('id', code_id).execute()
            else:
                # Insert new code
                supabase.table('course_codes').insert(code_data).execute()
                
    except Exception as e:
        logger.error(f"Error upserting course codes: {e}")
        raise

def upsert_course_offerings(offerings, course_id_map):
    """Insert or update course offerings using Supabase"""
    try:
        logger.info(f"Upserting {len(offerings)} course offerings")
        for offering in offerings:
            offering_copy = offering.copy()  # Make a copy to avoid modifying the original
            same_course_id = offering_copy.pop('same_course_id')
            course_id = course_id_map.get(same_course_id)
            
            if not course_id:
                logger.warning(f"No course ID found for same_course_id {same_course_id}")
                continue
            
            offering_copy['course_id'] = course_id
            
            # Check if offering exists for this course and term
            result = supabase.table('course_offerings').select('id') \
                .eq('course_id', course_id) \
                .eq('term', offering_copy['term']) \
                .execute()
            existing_records = result.data
            
            if existing_records:
                # Update existing offering
                offering_id = existing_records[0]['id']
                supabase.table('course_offerings').update(offering_copy).eq('id', offering_id).execute()
            else:
                # Insert new offering
                supabase.table('course_offerings').insert(offering_copy).execute()

        logger.info(f"Successfully upserted course offerings")
    except Exception as e:
        logger.error(f"Error upserting course offerings: {e}")
        # Print more details about the error
        logger.error(f"Error details: {str(e)}")
        raise

def process_target_term():
    """Process the target term with subject filtering"""
    # Extract
    raw_courses = fetch_courses_from_api(TARGET_TERM)
    if not raw_courses:
        logger.warning(f"No courses found for term {TARGET_TERM}")
        return
    
    logger.info(f"Retrieved {len(raw_courses)} courses for term {TARGET_TERM}")
    
    # Filter for target subjects first
    subject_filtered_courses = filter_target_subjects(raw_courses)
    
    # Filter sections
    filtered_courses = filter_course_sections(subject_filtered_courses)
    
    # Transform
    courses, course_codes, offerings = transform_courses(filtered_courses, TARGET_TERM)
    
    # Log code distribution
    code_prefixes = {}
    for code_data in course_codes:
        code = code_data['code']
        prefix = code.split()[0]  # Get the subject part
        code_prefixes[prefix] = code_prefixes.get(prefix, 0) + 1
    
    logger.info(f"Code distribution: {code_prefixes}")
    
    # Load
    try:
        # Insert/update in the correct order to maintain referential integrity
        course_id_map = upsert_courses(courses)
        upsert_course_codes(course_codes, course_id_map)
        upsert_course_offerings(offerings, course_id_map)
        logger.info(f"Successfully processed {len(filtered_courses)} courses for term {TARGET_TERM}")
    except Exception as e:
        logger.error(f"Error processing term {TARGET_TERM}: {e}")

def main():
    """Main function to process course data with filtering"""
    logger.info(f"Starting processing for term {TARGET_TERM} with subject filters: {TARGET_SUBJECTS}")
    process_target_term()
    logger.info(f"Completed processing")

if __name__ == "__main__":
    main()