// frontend/app/courses/years/YearBox.tsx

import React from "react";
import { StudentYear, StudentSemester } from "../CoursesTyping";
import SemesterBox from "./semester/SemesterBox";

const YearBox = React.memo(
  ({
    columns,
    studentYear,
  }: {
    columns: boolean;
    studentYear: StudentYear;
  }) => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontWeight: "600", fontSize: "25px", marginRight: "10px" }}>
          {studentYear.grade}
        </div>
        <div style={{ display: "flex", flexDirection: columns ? "column" : "row" }}>
          {studentYear.studentSemesters
            .filter((s: StudentSemester) => s.term !== "0")
            .map((studentSemester: StudentSemester) => (
              <SemesterBox 
                key={studentSemester.term} 
                studentSemester={studentSemester} 
              />
            ))}
        </div>
      </div>
    );
  },
  // Custom comparison function to control re-renders
  (prevProps, nextProps) => {
    // Re-render if columns layout changed
    if (prevProps.columns !== nextProps.columns) return false;
    
    // Re-render if year grade changed
    if (prevProps.studentYear.grade !== nextProps.studentYear.grade) return false;
    
    // Re-render if semester count changed
    if (prevProps.studentYear.studentSemesters.length !== 
        nextProps.studentYear.studentSemesters.length) return false;
    
    // Check if any semester changed (by term or by course count)
    for (let i = 0; i < prevProps.studentYear.studentSemesters.length; i++) {
      const prevSem = prevProps.studentYear.studentSemesters[i];
      const nextSem = nextProps.studentYear.studentSemesters[i];
      
      if (prevSem.term !== nextSem.term) return false;
      
      // Check if course count changed
      if (prevSem.studentCourses.length !== nextSem.studentCourses.length) return false;
      
      // Check if any course IDs changed
			const prevCourseKeys = new Set(prevSem.studentCourses.map(c => `${c.id}-${c.is_hidden}`));
			const nextCourseKeys = new Set(nextSem.studentCourses.map(c => `${c.id}-${c.is_hidden}`));
			
      
			if (prevCourseKeys.size !== nextCourseKeys.size) return false;
			for (const key of prevCourseKeys) {
				if (!nextCourseKeys.has(key)) return false;
			}
    }
    
    // No relevant changes detected, skip re-render
    return true;
  }
);

export default YearBox;