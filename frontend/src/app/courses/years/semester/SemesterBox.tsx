
import React, {useState, useEffect} from "react";
import Style from "./SemesterBox.module.css"

import { StudentSemester, User } from "@/types/type-user";
import { TransformTermNumber, IsTermActive } from "@/utils/course-display/CourseDisplay";

import CourseBox from "./course/CourseBox";
import AddCourseButton from "./add-course/AddCourseButton";

function RenderCourses(props: { edit: boolean, studentSemester: StudentSemester, user: User, setUser: Function })
{
		const renderedCourses = props.studentSemester.studentCourses.map((studentCourse, index) => (
      <CourseBox key={index} edit={props.edit} studentCourse={studentCourse} user={props.user} setUser={props.setUser}/>
    ));
	
		return( 
			<div className={Style.Column}>
				{renderedCourses}
			</div>
		);
	}

function SemesterBox(props: { edit: boolean, studentSemester: StudentSemester, user: User, setUser: Function }) {
  
	const [renderedCourses, setRenderedCourses] = useState<React.ReactNode>(null);

 	useEffect(() => {
		setRenderedCourses(
			<RenderCourses edit={props.edit} studentSemester={props.studentSemester} user={props.user} setUser={props.setUser}/>
		);
	}, [props.edit, props.studentSemester, props.user]);

  return(
    <div className={Style.Column} style={{ minWidth: "440px", marginBottom: "8px" }}>
      <div style={{ marginBottom: "6px" }}>
				{TransformTermNumber(props.studentSemester.term)}
      </div>
			<div>
				{renderedCourses}
				{props.edit && <AddCourseButton term={props.studentSemester.term} user={props.user} setUser={props.setUser}/>}
			</div>
    </div>
  );
}

export default SemesterBox;
