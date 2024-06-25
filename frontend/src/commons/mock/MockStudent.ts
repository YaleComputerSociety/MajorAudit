import { Course, StudentCourse } from "./../types/TypeCourse";
import { Student } from "./../types/TypeStudent";

const CGSC110: Course = { code: "CGSC 110", title: "Introduction to Cognitive Science", seasons: ["Fall"], distribution: ["So"] };
const StudentCGSC110: StudentCourse = { course: CGSC110, status: "COMPLETE", season: "Fall", year: 2022 };

export const MockStudent: Student = {
  metadata: [
    {
      grade: 1,
      terms: ["Fall 2022", "Spring 2023"],
      fall: [StudentCGSC110],
      spring: [StudentCGSC110]
    },
    {
      grade: 2,
      terms: ["Fall 2023", "Spring 2024"],
      fall: [],
      spring: [StudentCGSC110]
    }
  ]
};

export const ryan = {
  "daTables": [],
  "degree": "Bachelor of Arts",
  "major": "Humanities",
  "name": "Ryan",
  "netID": "rgg32",
  "studentCourses": [
      {
          "course": {
              "code": "SPAN 385",
              "credit": 1,
              "distribution": [
                  "L"
              ],
              "seasons": [],
              "title": "Cervantes & Don Quijote"
          },
          "season": "Spring",
          "status": "COMPLETE",
          "year": 2024
      },
      {
          "course": {
              "code": "CPSC 327",
              "credit": 1,
              "distribution": [
                  "Qr"
              ],
              "seasons": [],
              "title": "Object-Oriented Programming"
          },
          "season": "Fall",
          "status": "COMPLETE",
          "year": 2023
      },
      {
          "course": {
              "code": "ECON 110",
              "credit": 1,
              "distribution": [
                  "Qr"
              ],
              "seasons": [],
              "title": "Intro Microeconomic Analysis"
          },
          "season": "Spring",
          "status": "COMPLETE",
          "year": 2023
      },
      {
          "course": {
              "code": "DRST 002",
              "credit": 1,
              "distribution": [
                  "Wr"
              ],
              "seasons": [],
              "title": "Directed Studies: Literature"
          },
          "season": "Spring",
          "status": "COMPLETE",
          "year": 2023
      },
      {
          "course": {
              "code": "DRST 004",
              "credit": 1,
              "distribution": [
                  "Wr"
              ],
              "seasons": [],
              "title": "Directed Studies: Philosophy"
          },
          "season": "Spring",
          "status": "COMPLETE",
          "year": 2023
      },
      {
          "course": {
              "code": "HSAR 225",
              "credit": 1,
              "distribution": [
                  "Hu"
              ],
              "seasons": [],
              "title": "Art in the Age of Empires"
          },
          "season": "Spring",
          "status": "COMPLETE",
          "year": 2024
      },
      {
          "course": {
              "code": "E&EB 255",
              "credit": 1,
              "distribution": [
                  "Sc"
              ],
              "seasons": [],
              "title": "Invertebrates"
          },
          "season": "Fall",
          "status": "COMPLETE",
          "year": 2023
      },
      {
          "course": {
              "code": "PLSC 393",
              "credit": 1,
              "distribution": [],
              "seasons": [],
              "title": "Comparative Constitutional Law"
          },
          "season": "Fall",
          "status": "IP",
          "year": 2024
      },
      {
          "course": {
              "code": "CPSC 201",
              "credit": 1,
              "distribution": [
                  "Qr"
              ],
              "seasons": [],
              "title": "Intro to Computer Science"
          },
          "season": "Fall",
          "status": "COMPLETE",
          "year": 2022
      },
      {
          "course": {
              "code": "CPSC 223",
              "credit": 1,
              "distribution": [
                  "Qr"
              ],
              "seasons": [],
              "title": "DataStructres&ProgrmmngTechnqs"
          },
          "season": "Spring",
          "status": "COMPLETE",
          "year": 2023
      },
      {
          "course": {
              "code": "DRST 001",
              "credit": 1,
              "distribution": [
                  "Wr"
              ],
              "seasons": [],
              "title": "Directed Studies: Literature"
          },
          "season": "Fall",
          "status": "COMPLETE",
          "year": 2022
      },
      {
          "course": {
              "code": "DRST 003",
              "credit": 1,
              "distribution": [
                  "Wr"
              ],
              "seasons": [],
              "title": "Directed Studies: Philosophy"
          },
          "season": "Fall",
          "status": "COMPLETE",
          "year": 2022
      },
      {
          "course": {
              "code": "ART 136",
              "credit": 1,
              "distribution": [
                  "Hu"
              ],
              "seasons": [],
              "title": "B&W Photo Capturing Light"
          },
          "season": "Fall",
          "status": "COMPLETE",
          "year": 2023
      },
      {
          "course": {
              "code": "ENGL 376",
              "credit": 1,
              "distribution": [
                  "Hu"
              ],
              "seasons": [],
              "title": "Theories of the Western Novel"
          },
          "season": "Fall",
          "status": "COMPLETE",
          "year": 2023
      },
      {
          "course": {
              "code": "DRST 005",
              "credit": 1,
              "distribution": [
                  "So"
              ],
              "seasons": [],
              "title": "DirectedStud:History&Politics"
          },
          "season": "Fall",
          "status": "COMPLETE",
          "year": 2022
      },
      {
          "course": {
              "code": "DRST 006",
              "credit": 1,
              "distribution": [
                  "So"
              ],
              "seasons": [],
              "title": "DirectedStud:History&Politics"
          },
          "season": "Spring",
          "status": "COMPLETE",
          "year": 2023
      },
      {
          "course": {
              "code": "CPSC 323",
              "credit": 1,
              "distribution": [],
              "seasons": [],
              "title": "SystemsProgramng&ComputerOrgzn"
          },
          "season": "Spring",
          "status": "COMPLETE",
          "year": 2024
      },
      {
          "course": {
              "code": "ENGL 253",
              "credit": 1,
              "distribution": [],
              "seasons": [],
              "title": "Interpretations: Ulysses"
          },
          "season": "Fall",
          "status": "IP",
          "year": 2024
      },
      {
          "course": {
              "code": "ENGL 419",
              "credit": 1,
              "distribution": [],
              "seasons": [],
              "title": "WritngAboutContempFiguratveArt"
          },
          "season": "Fall",
          "status": "IP",
          "year": 2024
      },
      {
          "course": {
              "code": "FREN 403",
              "credit": 1,
              "distribution": [],
              "seasons": [],
              "title": "Remembrance Things Past"
          },
          "season": "Spring",
          "status": "COMPLETE",
          "year": 2024
      },
      {
          "course": {
              "code": "GMAN 233",
              "credit": 1,
              "distribution": [],
              "seasons": [],
              "title": "Karl Marx's Capital"
          },
          "season": "Fall",
          "status": "IP",
          "year": 2024
      },
      {
          "course": {
              "code": "HIST 277J",
              "credit": 1,
              "distribution": [],
              "seasons": [],
              "title": "Memory&History inModern Europe"
          },
          "season": "Fall",
          "status": "COMPLETE",
          "year": 2023
      },
      {
          "course": {
              "code": "PLSC 204",
              "credit": 1,
              "distribution": [],
              "seasons": [],
              "title": "Election Fundamentals"
          },
          "season": "Fall",
          "status": "IP",
          "year": 2024
      }
  ],
  "yearTree": [
      {
          "fall": [
              {
                  "course": {
                      "code": "CPSC 201",
                      "credit": 1,
                      "distribution": [
                          "Qr"
                      ],
                      "seasons": [],
                      "title": "Intro to Computer Science"
                  },
                  "season": "Fall",
                  "status": "COMPLETE",
                  "year": 2022
              },
              {
                  "course": {
                      "code": "DRST 001",
                      "credit": 1,
                      "distribution": [
                          "Wr"
                      ],
                      "seasons": [],
                      "title": "Directed Studies: Literature"
                  },
                  "season": "Fall",
                  "status": "COMPLETE",
                  "year": 2022
              },
              {
                  "course": {
                      "code": "DRST 003",
                      "credit": 1,
                      "distribution": [
                          "Wr"
                      ],
                      "seasons": [],
                      "title": "Directed Studies: Philosophy"
                  },
                  "season": "Fall",
                  "status": "COMPLETE",
                  "year": 2022
              },
              {
                  "course": {
                      "code": "DRST 005",
                      "credit": 1,
                      "distribution": [
                          "So"
                      ],
                      "seasons": [],
                      "title": "DirectedStud:History&Politics"
                  },
                  "season": "Fall",
                  "status": "COMPLETE",
                  "year": 2022
              }
          ],
          "grade": 1,
          "spring": [
              {
                  "course": {
                      "code": "ECON 110",
                      "credit": 1,
                      "distribution": [
                          "Qr"
                      ],
                      "seasons": [],
                      "title": "Intro Microeconomic Analysis"
                  },
                  "season": "Spring",
                  "status": "COMPLETE",
                  "year": 2023
              },
              {
                  "course": {
                      "code": "DRST 002",
                      "credit": 1,
                      "distribution": [
                          "Wr"
                      ],
                      "seasons": [],
                      "title": "Directed Studies: Literature"
                  },
                  "season": "Spring",
                  "status": "COMPLETE",
                  "year": 2023
              },
              {
                  "course": {
                      "code": "DRST 004",
                      "credit": 1,
                      "distribution": [
                          "Wr"
                      ],
                      "seasons": [],
                      "title": "Directed Studies: Philosophy"
                  },
                  "season": "Spring",
                  "status": "COMPLETE",
                  "year": 2023
              },
              {
                  "course": {
                      "code": "CPSC 223",
                      "credit": 1,
                      "distribution": [
                          "Qr"
                      ],
                      "seasons": [],
                      "title": "DataStructres&ProgrmmngTechnqs"
                  },
                  "season": "Spring",
                  "status": "COMPLETE",
                  "year": 2023
              },
              {
                  "course": {
                      "code": "DRST 006",
                      "credit": 1,
                      "distribution": [
                          "So"
                      ],
                      "seasons": [],
                      "title": "DirectedStud:History&Politics"
                  },
                  "season": "Spring",
                  "status": "COMPLETE",
                  "year": 2023
              }
          ],
          "terms": [
              "Fall 2022",
              "Spring 2023"
          ]
      },
      {
          "fall": [
              {
                  "course": {
                      "code": "CPSC 327",
                      "credit": 1,
                      "distribution": [
                          "Qr"
                      ],
                      "seasons": [],
                      "title": "Object-Oriented Programming"
                  },
                  "season": "Fall",
                  "status": "COMPLETE",
                  "year": 2023
              },
              {
                  "course": {
                      "code": "E&EB 255",
                      "credit": 1,
                      "distribution": [
                          "Sc"
                      ],
                      "seasons": [],
                      "title": "Invertebrates"
                  },
                  "season": "Fall",
                  "status": "COMPLETE",
                  "year": 2023
              },
              {
                  "course": {
                      "code": "ART 136",
                      "credit": 1,
                      "distribution": [
                          "Hu"
                      ],
                      "seasons": [],
                      "title": "B&W Photo Capturing Light"
                  },
                  "season": "Fall",
                  "status": "COMPLETE",
                  "year": 2023
              },
              {
                  "course": {
                      "code": "ENGL 376",
                      "credit": 1,
                      "distribution": [
                          "Hu"
                      ],
                      "seasons": [],
                      "title": "Theories of the Western Novel"
                  },
                  "season": "Fall",
                  "status": "COMPLETE",
                  "year": 2023
              },
              {
                  "course": {
                      "code": "HIST 277J",
                      "credit": 1,
                      "distribution": [],
                      "seasons": [],
                      "title": "Memory&History inModern Europe"
                  },
                  "season": "Fall",
                  "status": "COMPLETE",
                  "year": 2023
              }
          ],
          "grade": 2,
          "spring": [
              {
                  "course": {
                      "code": "SPAN 385",
                      "credit": 1,
                      "distribution": [
                          "L"
                      ],
                      "seasons": [],
                      "title": "Cervantes & Don Quijote"
                  },
                  "season": "Spring",
                  "status": "COMPLETE",
                  "year": 2024
              },
              {
                  "course": {
                      "code": "HSAR 225",
                      "credit": 1,
                      "distribution": [
                          "Hu"
                      ],
                      "seasons": [],
                      "title": "Art in the Age of Empires"
                  },
                  "season": "Spring",
                  "status": "COMPLETE",
                  "year": 2024
              },
              {
                  "course": {
                      "code": "CPSC 323",
                      "credit": 1,
                      "distribution": [],
                      "seasons": [],
                      "title": "SystemsProgramng&ComputerOrgzn"
                  },
                  "season": "Spring",
                  "status": "COMPLETE",
                  "year": 2024
              },
              {
                  "course": {
                      "code": "FREN 403",
                      "credit": 1,
                      "distribution": [],
                      "seasons": [],
                      "title": "Remembrance Things Past"
                  },
                  "season": "Spring",
                  "status": "COMPLETE",
                  "year": 2024
              }
          ],
          "terms": [
              "Fall 2023",
              "Spring 2024"
          ]
      },
      {
          "fall": [
              {
                  "course": {
                      "code": "PLSC 393",
                      "credit": 1,
                      "distribution": [],
                      "seasons": [],
                      "title": "Comparative Constitutional Law"
                  },
                  "season": "Fall",
                  "status": "IP",
                  "year": 2024
              },
              {
                  "course": {
                      "code": "ENGL 253",
                      "credit": 1,
                      "distribution": [],
                      "seasons": [],
                      "title": "Interpretations: Ulysses"
                  },
                  "season": "Fall",
                  "status": "IP",
                  "year": 2024
              },
              {
                  "course": {
                      "code": "ENGL 419",
                      "credit": 1,
                      "distribution": [],
                      "seasons": [],
                      "title": "WritngAboutContempFiguratveArt"
                  },
                  "season": "Fall",
                  "status": "IP",
                  "year": 2024
              },
              {
                  "course": {
                      "code": "GMAN 233",
                      "credit": 1,
                      "distribution": [],
                      "seasons": [],
                      "title": "Karl Marx's Capital"
                  },
                  "season": "Fall",
                  "status": "IP",
                  "year": 2024
              },
              {
                  "course": {
                      "code": "PLSC 204",
                      "credit": 1,
                      "distribution": [],
                      "seasons": [],
                      "title": "Election Fundamentals"
                  },
                  "season": "Fall",
                  "status": "IP",
                  "year": 2024
              }
          ],
          "grade": 3,
          "spring": null,
          "terms": [
              "Fall 2024",
              "Spring 2025"
          ]
      }
  ]
}