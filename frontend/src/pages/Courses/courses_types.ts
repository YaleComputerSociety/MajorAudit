
export interface CourseEvaluation {
    rating: number;
    workload: number;
    professor: number;
}

export interface Course {
    completed: boolean;
    season: "FALL" | "SPRING";
    letterGrade: string;
    code: string;
    name: string;
    evaluation: CourseEvaluation;
    distribution: Array<string>;
}

export interface Semester {
    courses: Array<Course>;
}
export interface Year {
    grade: "First-Year" | "Sophomore" | "Junior" | "Senior";
    calendarYear: string;
    fall : Semester;
    spring: Semester;
}

export interface Student {
    metadata: Array<Year>;
}
