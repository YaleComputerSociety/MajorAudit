
import { Program } from "./../types/TypeProgram";
import { RACKET } from "./../mock/MockCourses"

export const CPSC: Program = {
  name: "Computer Science",
  abbreviation: "CPSC",
  degrees: [
    {
      metadata: {
        name: "Computer Science",
        abbreviation: "CPSC",
        degreeType: "BACH_ART",
        stats: { courses: 10, rating: 3.9, workload: 3.8, type: "QR" },
        students: 90,
        about:
          "The Department of Computer Science offers a B.A. degree program, as well as four combined major programs in cooperation with other departments: Electrical Engineering and Computer Science, Computer Science and Economics, Computer Science and Mathematics, and Computer Science and Psychology. Each program not only provides a solid technical education but also allows students either to take a broad range of courses in other disciplines or to complete the requirements of a second major.",
        dus: {
          name: "Y. Richard Yang",
          address: "AKW 208 432-6400",
          email: "cpsc.yale.edu",
        },
        catologLink:
          "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
        wesbiteLink: "http://cpsc.yale.edu",
      },
      requirements: [
        {
          name: "CORE",
          coursesCompleted: 1,
          coursesTotal: 5,
          subsections: [],
        },
        {
          name: "ELECTIVES",
          description: "Usually, courses with course numbers above 300 work for this requirement.",
          coursesCompleted: 0,
          coursesTotal: 4,
          subsections: [
            { 
              name: "YOUR COURSES",
              description: "Courses you have taken that work for this requirement.",
              courses: [] 
            },
            { 
              name: "POPULAR",
              description: "Courses that are popular for this requirement.",
              courses: []
            }
          ],
        },
        {
          name: "SENIOR REQUIREMENT",
          coursesCompleted: 0,
          coursesTotal: 1,
          subsections: [],
        },
      ],
    },
    {
      metadata: {
        name: "Computer Science",
        abbreviation: "CPSC",
        degreeType: "BACH_SCI",
        stats: { courses: 12, rating: 3.6, workload: 4.1, type: "QR" },
        students: 30,
        about:
          "The Department of Computer Science offers a B.S. degree programs, as well as four combined major programs in cooperation with other departments: Electrical Engineering and Computer Science, Computer Science and Economics, Computer Science and Mathematics, and Computer Science and Psychology. Each program not only provides a solid technical education but also allows students either to take a broad range of courses in other disciplines or to complete the requirements of a second major.",
        dus: {
          name: "Y. Richard Yang",
          address: "AKW 208 432-6400",
          email: "cpsc.yale.edu",
        },
        catologLink:
          "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
        wesbiteLink: "http://cpsc.yale.edu",
      },
      requirements: [
        {
          name: "CORE",
          coursesCompleted: 1,
          coursesTotal: 5,
          subsections: [
            { 
              courses: [RACKET] 
            },
            { 
              courses: [RACKET] 
            },
            { 
              courses: [RACKET] 
            },
            { 
              courses: [RACKET] 
            },
            { 
              courses: [RACKET] 
            }
        ],
        },
        {
          name: "ELECTIVES",
          description: "Usually, courses with course numbers above 300 work for this requirement.",
          coursesCompleted: 0,
          coursesTotal: 6,
          subsections: [
            { 
              name: "YOUR COURSES",
              courses: [] 
            },
            { 
              name: "POPULAR",
              courses: []
            }
          ],
        },
        {
          name: "SENIOR REQUIREMENT",
          coursesCompleted: 0,
          coursesTotal: 1,
          subsections: [],
        },
      ],
    },
  ],
};

export const CGSC: Program = {
  name: "Cognitive Science",
  abbreviation: "CGSC",
  degrees: [
    {
      metadata: {
        name: "Cognitive Science",
        abbreviation: "CGSC",
        degreeType: "BACH_ART",
        students: 0,
        stats: { courses: 10, rating: 3.9, workload: 3.8, type: "So" },
        about:
          "Cognitive science explores the nature of cognitive processes such as perception, reasoning, memory, attention, language, decision making, imagery, motor control, and problem solving. The goal of cognitive science, stated simply, is to understand how the mind works. Cognitive science is an inherently interdisciplinary endeavor, drawing on tools and ideas from fields such as psychology, computer science, linguistics, philosophy, economics, and neuroscience.",
        dus: {
          name: "Joshua Knobe",
          address: "102 C",
          email: "joshua.knobe@yale.edu",
        },
        catologLink:
          "https://catalog.yale.edu/ycps/subjects-of-instruction/cognitive-science/",
        wesbiteLink: "http://cogsci.yale.edu",
      },
      requirements: [
        {
          name: "PREREQUISITE", 
          coursesTotal: 1,
          coursesCompleted: 0,
          subsections: [
            {
              courses: []
            }
          ]
        },
        {  
          name: "BREADTH REQUIREMENT",
          description: "Each major is required to take a course from four of the following six areas:",
          coursesTotal: 4,
          coursesCompleted: 0,
          subsections: [
            {
              name: "COMPUTER SCIENCE",
              courses: []
            },
            {
              name: "ECONOMICS AND DECISION MAKING",
              courses: []  
            },
            {
              name: "LINGUISTICS",
              courses: []
            },
            {
              name: "NEUROSCIENCE",
              courses: []
            },
            {
              name: "PHILOSOPHY",
              courses: []  
            },
            {
              name: "PSYCHOLOGY",
              courses: []
            }
          ]
        },
        {
          name: "DEPTH REQUIREMENT",
          description: "The depth courses must be chosen from at least two disciplines, and are typically drawn from the six cognitive science subfields. All six courses must be at the intermediate or advanced level (usually 300+).",
          coursesTotal: 6,
          coursesCompleted: 0,
          subsections: [
            {
              name: "YOUR COURSES",
              courses: []
            }
          ]
        },
        {
          name: "JUNIOR COLLOQUIUM", 
          description: "In the junior year, students are required to take CGSC 395, a half-credit colloquium in which majors discuss current issues and research in cognitive science and select a senior essay topic.",
          coursesTotal: 1, 
          coursesCompleted: 0,
          subsections: [
            {
              courses: []
            }
          ]
        },
        {
          name: "SENIOR REQUIREMENT",
          coursesTotal: 1,
          coursesCompleted: 0,
          subsections: []  
        }
      ],
    },
    {
      metadata: {
        name: "Cognitive Science",
        abbreviation: "CGSC",
        degreeType: "BACH_SCI",
        students: 0,
        stats: { courses: 10, rating: 3.9, workload: 3.8, type: "So" },
        about:
          "The B.S. degree is typically awarded to students who conduct empirical research as part of their senior requirement. This normally includes designing an experiment and collecting and analyzing data.",
        dus: {
          name: "Joshua Knobe",
          address: "102 C",
          email: "joshua.knobe@yale.edu",
        },
        catologLink:
          "https://catalog.yale.edu/ycps/subjects-of-instruction/cognitive-science/",
        wesbiteLink: "http://cogsci.yale.edu",
      },
      requirements: [
        {
          name: "PREREQUISITE", 
          coursesTotal: 1,
          coursesCompleted: 0,
          subsections: [
            {
              courses: []
            }
          ]
        },
        {  
          name: "BREADTH REQUIREMENT",
          description: "Each major is required to take a course from four of the following six areas:",
          coursesTotal: 4,
          coursesCompleted: 0,
          subsections: []
        },
        {
          name: "DEPTH REQUIREMENT",
          description: "Students fulfill a depth requirement by completing six courses that focus on a specific topic or area in cognitive science. The depth courses must be chosen from at least two disciplines, and are typically drawn from the six cognitive science subfields. All six courses must be at the intermediate or advanced level (usually 300+).",
          coursesTotal: 6,
          coursesCompleted: 0,
          subsections: [
            {
              name: "YOUR COURSES",
              courses: []
            }
          ]
        },
        {
          name: "SKILLS REQUIREMENT",  
          description: "The skills requirement for the B.S. is fulfilled by PSYC 200 or another course with permission of the DUS.",
          coursesTotal: 1,
          coursesCompleted: 0,
          subsections: [
            {
              courses: []
            }
          ]
        },
        {
          name: "JUNIOR COLLOQUIUM", 
          description: "In the junior year, students are required to take CGSC 395, a half-credit colloquium in which majors discuss current issues and research in cognitive science and select a senior essay topic.",
          coursesTotal: 1, 
          coursesCompleted: 0,
          subsections: [
            {
              courses: []
            }
          ]
        },
        {
          name: "SENIOR REQUIREMENT",
          description: "The B.S. degree program requires empirical research and a senior essay.",
          coursesTotal: 1,
          coursesCompleted: 0,
          subsections: []  
        }
      ],
    },
  ],
};

export const ECON: Program = {
  name: "Economics", 
  abbreviation: "ECON",
  degrees: [{
    metadata: {
      name: "Economics", abbreviation: "ECON",
      degreeType: "BACH_ART",
      stats: { courses: 16, rating: 4.5, workload: 3.6, type: "QR", },
      students: 76,
      about: "Economics is much broader than the study of recessions and inflation or stocks and bonds. Economists study decision making and incentives such as how taxes create incentives for labor market and savings behavior. Many current public policy debates concern questions of economics, including causes and consequences of inequality and gender and racial wage gaps; how to address poverty; the impact of immigration and trade on the well-being of a country’s citizens; the cause of the Great Recession; and how to predict future downturns.",
      dus: { name: "Giovanni Maggi", address: "115 Prospect St., Rosenkranz Hall, Room 334", email: "cpsc.yale.edu", },
      catologLink: "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
      wesbiteLink: "http://cpsc.yale.edu",
    },
    requirements: [],
  }]
};
