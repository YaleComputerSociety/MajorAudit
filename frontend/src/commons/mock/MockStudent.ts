import { Course } from "../types/TypeCourse";

export const EMPTYCOURSE: Course = { codes: ["N/A"], title: "Title NULL", credit: 1, areas: [], skills: [], seasons: [] };

export const Ryan = {
  "studentDegrees": [],
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
        },
      ],
    },
		{
			"name": "Economics",
			"abbreviation": "ECON",
      "degrees": [
        {
          "metadata": {
            "about": "Economics is much broader than the study of recessions and inflation or stocks and bonds. Economists study decision making and incentives such as how taxes create incentives for labor market and savings behavior. Many current public policy debates concern questions of economics, including causes and consequences of inequality and gender and racial wage gaps; how to address poverty; the impact of immigration and trade on the well-being of a country’s citizens; the cause of the Great Recession; and how to predict future downturns.",
            "catologLink": "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
            "degreeType": "BACH_ART",
            "dus": {
              "address": "",
              "email": "",
              "name": ""
            },
            "name": "Economics",
            "stats": {
              "courses": 10,
              "rating": 0,
              "type": "QR",
              "workload": 0
            },
            "students": 0,
            "wesbiteLink": ""
          },
					"codesCore": [],
					"codesAdded": [],
          "requirements": [
            {
              "name": "ELECTIVES",
              "subsections": [
                {
									"flexible": true,
                  "courses": [],
                }
              ]
            },
          ]
        },
      ],
    },
		{
			"name": "History",
			"abbreviation": "HIST",
      "degrees": [
        {
          "metadata": {
            "about": "The History major is for students who understand that shaping the future requires knowing the past. History courses explore many centuries of human experimentation and ingenuity, from the global to the individual scale. History majors learn to be effective storytellers and analysts, and to craft arguments that speak to broad audiences. They make extensive use of Yale’s vast library resources to create pioneering original research projects. Students of history learn to think about politics and government, sexuality, the economy, cultural and intellectual life, war and society, and other themes in broadly humanistic—rather than narrowly technocratic—ways.",
            "catologLink": "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
            "degreeType": "BACH_ART",
            "dus": {
              "address": "",
              "email": "",
              "name": ""
            },
            "name": "History",
            "stats": {
              "courses": 10,
              "rating": 0,
              "type": "QR",
              "workload": 0
            },
            "students": 0,
            "wesbiteLink": ""
          },
					"codesCore": [],
					"codesAdded": [],
          "requirements": [
            {
              "name": "ELECTIVES",
              "subsections": [
                {
									"flexible": true,
                  "courses": [],
                }
              ]
            },
          ]
        },
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
