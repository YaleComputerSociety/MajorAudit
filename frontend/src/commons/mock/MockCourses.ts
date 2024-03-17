
import {Course, StudentCourse } from "./../types/TypeCourse";

const CPSC201: Course = { studentCourse: true, code: "CPSC 201", title: "Title CPSC201", seasons: ["FALL", "SPRING"],  evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC202: Course = { studentCourse: false, code: "CPSC 202", title: "Title CPSC202", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const MATH244: Course = { studentCourse: false, code: "MATH 244", title: "Title MATH244", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC223: Course = { studentCourse: true, code: "CPSC 223", title: "Title CPSC223", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC323: Course = { studentCourse: true, code: "CPSC 323", title: "Title CPSC323", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC365: Course = { studentCourse: false, code: "CPSC 365", title: "Title CPSC365", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };

const Student201: StudentCourse = { course: CPSC201, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023", letterGrade: "A-" };
const Student223: StudentCourse = { course: CPSC201, enrollmentStatus: "COMPLETED", season: "SPRING", year: "2022-2023", letterGrade: "A" };
const Student323: StudentCourse = { course: CPSC201, enrollmentStatus: "ENROLLED", season: "FALL", year: "2022-2023", letterGrade: "" };

export const MockCourses = [
    CPSC201,
    CPSC202,
    MATH244,
    CPSC223,
    CPSC323,
    CPSC365,
];

export const MockStudentCourses = [
    Student201,
    Student223,
    Student323,
];