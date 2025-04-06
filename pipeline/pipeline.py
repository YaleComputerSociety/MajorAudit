"""
Modified pipeline that filters courses with specific subject codes,
using robust filtering logic and cross-term consistency checks.
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

def normalize_title(title):
    """Normalize a course title by removing common variations"""
    return title.strip().lower()

def filter_course_sections(courses):
    """
    Filter a list of course objects to keep ONLY section "1" courses.
    All other sections are removed regardless of how many sections a course has.
    """
    if not courses:
        return []
    
    # First, filter out cancelled courses
    active_courses = [course for course in courses if course.get('extra_info') != "CANCELLED"]
    logger.info(f"Filtered out {len(courses) - len(active_courses)} cancelled courses")
    
    # Keep only section "1" courses
    section_1_courses = [course for course in active_courses if course.get('section') == "1"]
    
    logger.info(f"Filtered from {len(active_courses)} active courses to {len(section_1_courses)} section '1' courses")
    logger.info(f"Removed {len(active_courses) - len(section_1_courses)} non-section '1' courses")
    
    return section_1_courses

def filter_by_subjects(courses, subjects):
    """
    Filter courses to keep only those with listings containing specified subjects
    
    Args:
        courses (list): List of course objects
        subjects (list): List of subject codes to filter by
        
    Returns:
        list: Courses that have at least one listing with a target subject
    """
    # If no subjects specified, return all courses
    if not subjects:
        return courses
    
    filtered_courses = []
    
    for course in courses:
        listings = course.get('listings', [])
        
        # Check if any listing has a subject in our list
        if any(listing.get('subject', '') in subjects for listing in listings):
            filtered_courses.append(course)
    
    logger.info(f"Filtered from {len(courses)} courses to {len(filtered_courses)} courses with subjects {subjects}")
    return filtered_courses

def extract_distributions(course):
    """Combine areas and skills into a single distributions array"""
    areas = course.get('areas', []) or []
    skills = course.get('skills', []) or []
    return list(set(areas + skills))

def extract_course_codes(listings):
    """Extract course codes from listings array"""
    return [f"{listing.get('subject')} {listing.get('number')}" for listing in listings if listing.get('subject') and listing.get('number')]

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
        # Map same_course_id from API to universal_course_id in our database
        universal_course_id = course.get('same_course_id')
        
        # Extract core course data
        course_data = {
            'universal_course_id': universal_course_id,
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
        
        # Extract professor names and flag texts
        professor_names = extract_professor_names(course.get('course_professors', []))
        flag_texts = extract_flag_text(course.get('course_flags', []))
        
        # Extract offering data
        offering_data = {
            'term': term,
            'professors': professor_names,
            'flags': flag_texts,
        }
        
        db_courses.append(course_data)
        
        # Include temporary data to link everything after insertion
        for code in codes:
            db_course_codes.append({
                'code': code,
                'first_term_used': term,
                'last_term_used': term,
                'universal_course_id': universal_course_id  # For linking
            })
        
        db_course_offerings.append({
            'universal_course_id': universal_course_id,  # For linking
            **offering_data
        })
    
    return db_courses, db_course_codes, db_course_offerings

def upsert_courses(courses):
    """Insert or update courses in the database using Supabase"""
    inserted_ids = {}
    
    try:
        logger.info(f"Upserting {len(courses)} courses")
        for course in courses:
            universal_course_id = course.get('universal_course_id')
            if not universal_course_id:
                logger.warning("Skipping course with no universal_course_id")
                continue
                
            # Check if course already exists
            result = supabase.table('courses').select('id').eq('universal_course_id', universal_course_id).execute()
            existing_records = result.data
            
            if existing_records:
                # Update existing course
                course_id = existing_records[0]['id']
                result = supabase.table('courses').update(course).eq('id', course_id).execute()
                if result.data:
                    inserted_ids[universal_course_id] = course_id
            else:
                # Insert new course
                result = supabase.table('courses').insert(course).execute()
                if result.data:
                    course_id = result.data[0]['id']
                    inserted_ids[universal_course_id] = course_id
        
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
            universal_course_id = code_data.pop('universal_course_id')
            course_id = course_id_map.get(universal_course_id)
            
            if not course_id:
                logger.warning(f"No course ID found for universal_course_id {universal_course_id}")
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
            universal_course_id = offering_copy.pop('universal_course_id')
            course_id = course_id_map.get(universal_course_id)
            
            if not course_id:
                logger.warning(f"No course ID found for universal_course_id {universal_course_id}")
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
        logger.error(f"Error details: {str(e)}")
        raise

def compare_across_terms(term_data):
    """
    Compare courses across terms to find those with the same title AND same code
    but different same_course_id values.
    
    Args:
        term_data (dict): Dictionary mapping terms to filtered course lists
        
    Returns:
        tuple: (dict of filtered courses by term, list of inconsistencies found and removed)
    """
    # Combine all courses from all terms, grouped by title AND code
    courses_by_title_and_code = defaultdict(list)
    
    for term, courses in term_data.items():
        for course in courses:
            title = normalize_title(course.get('title', ''))
            if not title:
                continue
                
            # For each course code, create a separate entry
            listings = course.get('listings', [])
            for listing in listings:
                subject = listing.get('subject')
                number = listing.get('number')
                if subject and number:
                    code = f"{subject} {number}"
                    key = (title, code)  # Tuple of (title, code)
                    courses_by_title_and_code[key].append({
                        'term': term,
                        'course': course
                    })
    
    # Find courses with the same title AND code but different same_course_id across terms
    cross_term_inconsistencies = []
    filtered_term_data = {term: [] for term in term_data.keys()}
    
    for (title, code), instances in courses_by_title_and_code.items():
        # Skip entries that appear in only one term
        terms = set(instance['term'] for instance in instances)
        if len(terms) <= 1:
            # No inconsistency possible with just one term
            for instance in instances:
                filtered_term_data[instance['term']].append(instance['course'])
            continue
        
        # Create a set of same_ids for this title and code
        same_ids = set(instance['course'].get('same_course_id') for instance in instances)
        
        # If there's more than one same_id for this title and code
        if len(same_ids) > 1:
            # This is an inconsistency - record it and don't include these courses
            cross_term_inconsistencies.append({
                'title': title,
                'code': code,
                'terms': list(terms),
                'same_ids': list(same_ids),
                'courses': [instance['course'] for instance in instances]
            })
        else:
            # Consistent same_course_id across terms - keep these courses
            for instance in instances:
                filtered_term_data[instance['term']].append(instance['course'])
    
    return filtered_term_data, cross_term_inconsistencies

def process_terms(target_terms, target_subjects):
    """Process all target terms with cross-term consistency checks"""
    # First, fetch and filter courses for each term
    term_data = {}
    total_original = 0
    total_after_section_filter = 0
    
    for term in target_terms:
        # Extract
        raw_courses = fetch_courses_from_api(term)
        if not raw_courses:
            logger.warning(f"No courses found for term {term}")
            continue
        
        total_original += len(raw_courses)
        logger.info(f"Retrieved {len(raw_courses)} courses for term {term}")
        
        # Apply subject filtering if specified
        if target_subjects:
            raw_courses = filter_by_subjects(raw_courses, target_subjects)
            logger.info(f"After subject filtering: {len(raw_courses)} courses")
        
        # Filter out cancelled courses and select canonical sections
        filtered_courses = filter_course_sections(raw_courses)
        total_after_section_filter += len(filtered_courses)
        
        # Store the filtered courses for this term
        term_data[term] = filtered_courses
    
    # Check for cross-term inconsistencies ONLY if multiple terms
    cross_term_inconsistencies = []
    if len(target_terms) > 1:
        logger.info("Multiple terms detected - performing cross-term consistency check")
        filtered_term_data, cross_term_inconsistencies = compare_across_terms(term_data)
        
        # Log cross-term inconsistency statistics
        removed_course_count = sum(len(inconsistency['courses']) for inconsistency in cross_term_inconsistencies)
        logger.info(f"Found {len(cross_term_inconsistencies)} title/code combinations with inconsistent same_course_id across terms")
        logger.info(f"Removed {removed_course_count} courses due to cross-term inconsistencies")
    else:
        logger.info("Single term detected - skipping cross-term consistency check")
        filtered_term_data = term_data
    
    # Process each term's filtered data
    for term, courses in filtered_term_data.items():
        # Transform
        db_courses, db_course_codes, db_offerings = transform_courses(courses, term)
        
        # Log code distribution
        code_prefixes = {}
        for code_data in db_course_codes:
            code = code_data['code']
            prefix = code.split()[0]  # Get the subject part
            code_prefixes[prefix] = code_prefixes.get(prefix, 0) + 1
        
        logger.info(f"Term {term} - Code distribution: {code_prefixes}")
        
        # Load
        try:
            # Insert/update in the correct order to maintain referential integrity
            course_id_map = upsert_courses(db_courses)
            upsert_course_codes(db_course_codes, course_id_map)
            upsert_course_offerings(db_offerings, course_id_map)
            logger.info(f"Successfully processed {len(courses)} courses for term {term}")
        except Exception as e:
            logger.error(f"Error processing term {term}: {e}")
    
    # Print overall summary
    logger.info(f"=== OVERALL SUMMARY ===")
    logger.info(f"Total original courses: {total_original}")
    if target_subjects:
        logger.info(f"Subject filter applied: {target_subjects}")
    logger.info(f"Total courses after section filtering: {total_after_section_filter}")
    
    total_after_consistency = sum(len(courses) for courses in filtered_term_data.values())
    logger.info(f"Total courses after cross-term consistency checks: {total_after_consistency}")
    
    if len(target_terms) > 1:
        removed_course_count = sum(len(inconsistency['courses']) for inconsistency in cross_term_inconsistencies)
        logger.info(f"Courses removed by cross-term checks: {removed_course_count}")
    
    return filtered_term_data, cross_term_inconsistencies

def main(target_terms=None, target_subjects=None):
    """
    Main function to process course data with filtering
    
    Args:
        target_terms (list): List of terms to process (e.g. ["202403", "202501"])
        target_subjects (list): List of subjects to include (e.g. ["CPSC", "ECON", "MATH"])
    """
    # Validate inputs and set defaults if needed
    if not target_terms:
        target_terms = ["202501"]
    
    if target_subjects is None:
        target_subjects = []
    
    logger.info(f"Starting processing for terms {target_terms}")
    if target_subjects:
        logger.info(f"Subject filters: {target_subjects}")
    
    filtered_term_data, cross_term_inconsistencies = process_terms(
        target_terms, target_subjects
    )
    
    # Save inconsistencies to file for analysis if needed
    if cross_term_inconsistencies:
        output_filename = "cross_term_inconsistencies.json"
        with open(output_filename, 'w') as f:
            json.dump({
                'inconsistencies': cross_term_inconsistencies,
                'count': len(cross_term_inconsistencies)
            }, f, indent=2)
        logger.info(f"Cross-term inconsistencies written to {output_filename}")
    
    logger.info(f"Completed processing")
    
if __name__ == "__main__":
    # Example usage:
    # To process all courses from all subjects:
    # main(target_terms=["202501"])
    
    # To process only CPSC courses:
    # main(target_terms=["202501"], target_subjects=["CPSC"])
    
    # To process only ECON and MATH courses:
    # main(target_terms=["202403", "202501"], target_subjects=["ECON", "MATH"])
    
    # Current execution:
    main(target_terms=["202403", "202501"], target_subjects=["CPSC"])