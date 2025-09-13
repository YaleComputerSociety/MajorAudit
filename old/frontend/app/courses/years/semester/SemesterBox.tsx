// frontend/app/courses/years/semester/SemesterBox.tsx

import React from "react";
import Style from "./SemesterBox.module.css";
import { StudentSemester } from "../../CoursesTyping";
import { TransformTermNumber } from "../../../../utils/courseDisplayUtils";
import CourseBox from "./course/CourseBox";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { useCoursesPage } from "@/context/CoursesContext";

const SemesterBox = ({
  studentSemester,
  term
}: {
  studentSemester: StudentSemester;
  term: string;
}) => { 
	const { editMode } = useCoursesPage();
  const sortedCourses = [...studentSemester.studentCourses]
    .sort((a, b) => a.sort_index - b.sort_index);

  const { setNodeRef } = useDroppable({
    id: term,
    data: { term }
  });

	const courseBoxTotalHeight = 40; 
	const realNumberOfCourses = studentSemester.studentCourses.length;
	const visualNumberOfCourses = Math.max(1, realNumberOfCourses) + (editMode ? 1 : 0);
	const calculatedMinHeight = visualNumberOfCourses * courseBoxTotalHeight;
	
	return (
    <div
      ref={setNodeRef}
      className={Style.Column}
			style={{
				minWidth: "440px",
				minHeight: `${calculatedMinHeight}px`,
				marginBottom: "8px",
				transition: "background-color 0.15s ease-in-out, min-height 0.2s ease-in-out"
			}}
    >
      <div style={{ marginBottom: "6px" }}>
        {TransformTermNumber(term)}
      </div>

			<SortableContext
				items={sortedCourses.map(c => c.id)} 
				strategy={verticalListSortingStrategy}
			>
				<div className={Style.Column}>
					{sortedCourses.map((studentCourse) => (
						<CourseBox 
							key={`${studentCourse.id}-${studentCourse.sort_index}-${studentCourse.pref_code}`}
							studentCourse={studentCourse}
						/>
					))}
				</div>
			</SortableContext>
    </div>
  );
};

export default SemesterBox;
