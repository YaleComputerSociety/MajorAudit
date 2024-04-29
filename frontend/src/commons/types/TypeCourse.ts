
export type Season = "FALL" | "SPRING" | "SUMMER";
export type Distribution = "Hu" | "So" | "Sc" | "QR" | "WR" | "L";

interface CourseEvaluation {
  rating: number;
  workload: number;
  professor: number;
}

export interface Course {
  code: string;
  title: string;
  seasons: Array<Season>;
  evaluation: CourseEvaluation;
  distribution: Array<Distribution>;
  description?: string;
}

export interface StudentCourse {
  course: Course;
  
  enrollmentStatus: "PROSPECTIVE" | "ENROLLED" | "WITHDRAWN" | "COMPLETED";
  season: Season;
  year: string;
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

