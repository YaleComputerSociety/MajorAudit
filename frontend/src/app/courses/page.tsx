
"use client";
import React, { useState, useEffect } from "react";
import Style from "./Courses.module.css";

import { useAuth } from "@/context/AuthProvider";
import { StudentYear } from "@/types/type-user";
import { BuildStudentYears } from "./CoursesUtils";

import NavBar from "@/components/navbar/NavBar";
import YearBox from "./years/YearBox";

function Courses(){
	const { user } = useAuth();

	const [edit, setEdit] = useState(false);
  const toggleEdit = () => { setEdit(!edit); };

	const [columns, setColumns] = useState(true); 
	const toggleColumns = () => { setColumns(!columns); }

	const [studentYears, setStudentYears] = useState<StudentYear[]>(() => BuildStudentYears(user));
	const [renderedYears, setRenderedYears] = useState<React.ReactNode[]>([]);

	useEffect(() => {
		setStudentYears(BuildStudentYears(user));
  }, [user]);

	useEffect(() => {
		const newRenderedYears = studentYears.map((studentYear: StudentYear, index: number) => (
			<YearBox 
				key={index} 
				edit={edit} 
				columns={columns} 
				studentYear={studentYear} 
				setStudentYears={setStudentYears} 
			/>
		));
		setRenderedYears(newRenderedYears);
  }, [edit, columns, studentYears, user]);

  return(
    <div>
      <NavBar/>
      <div className={Style.CoursesPage}>
        <button 
					className={Style.EditButton} 
					onClick={toggleEdit}
				/>
				<button 
					className={Style.EditButton} 
					onClick={toggleColumns} 
					style={{ marginLeft: "40px" }}
				/>
        <div className={Style.Column}>
          {renderedYears}
        </div>
      </div>
    </div>
  );
}

export default Courses;
