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

const SemesterBox = ({
  studentSemester,
  term
}: {
  studentSemester: StudentSemester;
  term: string;
}) => {
  const sortedCourses = [...studentSemester.studentCourses]
    .sort((a, b) => a.sort_index - b.sort_index);

  const { isOver, setNodeRef } = useDroppable({
    id: term,
    data: { term }
  });

  return (
    <div
      ref={setNodeRef}
      className={`${Style.Column} ${isOver ? Style.Hovered : ""}`}
      style={{
        minWidth: "440px",
        marginBottom: "8px",
        transition: "background-color 0.15s ease-in-out" 
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
						<CourseBox key={studentCourse.id} studentCourse={studentCourse} />
					))}
				</div>
			</SortableContext>
    </div>
  );
};

export default SemesterBox;
