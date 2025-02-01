import { useState } from "react";
import Style from "./Requirements.module.css";
import { User } from "../../../types/TypeUser";
import { Degree, DegreeConfiguration } from "../../../types/TypeProgram";
import { StudentCourse } from "../../../types/TypeCourse";
import { StudentCourseIcon } from "../../../commons/components/icons/CourseIcon";
import AddableCourse from "./icons/AddableCourse";
import RemovableCourse from "./icons/RemovableCourse";
// import { addCourseToSubsection, removeCourseFromSubsection, resetDegree } from "./RequirementsUtils";

function RequirementsContent(props: { 
	edit: boolean, 
	degreeConfiguration: DegreeConfiguration, 
	user: User, 
	setUser: Function 
}){

  return(
    <div className={Style.reqsList}>
      
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
    <div className={Style.reqsContainer}>
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
