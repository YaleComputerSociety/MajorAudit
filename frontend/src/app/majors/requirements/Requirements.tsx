
import { useState } from "react";
import Style from "./Requirements.module.css";

import { User, Course } from "@/types/type-user";
import { DegreeConfiguration, DegreeRequirement, DegreeSubrequirement } from "@/types/type-program";
import { CourseIcon } from "@/components/course-icon/CourseIcon";

function RenderSubrequirementCourse(props: { course: Course, subreq: DegreeSubrequirement; user: User }){



	return(
		<div>
			<CourseIcon course={props.course}/>
		</div>
	)
}

function RenderSubrequirement(props: { subreq: DegreeSubrequirement, user: User })
{
	return(
		<div className={Style.Column} style={{ marginBottom: "12px" }}>
			<div className={Style.SubHeader}>
				{props.subreq.user_courses_satisfying.length}|{props.subreq.courses_required} {props.subreq.subreq_name} 
			</div>
			<div className={Style.Row} style={{ marginLeft: "20px" }}>
				{props.subreq.courses_options.map((course, index) => (
					<div key={index}>
						<RenderSubrequirementCourse course={course} subreq={props.subreq} user={props.user}/>
					</div>
				))}
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
					0|{props.req.subreqs_required}
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
      <RequirementsContent edit={edit} degreeConfiguration={props.degreeConfiguration} user={props.user} setUser={props.setUser} />
    </div>
  );
}

export default Requirements;
