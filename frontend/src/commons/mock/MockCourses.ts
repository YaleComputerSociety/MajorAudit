
import {Course, StudentCourse } from "./../types/TypeCourse";

const CPSC201: Course = { code: "CPSC 201", title: "Title CPSC201", description: "CPSC 201 is ... ", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC202: Course = { code: "CPSC 202", title: "Title CPSC202", description: "CPSC 202 is ... ", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const MATH244: Course = { code: "MATH 244", title: "Title MATH244", description: "CPSC 244 is ... ", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC223: Course = { code: "CPSC 223", title: "Title CPSC223", description: "CPSC 223 is ... ", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC323: Course = { code: "CPSC 323", title: "Title CPSC323", description: "CPSC 323 is ... ", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC365: Course = { code: "CPSC 365", title: "Title CPSC365", description: "CPSC 365 is ... ", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CGSC110: Course = { code: "CGSC 110", title: "Title CGSC110", description: "CGSC 110 is ... ", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["So"] };

const CPSC437: Course = {
    code: "CPSC 437",
    title: "Database Systems",
    description: "Introduction to database systems, data modeling, and query languages such as SQL.",
    seasons: ["FALL"],
    evaluation: { rating: 4.0, workload: 4.2, professor: 4.5 },
    distribution: ["QR"]
};
const CPSC478: Course = {
    code: "CPSC 478",
    title: "Computer Graphics",
    description: "Techniques for modeling, rendering, and animating 2D and 3D scenes.",
    seasons: ["FALL"],
    evaluation: { rating: 4.6, workload: 4.8, professor: 4.7 },
    distribution: ["QR"]
};
const CPSC370: Course = {
    code: "CPSC 370",
    title: "Artificial Intelligence",
    description: "Introduction to artificial intelligence techniques, including search, constraint satisfaction, and machine learning.",
    seasons: ["SPRING"],
    evaluation: { rating: 4.2, workload: 4.4, professor: 4.3 },
    distribution: ["QR"]
};
const CPSC481: Course = {
    code: "CPSC 481",
    title: "Introduction to Machine Learning",
    description: "Techniques for building computer systems that learn from data, including supervised and unsupervised learning.",
    seasons: ["SPRING"],
    evaluation: { rating: 4.5, workload: 4.6, professor: 4.4 },
    distribution: ["QR"]
};
const CPSC439: Course = {
    code: "CPSC 439",
    title: "Software Engineering",
    description: "Introduction to software engineering principles, including design patterns, testing, and project management.",
    seasons: ["FALL"],
    evaluation: { rating: 4.1, workload: 4.3, professor: 4.0 },
    distribution: ["QR"]
};

export const EMPTYCOURSE: Course = { code: "N/A", title: "Title NULL", description: "No course", seasons: [], evaluation: { rating: 3, workload: 3, professor: 3}, distribution: [] };

const Student110: StudentCourse = { course: CGSC110, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };

const Student201: StudentCourse = { course: CPSC201, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023" };
const Student223: StudentCourse = { course: CPSC223, enrollmentStatus: "COMPLETED", season: "SPRING", year: "2022-2023" };
const Student323: StudentCourse = { course: CPSC323, enrollmentStatus: "ENROLLED", season: "FALL", year: "2022-2023" };

const CGSC274: Course = { code: "CGSC 274", title: "Title CGSC274", description: "CGSC 274 is ... ", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR", "Sc", "So"] };
const Student274: StudentCourse = { course: CGSC274, enrollmentStatus: "COMPLETED", season: "FALL", year: "2023-2024" };

// make a dictionary of Course objects
export const MockCourses: { [key: string]: Course | StudentCourse } = {
    "CGSC 110": Student110,
    "CPSC 201": CPSC201,
    "CPSC 202": CPSC202,
    "MATH 244": MATH244,
    "CPSC 223": Student223,
    "CPSC 323": CPSC323,
    "CPSC 365": CPSC365,
    "CGSC 274": CGSC274,
    "CPSC 437": CPSC437,
    "CPSC 478": CPSC478,
    "CPSC 370": CPSC370,
    "CPSC 481": CPSC481,
    "CPSC 439": CPSC439
};

// a function that returns a course if in the dictionary, otherwise return an empty course
export function getCourse(courseCode: string): Course | StudentCourse {
    return MockCourses[courseCode] || EMPTYCOURSE;
}

export const MockStudentCourses = [
    Student201,
    Student223,
    Student323,
    Student274,
];
