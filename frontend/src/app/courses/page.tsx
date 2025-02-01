
"use client";
import React, { useState, useEffect } from "react";
import Style from "./Courses.module.css";

import { useAuth } from "../providers";
import { StudentSemester } from "@/types/type-user";

import NavBar from "@/components/navbar/NavBar";
import SemesterBox from "./semester/SemesterBox";
import AddSemesterButton from "./add-semester/AddSemesterButton";

function Courses()
{
	const { user, setUser } = useAuth();
  const [renderedSemesters, setRenderedSemesters] = useState<React.ReactNode[]>([]);
  
	const [edit, setEdit] = useState(false);
  const toggleEdit = () => {
    setEdit(!edit);
  };

	useEffect(() => {
		const newRenderedSemesters = user.FYP.studentSemesters.map((semester: StudentSemester, index: number) => (
			<SemesterBox key={index} edit={edit} studentSemester={semester} user={user} setUser={setUser}/>
		));
		setRenderedSemesters(newRenderedSemesters);
  }, [edit, user, setUser]);

  return(
    <div>
      <NavBar/>
      <div className={Style.CoursesPage}>
        <button className={Style.EditButton} onClick={toggleEdit}>

				</button>
        <div className={Style.Column}>
          {renderedSemesters}
					{edit && <AddSemesterButton user={user} setUser={setUser}/>}
        </div>
      </div>
    </div>
  );
}

export default Courses;
