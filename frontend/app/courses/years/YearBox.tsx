// frontend/app/courses/years/YearBox.tsx

import React from "react";
import Style from "./YearBox.module.css"
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
	const { lastDragTimestamp, isYearCollapsed, toggleYearCollapsed } = useCoursesPage();
	const collapsed = isYearCollapsed(studentYear.grade);

  return (
    <div className={Style.Column}>
			<button
				className={Style.YearButton}
				onClick={() => toggleYearCollapsed(studentYear.grade)}
				style={{ color: collapsed ? "#888888" : "#000000" }}
			>
				{studentYear.grade}
			</button>
			{!collapsed && (
				<div style={{ display: "flex", flexDirection: columns ? "column" : "row" }}>
					{studentYear.studentSemesters
						.filter((s: StudentSemester) => s.term !== "0")
						.map((studentSemester: StudentSemester) => (
							<SemesterBox
								key={`semester-${studentSemester.term}-${lastDragTimestamp}`}
								studentSemester={studentSemester}
								term={studentSemester.term}
							/>
						))}
				</div>
			)}
    </div>
  );
};

export default YearBox;