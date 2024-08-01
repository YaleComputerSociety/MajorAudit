
import { Program } from "../../types/TypeProgram";
import { Course } from "../../types/TypeCourse";

export const MATH118: Course = { codes: ["MATH 118"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const MATH120: Course = { codes: ["MATH 120"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON108: Course = { codes: ["ECON 108"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON110: Course = { codes: ["ECON 110"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON115: Course = { codes: ["ECON 115"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON111: Course = { codes: ["ECON 111"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON116: Course = { codes: ["ECON 116"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON121: Course = { codes: ["ECON 121"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON125: Course = { codes: ["ECON 125"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON122: Course = { codes: ["ECON 122"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON126: Course = { codes: ["ECON 126"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON117: Course = { codes: ["ECON 117"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON123: Course = { codes: ["ECON 123"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };
export const ECON136: Course = { codes: ["ECON 136"], title: "", credit: 1, areas: [], skills: [], seasons: ["Fall", "Spring"] };

export const ECON: Program = {
    name: "Economics", 
    abbreviation: "ECON",
    degrees: [
        {
						codes: [],
            metadata: {
                name: "Economics", abbreviation: "ECON",
                degreeType: "BACH_ART",
                stats: { 
                        courses: 12, 
                        rating: 4.0, 
                        workload: 4.0, 
                        type: "QR",
                    },
                students: 76,
                about: "Economics is much broader than the study of recessions and inflation or stocks and bonds. Economists study decision making and incentives such as how taxes create incentives for labor market and savings behavior. Many current public policy debates concern questions of economics, including causes and consequences of inequality and gender and racial wage gaps; how to address poverty; the impact of immigration and trade on the well-being of a country's citizens; the cause of the Great Recession; and how to predict future downturns.",
                dus: { 
                    name: "Giovanni Maggi", 
                    address: "115 Prospect St., Rosenkranz Hall, Room 334", 
                    email: "giovanni.maggi@yale.edu",
                },
                catologLink: "https://catalog.yale.edu/ycps/subjects-of-instruction/economics/",
                wesbiteLink: "economics.yale.edu/undergraduate-program",
            },
            requirements: [
                {
                    name: "Math Requirement",
                    description: "Or any Math course numbered 200 or higher.",
                    subsections: [
                        { 
                            courses: [MATH118, MATH120] 
                        },
                    ],
                },
                {
                    name: "Introductory Economics",
                    subsections: [
                        { 
                            name: "Microeconomics",
                            description: "NA",
                            courses: [ECON108, ECON110, ECON115] 
                        },
                        { 
                            name: "Macroeconomics",
                            description: "NA",
                            courses: [ECON111, ECON116] 
                        },
                    ],
                },
                {
                    name: "Intermediate Economics",
                    subsections: [
                        { 
                            name: "Microeconomics",
                            courses: [ECON121, ECON125] 
                        },
                        { 
                            name: "Microeconomics",
                            courses: [ECON122, ECON126] 
                        },
                    ],
                },
                {
                    name: "Econometrics",
                    subsections: [
                        { 
                            courses: [ECON117, ECON123, ECON126] 
                        },
                    ],
                },
                {
                    name: "Electives",
                    description: "Any ECON course numbered 123 or above.",
                    subsections: [
                        { 
                            courses: [] 
                        },
                    ],
                },
                {
                    name: "Senior Requirement",
                    description: "Two courses numbered ECON 400-491.",
                    subsections: [
                        { 
                            courses: [] 
                        },
                    ],
                },
            ],
        }
    ]   
};
