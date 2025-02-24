
import { useState } from "react";
import Style from "./Requirements.module.css";

import { User } from "@/types/type-user";
import { DegreeConfiguration, TypeOneRequirement, TypeOneSubrequirement } from "@/types/type-program";
import { CourseIcon } from "@/components/course-icon/CourseIcon";



// import AddableCourse from "./icons/AddableCourse";
// import RemovableCourse from "./icons/RemovableCourse";
// import { addCourseToSubsection, removeCourseFromSubsection, resetDegree } from "./RequirementsUtils";

function RenderSubrequirement(props: { subrequirement: TypeOneSubrequirement }){
	return(
		<div className={Style.Column} style={{ marginLeft: "20px", marginBottom: "10px" }}>
			<div className={Style.SubHeader}>
				{props.subrequirement.requirement_name}
			</div>
			<div className={Style.Row}>
				{props.subrequirement.courses.map((course, index) => (
					<div key={index}>
						<CourseIcon course={course}/>
					</div>
				))}
			</div>
		</div>
	)
}

function RenderRequirement(props: { requirement: TypeOneRequirement }){
	return(
		<div className={Style.Column}>
			<div className={Style.ReqHeader}>
				{props.requirement.requirement_name}
			</div>
			<div>
				{props.requirement.subrequirements.map((subrequirement, index) => (
					<RenderSubrequirement key={index} subrequirement={subrequirement}/>
				))}		
			</div>		
		</div>
	)
}

function RequirementsContent(props: { edit: boolean, degreeConfiguration: DegreeConfiguration, user: User, setUser: Function }){

  return(
    <div className={Style.ReqsList}>
			{props.degreeConfiguration.degreeRequirements.map((requirement, index) => (
				<RenderRequirement key={index} requirement={requirement}/>
			))}
    </div>
  );
}

function Requirements(props: { 
	user: User, 
	setUser: Function, 
	degreeConfiguration: DegreeConfiguration 
}){
  
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
