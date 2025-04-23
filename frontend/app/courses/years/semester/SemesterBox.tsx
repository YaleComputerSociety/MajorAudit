// frontend/app/courses/years/semester/SemesterBox.tsx

import React, { useState, useEffect, useRef } from "react";
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
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const SemesterBox = ({ studentSemester }: { studentSemester: StudentSemester }) => {
  const { editMode } = useCoursesPage();
  const {  updateStudentCoursePosition } = useUser();
  
  // Create a local state copy of the courses to ensure UI updates
  const [localCourses, setLocalCourses] = useState(studentSemester.studentCourses);
  
  // Update local courses whenever studentSemester changes
  useEffect(() => {
    setLocalCourses(studentSemester.studentCourses);
  }, [studentSemester]);
  
  // Keep track of the last drag operation for forced re-renders
  const [lastDragOperation, setLastDragOperation] = useState<{
    courseId: number,
    fromIndex: number,
    toIndex: number,
    timestamp: number
  } | null>(null);

  // Filter and sort courses using our local copy
  const visibleCourses = editMode
    ? localCourses
    : localCourses.filter(course => !course.is_hidden);
  
  // Sort by sort_index
  const sortedVisibleCourses = [...visibleCourses].sort((a, b) => a.sort_index - b.sort_index);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const coursesInTerm =
      localCourses.filter((c) => c.term === studentSemester.term) || [];

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

    setLocalCourses(updatedCourses);
    
    setLastDragOperation({
      courseId: active.id as number,
      fromIndex: oldIndex,
      toIndex: newIndex,
      timestamp: Date.now()
    });
    
    updateStudentCoursePosition(updatedCourses);
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
          items={sortedVisibleCourses.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={Style.Column}>
            <div key={`courses-${lastDragOperation?.timestamp || 'initial'}`}>
              {sortedVisibleCourses.map((studentCourse) => (
                <CourseBox 
                  key={`course-${studentCourse.id}`} 
                  studentCourse={studentCourse} 
                />
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SemesterBox;