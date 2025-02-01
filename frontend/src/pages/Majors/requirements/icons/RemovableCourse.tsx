
import React from "react";
import Style from "./RemovableCourse.module.css";
import { StudentCourse } from "../../../../types/TypeCourse";
import { StudentCourseIcon } from "../../../../commons/components/icons/CourseIcon";

function RemoveButton(props: { removeStudentCourse: () => void }) {
  const execRemove = () => {
    props.removeStudentCourse();
  };

  return (
    <div className={Style.RemoveButton} onClick={execRemove}>
      
    </div>
  );
}

function RemovableCourse(props: { studentCourse: StudentCourse, removeStudentCourse: (course: StudentCourse) => void }) {
  return (
    <StudentCourseIcon
      studentCourse={props.studentCourse}
      utilityButton={<RemoveButton removeStudentCourse={() => props.removeStudentCourse(props.studentCourse)} />}
    />
  );
}

export default RemovableCourse;
