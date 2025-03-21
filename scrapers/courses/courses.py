import requests
import json
from dotenv import load_dotenv
import os
from supabase import create_client


def fetch_process_and_upload(terms: list[int]):
    load_dotenv()
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    
    supabase = create_client(supabase_url, supabase_key)
    
    # Track which courses appear in which seasons
    course_seasons = {}
    
    # Track courses by title to catch courses with different IDs but same content
    courses_by_title = {}
    
    # First, process all course data and track seasonal offerings
    
    # First, process all course data and track seasonal offerings
    all_processed_courses = {}
    
    for term in terms:
        term_str = str(term)
        season = "Fall" if str(term).endswith("03") else "Spring"
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
        
        for course in courses_data:
            # Filter for CPSC courses below 400
            is_cpsc_course = False
            course_number = None
            
            if "listings" in course and course["listings"]:
                for listing in course["listings"]:
                    code = listing.get("course_code", "")
                    if code.startswith("CPSC "):
                        try:
                            course_number = int(code.split(" ")[1].split(".")[0])
                            if course_number < 400:
                                is_cpsc_course = True
                                break
                        except (ValueError, IndexError):
                            continue
            
            if not is_cpsc_course:
                continue
            
            # Check if section is a letter (not a number)
            section_str = str(course.get("section", ""))
            has_letter_section = not section_str.isdigit() and section_str != ""
            
            # Skip courses where section is a letter (not a number)
            if has_letter_section:
                continue
                
            processed_course = transform_course(course)
            course_id = course.get("course_id")
            course_title = course.get("title", "").strip()
            
            # Track which seasons this course is offered in
            if course_id not in course_seasons:
                course_seasons[course_id] = set()
            course_seasons[course_id].add(season)
            
            # Also track by title for cross-referencing
            if course_title:
                if course_title not in courses_by_title:
                    courses_by_title[course_title] = {"ids": set(), "seasons": set()}
                courses_by_title[course_title]["ids"].add(course_id)
                courses_by_title[course_title]["seasons"].add(season)
            
            # Store the most recent version of each course
            all_processed_courses[course_id] = processed_course
    
    # Merge seasons information
    
    # Merge seasons information across course IDs with the same title
    for title, data in courses_by_title.items():
        all_seasons = data["seasons"]
        # Update all courses with this title to have the complete set of seasons
        for course_id in data["ids"]:
            course_seasons[course_id].update(all_seasons)
    
    # Now add the seasons information and prepare final list
    final_courses = []
    for course_id, course in all_processed_courses.items():
        course["seasons"] = sorted(list(course_seasons[course_id]))
        final_courses.append(course)
    
    print(f"\nFound {len(final_courses)} CPSC courses below 400 level")
    print(f"Courses with both Fall and Spring: {sum(1 for c in final_courses if 'Fall' in c['seasons'] and 'Spring' in c['seasons'])}")
    
    # Save locally (backup)
    file_name = "results_cpsc_courses.json"
    with open(file_name, "w", encoding="utf-8") as file:
        json.dump(final_courses, file, indent=2)
    print(f"✓ Saved {len(final_courses)} courses to {file_name}")
    
    # Upload to Supabase
    batch_size = 50
    total_batches = (len(final_courses) + batch_size - 1) // batch_size
    
    print(f"Uploading {len(final_courses)} courses in {total_batches} batches...")
    
    for i in range(0, len(final_courses), batch_size):
        batch = final_courses[i:i+batch_size]
        batch_num = i // batch_size + 1
        
        print(f"Uploading batch {batch_num}/{total_batches}...")
        
        try:
            result = supabase.table("courses").upsert(batch).execute()
            print(f"✓ Batch {batch_num} uploaded successfully")
        except Exception as e:
            print(f"✗ Error with batch {batch_num}: {e}")
    
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
        "id": course.get("course_id"),
        "title": course.get("title"),
        "description": course.get("description"),
        "professors": professors,
        "codes": course_codes,
        "flags": course_flags,
        "distributions": distributions,
        "credits": credits,  # This will now preserve decimal values
        "requirements": course.get("requirements"),
        "term": course.get("season_code"),
        "is_colsem": course.get("colsem", False),
        "is_fysem": course.get("fysem", False),
        "is_sysem": course.get("sysem", False),
        "seasons": []  # Will be populated later
    }


if __name__ == "__main__":
    try:
        print("Course Data to Supabase Uploader")
        print("--------------------------------")
        terms = [202103, 202201, 202301, 202303, 202401, 202403, 202501]
        fetch_process_and_upload(terms)
    except KeyboardInterrupt:
        print("\nProcess cancelled by user")
    except Exception as e:
        print(f"An error occurred: {e}")