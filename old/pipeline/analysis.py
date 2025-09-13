import requests
import json
from collections import defaultdict

def normalize_title(title):
    """Normalize a course title by removing common variations"""
    return title.strip().lower()

def extract_course_code(listings):
    """Extract course codes from listings array"""
    return [listing.get('course_code') for listing in listings]

def filter_course_sections(courses):
    """
    Filter a list of course objects to keep only one section per unique course.
    Group courses by normalized title and then select one section based on
    priority order. Filter out titles where no course has section "1".
    """
    # First, filter out cancelled courses
    active_courses = [course for course in courses if course.get('extra_info') != "CANCELLED"]
    
    # Group courses by normalized title
    courses_by_title = defaultdict(list)
    titles_missing_section_1 = []
    
    for course in active_courses:
        title = normalize_title(course.get('title', ''))
        if title:  # Skip empty titles
            courses_by_title[title].append(course)
    
    # Define section priority order
    section_priority = {
        "1": 1, "2": 2, "3": 3, "4": 4, "5": 5,
        "0": 10,  # Lower priority for section "0"
        "A": 100, "B": 101, "C": 102, "D": 103, "E": 104,
        "F": 105, "G": 106, "H": 107, "I": 108, "J": 109
    }
    default_priority = 1000
    
    # Keep only the canonical section for each title
    filtered_courses = []
    
    for title, course_list in courses_by_title.items():
        if len(course_list) == 1:
            # Only one course with this title, keep it
            filtered_courses.append(course_list[0])
            continue
        
        # Check if there are multiple objects with same title but none with section "1"
        has_section_1 = any(course.get('section') == "1" for course in course_list)
        
        if len(course_list) > 1 and not has_section_1:
            # Record titles missing section "1"
            titles_missing_section_1.append({
                'title': title,
                'count': len(course_list)
            })
            # Skip this title entirely - don't include any of its courses
            continue
        
        # Multiple courses with this title, try to find section "1" first
        section_1_course = None
        for course in course_list:
            if course.get('section') == "1":
                section_1_course = course
                break
        
        if section_1_course:
            filtered_courses.append(section_1_course)
            continue
            
        # If no section "1", use priority order
        sorted_courses = sorted(
            course_list,
            key=lambda c: section_priority.get(c.get('section', ''), default_priority)
        )
        
        # Take the highest priority section
        filtered_courses.append(sorted_courses[0])
    
    return filtered_courses, titles_missing_section_1, len(active_courses), len(courses) - len(active_courses)

def analyze_courses_with_same_title_different_id(term):
    """
    Analyze courses within a single term to find those with the same title
    but different same_course_id attributes.
    
    Args:
        term (str): Term to analyze
        
    Returns:
        dict: Analysis results
    """
    # Track courses by title
    courses_by_title = defaultdict(list)
    
    url = f"https://api.coursetable.com/api/catalog/public/{term}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        term_data = response.json()
        
        # Track original count
        original_count = len(term_data)
        
        # Filter out cancelled courses and duplicate sections
        filtered_term_data, titles_missing_section_1, active_count, cancelled_count = filter_course_sections(term_data)
        
        # Record filtering stats
        filtering_stats = {
            'original_count': original_count,
            'cancelled_count': cancelled_count,
            'active_count': active_count,
            'filtered_count': len(filtered_term_data),
            'removed_count': active_count - len(filtered_term_data),
            'removed_missing_section_1': sum(title_info['count'] for title_info in titles_missing_section_1)
        }
        
        # Process each filtered course
        for course in filtered_term_data:
            course_id = course.get('course_id')
            same_course_id = course.get('same_course_id')
            title = course.get('title', '')
            normalized_title = normalize_title(title)
            
            # Skip courses with empty titles
            if not normalized_title:
                continue
            
            # Extract codes from listings
            codes = extract_course_code(course.get('listings', []))
            
            # Store course by its normalized title
            courses_by_title[normalized_title].append({
                'id': course_id,
                'same_id': same_course_id,
                'title': title,
                'codes': codes,
                'term': term,
                'department': course.get('department', ''),
                'professor': course.get('professor', '')
            })
        
    except Exception as e:
        return None
    
    # Find courses with the same title but different same_course_id within the same term
    same_title_different_id = []
    
    for title, instances in courses_by_title.items():
        # Skip titles that only appear once
        if len(instances) <= 1:
            continue
        
        # Create a set of same_ids for this title
        same_ids = set()
        for instance in instances:
            same_ids.add(instance['same_id'])
        
        # If there's more than one same_id for this title
        if len(same_ids) > 1:
            # Add to our results
            same_title_different_id.append({
                'title': title,
                'instances': instances,
                'same_ids': list(same_ids)
            })
    
    # Generate results
    results = {
        'term': term,
        'total_unique_titles': len(courses_by_title),
        'titles_with_inconsistent_same_id': len(same_title_different_id),
        'filtering_stats': filtering_stats,
        'filtered_courses_by_title': {title: instances for title, instances in courses_by_title.items()},
        'inconsistent_examples': same_title_different_id
    }
    
    return results

def compare_across_terms(term_results):
    """
    Compare courses across terms to find those with the same title AND same code
    but different same_course_id values.
    
    Args:
        term_results (dict): Dictionary of analysis results by term
        
    Returns:
        tuple: (
            list of inconsistencies, 
            filtered courses with same title and code across terms
        )
    """
    # Combine all courses from all terms, grouped by title AND code
    all_courses_by_title_and_code = defaultdict(list)
    
    for term, results in term_results.items():
        for title, instances in results['filtered_courses_by_title'].items():
            for instance in instances:
                # For each course code, create a separate entry
                for code in instance['codes']:
                    key = (title, code)  # Tuple of (title, code)
                    all_courses_by_title_and_code[key].append(instance)
    
    # Find courses with the same title AND code but different same_course_id across terms
    cross_term_inconsistencies = []
    filtered_same_title_code_courses = []
    
    for (title, code), instances in all_courses_by_title_and_code.items():
        # Skip entries that appear in only one term
        terms = set(instance['term'] for instance in instances)
        if len(terms) <= 1:
            continue
        
        # Create a set of same_ids for this title and code
        same_ids = set(instance['same_id'] for instance in instances)
        
        # If there's more than one same_id for this title and code
        if len(same_ids) > 1:
            cross_term_inconsistencies.append({
                'title': title,
                'code': code,
                'instances': instances,
                'same_ids': list(same_ids),
                'terms': list(terms)
            })
        else:
            # These courses have consistent same_course_id across terms
            filtered_same_title_code_courses.extend(instances)
    
    return cross_term_inconsistencies, filtered_same_title_code_courses

def main():
    # Analyze both terms individually
    terms = ["202403", "202501"]
    term_results = {}
    total_original = 0
    total_cancelled = 0
    total_after_cancelled = 0
    total_filtered = 0
    
    for term in terms:
        results = analyze_courses_with_same_title_different_id(term)
        if results:
            term_results[term] = results
            
            # Track totals for summary
            stats = results['filtering_stats']
            total_original += stats['original_count']
            total_cancelled += stats['cancelled_count']
            total_after_cancelled += stats['active_count']
            total_filtered += stats['filtered_count']
    
    # Print overall summary
    print(f"=== OVERALL FILTERING SUMMARY ===")
    print(f"Total original courses: {total_original}")
    print(f"Removed cancelled courses: {total_cancelled}")
    print(f"Courses after removing cancelled: {total_after_cancelled}")
    print(f"Final filtered courses: {total_filtered}")
    print(f"Total reduction: {total_original - total_filtered} courses ({((total_original - total_filtered) / total_original) * 100:.1f}%)")
    
    # Analyze across terms
    cross_term_inconsistencies, filtered_courses = compare_across_terms(term_results)
    
    # Print cross-term summary
    print(f"\n=== CROSS-TERM ANALYSIS SUMMARY ===")
    print(f"Courses with same title and code but different same_course_id across terms: {len(cross_term_inconsistencies)}")
    print(f"These {len(cross_term_inconsistencies)} inconsistent courses were filtered out")
    
    # Write filtered courses to file
    output_filename = "filtered_courses.json"
    with open(output_filename, 'w') as f:
        json.dump({
            'filtered_courses': filtered_courses,
            'count': len(filtered_courses)
        }, f, indent=2)
    
    print(f"\nFiltered courses written to {output_filename}")

if __name__ == "__main__":
    main()