// frontend/app/courses/years/YearBox.tsx

import React from "react";
import { StudentYear, StudentSemester } from "../CoursesTyping";
import SemesterBox from "./semester/SemesterBox";
import { useCoursesPage } from "@/context/CoursesContext";

const YearBox = ({
  columns,
  studentYear,
}: {
  columns: boolean;
  studentYear: StudentYear;
}) => {
	const { lastDragTimestamp } = useCoursesPage();

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
							key={`semester-${studentSemester.term}-${lastDragTimestamp}`}
              studentSemester={studentSemester}
              term={studentSemester.term} // <-- Pass term for dnd detection
            />
          ))}
      </div>
    </div>
  );
};

export default YearBox;