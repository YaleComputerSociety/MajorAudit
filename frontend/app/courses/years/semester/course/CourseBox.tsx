// frontend/app/courses/years/semester/course/CourseBox.tsx

import React, { useMemo } from "react";
import Style from "./CourseBox.module.css";
import { useCoursesPage } from "@/context/CoursesContext";
import { StudentCourse } from "@/types/user";
import {
  RenderMark,
  SeasonIcon,
  GetCourseColor
} from "../../../../../utils/course-display/CourseDisplay";
import DistributionCircle from "../../../../../components/distribution-circle/DistributionsCircle";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CourseSelection = ({ courseId }: { courseId: number }) => {
  const { selectedCourses, toggleCourseSelection, isPending } = useCoursesPage();
  const isSelected = selectedCourses.has(courseId);

  return (
    <label className={Style.SelectionLabel}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleCourseSelection(courseId)}
        className={Style.HiddenCheckbox}
        disabled={isPending}
      />
      <span
        className={`${Style.CustomCheckbox} ${isSelected ? Style.SelectedCheckbox : ''} ${isPending ? Style.PendingState : ''}`}
      >
        {isSelected ? '✓' : ''}
      </span>
    </label>
  );
};

const EyeToggle = ({ studentCourse }: { studentCourse: StudentCourse }) => {
  const { editableCourses, setEditableCourses } = useCoursesPage();

  const handleClick = () => {
    if (!editableCourses) return;

    const updated = editableCourses.map(c => ({
      ...c,
      is_hidden: c.id === studentCourse.id ? !c.is_hidden : c.is_hidden
    }));

    setEditableCourses(updated);
  };

  return (
    <div
      className={`${Style.FuncButton} ${studentCourse.is_hidden ? Style.HiddenIcon : ""}`}
      onClick={handleClick}
      title={studentCourse.is_hidden ? "Show course" : "Hide course"}
    >
      {studentCourse.is_hidden ? "🙈" : "👁️"}
    </div>
  );
};

const CourseBox = ({ studentCourse }: { studentCourse: StudentCourse }) => {
  const { editMode } = useCoursesPage();

  const sortableData = useMemo(
    () => ({
      term: studentCourse.term // 🔁 this updates reactively during drag-over
    }),
    [studentCourse.term]
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: studentCourse.id,
    data: sortableData
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        background: studentCourse.is_hidden ? "#fbfbfb" : GetCourseColor(studentCourse.term)
      }}
      className={Style.CourseBox}
    >
      <div className={Style.Row}>
        {editMode && (
          <div className={Style.Row}>
            <CourseSelection courseId={studentCourse.id} />
            <EyeToggle studentCourse={studentCourse} />
            <div
              className={Style.GripIcon}
              title="Drag"
              {...attributes}
              {...listeners}
            >
              ⠿
            </div>
          </div>
        )}
        <RenderMark status={studentCourse.status} />
        <SeasonIcon studentCourse={studentCourse} />
        <div className={Style.Column}>
          <div className={Style.CourseCode}>
            {studentCourse.courseOffering.abstractCourse.codes[0]}
          </div>
          <div className={Style.CourseTitle}>
            {studentCourse.courseOffering.abstractCourse.title}
          </div>
        </div>
      </div>
      <DistributionCircle distributions={studentCourse.courseOffering.abstractCourse.distributions} />
    </div>
  );
};

export default CourseBox;