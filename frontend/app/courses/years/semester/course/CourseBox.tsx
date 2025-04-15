
import { useState } from "react";
import Style from "./CourseBox.module.css";

import { StudentCourse } from "@/types/type-user";
import { RenderMark, SeasonIcon, GetCourseColor, IsTermActive } from "../../../../../utils/course-display/CourseDisplay";
import DistributionCircle from "../../../../../components/distribution-circle/DistributionsCircle";
import { useUser } from "@/context/UserProvider";

function RemoveButton({ studentCourse }: { studentCourse: StudentCourse }) {
  const { removeCourse } = useUser();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveStudentCourse = async () => {
    // Confirm with the user before removing
    if (!window.confirm(`Are you sure you want to remove ${studentCourse.courseOffering.abstractCourse.codes[0]}?`)) {
      return;
    }

    setIsRemoving(true);
    try {
      const result = await removeCourse(studentCourse.id);
      
      if (result.success) {
        // The user data will be automatically refreshed by the hook
        // You could add a toast notification here if you have a toast system
      } else {
        alert(`Failed to remove course: ${result.message}`);
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

function CourseBox(props: {
  edit: boolean, 
  studentCourse: StudentCourse, 
}){
  return(
    <div 
      className={Style.CourseBox}  
      style={{ background: GetCourseColor(props.studentCourse.term) }}
    > 
      <div 
        className={Style.Row} 
      >
        {(props.edit && IsTermActive(props.studentCourse.term)) && 
          <RemoveButton studentCourse={props.studentCourse}/>
        }
        <RenderMark status={props.studentCourse.status}/>
        <SeasonIcon studentCourse={props.studentCourse}/>
        <div className={Style.Column}>
          <div className={Style.CourseCode}>
            {props.studentCourse.courseOffering.abstractCourse.codes[0]}
          </div>
          <div className={Style.CourseTitle}>
            {props.studentCourse.courseOffering.abstractCourse.title}
          </div>
        </div>
      </div>
      <DistributionCircle distributions={props.studentCourse.courseOffering.abstractCourse.distributions}/>
    </div>
  );
}

export default CourseBox;
