import { useContext, createContext } from 'react';
import { Course } from "../types/TypeCourse";

export const CurrentCourseContext = createContext<Course | undefined>(undefined);

export function useCourseContext() {
    const course = useContext(CurrentCourseContext);

    // if (course === undefined) {
    //     throw new Error("useCourseContext must be used with a CurrentCourseContext")
    // }

    return course;
}