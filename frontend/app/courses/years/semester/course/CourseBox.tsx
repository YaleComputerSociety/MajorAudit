import React, { useState } from "react";
import Style from "./CourseBox.module.css";

import { StudentCourse } from "@/types/type-user";
import { RenderMark, SeasonIcon, GetCourseColor, IsTermActive } from "../../../../../utils/course-display/CourseDisplay";
import DistributionCircle from "../../../../../components/distribution-circle/DistributionsCircle";
import { useUser } from "@/context/UserProvider";

function RemoveButton({ studentCourse }: { studentCourse: StudentCourse }) {
  const { removeCourses } = useUser();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveStudentCourse = async () => {
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
  };

  return (
    <div 
      className={Style.FuncButton} 
      style={{ 
        background: "#ffaaaa",
        cursor: isRemoving ? "not-allowed" : "pointer",
        opacity: isRemoving ? 0.7 : 1
      }}
      onClick={isRemoving ? undefined : handleRemoveStudentCourse}
      title="Remove course"
    >
      {isRemoving ? "..." : "×"}
    </div>
  );
}

function CourseBox({
  edit,
  studentCourse
}: {
  edit: boolean;
  studentCourse: StudentCourse;
}) {
  return (
    <div 
      className={Style.CourseBox}  
      style={{ background: GetCourseColor(studentCourse.term) }}
    > 
      <div className={Style.Row}>
        {edit && IsTermActive(studentCourse.term) && (
          <RemoveButton studentCourse={studentCourse} />
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
}

export default CourseBox;
