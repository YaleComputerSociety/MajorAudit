
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
          { courses: [{ name: "CPSC 201" }], },
          { courses: [{ name: "CPSC 202" }, { name: "MATH 244" }], },
          { courses: [{ name: "CPSC 223" }], },
          { courses: [{ name: "CPSC 323" }], },
          { courses: [{ name: "CPSC 365" }, { name: "CPSC 366" }, { name: "CPSC 368" },],},],
      },
      {
        name: "ELECTIVES", coursesCompleted: 2, coursesTotal: 8, description: "Usually, courses with course numbers above 300 work for this requirement.",
        subsections: [ { courses: [{ name: "LING 385" }, { name: "NSCI 258" }],},],
      },
      {
        name: "SENIOR REQUIREMENT", coursesCompleted: 0, coursesTotal: 1,
        subsections: [ { courses: [{ name: "CPSC 490" }],},],
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
        name: "CORE", coursesCompleted: 1, coursesTotal: 5,
        subsections: [
          { courses: [{ name: "CPSC 201" }], },
          { courses: [{ name: "CPSC 202" }, { name: "MATH 244" }], },
          { courses: [{ name: "CPSC 223" }], },
          { courses: [{ name: "CPSC 323" }], },
          { courses: [{ name: "CPSC 365" }, { name: "CPSC 366" }, { name: "CPSC 368" },],},],
      },
      {
        name: "ELECTIVES", coursesCompleted: 2, coursesTotal: 8, description: "Usually, courses with course numbers above 300 work for this requirement.",
        subsections: [ { courses: [{ name: "LING 385" }, { name: "NSCI 258" }],},],
      },
      {
        name: "SENIOR REQUIREMENT", coursesCompleted: 0, coursesTotal: 1,
        subsections: [ { courses: [{ name: "CPSC 490" }, { name: "CPSC 490" }],},],
      },
    ]
  }]
};

export const ECON: Program = {
  name: "Economics", 
  abbreviation: "Econ",
  degrees: [{
    metadata: {
      name: "Economics", abbreviation: "Econ",
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
          { courses: [{ name: "ECON 121" }, { name: "ECON 125" }], },
          { courses: [{ name: "ECON 122" }, { name: "ECON 126" }], },
        ],
      },
      {
        name: "ECONOMETRICS", coursesCompleted: 0, coursesTotal: 1,
        subsections: [
          { courses: [{ name: "ECON 117" }, { name: "ECON 123" }, { name: "ECON 136" },], },
        ],
      },
      {
        name: "ELECTIVES", coursesCompleted: 0, coursesTotal: 4, 
        subsections: [
          { courses: [{ name: "ECON NNN" }, { name: "ECON NNN" }, { name: "ECON NNN" },], },
        ],
      },
      {
        name: "SENIOR REQUIREMENT", coursesCompleted: 0, coursesTotal: 2,
        subsections: [
          { courses: [{ name: "CPSC 490" }, { name: "CPSC 500" }], },
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
          { courses: [{ name: "ECON 121" }, { name: "ECON 125" }], },
          { courses: [{ name: "ECON 122" }, { name: "ECON 126" }], },
        ],
      },
      {
        name: "ECONOMETRICS", coursesCompleted: 0, coursesTotal: 1,
        subsections: [
          { courses: [{ name: "ECON 117" }, { name: "ECON 123" }, { name: "ECON 136" },], },
        ],
      },
      {
        name: "ELECTIVES", coursesCompleted: 0, coursesTotal: 4, 
        subsections: [
          { courses: [{ name: "ECON NNN" }, { name: "ECON NNN" }, { name: "ECON NNN" },], },
        ],
      },
      {
        name: "SENIOR REQUIREMENT", coursesCompleted: 0, coursesTotal: 2,
        subsections: [
          { courses: [{ name: "CPSC 490" }, { name: "CPSC 500" }], },
        ],
      },
    ],
  }]
};
