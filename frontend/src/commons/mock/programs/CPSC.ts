
import { Program } from "../../types/TypeProgram";
import { Course } from "../../types/TypeCourse";

export const CPSC201: Course = { codes: ["CPSC 201"], title: "Introduction", credit: 1, areas: [], skills: [], seasons: [] };
export const CPSC202: Course = { codes: ["CPSC 202"], title: "Math Tools", credit: 1, areas: [], skills: [], seasons: [] };
export const CPSC223: Course = { codes: ["CPSC 223"], title: "Data Structures", credit: 1, areas: [], skills: [], seasons: [] };
export const CPSC323: Course = { codes: ["CPSC 323"], title: "Systems", credit: 1, areas: [], skills: [], seasons: [] };
export const CPSC365: Course = { codes: ["CPSC 365"], title: "Algorithms", credit: 1, areas: [], skills: [], seasons: [] };


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
          subsections: [
            { 
              courses: [CPSC201] 
            },
            { 
              courses: [CPSC202] 
            },
            { 
              courses: [CPSC223] 
            },
            { 
              courses: [CPSC323] 
            },
            { 
              courses: [CPSC365] 
            }
        ],
        },
        {
          name: "ELECTIVES",
          description: "Usually, courses with course numbers above 300 work for this requirement.",
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
          subsections: [
            { 
              courses: [CPSC201] 
            },
            { 
              courses: [CPSC223] 
            },
            { 
              courses: [CPSC323] 
            },
            { 
              courses: [CPSC365] 
            }
        ],
        },
        {
          name: "ELECTIVES",
          description: "Usually, courses with course numbers above 300 work for this requirement.",
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
          subsections: [],
        },
      ],
    },
  ],
};