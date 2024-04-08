
import {Course, StudentCourse } from "./../types/TypeCourse";

const CPSC201: Course = { code: "CPSC 201", title: "Title CPSC201", seasons: ["FALL", "SPRING"],  evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC202: Course = { code: "CPSC 202", title: "Title CPSC202", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const MATH244: Course = { code: "MATH 244", title: "Title MATH244", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC223: Course = { code: "CPSC 223", title: "Title CPSC223", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC323: Course = { code: "CPSC 323", title: "Title CPSC323", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };
const CPSC365: Course = { code: "CPSC 365", title: "Title CPSC365", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR"] };

const Student201: StudentCourse = { course: CPSC201, enrollmentStatus: "COMPLETED", season: "FALL", year: "2022-2023", letterGrade: "A-" };
const Student223: StudentCourse = { course: CPSC223, enrollmentStatus: "COMPLETED", season: "SPRING", year: "2022-2023", letterGrade: "A" };
const Student323: StudentCourse = { course: CPSC323, enrollmentStatus: "ENROLLED", season: "FALL", year: "2022-2023", letterGrade: "" };

const CGSC274: Course = { code: "CGSC 274", title: "Title CGSC274", seasons: ["FALL", "SPRING"], evaluation: { rating: 4.1, workload: 4.2, professor: 5}, distribution: ["QR", "Sc", "So"] };
const Student274: StudentCourse = { course: CGSC274, enrollmentStatus: "COMPLETED", season: "FALL", year: "2023-2024", letterGrade: "B" };

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
    Student274,
];
