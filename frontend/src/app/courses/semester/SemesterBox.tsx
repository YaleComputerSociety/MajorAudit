
import React from "react";
import Style from "./SemesterBox.module.css"

import { StudentSemester, User } from "@/types/type-user";

import CourseBox from "./course/CourseBox";
import AddCourseButton from "./add-course/AddCourseButton";

function SemesterBox(props: { edit: boolean, studentSemester: StudentSemester, user: User, setUser: Function }) {
  
	let studentCourseBoxes = props.studentSemester.studentCourses.map((studentCourse, index) => (
    <CourseBox key={index} edit={props.edit} studentCourse={studentCourse} user={props.user} setUser={props.setUser}/>
  ));

  return(
    <div className={Style.Column} style={{ marginBottom: "8px" }}>
      <div style={{ marginBottom: "6px" }}>
				{props.studentSemester.season}
      </div>
			<div style={{ marginLeft: "12px" }}>
				{studentCourseBoxes}
				{props.edit && <AddCourseButton term={props.studentSemester.season} user={props.user} setUser={props.setUser}/>}
			</div>
    </div>
  );
}

export default SemesterBox;
