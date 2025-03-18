
import requests
import json
import os
from supabase import create_client

def fetch_process_and_upload(season_code="202501"):
    # Fetch data from API
    url = f"https://api.coursetable.com/api/catalog/public/{season_code}"
    print(f"Fetching course data from {url}...")
    response = requests.get(url)
    response.raise_for_status()
    courses_data = response.json()
    
    # Process courses
    print("Processing course data...")
    processed_courses = []
    for course in courses_data:
        processed_course = transform_course(course)
        processed_courses.append(processed_course)
        
    processed_courses = processed_courses[:25]
    
    # Save locally (backup)
    with open("results.json", "w", encoding="utf-8") as file:
        json.dump(processed_courses, file, indent=2)
    print(f"Saved {len(processed_courses)} courses to results.json")
    
    # Upload to Supabase
    print("Connecting to Supabase...")
    supabase_url = "https://cqonuujfvpucligwwgtq.supabase.co"
    supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxb251dWpmdnB1Y2xpZ3d3Z3RxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODUyMjg1MywiZXhwIjoyMDU0MDk4ODUzfQ.OtS4JpoFfW-T4YjksMW7SOeBZ1zSaf2EIBbevd09oaI"
    
    supabase = create_client(supabase_url, supabase_key)
    
    # Upload in batches
    batch_size = 50
    total_batches = (len(processed_courses) + batch_size - 1) // batch_size
    
    print(f"Uploading {len(processed_courses)} courses in {total_batches} batches...")
    
    for i in range(0, len(processed_courses), batch_size):
        batch = processed_courses[i:i+batch_size]
        batch_num = i // batch_size + 1
        
        print(f"Uploading batch {batch_num}/{total_batches}...")
        
        try:
            result = supabase.table("courses").insert(batch).execute()
            print(f"✓ Batch {batch_num} uploaded successfully")
        except Exception as e:
            print(f"✗ Error with batch {batch_num}: {e}")
    
    print("Process complete!")

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
        "season_code": course.get("season_code"),
        "colsem": course.get("colsem", False),
        "fysem": course.get("fysem", False),
        "sysem": course.get("sysem", False)
    }

if __name__ == "__main__":
    try:
        print("Course Data to Supabase Uploader")
        print("--------------------------------")
        season = input("Enter season code (default 202501 for Spring 2025): ") or "202501"
        fetch_process_and_upload(season)
    except KeyboardInterrupt:
        print("\nProcess cancelled by user")
    except Exception as e:
        print(f"An error occurred: {e}")
        