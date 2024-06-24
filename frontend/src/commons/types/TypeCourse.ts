
export type Season = "Fall" | "Spring";
export type Distribution = "Hu" | "So" | "Sc" | "QR" | "WR" | "L";

interface CourseEvaluation {
  rating: number;
  workload: number;
  professor: number;
}

export interface Course {
  code: string;
  title: string;
  distribution: Array<string>;
  seasons: Array<string>;
  description?: string;
}

export interface StudentCourse {
  course: Course;
  
  status: string;
  season: string;
  year: number;
}

/*SoonToDeprecate*/

export interface ClassLists {
  clHu: Array<StudentCourse>;
  clSo: Array<StudentCourse>;
  clSc: Array<StudentCourse>;
  clQR: Array<StudentCourse>;
  clWR: Array<StudentCourse>;
  clL: Array<StudentCourse>;
}

// /*Other*/

// type CRN = number;

// interface DistributionalRequirementDIFF {
//   title: string;
// }

// interface CourseDIFF {
//   crn: CRN;
//   all_course_codes: string[];
//   skills: DistributionalRequirementDIFF[]; // Distributional requirements
//   // professor_names: string[];
//   // professor_ids: string[];
//   // season_code: string;
// }

