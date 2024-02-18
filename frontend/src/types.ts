type CRN = number;

enum CourseEnrollmentStatus {
  NONE = "NONE",
  IN_PROGRESS = "IN_PROGRESS",
  VERIFIED = "VERIFIED",
  PROSPECTIVE = "PROSPECTIVE",
}

export interface DistributionalRequirement {
  title: string;
}

export interface Course {
  crn: CRN;
  all_course_codes: string[];
  skills: DistributionalRequirement[]; // Distributional requirements
  professor_names: string[];
  professor_ids: string[];
  season_code: string;
  status: CourseEnrollmentStatus;
}
