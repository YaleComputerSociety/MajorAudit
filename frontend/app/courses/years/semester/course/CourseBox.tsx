// frontend/app/courses/years/semester/course/CourseBox.tsx

import React, { useState, useCallback, memo } from "react";
import Style from "./CourseBox.module.css";
import { useCoursesPage } from "@/context/CoursesContext";
import { useUser } from "@/context/UserProvider";

import { StudentCourse } from "@/types/user";
import { RenderMark, SeasonIcon, GetCourseColor } from "../../../../../utils/course-display/CourseDisplay";
import DistributionCircle from "../../../../../components/distribution-circle/DistributionsCircle";

// Separated into its own memo component to prevent re-renders of parent
const RemoveButton = memo(({ studentCourse }: { studentCourse: StudentCourse }) => {
  const { removeCourses } = useUser();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveStudentCourse = useCallback(async () => {
    const code = studentCourse.courseOffering.abstractCourse.codes[0];
    if (!window.confirm(`Are you sure you want to remove ${code}?`)) return;

    setIsRemoving(true);
    try {
      const result = await removeCourses([studentCourse.id]);

      if (!result.success) {
        const errMsg = result.errors.find(e => e.id === studentCourse.id)?.message || 'Unknown error';
        alert(`Failed to remove course: ${errMsg}`);
      }
    } catch (error) {
      console.error("Error removing course:", error);
      alert("An unexpected error occurred while removing the course.");
    } finally {
      setIsRemoving(false);
    }
  }, [studentCourse.id, studentCourse.courseOffering.abstractCourse.codes, removeCourses]);

  return (
    <div 
      className={`${Style.FuncButton} ${isRemoving ? Style.RemovingState : ''}`}
      onClick={isRemoving ? undefined : handleRemoveStudentCourse}
      title="Remove course"
    >
      {isRemoving ? "..." : "×"}
    </div>
  );
});


// --- 👁️ Toggle Component ---
const EyeToggle = memo(({ studentCourse }: { studentCourse: StudentCourse }) => {
  const { toggleCourseHidden } = useUser();

	const handleClick = () => {
		toggleCourseHidden(studentCourse.id, !studentCourse.is_hidden);
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
});

// --- Checkbox Component ---
const CourseSelection = memo(({ courseId }: { courseId: number }) => {
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
});

// --- Main Component ---
const CourseBox = memo(({ studentCourse }: { studentCourse: StudentCourse }) => {
  const { editMode } = useCoursesPage();

  return (
    <div 
      className={Style.CourseBox}  
      style={{ background: GetCourseColor(studentCourse.term) }}
    > 
      <div className={Style.Row}>
        {editMode && (
          <div className={Style.Row}>
            <CourseSelection courseId={studentCourse.id}/>
            <EyeToggle studentCourse={studentCourse}/>
            {/* <RemoveButton studentCourse={studentCourse}/> */}
          </div>
        )}
        <RenderMark status={studentCourse.status}/>
        <SeasonIcon studentCourse={studentCourse}/>
        <div className={Style.Column}>
          <div className={Style.CourseCode}>
            {studentCourse.courseOffering.abstractCourse.codes[0]}
          </div>
          <div className={Style.CourseTitle}>
            {studentCourse.courseOffering.abstractCourse.title}
          </div>
        </div>
      </div>
      <DistributionCircle distributions={studentCourse.courseOffering.abstractCourse.distributions}/>
    </div>
  );
});

// Debug names
EyeToggle.displayName = 'EyeToggle';
CourseSelection.displayName = 'CourseSelection';
CourseBox.displayName = 'CourseBox';

export default CourseBox;
