
import { useState, useEffect } from "react";
import Style from "./YearBox.module.css";
import { User, StudentYear, StudentSemester } from "@/types/type-user";

import SemesterBox from "./semester/SemesterBox"
import AddSemesterButton from "./add-semester/AddSemesterButton"

function RenderSemesters(props: { edit: boolean; columns: boolean; studentYear: StudentYear, setStudentYears: Function, user: User, setUser: Function }) 
{
  const newRenderedSemesters = props.studentYear.studentSemesters.map((studentSemester: StudentSemester) => (
		<SemesterBox key={studentSemester.term} edit={props.edit} studentSemester={studentSemester} user={props.user} setUser={props.setUser}/>
  ));

	return( 
		<div className={props.columns ? Style.Column : Style.Row}>
			{newRenderedSemesters}
		</div>
	);
}

function YearBox(props: { edit: boolean, columns: boolean, studentYear: StudentYear, setStudentYears: Function, user: User, setUser: Function  })
{
  const [renderedSemesters, setRenderedSemesters] = useState<React.ReactNode>(null);
	
	useEffect(() => {
    setRenderedSemesters(
      <RenderSemesters edit={props.edit} columns={props.columns} studentYear={props.studentYear} setStudentYears={props.setStudentYears} user={props.user} setUser={props.setUser}/>
    );
  }, [props.edit, props.columns, props.studentYear, props.user]);

  return(
		<div className={Style.Column}>
			<div className={Style.Grade}>
				{props.studentYear.grade}
			</div>
			<div className={props.columns ? Style.Column : Style.Row}>
				{renderedSemesters}
				{(props.edit && props.studentYear.active) && <AddSemesterButton studentYear={props.studentYear} setStudentYears={props.setStudentYears}/>}
			</div>
		</div>
  );
}

export default YearBox;
