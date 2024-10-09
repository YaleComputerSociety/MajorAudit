import http.client
import json

def get_ct_courses():
    cookies = {
        'session': 'enter_session_here',
        'session.sig': 'enter_session_sig_here'
    }
    
    conn = http.client.HTTPSConnection("api.coursetable.com")
    headers = {
        'Cookie': f'session={cookies["session"]}; session.sig={cookies["session.sig"]}'
    }
    
    conn.request("GET", "/api/catalog/public/202301", headers=headers)
    response = conn.getresponse()
    data = response.read()
    course_data = json.loads(data.decode("utf-8"))
    unique_courses = singalize(course_data)
    transformed_data = simplify(unique_courses)
    
    # Splitting the data into four parts
    quarter_size = len(transformed_data) // 4
    first_part = transformed_data[:quarter_size]
    second_part = transformed_data[quarter_size:2*quarter_size]
    third_part = transformed_data[2*quarter_size:3*quarter_size]
    fourth_part = transformed_data[3*quarter_size:]

    # Writing each part to separate files without indents and extra whitespace
    with open("results1.txt", "w") as f:
        json.dump(first_part, f, separators=(",", ":"))
    
    with open("results2.txt", "w") as f:
        json.dump(second_part, f, separators=(",", ":"))
    
    with open("results3.txt", "w") as f:
        json.dump(third_part, f, separators=(",", ":"))
    
    with open("results4.txt", "w") as f:
        json.dump(fourth_part, f, separators=(",", ":"))

    conn.close()

    return transformed_data, 200


def singalize(courses):
    record = set()
    unique = []
    for obj in courses:
        code = obj.get("course_code")
        if code not in record:
            record.add(code)
            unique.append(obj)
    return unique

def simplify(courses):
  dict = {}

  for obj in courses:
    course_code = obj.get("course_code")
    listings = obj["course"].get("listings", [])

    found_key = None
    for code in [listing["course_code"] for listing in listings]:
      if code in dict:
        found_key = code
        break

    if found_key:
      dict[found_key]["c"].append(course_code)
    else:
      dict[course_code] = {
        "c": [course_code],
        "t": obj["course"].get("title"),
        "r": obj["course"].get("credits"),
        "d": obj["course"].get("skills", []) + obj["course"].get("areas", []),
      }

  transform = list(dict.values())
  return transform


if __name__ == "__main__":
    get_ct_courses()
