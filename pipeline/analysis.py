import requests
import json
import os
from collections import defaultdict
from difflib import SequenceMatcher
import re

def similarity(a, b):
    """Calculate string similarity between two strings"""
    return SequenceMatcher(None, a, b).ratio()

def normalize_title(title):
    """Normalize a course title by removing common variations"""
    return title.strip().lower()

def extract_course_code(listings):
    """Extract course codes from listings array"""
    return [f"{listing.get('subject')} {listing.get('number')}" for listing in listings]

def filter_course_sections(courses):
    """
    Filter a list of course objects to keep only one section per unique course
    and remove cancelled courses.
    
    Args:
        courses (list): A list of course objects with section information
    
    Returns:
        list: A filtered list with only one section per course and no cancelled courses
    """
    # First, filter out cancelled courses
    active_courses = [course for course in courses if course.get('extra_info') != "CANCELLED"]
    
    # Group remaining courses by same_course_id
    courses_by_same_id = defaultdict(list)
    for course in active_courses:
        same_course_id = course.get('same_course_id')
        courses_by_same_id[same_course_id].append(course)
    
    # Define section priority order
    section_priority = {
        "1": 1, "2": 2, "3": 3, "4": 4, "5": 5,
        "0": 10,  # Lower priority for section "0"
        "A": 100, "B": 101, "C": 102, "D": 103, "E": 104,
        "F": 105, "G": 106, "H": 107, "I": 108, "J": 109
    }
    default_priority = 1000
    
    # Keep only the canonical section for each course
    filtered_courses = []
    
    for same_id, course_list in courses_by_same_id.items():
        if len(course_list) == 1:
            # Only one section, keep it
            filtered_courses.append(course_list[0])
            continue
        
        # Multiple sections, try to find section "1" first
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
    
    return filtered_courses

def improved_title_similarity(title1, title2):
    """
    Calculate an improved similarity score between two course titles that
    accounts for common patterns in course title evolution.
    
    Args:
        title1 (str): The first course title
        title2 (str): The second course title
        
    Returns:
        float: A similarity score between 0 and 1, with 1 being identical
    """
    from difflib import SequenceMatcher
    
    # If titles are identical, return 1.0
    if title1 == title2:
        return 1.0
    
    # Calculate base similarity using SequenceMatcher
    base_similarity = SequenceMatcher(None, title1, title2).ratio()
    
    # Find the shorter and longer title
    shorter = title1 if len(title1) <= len(title2) else title2
    longer = title2 if len(title1) <= len(title2) else title1
    
    # Check if shorter title is completely contained in longer title
    if shorter in longer:
        # Give a high similarity score but not 1.0
        contained_score = 0.9
        return max(base_similarity, contained_score)
    
    # Check if they share the same prefix before a colon
    # This handles cases like "Senior Capstone Project" → "Senior Capstone Project: AI..."
    if ":" in longer:
        prefix = longer.split(":")[0].strip()
        if shorter.startswith(prefix) or prefix in shorter:
            prefix_score = 0.85
            return max(base_similarity, prefix_score)
    
    # Check if first 3 words match (for titles with at least 3 words)
    words1 = title1.split()
    words2 = title2.split()
    
    if len(words1) >= 3 and len(words2) >= 3:
        if words1[:3] == words2[:3]:
            first_words_score = 0.8
            return max(base_similarity, first_words_score)
    
    # Fall back to the base similarity
    return base_similarity

def analyze(terms: list[str]):    
    # Track courses across terms
    courses_by_id = {}
    courses_by_same_id = {}
    courses_by_title = {}
    
    # Track filtering stats
    filtering_stats = {}
    
    # Track attribute stability across terms
    attribute_changes = {
        'title': 0,
        'credits': 0,
        'description': 0,
        'course_professors': 0,
        'course_flags': 0,
        'listings': 0,
        'requirements': 0,
        'areas': 0,
        'colsem': 0,
        'fysem': 0,
        'sysem': 0
    }
    
    total_comparisons = 0
    code_changes = []
    
    for term in terms:
        url = f"https://api.coursetable.com/api/catalog/public/{term}"
        print(f"Fetching course data for term {term} from {url}...")
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            term_data = response.json()
            
            # Track original count
            original_count = len(term_data)
            
            # Filter out cancelled courses and duplicate sections
            filtered_term_data = filter_course_sections(term_data)
            
            # Record filtering stats
            filtering_stats[term] = {
                'original_count': original_count,
                'filtered_count': len(filtered_term_data),
                'removed_count': original_count - len(filtered_term_data),
                'reduction_percentage': ((original_count - len(filtered_term_data)) / original_count) * 100
            }
            
            print(f"Term {term}: Filtered from {original_count} to {len(filtered_term_data)} courses " +
                  f"({filtering_stats[term]['reduction_percentage']:.1f}% reduction)")
            
            # Process each filtered course in this term
            for course in filtered_term_data:
                course_id = course.get('course_id')
                same_course_id = course.get('same_course_id')
                title = course.get('title', '')
                normalized_title = normalize_title(title)
                
                # Extract codes from listings
                codes = extract_course_code(course.get('listings', []))
                
                # Store original course by its ID
                if course_id not in courses_by_id:
                    courses_by_id[course_id] = {}
                
                courses_by_id[course_id][term] = course
                
                # Group by same_course_id (API's way of tracking the same course)
                if same_course_id:
                    if same_course_id not in courses_by_same_id:
                        courses_by_same_id[same_course_id] = []
                    
                    courses_by_same_id[same_course_id].append({
                        'id': course_id,
                        'term': term,
                        'title': title,
                        'credits': course.get('credits'),
                        'description': course.get('description', '')[:100],  # First 100 chars for comparison
                        'codes': codes
                    })
                
                # Group by normalized title for additional analysis
                if normalized_title:
                    if normalized_title not in courses_by_title:
                        courses_by_title[normalized_title] = []
                    
                    courses_by_title[normalized_title].append({
                        'id': course_id,
                        'same_id': same_course_id,
                        'term': term,
                        'title': title,
                        'codes': codes
                    })
                
        except Exception as e:
            print(f"Error fetching data for term {term}: {str(e)}")
    
		# Analyze same_course_id consistency using improved title similarity
    title_analysis_results = analyze_title_changes(courses_by_same_id)
    
    # Analyze same_course_id consistency
    same_id_consistency = {
        'total_same_ids': len(courses_by_same_id),
        'appear_in_multiple_terms': 0,
        'single_term_only': 0,
        'title_similarity': title_analysis_results['title_similarity'],
        'significant_changes': title_analysis_results['significant_changes'],
        'terms_by_same_id': {},
        'term_distribution': {},
        'avg_title_similarity': title_analysis_results.get('avg_improved_similarity', 0),
        'avg_standard_similarity': title_analysis_results.get('avg_standard_similarity', 0),
        'avg_improved_similarity': title_analysis_results.get('avg_improved_similarity', 0),
        'improved_vs_standard': title_analysis_results.get('improved_vs_standard', {})
    }
    
    # Track term counts for each same_course_id
    for same_id, instances in courses_by_same_id.items():
        terms_count = len(set(instance['term'] for instance in instances))
        
        if terms_count > 1:
            same_id_consistency['appear_in_multiple_terms'] += 1
        else:
            same_id_consistency['single_term_only'] += 1
        
        # Record term distribution
        if terms_count not in same_id_consistency['term_distribution']:
            same_id_consistency['term_distribution'][terms_count] = 0
        same_id_consistency['term_distribution'][terms_count] += 1
        
        # Record which terms this same_id appears in
        same_id_consistency['terms_by_same_id'][same_id] = [instance['term'] for instance in instances]
    
    # Analyze attribute stability using same_course_id as the linking field
    for same_id, course_instances in courses_by_same_id.items():
        if len(course_instances) < 2:
            continue
            
        # Sort instances by term
        course_instances.sort(key=lambda x: x['term'])
        
        # Compare each instance with the next one
        for i in range(len(course_instances) - 1):
            current_id = course_instances[i]['id']
            next_id = course_instances[i+1]['id']
            
            current_term = course_instances[i]['term']
            next_term = course_instances[i+1]['term']
            
            current_course = courses_by_id[current_id][current_term]
            next_course = courses_by_id[next_id][next_term]
            
            total_comparisons += 1
            
            # Check which attributes changed
            if current_course.get('title') != next_course.get('title'):
                attribute_changes['title'] += 1
                
            if current_course.get('credits') != next_course.get('credits'):
                attribute_changes['credits'] += 1
                
            if current_course.get('description') != next_course.get('description'):
                attribute_changes['description'] += 1
                
            if current_course.get('requirements') != next_course.get('requirements'):
                attribute_changes['requirements'] += 1
                
            # Boolean flags
            if current_course.get('colsem') != next_course.get('colsem'):
                attribute_changes['colsem'] += 1
                
            if current_course.get('fysem') != next_course.get('fysem'):
                attribute_changes['fysem'] += 1
                
            if current_course.get('sysem') != next_course.get('sysem'):
                attribute_changes['sysem'] += 1
            
            # Compare array fields
            for attr in ['course_professors', 'course_flags', 'areas']:
                current_list = current_course.get(attr, []) or []
                next_list = next_course.get(attr, []) or []
                
                # Handle lists that might contain dictionaries (which aren't hashable)
                try:
                    # Try comparing as sets (works for strings, numbers)
                    if set(current_list) != set(next_list):
                        attribute_changes[attr] += 1
                except TypeError:
                    # For lists containing dictionaries, compare as sorted JSON strings
                    current_sorted = sorted(str(item) for item in current_list)
                    next_sorted = sorted(str(item) for item in next_list)
                    if current_sorted != next_sorted:
                        attribute_changes[attr] += 1
            
            # Special handling for listings/codes
            current_codes = extract_course_code(current_course.get('listings', []))
            next_codes = extract_course_code(next_course.get('listings', []))
            
            if set(current_codes) != set(next_codes):
                attribute_changes['listings'] += 1
                
                # Track code changes
                code_changes.append({
                    'same_course_id': same_id,
                    'title': current_course.get('title'),
                    'term_from': current_term,
                    'term_to': next_term,
                    'codes_from': current_codes,
                    'codes_to': next_codes
                })
    
    # Analyze potential duplicate courses that the API didn't mark with same_course_id
    duplicate_candidates = []
    processed_titles = set()
    
    for title, instances in courses_by_title.items():
        if title in processed_titles or not title:
            continue
            
        # Group instances by same_course_id first
        by_same_id = {}
        for instance in instances:
            same_id = instance.get('same_id')
            if same_id:
                if same_id not in by_same_id:
                    by_same_id[same_id] = []
                by_same_id[same_id].append(instance)
        
        # If we have more than one same_id group for this title, it's a candidate
        if len(by_same_id) > 1:
            duplicate_candidates.append({
                'title': title,
                'groups': list(by_same_id.values())
            })
        
        processed_titles.add(title)
    
    # Calculate stability percentages
    stability_percentages = {}
    if total_comparisons > 0:
        for attr, changes in attribute_changes.items():
            stability_percentages[attr] = 100 - (changes / total_comparisons * 100)
    
    # Analyze how often course codes are consistent with same_course_id
    code_consistency = {
        'consistent': 0,
        'inconsistent': 0
    }
    
    for same_id, instances in courses_by_same_id.items():
        if len(instances) < 2:
            continue
            
        all_codes = set()
        for instance in instances:
            all_codes.update(instance['codes'])
        
        if len(all_codes) == 1:
            code_consistency['consistent'] += 1
        else:
            code_consistency['inconsistent'] += 1
    
    # Generate results
    results = {
        'total_unique_courses': len(courses_by_id),
        'courses_with_same_id': len(courses_by_same_id),
        'attribute_stability': stability_percentages,
        'potential_duplicate_courses': len(duplicate_candidates),
        'code_change_count': len(code_changes),
        'code_consistency': code_consistency,
        'duplicate_samples': duplicate_candidates[:5] if duplicate_candidates else [],
        'filtering_stats': filtering_stats,
        'same_id_consistency': same_id_consistency,
        'title_similarity_analysis': {
            'avg_standard_similarity': title_analysis_results.get('avg_standard_similarity', 0),
            'avg_improved_similarity': title_analysis_results.get('avg_improved_similarity', 0),
            'comparison': title_analysis_results.get('improved_vs_standard', {})
        }
    }
    
    # Based on stability percentages, recommend table structure
    stable_threshold = 70  # Consider attributes stable if they remain unchanged 70% of the time
    
    schema_recommendations = {
        'courses_table': [],
        'offerings_table': []
    }
    
    # Basic attributes to always include in each table
    schema_recommendations['courses_table'].append('id (PK)')
    schema_recommendations['offerings_table'].append('id (PK)')
    schema_recommendations['offerings_table'].append('course_id (FK)')
    schema_recommendations['offerings_table'].append('term')
    
    # Add other attributes based on stability
    for attr, stability in stability_percentages.items():
        # Map API field names to potential DB column names
        column_mapping = {
            'course_professors': 'professors',
            'course_flags': 'flags',
            'listings': 'codes',
            'colsem': 'is_colsem',
            'fysem': 'is_fysem',
            'sysem': 'is_sysem'
        }
        
        column_name = column_mapping.get(attr, attr)
        
        if stability >= stable_threshold:
            schema_recommendations['courses_table'].append(column_name)
        else:
            schema_recommendations['offerings_table'].append(column_name)
    
    results['schema_recommendations'] = schema_recommendations
    
    return results, code_changes

def analyze_title_changes(courses_by_same_id):
    """
    Analyze title changes using the improved similarity metric.
    
    Args:
        courses_by_same_id (dict): Dictionary of courses grouped by same_course_id
        
    Returns:
        dict: Analysis results including improved similarity metrics
    """
    from difflib import SequenceMatcher
    
    results = {
        'total_courses_analyzed': len(courses_by_same_id),
        'title_similarity': [],
        'significant_changes': [],
        'improved_vs_standard': {'better': 0, 'same': 0, 'worse': 0}
    }
    
    for same_id, instances in courses_by_same_id.items():
        if len(instances) < 2:
            continue
            
        # Sort instances by term
        instances.sort(key=lambda x: x['term'])
        
        # Compare first and last instance to check for drift over time
        first = instances[0]
        last = instances[-1]
        
        # Calculate both standard and improved similarity
        standard_similarity = SequenceMatcher(None, first['title'], last['title']).ratio()
        improved_similarity = improved_title_similarity(first['title'], last['title'])
        
        # Track which method gave better results
        if improved_similarity > standard_similarity:
            results['improved_vs_standard']['better'] += 1
        elif improved_similarity < standard_similarity:
            results['improved_vs_standard']['worse'] += 1
        else:
            results['improved_vs_standard']['same'] += 1
        
        results['title_similarity'].append({
            'same_course_id': same_id,
            'standard_similarity': standard_similarity,
            'improved_similarity': improved_similarity,
            'first_term': first['term'],
            'last_term': last['term'],
            'first_title': first['title'],
            'last_title': last['title']
        })
        
        # Check for significant changes using improved method
        # A course is now considered significantly changed only if both methods
        # indicate a low similarity (< 0.7 for standard and < 0.8 for improved)
        if standard_similarity < 0.7 and improved_similarity < 0.8:
            results['significant_changes'].append({
                'same_course_id': same_id,
                'first': {
                    'term': first['term'],
                    'title': first['title'],
                    'credits': first.get('credits'),
                    'description_snippet': first.get('description', '')[:100],
                    'codes': first.get('codes', [])
                },
                'last': {
                    'term': last['term'],
                    'title': last['title'],
                    'credits': last.get('credits'),
                    'description_snippet': last.get('description', '')[:100],
                    'codes': last.get('codes', [])
                },
                'standard_similarity': standard_similarity,
                'improved_similarity': improved_similarity,
                'similarity': improved_similarity  # Add back the original key for backward compatibility
            })
    
    # Calculate average similarities
    if results['title_similarity']:
        results['avg_standard_similarity'] = sum(
            item['standard_similarity'] for item in results['title_similarity']
        ) / len(results['title_similarity'])
        
        results['avg_improved_similarity'] = sum(
            item['improved_similarity'] for item in results['title_similarity']
        ) / len(results['title_similarity'])
    else:
        results['avg_standard_similarity'] = 0
        results['avg_improved_similarity'] = 0
    
    return results

def write_results_to_file(results, code_changes, filename='course_analysis_results.json'):
    """Write analysis results to a file"""
    output = {
        'analysis_results': results,
        'code_changes_sample': code_changes[:20] if code_changes else []  # Just include a sample
    }
    
    with open(filename, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"Results written to {filename}")

def main():
    # Example terms to analyze - modify as needed
    terms = [
        "202003", "202101", "202103", "202201", "202203", "202301", "202303", "202401", "202403", "202501"
    ]
    
    results, code_changes = analyze(terms)
    
    # Print summary results
    print("\n=== ANALYSIS RESULTS ===")
    print(f"Total unique courses: {results['total_unique_courses']}")
    print(f"Courses with same_course_id appearing in multiple terms: {results['courses_with_same_id']}")
    
    # Print filtering statistics
    print("\nFiltering Statistics:")
    total_original = 0
    total_filtered = 0
    for term, stats in results['filtering_stats'].items():
        total_original += stats['original_count']
        total_filtered += stats['filtered_count']
        print(f"  - Term {term}: {stats['original_count']} → {stats['filtered_count']} courses " +
              f"({stats['reduction_percentage']:.1f}% reduction)")
    
    # Overall filtering summary
    if total_original > 0:
        overall_reduction = ((total_original - total_filtered) / total_original) * 100
        print(f"\nOverall Reduction: {total_original} → {total_filtered} courses ({overall_reduction:.1f}%)")
    
    # Print same_course_id consistency analysis
    same_id = results['same_id_consistency']
    print("\n=== SAME_COURSE_ID CONSISTENCY ANALYSIS ===")
    print(f"Total unique same_course_ids: {same_id['total_same_ids']}")
    print(f"Appearing in multiple terms: {same_id['appear_in_multiple_terms']} ({same_id['appear_in_multiple_terms']/same_id['total_same_ids']*100:.1f}%)")
    print(f"Appearing in only one term: {same_id['single_term_only']} ({same_id['single_term_only']/same_id['total_same_ids']*100:.1f}%)")
    
    print("\nTerm distribution for same_course_ids:")
    for term_count, count in sorted(same_id['term_distribution'].items()):
        print(f"  - Appears in {term_count} term(s): {count} courses ({count/same_id['total_same_ids']*100:.1f}%)")
    
    print(f"\nAverage title similarity across terms: {same_id['avg_title_similarity']*100:.1f}%")
    print(f"Courses with significant title changes (similarity < 70%): {len(same_id['significant_changes'])}")
    
    if same_id['significant_changes']:
        print("\nSample of significant changes:")
        for i, change in enumerate(same_id['significant_changes'][:3]):
            print(f"  {i+1}. same_course_id: {change['same_course_id']}")
            print(f"     First ({change['first']['term']}): {change['first']['title']}")
            print(f"     Last ({change['last']['term']}): {change['last']['title']}")
            print(f"     Similarity: {change['similarity']*100:.1f}%")
    
    print("\nAttribute Stability (% that remain the same across terms):")
    for attr, stability in sorted(results['attribute_stability'].items(), key=lambda x: x[1], reverse=True):
        print(f"  - {attr}: {stability:.1f}%")
    
    print(f"\nPotential duplicate courses not linked by same_course_id: {results['potential_duplicate_courses']}")
    print(f"Code changes detected: {results['code_change_count']}")
    
    # Code consistency
    consistency = results['code_consistency']
    total = consistency['consistent'] + consistency['inconsistent']
    if total > 0:
        consistency_pct = (consistency['consistent'] / total) * 100
        print(f"\nCourse code consistency: {consistency_pct:.1f}% of courses maintain the same code")
    
    print("\nRECOMMENDED SCHEMA:")
    print("Courses Table:")
    for attr in results['schema_recommendations']['courses_table']:
        print(f"  - {attr}")
    
    print("\nOfferings Table:")
    for attr in results['schema_recommendations']['offerings_table']:
        print(f"  - {attr}")
    
    # Write detailed results to file
    write_results_to_file(results, code_changes)

if __name__ == "__main__":
    main()