
"use client";
import React, { useState, useEffect } from "react";
import Style from "./Courses.module.css";

import { useAuth } from "../providers";
import { StudentSemester } from "@/types/type-user";

import NavBar from "@/components/navbar/NavBar";
import SemesterBox from "./semester/SemesterBox";
import AddSemesterButton from "./add-semester/AddSemesterButton";
import SemesterView from "./views/SemesterView";
import YearView from "./views/YearView";

function Courses()
{
	const { user, setUser } = useAuth();
  const [renderedSemesters, setRenderedSemesters] = useState<React.ReactNode[]>([]);
  
	const [edit, setEdit] = useState(false);
  const [isSemesterView, setIsSemesterView] = useState(true);
  const toggleEdit = () => {
    setEdit(!edit);
  };

  const toggleView = () => {
    setIsSemesterView(!isSemesterView);
  }

  const semesters = [...user.FYP.studentSemesters].sort((a,b) => a.season-b.season);

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
        <button className={Style.EditButton} onClick={toggleEdit}></button>
        <button className ={Style.ViewToggleButton} onClick={toggleView}></button>
        <div className = {Style.SemesterAll}>
        {isSemesterView ? (
          <SemesterView semesters={semesters} edit={edit} user={user} setUser={setUser} />
        ) : (
          <YearView semesters={semesters} edit={edit} user={user} setUser={setUser} />
        )}
        {edit && (
          <div className={Style.SemesterButton}>
          <AddSemesterButton user={user} setUser={setUser}/>
          </div>
          )}
          </div>
      </div>
    </div>
  );
}

export default Courses;
