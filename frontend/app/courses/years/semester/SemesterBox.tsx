// frontend/app/courses/years/semester/SemesterBox.tsx

import React from "react";
import Style from "./SemesterBox.module.css";
import { StudentSemester } from "../../CoursesTyping";
import { TransformTermNumber } from "../../../../utils/course-display/CourseDisplay";
import CourseBox from "./course/CourseBox";
import { useCoursesPage } from "@/context/CoursesContext";
import { useUser } from "@/context/UserProvider";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const SemesterBox = React.memo(
  ({ studentSemester }: { studentSemester: StudentSemester }) => {
    const { editMode } = useCoursesPage();
  	const { currentFYP } = useUser();

    // Only show non-hidden courses unless we're in edit mode
    const visibleCourses = editMode
      ? studentSemester.studentCourses
      : studentSemester.studentCourses.filter(course => !course.is_hidden);

	if(studentSemester.term === "202503"){
		console.log(`🎨 Rendering SemesterBox for term ${studentSemester.term}`);
		console.log(
			"🧱 Visible courses:",
			visibleCourses.map((c) => `${c.id}:${c.sort_index}`)
		);
	}


  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const coursesInTerm =
      currentFYP?.studentCourses.filter((c) => c.term === studentSemester.term) || [];

    const visible = coursesInTerm.filter((c) => !c.is_hidden);
    const hidden = coursesInTerm.filter((c) => c.is_hidden);

    const oldIndex = visible.findIndex((c) => c.id === active.id);
    const newIndex = visible.findIndex((c) => c.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedVisible = arrayMove([...visible], oldIndex, newIndex);

    const updatedCourses = [
      ...reorderedVisible.map((course, idx) => ({
        ...course,
        sort_index: idx,
      })),
      ...hidden.map((course, idx) => ({
        ...course,
        sort_index: reorderedVisible.length + idx,
      })),
    ];

    const courseUpdates = new Map();
    updatedCourses.forEach((course) => {
      courseUpdates.set(course.id, course);
    });
  };

  return (
    <div className={Style.Column} style={{ minWidth: "440px", marginBottom: "8px" }}>
      <div style={{ marginBottom: "6px" }}>
        {TransformTermNumber(studentSemester.term)}
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={visibleCourses.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={Style.Column}>
            {visibleCourses.map((studentCourse) => (
              <CourseBox key={studentCourse.id} studentCourse={studentCourse} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
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
