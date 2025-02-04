
import { useState, useEffect } from "react";
import Style from "./YearBox.module.css";
import { User, StudentYear, StudentSemester } from "@/types/type-user";

import SemesterBox from "./semester/SemesterBox"
import AddSemesterButton from "./add-semester/AddSemesterButton"

function RenderSemesters(props: { edit: boolean; columns: boolean; studentSemesters: StudentSemester[], user: User, setUser: Function }) 
{
  const newRenderedSemesters = props.studentSemesters.map((studentSemester: StudentSemester) => (
		<SemesterBox key={studentSemester.term} edit={props.edit} studentSemester={studentSemester} user={props.user} setUser={props.setUser}/>
  ));

	const addSemesterVis = props.studentSemesters.length < 3;

  return( 
		<div className={props.columns ? Style.Column : Style.Row}>
			{newRenderedSemesters}
			{/* {(props.edit && addSemesterVis) && <AddSemesterButton user={props.user} setUser={props.setUser}/>} */}
		</div>
	);
}

function YearBox(props: { edit: boolean, columns: boolean, studentYear: StudentYear, user: User, setUser: Function  })
{
  const [renderedSemesters, setRenderedSemesters] = useState<React.ReactNode>(null);
	
	useEffect(() => {
    setRenderedSemesters(
      <RenderSemesters edit={props.edit} columns={props.columns} studentSemesters={props.studentYear.studentSemesters} user={props.user} setUser={props.setUser}/>
    );
  }, [props.edit, props.columns, props.user]);

  return(
		<div className={Style.Column}>
			<div>
				{props.studentYear.grade}
			</div>
			<div className={props.columns ? Style.Column : Style.Row} style={{ marginLeft: "10px" }}>
				{renderedSemesters}
			</div>
		</div>
  );
}

export default YearBox;
