
import { useState, useEffect } from "react";
import { StudentYear, StudentSemester } from "../CoursesTyping";

import SemesterBox from "./semester/SemesterBox"
// import AddSemesterButton from "./add-semester/AddSemesterButton"
import { useUser } from "@/context/UserProvider";

function RenderSemesters(props: { 
	edit: boolean;
	columns: boolean; 
	studentYear: StudentYear, 
	setStudentYears: React.Dispatch<React.SetStateAction<StudentYear[]>>, 
}) {
  const newRenderedSemesters = props.studentYear.studentSemesters
    .filter((studentSemester: StudentSemester) => studentSemester.term !== "0")
    .map((studentSemester: StudentSemester) => (
      <SemesterBox 
				key={studentSemester.term} 
				edit={props.edit} 
				studentSemester={studentSemester} 
			/>
    ));

  return( 
    <div style={{ display: 'flex', flexDirection: props.columns ? 'column' : 'row' }}>
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
	const { user } = useUser();
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
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ fontWeight: "600", fontSize: "25px", marginRight: "10px" }}>
				{props.studentYear.grade}
			</div>
			<div style={{ display: 'flex', flexDirection: props.columns ? 'column' : 'row' }}>
				{renderedSemesters}
				{/* {(props.edit && (props.studentYear.studentSemesters.length < 3)) && 
					<AddSemesterButton 
						studentYear={props.studentYear} 
						setStudentYears={props.setStudentYears}
					/>
				} */}
			</div>
		</div>
  );
}

export default YearBox;
