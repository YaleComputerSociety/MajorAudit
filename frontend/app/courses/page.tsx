// frontend/app/courses/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import Style from "./Courses.module.css";
import { useUser } from "@/context/UserProvider";
import {
  useCoursesPage,
  CoursesPageProvider
} from "../../context/CoursesContext";

import { ModalProvider } from "./add/context/ModalContext";
import ModalManager from "./add/ModalManager";
import { BuildStudentYears } from "./CoursesUtils";
import NavBar from "../../components/navbar/NavBar";
import YearBox from "./years/YearBox";
import AddButton from "./add/button/AddButton";
import Overhead from "./overhead/Overhead";
import TopProgressBar from "./progress/Progress";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
	arrayMove
} from "@dnd-kit/sortable";

const NoFYP = () => (
  <div>
    <NavBar />
    <div className={Style.CoursesPage}>How do you not have an FYP?</div>
  </div>
);

function CoursesBody() {
  const { currentFYP, getClonedStudentCourses, isLoading } = useUser();
  const {
    editMode,
    editableCourses,
    setEditableCourses,
    lastDragTimestamp,
    setLastDragTimestamp,
		setActiveFYPId
  } = useCoursesPage();

  const [columns, setColumns] = useState(false);
	void [setColumns];

  useEffect(() => {
    if (editMode && !editableCourses && currentFYP) {
      setEditableCourses(getClonedStudentCourses());
    }
  }, [editMode, editableCourses, currentFYP, setEditableCourses, getClonedStudentCourses]);

	useEffect(() => {
		if (currentFYP) {
			setActiveFYPId(currentFYP.id);
		}
	}, [currentFYP, setActiveFYPId]);

  const allCourses = editMode && editableCourses
    ? editableCourses
    : currentFYP?.studentCourses ?? [];

  const studentYears = BuildStudentYears(allCourses, currentFYP?.studentTermArrangement ?? {});
  const allCourseIds = allCourses.map(c => c.id);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!active || !over || !editableCourses) return;

    const overTerm = over.data?.current?.term as string;
    const activeIndex = editableCourses.findIndex(c => c.id === active.id);
    if (activeIndex === -1 || !overTerm) return;

    const course = editableCourses[activeIndex];
    if (course.term === overTerm) return;

    const updated = [...editableCourses];
    updated[activeIndex] = { ...course, term: overTerm };

    setEditableCourses(updated);
    setLastDragTimestamp(Date.now());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id || !editMode || !editableCourses) return;

    const activeCourse = editableCourses.find(c => c.id === active.id);
    const overTerm = over.data?.current?.term as string;

    if (!activeCourse || !overTerm) return;

    const isSameTerm = activeCourse.term === overTerm;

    let updatedCourses = [...editableCourses];

    if (isSameTerm) {
      const siblings = updatedCourses
        .filter(c => c.term === overTerm)
        .sort((a, b) => a.sort_index - b.sort_index);

      const oldIndex = siblings.findIndex(c => c.id === active.id);
      const newIndex = siblings.findIndex(c => c.id === over.id);
      const reordered = arrayMove(siblings, oldIndex, newIndex);

      updatedCourses = updatedCourses.map(course => {
        if (course.term !== overTerm) return course;
        const i = reordered.findIndex(c => c.id === course.id);
        return { ...course, sort_index: i };
      });

    } else {
      updatedCourses = updatedCourses.map(course =>
        course.id === activeCourse.id
          ? { ...course, term: overTerm, sort_index: 9999 }
          : course
      );

      const dragged = updatedCourses.find(c => c.id === active.id)!;
      const siblings = updatedCourses
        .filter(c => c.term === overTerm && c.id !== active.id)
        .sort((a, b) => a.sort_index - b.sort_index);

      const overIndex = siblings.findIndex(c => c.id === over.id);
      const insertIndex = overIndex === -1 ? siblings.length : overIndex;
      siblings.splice(insertIndex, 0, dragged);

      updatedCourses = updatedCourses.map(course => {
        if (course.term !== overTerm) return course;
        const i = siblings.findIndex(c => c.id === course.id);
        return { ...course, sort_index: i };
      });
    }

    setEditableCourses(updatedCourses.map(c => ({ ...c })));
    setLastDragTimestamp(Date.now());
  };

  // 🔥🔥🔥 THE IMPORTANT PART
  if (isLoading || !currentFYP) {
    return (
      <div className={Style.CoursesPage} style={{ position: 'relative' }}>
				<NavBar/>
        <TopProgressBar loading={true} />
      </div>
    );
  }

  // After loaded, render real page:
  return (
    <div>
      <NavBar utility={<Overhead />} />
      <div className={Style.CoursesPage} style={{ position: 'relative' }}>
        <ModalProvider>
          {editMode && <AddButton />}
          <ModalManager />
        </ModalProvider>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={allCourseIds}
            strategy={verticalListSortingStrategy}
          >
            <div className={Style.Column}>
              {studentYears.map((year) => (
                <YearBox
                  key={`year-${year.grade}-${lastDragTimestamp}`}
                  columns={columns}
                  studentYear={year}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

function Courses() {
  return (
    <CoursesPageProvider>
      <CoursesBody />
    </CoursesPageProvider>
  );
}

export default Courses;
