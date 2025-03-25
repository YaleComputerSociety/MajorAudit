
"use client";
import React, { useState, useEffect } from "react";
import Style from "./Courses.module.css";

import { useAuth } from "@/context/AuthProvider";
import { ModalProvider } from "./add/context/ModalContext";
import ModalManager from "./add/ModalManager";

import { StudentYear } from "@/types/type-user";
import { BuildStudentYears } from "./CoursesUtils";

import NavBar from "@/components/navbar/NavBar";
import YearBox from "./years/YearBox";
import AddButton from "./add/button/AddButton";

function Courses()
{
	const { user } = useAuth();

	const [edit, setEdit] = useState(false);
  // const toggleEdit = () => { setEdit(!edit); };

	const [columns, setColumns] = useState(false); 
	// const toggleColumns = () => { setColumns(!columns); }

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
				<ModalProvider>
        	<AddButton/>
					<ModalManager/>
				</ModalProvider>
        <div className={Style.Column}>
          {renderedYears}
        </div>
      </div>
    </div>
  );
}

export default Courses;
