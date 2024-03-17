
import { Program } from "./../types/TypeProgram";
import { MockCourses } from "./../mock/MockCourses";

export const CPSC: Program = {
  name: "Computer Science",
  abbreviation: "CPSC",
  degrees: [{
    metadata: {
      name: "Computer Science", abbreviation: "CPSC",
      degreeType: "BACH_ART",
      stats: { courses: 10, rating: 3.9, workload: 3.8, type: "QR",},
      students: 90,
      about: "The Department of Computer Science offers a B.A. degree program, as well as four combined major programs in cooperation with other departments: Electrical Engineering and Computer Science, Computer Science and Economics, Computer Science and Mathematics, and Computer Science and Psychology. Each program not only provides a solid technical education but also allows students either to take a broad range of courses in other disciplines or to complete the requirements of a second major.",
      dus: { name: "Y. Richard Yang", address: "AKW 208 432-6400", email: "cpsc.yale.edu",},
      catologLink: "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
      wesbiteLink: "http://cpsc.yale.edu",
    },
    requirements: [
      {
        name: "CORE", coursesCompleted: 1, coursesTotal: 5,
        subsections: [
          { courses: [MockCourses[0]], },
          { courses: [MockCourses[1], MockCourses[2]], },
          { courses: [MockCourses[3]], },
          { courses: [MockCourses[4]], },
          { courses: [MockCourses[5]],},
        ],
      }
    ]
  },
  {
    metadata: {
      name: "Computer Science", abbreviation: "CPSC",
      degreeType: "BACH_SCI",
      stats: { courses: 12, rating: 3.6, workload: 4.1, type: "QR",},
      students: 30,
      about: "The Department of Computer Science offers a B.S. degree programs, as well as four combined major programs in cooperation with other departments: Electrical Engineering and Computer Science, Computer Science and Economics, Computer Science and Mathematics, and Computer Science and Psychology. Each program not only provides a solid technical education but also allows students either to take a broad range of courses in other disciplines or to complete the requirements of a second major.",
      dus: { name: "Y. Richard Yang", address: "AKW 208 432-6400", email: "cpsc.yale.edu",},
      catologLink: "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
      wesbiteLink: "http://cpsc.yale.edu",
    },
    requirements: []
  }]
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

export const HIST: Program = {
  name: "History", 
  abbreviation: "HIST",
  degrees: [{
    metadata: {
      name: "History", abbreviation: "HIST",
      degreeType: "BACH_ART",
      stats: { courses: 16, rating: 4.5, workload: 3.6, type: "Hu", },
      students: 76,
      about: "The History major is for students who understand that shaping the future requires knowing the past. History courses explore many centuries of human experimentation and ingenuity, from the global to the individual scale. History majors learn to be effective storytellers and analysts, and to craft arguments that speak to broad audiences. They make extensive use of Yale’s vast library resources to create pioneering original research projects. Students of history learn to think about politics and government, sexuality, the economy, cultural and intellectual life, war and society, and other themes in broadly humanistic—rather than narrowly technocratic—ways.",
      dus: { name: "Giovanni Maggi", address: "115 Prospect St., Rosenkranz Hall, Room 334", email: "cpsc.yale.edu", },
      catologLink: "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
      wesbiteLink: "http://cpsc.yale.edu",
    },
    requirements: [],
  }]
};
