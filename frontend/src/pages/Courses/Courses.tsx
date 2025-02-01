
import { useState, useEffect } from "react";
import Style from "./Courses.module.css";

import { User } from "../../types/TypeUser";

import NavBar from "./../../navbar/NavBar"
import SemesterBox from "./semester/SemesterBox";

function AddSemesterButton(){
	return(
		<div>
			{"+ (add semester button)"}
		</div>
	)
}

function Courses(props: { user: User, setUser: Function }){

  const [renderedSemesters, setRenderedSemesters] = useState<JSX.Element[]>([]);
  
	const [edit, setEdit] = useState(false);
  const toggleEdit = () => {
    setEdit(!edit);
  };

	useEffect(() => {
		const newRenderedSemesters = props.user.FYP.studentSemesters.map((semester, index) => (
			<SemesterBox key={index} edit={edit} studentSemester={semester} user={props.user} setUser={props.setUser}/>
		));
		setRenderedSemesters(newRenderedSemesters);
  }, [edit, props.user, props.setUser]);

  return(
    <div>
      <NavBar/>
      <div className={Style.CoursesPage}>
        <button className={Style.EditButton} onClick={toggleEdit}>

				</button>
        <div className={Style.Column}>
          {renderedSemesters}
					{edit && <AddSemesterButton/>}
        </div>
      </div>
    </div>
  );
}

export default Courses;
