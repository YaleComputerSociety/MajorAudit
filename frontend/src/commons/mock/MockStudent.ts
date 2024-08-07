import { Course } from "../types/TypeCourse";

export const EMPTYCOURSE: Course = { codes: ["N/A"], title: "Title NULL", credit: 1, areas: [], skills: [], seasons: [] };

export const Ryan = {
  "degrees": [],
  "language": "Spanish, L5",
  "name": "Ryan",
  "netID": "rgg32",
  "onboard": true,

  "programs": [
    {
			"name": "Computer Science",
			"abbreviation": "CPSC",
      "degrees": [
        {
          "metadata": {
            "about": "The Department of Computer Science offers a B.A. degree program, as well as four combined major programs in cooperation with other departments: Electrical Engineering and Computer Science, Computer Science and Economics, Computer Science and Mathematics, and Computer Science and Psychology. Each program not only provides a solid technical education but also allows students either to take a broad range of courses in other disciplines or to complete the requirements of a second major.",
            "catologLink": "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
            "degreeType": "BACH_ART",
            "dus": {
              "address": "AKW 208 432-6400",
              "email": "cpsc.yale.edu",
              "name": "Y. Richard Yang"
            },
            "name": "Computer Science",
            "stats": {
              "courses": 10,
              "rating": 0,
              "type": "QR",
              "workload": 0
            },
            "students": 0,
            "wesbiteLink": "http://cpsc.yale.edu"
          },

					"codesCore": ["CPSC 201", "CPSC 202", "MATH 244", "CPSC 223", "CPSC 323", "CPSC 365", "CPSC 490"],
					"codesAdded": [],
          "requirements": [
            {
              "name": "CORE",
              "subsections": [
                {
									"flexible": true,
                  "courses": [
                    {
											"status": "DA_COMPLETE", "term": 202203,
                      "course": {
                        "codes": ["CPSC 201"], "title": "Introduction to Computer Science",
												"credit": 1, "areas": [], "skills": ["QR"], "seasons": ["Fall", "Spring"]
											},
                    }
                  ]
                },
								{
									"flexible": true,
                  "courses": [
                    {
											"status": "NA", "term": 0,
                      "course": {
                        "codes": ["CPSC 202"], "title": "Math Tools",
												"credit": 1, "areas": [], "skills": ["QR"], "seasons": ["Fall", "Spring"]
											},
                    },
										{
											"status": "NA", "term": 0,
                      "course": {
                        "codes": ["MATH 244"], "title": "Discrete Math",
												"credit": 1, "areas": [], "skills": ["QR"], "seasons": ["Fall", "Spring"]
											},
                    }
                  ]
                },
								{
									"flexible": false,
                  "courses": [
                    {
											"status": "DA_COMPLETE", "term": 202301,
                      "course": {
                        "codes": ["CPSC 223"], "title": "Data Structures",
												"credit": 1, "areas": [], "skills": ["QR"], "seasons": ["Fall", "Spring"]
											},
                    }
                  ]
                },
                {
									"flexible": false,
                  "courses": [
                    {
											"status": "DA_COMPLETE", "term": 202401,
                      "course": {
                        "codes": ["CPSC 323"], "title": "Introduction to Systems Programming and Computer Organization",
												"credit": 1, "areas": [], "skills": ["QR"], "seasons": ["Fall", "Spring"]
											},
                    }
                  ]
                }
              ]
            },
            {
              "name": "ELECTIVES",
              "subsections": [
                {
									"flexible": true,
                  "courses": [],
                }
              ]
            },
            {
              "name": "SENIOR REQUIREMENT",
              "subsections": [
                {
									"flexible": false,
                  "courses": [
										{
											"status": "NA", "term": 0,
                      "course": {
                        "codes": ["CPSC 490"], "title": "Project",
												"credit": 1, "areas": [], "skills": ["QR"], "seasons": ["Fall", "Spring"]
											},
                    }
									],
                }
              ]
            }
          ]
        }
      ],
    }
  ],


  "studentCourses": [
    {
      "course": {
        "areas": [],
        "codes": [
          "CPSC 323"
        ],
        "credit": 1,
        "seasons": [
          "Fall",
          "Spring"
        ],
        "skills": [
          "QR"
        ],
        "title": "Introduction to Systems Programming and Computer Organization"
      },
      "status": "DA_PROSPECT",
      "term": 202401
    },
    {
      "course": {
        "areas": [
          "Hu"
        ],
        "codes": [
          "ENGL 376"
        ],
        "credit": 1,
        "seasons": [
          "Fall",
          "Spring"
        ],
        "skills": [],
        "title": "Theories and Histories of the Western Novel"
      },
      "status": "DA_COMPLETE",
      "term": 202303
    },
    {
      "course": {
        "areas": [
          "So"
        ],
        "codes": [
          "ECON 110"
        ],
        "credit": 1,
        "seasons": [
          "Fall",
          "Spring"
        ],
        "skills": [
          "QR"
        ],
        "title": "An Introduction to Microeconomic Analysis"
      },
      "status": "DA_COMPLETE",
      "term": 202301
    },
    {
      "course": {
        "areas": [
          "Hu"
        ],
        "codes": [
          "ENGL 253",
          "HUMS 265"
        ],
        "credit": 1,
        "seasons": [
          "Fall",
          "Spring"
        ],
        "skills": [],
        "title": "Reading Ulysses: Modernist Classic and Postcolonial Epic"
      },
      "status": "MA_VALID",
      "term": 202403
    },
    {
      "course": {
        "areas": [],
        "codes": [
          "CPSC 201"
        ],
        "credit": 1,
        "seasons": [
          "Fall",
          "Spring"
        ],
        "skills": [
          "QR"
        ],
        "title": "Introduction to Computer Science"
      },
      "status": "DA_COMPLETE",
      "term": 202203
    }
  ]
}
