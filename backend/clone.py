
CPSC_Program = {
    "name": "Computer Science",
    "abbreviation": "CPSC",
    "degrees": [
        {
            "metadata": {
                "name": "Computer Science",
                "abbreviation": "CPSC",
                "degreeType": "BACH_ART",
                "stats": {
                    "courses": 10,
                    "rating": 0,
                    "workload": 0,
                    "type": "QR"
                },
                "students": 0,
                "about": (
                    "The Department of Computer Science offers a B.A. degree program, "
                    "as well as four combined major programs in cooperation with other "
                    "departments: Electrical Engineering and Computer Science, Computer "
                    "Science and Economics, Computer Science and Mathematics, and Computer "
                    "Science and Psychology. Each program not only provides a solid technical "
                    "education but also allows students either to take a broad range of courses "
                    "in other disciplines or to complete the requirements of a second major."
                ),
                "dus": {
                    "name": "Y. Richard Yang",
                    "address": "AKW 208 432-6400",
                    "email": "cpsc.yale.edu"
                },
                "catologLink": "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
                "wesbiteLink": "http://cpsc.yale.edu"
            },
            "codesCore": ["CPSC 201", "CPSC 202", "MATH 244", "CPSC 223", "CPSC 323", "CPSC 365", "CPSC 490"],
            "codesAdded": [],
            "requirements": [
                {
                    "name": "CORE",
                    "subsections": [
                        {
                            "flexible": True,
                            "courses": [
                                {
                                    "status": "DA_COMPLETE",
                                    "term": 202203,
                                    "course": {
                                        "codes": ["CPSC 201"],
                                        "title": "Introduction to Computer Science",
                                        "credit": 1,
                                        "areas": [],
                                        "skills": ["QR"],
                                        "seasons": ["Fall", "Spring"]
                                    }
                                }
                            ]
                        },
                        {
                            "flexible": True,
                            "courses": [
                                {
                                    "status": "NA",
                                    "term": 0,
                                    "course": {
                                        "codes": ["CPSC 202"],
                                        "title": "Math Tools",
                                        "credit": 1,
                                        "areas": [],
                                        "skills": ["QR"],
                                        "seasons": ["Fall", "Spring"]
                                    }
                                },
                                {
                                    "status": "NA",
                                    "term": 0,
                                    "course": {
                                        "codes": ["MATH 244"],
                                        "title": "Discrete Math",
                                        "credit": 1,
                                        "areas": [],
                                        "skills": ["QR"],
                                        "seasons": ["Fall", "Spring"]
                                    }
                                }
                            ]
                        },
                        {
                            "flexible": False,
                            "courses": [
                                {
                                    "status": "DA_COMPLETE",
                                    "term": 202301,
                                    "course": {
                                        "codes": ["CPSC 223"],
                                        "title": "Data Structures",
                                        "credit": 1,
                                        "areas": [],
                                        "skills": ["QR"],
                                        "seasons": ["Fall", "Spring"]
                                    }
                                }
                            ]
                        },
                        {
                            "flexible": False,
                            "courses": [
                                {
                                    "status": "DA_COMPLETE",
                                    "term": 202401,
                                    "course": {
                                        "codes": ["CPSC 323"],
                                        "title": "Introduction to Systems Programming and Computer Organization",
                                        "credit": 1,
                                        "areas": [],
                                        "skills": ["QR"],
                                        "seasons": ["Fall", "Spring"]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "ELECTIVES",
                    "description": "Usually, courses with course numbers above 300 work for this requirement.",
                    "subsections": [
                        {
                            "flexible": True,
                            "courses": []
                        }
                    ]
                },
                {
                    "name": "SENIOR REQUIREMENT",
                    "subsections": [
                        {
                            "flexible": False,
                            "courses": [
                                {
                                    "status": "NA",
                                    "term": 0,
                                    "course": {
                                        "codes": ["CPSC 490"],
                                        "title": "Project",
                                        "credit": 1,
                                        "areas": [],
                                        "skills": ["QR"],
                                        "seasons": ["Fall", "Spring"]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
