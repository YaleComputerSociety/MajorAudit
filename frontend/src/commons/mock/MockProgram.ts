
import { Program } from "./../types/TypeProgram";


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
          subsections: [
            {
              courses: []
            }
          ]
        },
        {  
          name: "BREADTH REQUIREMENT",
          description: "Each major is required to take a course from four of the following six areas:",
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
          subsections: [
            {
              courses: []
            }
          ]
        },
        {
          name: "SENIOR REQUIREMENT",
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
          subsections: [
            {
              courses: []
            }
          ]
        },
        {  
          name: "BREADTH REQUIREMENT",
          description: "Each major is required to take a course from four of the following six areas:",
          subsections: []
        },
        {
          name: "DEPTH REQUIREMENT",
          description: "Students fulfill a depth requirement by completing six courses that focus on a specific topic or area in cognitive science. The depth courses must be chosen from at least two disciplines, and are typically drawn from the six cognitive science subfields. All six courses must be at the intermediate or advanced level (usually 300+).",
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
          subsections: [
            {
              courses: []
            }
          ]
        },
        {
          name: "JUNIOR COLLOQUIUM", 
          description: "In the junior year, students are required to take CGSC 395, a half-credit colloquium in which majors discuss current issues and research in cognitive science and select a senior essay topic.",
          subsections: [
            {
              courses: []
            }
          ]
        },
        {
          name: "SENIOR REQUIREMENT",
          description: "The B.S. degree program requires empirical research and a senior essay.",
          subsections: []  
        }
      ],
    },
  ],
};
