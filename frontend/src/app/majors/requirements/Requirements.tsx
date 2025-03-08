
import { useState } from "react";
import Style from "./Requirements.module.css";

import { User, Course } from "@/types/type-user";
import { DegreeConfiguration, DegreeRequirement, DegreeSubrequirement } from "@/types/type-program";
import { CourseIcon } from "@/components/course-icon/CourseIcon";



function RenderSubrequirementCourse(props: { course: Course | null, subreq: DegreeSubrequirement; user: User }){

	// TODO
	
	if(props.course === null){
    return(
      <div className={Style.EmptyCourse} style={{ marginRight: "2px" }}/>
    );
  }

	const matchingStudentCourse = props.subreq.student_courses_satisfying.find(
    (studentCourse) => studentCourse.course === props.course
  );

	return(
		<div style={{ marginRight: "2px", marginBottom: "2px" }}>
			<CourseIcon course={props.course} studentCourse={matchingStudentCourse}/>
		</div>
	)
}

function RenderSubrequirement(props: { subreq: DegreeSubrequirement, user: User })
{
  const [showAll, setShowAll] = useState(false);

  // Extract non-null courses
  const nonNullCourses = props.subreq.courses_options.filter((course) => course !== null) as Course[];
  const satisfiedCourses = props.subreq.student_courses_satisfying.map((studentCourse) => studentCourse.course);

  // Determine which courses to show based on satisfaction condition
  const isSatisfied = props.subreq.student_courses_satisfying.length === props.subreq.courses_required;
  const displayedCourses = showAll
    ? nonNullCourses
    : isSatisfied
    ? satisfiedCourses
    : nonNullCourses.slice(0, 4);

		const extraCoursesCount = showAll ? 0 : nonNullCourses.length - displayedCourses.length;

	return(
		<div className={Style.Column} style={{ marginBottom: "12px" }}>
			<div className={Style.SubHeader}>
				{props.subreq.student_courses_satisfying.length}|{props.subreq.courses_required} {props.subreq.subreq_name} 
			</div>
			<div className={Style.SubDesc}>
				{props.subreq.subreq_desc}
			</div>
			<div className={Style.Row} style={{ flexWrap: "wrap", marginLeft: "20px" }}>
				{displayedCourses.map((course, index) => (
					<div key={index}>
						<RenderSubrequirementCourse course={course} subreq={props.subreq} user={props.user}/>
					</div>
				))}
				{/* Show More / Show Less Button */}
				{nonNullCourses.length > 4 && (
					<div className={Style.ToggleButton} onClick={() => setShowAll(!showAll)}>
						{showAll ? "<<" : ">>"}
					</div>)
				}
			</div>
		</div>
	)
}

function RenderRequirement(props: { req: DegreeRequirement, user: User })
{
	return(
		<div className={Style.Column}>
			
			<div className={Style.Row} style={{ marginBottom: "2px", justifyContent: "space-between" }}>
				<div className={Style.ReqHeader}>
					{props.req.req_name}
				</div>
				<div className={Style.ReqHeader} style={{ marginRight: "20px" }}>
					{props.req.courses_satisfied_count}|{props.req.courses_required_count}
				</div>
			</div>
			
			<div style={{ marginLeft: "30px" }}>
				{props.req.subreqs_list.map((subreq, index) => (
					<RenderSubrequirement key={index} subreq={subreq} user={props.user}/>
				))}		
			</div>		
		</div>
	)
}

function RequirementsContent(props: { edit: boolean, degreeConfiguration: DegreeConfiguration, user: User, setUser: Function })
{

  return(
    <div className={Style.ReqsList}>
			{props.degreeConfiguration.reqs_list.map((req, index) => (
				<RenderRequirement key={index} req={req} user={props.user}/>
			))}
    </div>
  );
}

function Requirements(props: { user: User, setUser: Function, degreeConfiguration: DegreeConfiguration })
{
  
	const [edit, setEdit] = useState(false);
  const updateEdit = () => {
    setEdit(!edit);
  };

  return(
    <div className={Style.RequirementsContainer}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <div style={{ fontSize: "30px" }}>
          Requirements
        </div>
        <div className={Style.ButtonRow}>
          <div onClick={updateEdit} className={Style.editButton} style={{ fontSize: "30px" }}>
            ⚙
          </div>
        </div>
      </div>
			<div style={{ marginLeft: "10px" }}>
				<RequirementsContent edit={edit} degreeConfiguration={props.degreeConfiguration} user={props.user} setUser={props.setUser} />
			</div>
    </div>
  );
}

export default Requirements;
