// frontend/app/courses/years/semester/course/CourseBox.tsx

import React, { useMemo } from "react";
import Image from "next/image";
import Style from "./CourseBox.module.css";
import { useCoursesPage } from "@/context/CoursesContext";
import { StudentCourse } from "@/types/user";
import { GetCourseColor } from "@/utils/courseDisplayUtils";
import DistributionCircle from "../../../../../components/distribution-circle/DistributionsCircle";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SeasonIcon(props: { studentCourse: StudentCourse })
{
	const getSeasonImage = () => (String(props.studentCourse.term).endsWith("3") ? "/fall.svg" : "/spring.svg");
	return(
		<div>
			<Image style={{ marginTop: "3px", marginRight: "6px" }} src={getSeasonImage()} alt="" width={20} height={20}/>
		</div>
	)
}

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
        className={Style.CustomCheckbox}
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
      className={Style.FuncButton}
      onClick={handleClick}
      title={studentCourse.is_hidden ? "Show" : "Hide"}
    >
      {studentCourse.is_hidden ? "🙈" : "👁️"}
    </div>
  );
};

const TrashButton = ({ studentCourse }: { studentCourse: StudentCourse }) => {
  const { editableCourses, setEditableCourses } = useCoursesPage();

  const handleRemove = () => {
    if (!editableCourses) return;
    const updated = editableCourses.filter(c => c.id !== studentCourse.id);
    setEditableCourses(updated);
  };

  return (
    <div
      className={Style.FuncButton}
      onClick={handleRemove}
      title="Remove course"
    >
      🗑️
    </div>
  );
};

const RenderMark = ({ studentCourse }: { studentCourse: StudentCourse }) => {
	const { editMode } = useCoursesPage();
	return(
		<div className={Style.Checkmark} style={{ marginLeft: editMode ? "2px" : "8px" }}>
			{studentCourse.status === "DA" ? "✓" : ""}
		</div>
	);
}

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

	if(!editMode && studentCourse.is_hidden) {
		return null;
	}

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

	const content = (
		<>
			<div className={Style.Row} style={{ alignItems: "center" }}>
				{editMode && (
					<div className={Style.Row}>
						<CourseSelection courseId={studentCourse.id}/>
						<div
							className={Style.GripIcon}
							title="Drag"
							{...attributes}
							{...listeners}
						>
							⠿
						</div>
						<EyeToggle studentCourse={studentCourse}/>
						<TrashButton studentCourse={studentCourse}/>
						<div style={{ color: "grey", fontSize: "20px", marginLeft: "5px" }}>
							|
						</div>
					</div>
				)}
				<RenderMark studentCourse={studentCourse}/>
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
			<div style={{ marginRight: "8px" }}>
				<DistributionCircle distributions={studentCourse.courseOffering.abstractCourse.distributions}/>
			</div>
		</>
	);

	return editMode ? (
		<div
			ref={setNodeRef}
			className={Style.CourseBox}
			style={{
				...style,
				background: GetCourseColor(studentCourse)
			}}
		>
			{content}
		</div>
	) : (
		<button
			className={Style.CourseBoxButton}
			style={{
				...style,
				background: GetCourseColor(studentCourse),
			}}
			onClick={() => {
				// Optional: handle click if you want! e.g., open a modal, navigate, etc.
			}}
		>
			{content}
		</button>
	);
	
};

export default CourseBox;