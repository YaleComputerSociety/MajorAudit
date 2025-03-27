
import React, {useState, useEffect} from "react";
import Style from "./SemesterBox.module.css"

import { StudentSemester } from "../../CoursesTyping";
import { TransformTermNumber } from "../../../../utils/course-display/CourseDisplay";

import { useUser } from "@/context/UserProvider";
import CourseBox from "./course/CourseBox";

function RenderCourses(props: { 
	edit: boolean, 
	studentSemester: StudentSemester 
}){
		const renderedCourses = props.studentSemester.studentCourses.map((studentCourse, index) => (
      <CourseBox 
				key={index} 
				edit={props.edit} 
				studentCourse={studentCourse}
			/>
    ));
	
		return( 
			<div className={Style.Column}>
				{renderedCourses}
			</div>
		);
	}

function SemesterBox(props: { 
	edit: boolean, 
	studentSemester: StudentSemester, 
}){
  const { user } = useUser();
	const [renderedCourses, setRenderedCourses] = useState<React.ReactNode>(null);

 	useEffect(() => {
		setRenderedCourses(
			<RenderCourses 
				edit={props.edit} 
				studentSemester={props.studentSemester}
			/>
		);
	}, [props.edit, props.studentSemester, user]);

  return(
    <div className={Style.Column} style={{ minWidth: "440px", marginBottom: "8px" }}>
      <div style={{ marginBottom: "6px" }}>
				{TransformTermNumber(props.studentSemester.term)}
      </div>
			<div>
				{renderedCourses}
			</div>
    </div>
  );
}

export default SemesterBox;
