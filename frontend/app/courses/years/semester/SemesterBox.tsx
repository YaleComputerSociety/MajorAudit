// frontend/app/courses/years/semester/SemesterBox.tsx

import React from "react";
import Style from "./SemesterBox.module.css";
import { StudentSemester } from "../../CoursesTyping";
import { TransformTermNumber } from "../../../../utils/course-display/CourseDisplay";
import CourseBox from "./course/CourseBox";

const SemesterBox = React.memo(
  ({ studentSemester }: { studentSemester: StudentSemester }) => {
    return (
      <div className={Style.Column} style={{ minWidth: "440px", marginBottom: "8px" }}>
        <div style={{ marginBottom: "6px" }}>
          {TransformTermNumber(studentSemester.term)}
        </div>
        <div className={Style.Column}>
          {studentSemester.studentCourses.map((studentCourse) => (
            <CourseBox
              key={studentCourse.id || `temp-${studentCourse.courseOffering.abstractCourse.codes[0]}`}
              studentCourse={studentCourse}
            />
          ))}
        </div>
      </div>
    );
  },
  // Custom comparison function to control re-renders
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
    // This ensures we update when courses are added/removed
    const prevIds = prevCourses.map(c => c.id).sort().join(',');
    const nextIds = nextCourses.map(c => c.id).sort().join(',');
    
    return prevIds === nextIds;
  }
);

export default SemesterBox;