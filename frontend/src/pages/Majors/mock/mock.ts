
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
      about: "The Computer Science major is an engaging and dynamic field of study that delves into the complexities of power, governance, and public affairs. It encourages students to critically analyze political systems, philosophies, and behaviors. The major offers diverse subfields like American government, international relations, political philosophy, and comparative politics, allowing for a broad understanding of global and domestic politics. Interdisciplinary options are available for those interested in blending political studies with other areas. It's ideal for those who are intrigued by current events, passionate about understanding the mechanisms of power and governance, and keen on developing analytical and critical thinking skills.",
      dus: { name: "Y. Richard Yang", address: "AKW 208 432-6400", email: "cpsc.yale.edu",},
      catologLink: "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
      wesbiteLink: "http://cpsc.yale.edu",
    },
    requirements: [
      {
        name: "CORE", coursesCompleted: 1, coursesTotal: 5,
        subsections: [
          { courses: [{ code: "CPSC 201", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 202", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 223", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 323", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 365", distributions: ["QR"] }],},],
      },
      {
        name: "ELECTIVES", coursesCompleted: 2, coursesTotal: 4, description: "Usually, courses with course numbers above 300 work for this requirement.",
        subsections: [ { courses: [{ code: "LING 385", distributions: ["QR"] }, { code: "NSCI 258", distributions: ["QR"] }],},],
      },
      {
        name: "SENIOR REQUIREMENT", coursesCompleted: 0, coursesTotal: 1,
        subsections: [ { courses: [{ code: "CPSC 490", distributions: ["QR"] }],},],
      },
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
    requirements: [
      {
        name: "CORE", coursesCompleted: 0, coursesTotal: 5,
        subsections: [
          { courses: [{ code: "CPSC 201", distributions: ["QR"] }], },
          { courses: [{ code: "MATH 244", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 223", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 323", distributions: ["QR"] }], },
          { courses: [{ code: "CPSC 366", distributions: ["QR"] }],},],
      },
      {
        name: "ELECTIVES", coursesCompleted: 0, coursesTotal: 4, description: "Usually, courses with course numbers above 300 work for this requirement.",
        subsections: [ { courses: [{ code: "LING 385", distributions: ["QR"] }, { code: "NSCI 258", distributions: ["QR"] }, { code: "LING 385", distributions: ["QR"] }, { code: "NSCI 258", distributions: ["QR"] }],},],
      },
      {
        name: "SENIOR REQUIREMENT", coursesCompleted: 0, coursesTotal: 2,
        subsections: [ { courses: [{ code: "CPSC 490", distributions: ["QR"] }, { code: "CPSC 500", distributions: ["QR"] }],},],
      },
    ]
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
          { courses: [{ code: "ECON 121", distributions: ["QR", "Sc"] }, { code: "ECON 125", distributions: ["QR", "Sc"] }], },
          { courses: [{ code: "ECON 122", distributions: ["QR", "Sc"] }, { code: "ECON 126", distributions: ["QR", "Sc"] }], },
        ],
      },
      {
        name: "ECONOMETRICS", coursesCompleted: 0, coursesTotal: 1,
        subsections: [
          { courses: [{ code: "ECON 117", distributions: ["QR", "Sc"] }, { code: "ECON 123", distributions: ["QR", "Sc"] }, { code: "ECON 136", distributions: ["QR", "Sc"] },], },
        ],
      },
      {
        name: "SENIOR REQUIREMENT", coursesCompleted: 0, coursesTotal: 2,
        subsections: [
          { courses: [{ code: "ECON 490", distributions: ["QR", "Sc", "WR"] }, { code: "ECON 500", distributions: ["QR", "Sc", "WR"] }], },
        ],
      },
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
      about: "Economics is much broader than the study of recessions and inflation or stocks and bonds. Economists study decision making and incentives such as how taxes create incentives for labor market and savings behavior. Many current public policy debates concern questions of economics, including causes and consequences of inequality and gender and racial wage gaps; how to address poverty; the impact of immigration and trade on the well-being of a country’s citizens; the cause of the Great Recession; and how to predict future downturns.",
      dus: { name: "Giovanni Maggi", address: "115 Prospect St., Rosenkranz Hall, Room 334", email: "cpsc.yale.edu", },
      catologLink: "https://catalog.yale.edu/ycps/subjects-of-instruction/computer-science/",
      wesbiteLink: "http://cpsc.yale.edu",
    },
    requirements: [
      {
        name: "ELECTIVES", coursesCompleted: 0, coursesTotal: 3, 
        subsections: [
          { courses: [{ code: "HIST NNN", distributions: ["Hu", "WR"] }, { code: "HIST NNN", distributions: ["Hu", "WR"] }, { code: "HIST NNN", distributions: ["Hu", "WR"] },], },
        ],
      },
      {
        name: "SENIOR REQUIREMENT", coursesCompleted: 0, coursesTotal: 2,
        subsections: [
          { courses: [{ code: "HIST 490", distributions: ["Hu", "WR"] }, { code: "HIST 500", distributions: ["Hu", "WR"] }], },
        ],
      },
    ],
  }]
};
