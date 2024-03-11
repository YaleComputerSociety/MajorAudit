interface Course {
  name: string;
}

interface DUS {
  name: string;
  address: string;
  email: string;
}

export interface MajorMetadataStats {
  courses: number;
  rating: number;
  workload: number;
  type: string;
}

interface MajorMetadata {
  name: string;
  abbreviation: string;
  stats: MajorMetadataStats;
  students: number;
  about: string;
  dus: DUS;
  catologLink: string;
  wesbiteLink: string;
}

interface MajorRequirementsSubsection {
  name?: string;
  courses: Array<Course>;
}

interface MajorRequirements {
  name: string;
  coursesCompleted: number;
  coursesTotal: number;
  description?: string;
  subsections: Array<MajorRequirementsSubsection>;
}

export interface Major {
  metadata: MajorMetadata;
  requirements: Array<MajorRequirements>;
}
