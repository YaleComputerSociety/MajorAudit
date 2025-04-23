// frontend/app/courses/years/semester/SemesterBox.tsx

import React from "react";
import Style from "./SemesterBox.module.css";
import { StudentSemester } from "../../CoursesTyping";
import { TransformTermNumber } from "../../../../utils/course-display/CourseDisplay";
import CourseBox from "./course/CourseBox";
import { useCoursesPage } from "@/context/CoursesContext";

const SemesterBox = React.memo(
  ({ studentSemester }: { studentSemester: StudentSemester }) => {
    const { editMode } = useCoursesPage();

    // Only show non-hidden courses unless we're in edit mode
    const visibleCourses = editMode
      ? studentSemester.studentCourses
      : studentSemester.studentCourses.filter(course => !course.is_hidden);

    return (
      <div className={Style.Column} style={{ minWidth: "440px", marginBottom: "8px" }}>
        <div style={{ marginBottom: "6px" }}>
          {TransformTermNumber(studentSemester.term)}
        </div>
        <div className={Style.Column}>
          {visibleCourses.map((studentCourse) => (
            <CourseBox
              key={studentCourse.id || `temp-${studentCourse.courseOffering.abstractCourse.codes[0]}`}
              studentCourse={studentCourse}
            />
          ))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Always re-render if term changed
    if (prevProps.studentSemester.term !== nextProps.studentSemester.term) {
      return false;
    }

    const prevCourses = prevProps.studentSemester.studentCourses;
    const nextCourses = nextProps.studentSemester.studentCourses;

    // Re-render if course count changed
    if (prevCourses.length !== nextCourses.length) {
      return false;
    }

    // Check if any course changed by ID
		const prevKeys = prevCourses.map(c => `${c.id}-${c.is_hidden}`).join(',');
		const nextKeys = nextCourses.map(c => `${c.id}-${c.is_hidden}`).join(',');
		
		return prevKeys === nextKeys;
  }
);

export default SemesterBox;
