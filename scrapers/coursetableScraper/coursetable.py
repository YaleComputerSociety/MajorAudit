
import requests
import json
import os
from supabase import create_client


def fetch_process_and_upload(terms: list[int]):

    supabase_url = ""
    supabase_key = ""
    
    supabase = create_client(supabase_url, supabase_key)
    
    for term in terms:
        term_str = str(term)
        url = f"https://api.coursetable.com/api/catalog/public/{term_str}"
        print(f"Fetching course data for term {term_str} from {url}...")
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            courses_data = response.json()
        except requests.exceptions.RequestException as e:
            print(f"✗ Failed to fetch data for term {term_str}: {e}")
            continue
        
        print(f"Processing course data for term {term_str}...")
        processed_courses = [transform_course(course) for course in courses_data[:25]]
        
        # Save locally (backup)
        file_name = f"results_{term_str}.json"
        with open(file_name, "w", encoding="utf-8") as file:
            json.dump(processed_courses, file, indent=2)
        print(f"✓ Saved {len(processed_courses)} courses to {file_name}")
        
        # Upload to Supabase
        batch_size = 50
        total_batches = (len(processed_courses) + batch_size - 1) // batch_size
        
        print(f"Uploading {len(processed_courses)} courses for term {term_str} in {total_batches} batches...")
        
        for i in range(0, len(processed_courses), batch_size):
            batch = processed_courses[i:i+batch_size]
            batch_num = i // batch_size + 1
            
            print(f"Uploading batch {batch_num}/{total_batches} for term {term_str}...")
            
            try:
                result = supabase.table("courses").upsert(batch).execute()
                print(f"✓ Batch {batch_num} for term {term_str} uploaded successfully")
            except Exception as e:
                print(f"✗ Error with batch {batch_num} for term {term_str}: {e}")
    
    print("✅ All terms processed successfully!")


def transform_course(course):
    # Extract course flags
    course_flags = []
    if "course_flags" in course and course["course_flags"]:
        course_flags = [flag["flag"]["flag_text"] for flag in course["course_flags"]]
    
    # Extract professors
    professors = []
    if "course_professors" in course and course["course_professors"]:
        professors = [prof["professor"]["name"] for prof in course["course_professors"]]
    
    # Extract course codes
    course_codes = []
    if "listings" in course and course["listings"]:
        course_codes = [listing["course_code"] for listing in course["listings"]]
    
    # Combine areas and skills into distributions
    distributions = []
    if "areas" in course and course["areas"]:
        distributions.extend(course["areas"])
    if "skills" in course and course["skills"]:
        distributions.extend(course["skills"])
    
    # Handle credits - ensure we're preserving the decimal value if present
    credits = course.get("credits")
    # If credits is a string, convert it to a float (preserving decimal places)
    if isinstance(credits, str):
        try:
            credits = float(credits)
        except (ValueError, TypeError):
            credits = None
    
    # Create transformed course object
    return {
        "course_id": course.get("course_id"),
        "title": course.get("title"),
        "description": course.get("description"),
        "professors": professors,
        "codes": course_codes,
        "flags": course_flags,
        "distributions": distributions,
        "credits": credits,  # This will now preserve decimal values
        "requirements": course.get("requirements"),
        "term": course.get("season_code"),
        "colsem": course.get("colsem", False),
        "fysem": course.get("fysem", False),
        "sysem": course.get("sysem", False)
    }

if __name__ == "__main__":
    try:
        print("Course Data to Supabase Uploader")
        print("--------------------------------")
        terms = [202403, 202501]
        fetch_process_and_upload(terms)
    except KeyboardInterrupt:
        print("\nProcess cancelled by user")
    except Exception as e:
        print(f"An error occurred: {e}")
        