
interface Course{

}

interface DUS{
    name: string;
    address: string;
    email: string;
}

interface MajorMetadata{
    name: string;
    courses: number;
    rating: number;
    workload: number;
    type: string;
    students: number;
    about: string;
    dus: DUS;
    catologLink: string;
    wesbiteLink: string;
}

interface MajorRequirementsSubsection{
    type: string;
    courses: Array<Course>;
}

interface MajorRequirements{
    name: string;
    coursesCompleted: number;
    coursesTotal: number;
    description: string;
    subsections: Array<MajorRequirementsSubsection>;
}

export interface Major{
    metadata: MajorMetadata;
    requirements: MajorRequirements;
}

