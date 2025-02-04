
import React from "react";
import Style from "./SemesterBox.module.css"

import { StudentSemester, User } from "@/types/type-user";
import { TransformTermNumber, IsTermActive } from "@/utils/CourseDisplay";

import CourseBox from "./course/CourseBox";
import AddCourseButton from "./add-course/AddCourseButton";

function SemesterBox(props: { edit: boolean, studentSemester: StudentSemester, user: User, setUser: Function }) {
  
	let studentCourseBoxes = props.studentSemester.studentCourses.map((studentCourse, index) => (
    <CourseBox key={index} edit={props.edit} studentCourse={studentCourse} user={props.user} setUser={props.setUser}/>
  ));

  return(
    <div className={Style.Column} style={{ marginBottom: "8px" }}>
      <div style={{ marginBottom: "6px" }}>
				{TransformTermNumber(props.studentSemester.term)}
      </div>
			<div style={{ marginLeft: "12px" }}>
				{studentCourseBoxes}
				{(props.edit && IsTermActive(props.studentSemester.term)) && <AddCourseButton term={props.studentSemester.term} user={props.user} setUser={props.setUser}/>}
			</div>
    </div>
  );
}

export default SemesterBox;
