
export interface Course {
  code: string;
  semesters?: string;
  hasCheck?: boolean;
  distributions: Array<string>;
}

export interface ClassLists {
  readonly clHu: Array<Course>;
  readonly clSo: Array<Course>;
  readonly clSc: Array<Course>;
  readonly clQR: Array<Course>;
  readonly clWR: Array<Course>;
  readonly clL: Array<Course>;
}

/****************************************************************************/

interface DUS {
  name: string;
  address: string;
  email: string;
}

interface DegreeMetadataStats {
  courses: number;
  rating: number;
  workload: number;
  type: string;
}

type DegreeType = 'BACH_ART' | 'BACH_SCI' | 'BACH_INTENSIVE';

interface DegreeMetadata {
  name: string;
  abbreviation: string;
  degreeType: DegreeType;
  stats: DegreeMetadataStats;
  students: number;
  about: string;
  dus: DUS;
  catologLink: string;
  wesbiteLink: string;
}

interface DegreeRequirementsSubsection {
  courses: Array<Course>;
}

interface DegreeRequirements {
  name: string;
  coursesCompleted: number;
  coursesTotal: number;
  description?: string;
  subsections: Array<DegreeRequirementsSubsection>;
}

export interface Degree {
  metadata: DegreeMetadata;
  requirements: Array<DegreeRequirements>;
}

export interface Program {
  name: string;
  abbreviation: string;
  degrees: Array<Degree>;
}
