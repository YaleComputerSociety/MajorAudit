export interface Course {
    name: string;
    hasCompleted: string;
    // distributional: string;
}
export interface Semester {
    season: string;
    courses: Array<Course>;
}
export interface Year {
    name: string;
    calendarYear: string;
    fall : Semester;
    spring: Semester;
}

export interface Student {
    metadata: Array<Year>;
}
