
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
}

export interface StudentCourse {
  course: Course;
  
  enrollmentStatus: "PROSPECTIVE" | "ENROLLED" | "WITHDRAWN" | "COMPLETED";
  season: Season;
  year: string;
  letterGrade: string;
}

/*SoonToDeprecate*/

export interface ClassLists {
  readonly clHu: Array<Course>;
  readonly clSo: Array<Course>;
  readonly clSc: Array<Course>;
  readonly clQR: Array<Course>;
  readonly clWR: Array<Course>;
  readonly clL: Array<Course>;
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

