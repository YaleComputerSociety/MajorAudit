
import { useState, useEffect } from "react";
import Style from "../YearBox.module.css";
import { StudentYear, StudentSemester } from "@/types/type-user";

import SemesterBox from "./semester/SemesterBox"
import AddSemesterButton from "./add-semester/AddSemesterButton"
import { useAuth } from "@/context/AuthProvider";

function RenderSemesters(props: { 
	edit: boolean;
	columns: boolean; 
	studentYear: StudentYear, 
	setStudentYears: React.Dispatch<React.SetStateAction<StudentYear[]>>, 
}) {
  const newRenderedSemesters = props.studentYear.studentSemesters
    .filter((studentSemester: StudentSemester) => studentSemester.term !== 0)
    .map((studentSemester: StudentSemester) => (
      <SemesterBox 
				key={studentSemester.term} 
				edit={props.edit} 
				studentSemester={studentSemester} 
			/>
    ));

  return( 
    <div className={props.columns ? Style.Column : Style.Row}>
      {newRenderedSemesters}
    </div>
  );
}

function YearBox(props: { 
	edit: boolean, 
	columns: boolean, 
	studentYear: StudentYear, 
	setStudentYears: React.Dispatch<React.SetStateAction<StudentYear[]>>, 
}){
	const { user } = useAuth();
  const [renderedSemesters, setRenderedSemesters] = useState<React.ReactNode>(null);
	
	useEffect(() => {
    setRenderedSemesters(
      <RenderSemesters 
				edit={props.edit} 
				columns={props.columns} 
				studentYear={props.studentYear} 
				setStudentYears={props.setStudentYears} 
			/>
    );
  }, [props.edit, props.columns, props.studentYear, user, props.setStudentYears]);

  return(
		<div className={Style.Column}>
			<div className={Style.Grade}>
				{props.studentYear.grade}
			</div>
			<div className={props.columns ? Style.Column : Style.Row}>
				{renderedSemesters}
				{(props.edit && (props.studentYear.studentSemesters.length < 3)) && 
					<AddSemesterButton 
						studentYear={props.studentYear} 
						setStudentYears={props.setStudentYears}
					/>
				}
			</div>
		</div>
  );
}

export default YearBox;
