
import { Program } from "../../../commons/types";

export const CPSC: Program = {
  name: "Computer Science",
  abbreviation: "CPSC",
  degrees: [{
    metadata: {
      name: "Computer Science", abbreviation: "CPSC",
      degreeType: "BACH_ART",
      stats: { courses: 10, rating: 4.0, workload: 3.8, type: "QR",},
      students: 91,
      about: "The Department of Computer Science offers both B.S. and B.A. degree programs, as well as four combined major programs in cooperation with other departments: Electrical Engineering and Computer Science, Computer Science and Economics, Computer Science and Mathematics, and Computer Science and Psychology. Each program not only provides a solid technical education but also allows students either to take a broad range of courses in other disciplines or to complete the requirements of a second major.",
      dus: { name: "Y. Richard Yang", address: "AKW 208 432-6400", email: "cpsc.yale.edu",},
      catologLink: "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
      wesbiteLink: "http://cpsc.yale.edu",
    },
    requirements: [
      {
        name: "CORE", coursesCompleted: 1, coursesTotal: 5,
        subsections: [
          { courses: [{ code: "CPSC 201", seasons: ["FALL", "SPRING"], status: "COMPLETED", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 202", seasons: ["FALL", "SPRING"], status: "NONE", distributions: ["QR"] }, { code: "MATH 244", seasons: ["FALL", "SPRING"], status: "NONE", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 223", seasons: ["FALL", "SPRING"], status: "COMPLETED", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 323", seasons: ["FALL", "SPRING"], status: "COMPLETED", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 365", seasons: ["FALL", "SPRING"], status: "NONE", distributions: ["QR"] }],},],
      }
      ]
  },
  {
    metadata: {
      name: "Computer Science", abbreviation: "CPSC",
      degreeType: "BACH_SCI",
      stats: { courses: 12, rating: 4.0, workload: 4.0, type: "QR",},
      students: 32,
      about: "The Computer Science major is an engaging and dynamic field of study that delves into the complexities of power, governance, and public affairs. It encourages students to critically analyze political systems, philosophies, and behaviors. The major offers diverse subfields like American government, international relations, political philosophy, and comparative politics, allowing for a broad understanding of global and domestic politics. Interdisciplinary options are available for those interested in blending political studies with other areas. It's ideal for those who are intrigued by current events, passionate about understanding the mechanisms of power and governance, and keen on developing analytical and critical thinking skills.",
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
    requirements: [
      {
        name: "INTERMEDIATE ECONOMICS",
        coursesCompleted: 0,
        coursesTotal: 2,
        subsections: [
          { courses: [], },
          { courses: [], },
        ],
      }
    ],
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
