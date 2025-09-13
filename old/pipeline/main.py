"""
Main entry point for the course data pipeline.
"""
import time
from config import logger
from api import fetch_courses_from_api, filter_course_sections
from transform import transform_courses
from db_upserts import upsert_courses, upsert_course_codes, upsert_course_offerings

def process_terms(target_terms):
    start_time = time.time()
    logger.info(f"Starting processing for {len(target_terms)} terms")
    
    # Process each term
    for term in target_terms:
        term_start = time.time()
        logger.info(f"Processing term {term}")
        
        # Extract
        raw_courses = fetch_courses_from_api(term)
        if not raw_courses:
            logger.warning(f"No courses found for term {term}")
            continue
        
        logger.info(f"Fetched {len(raw_courses)} courses for term {term}")
        
        # Filter out cancelled courses, select canonical sections, and deduplicate by same_course_id
        filtered_courses = filter_course_sections(raw_courses)
        logger.info(f"After filtering: {len(filtered_courses)} courses")
        
        # Transform
        transform_start = time.time()
        db_courses, db_course_codes, db_offerings = transform_courses(filtered_courses, term)
        
        transform_end = time.time()
        logger.info(f"Transformation completed in {transform_end - transform_start:.2f} seconds")
        logger.info(f"Prepared {len(db_courses)} courses, {len(db_course_codes)} codes, and {len(db_offerings)} offerings")
        
        # Load
        load_start = time.time()
        try:
            # Insert/update in the correct order to maintain referential integrity
            logger.info("Upserting courses")
            course_id_map = upsert_courses(db_courses)
            
            logger.info("Upserting course codes")
            upsert_course_codes(db_course_codes, course_id_map)
            
            logger.info("Upserting course offerings")
            upsert_course_offerings(db_offerings, course_id_map)
            
            load_end = time.time()
            logger.info(f"Data loading completed in {load_end - load_start:.2f} seconds")
        except Exception as e:
            logger.error(f"Error during data loading for term {term}: {str(e)}")
        
        term_end = time.time()
        logger.info(f"Term {term} processing completed in {term_end - term_start:.2f} seconds")
    
    end_time = time.time()
    logger.info(f"Total processing completed in {end_time - start_time:.2f} seconds")

def main():
    # target_terms = ["202503", "202501", "202403", "202401", "202303", "202301", "202203"]
    target_terms = ["202601"]
    process_terms(target_terms)
    
if __name__ == "__main__":
    main()