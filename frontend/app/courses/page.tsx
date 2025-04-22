"use client";
import React, { useState, useEffect } from "react";
import Style from "./Courses.module.css";

import { useUser } from "@/context/UserProvider";
import { ModalProvider } from "./add/context/ModalContext";
import ModalManager from "./add/ModalManager";

import { StudentYear } from "./CoursesTyping";
import { BuildStudentYears } from "./CoursesUtils";

import NavBar from "../../components/navbar/NavBar";
import YearBox from "./years/YearBox";
import AddButton from "./add/button/AddButton";

import Overhead from "./overhead/Overhead";

function Courses() {
  const { currentFYP } = useUser();

  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);

  const [columns, setColumns] = useState(false);
  void [setColumns];

  const [studentYears, setStudentYears] = useState<StudentYear[]>(() =>
    currentFYP ? BuildStudentYears(currentFYP) : []
  );
  const [renderedYears, setRenderedYears] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (currentFYP) {
      setStudentYears(BuildStudentYears(currentFYP));
    }
  }, [currentFYP]);

  useEffect(() => {
    const newRenderedYears = studentYears.map((studentYear, index) => (
      <YearBox
        key={index}
        edit={edit}
        columns={columns}
        studentYear={studentYear}
        setStudentYears={setStudentYears}
      />
    ));
    setRenderedYears(newRenderedYears);
  }, [edit, columns, studentYears]);

  if (!currentFYP) {
    return (
      <div>
        <NavBar />
        <div className={Style.CoursesPage}>
          Bro, how do you not have an FYP?
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar utility={<Overhead />} />
      <div className={Style.CoursesPage}>
        <ModalProvider>
          <AddButton />
          <ModalManager />
        </ModalProvider>
        <button
          className={Style.ListButton}
          style={{ marginLeft: "200px" }}
          onClick={toggleEdit}
        />
        <div className={Style.Column}>{renderedYears}</div>
      </div>
    </div>
  );
}

export default Courses;
