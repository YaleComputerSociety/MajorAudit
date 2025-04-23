// frontend/app/courses/page.tsx

"use client";
import React, { useMemo, useState } from "react";
import Style from "./Courses.module.css";

import { useUser } from "@/context/UserProvider";
import { CoursesPageProvider } from "../../context/CoursesContext";

import { ModalProvider } from "./add/context/ModalContext";
import ModalManager from "./add/ModalManager";

import { BuildStudentYears } from "./CoursesUtils";

import NavBar from "../../components/navbar/NavBar";
import YearBox from "./years/YearBox";
import AddButton from "./add/button/AddButton";
import Overhead from "./overhead/Overhead";

const NoFYP = () => (
  <div>
    <NavBar />
    <div className={Style.CoursesPage}>How do you not have an FYP?</div>
  </div>
);

const YearsList = React.memo(({ studentYears, columns, isLoading }: { studentYears: any[], columns: boolean, isLoading: boolean }) => (
  <div className={Style.Column}>
    {studentYears.length > 0 ? (
      studentYears.map((studentYear, index) => (
        <YearBox
          key={`year-${studentYear.grade}`}
          columns={columns}
          studentYear={studentYear}
        />
      ))
    ) : isLoading ? (
      <div style={{ padding: "20px", fontSize: "16px" }}>Loading FYP</div>
    ) : null}
  </div>
));

YearsList.displayName = 'YearsList';

function CoursesBody() {
  const { currentFYP, isLoading } = useUser();
  const [columns, setColumns] = useState(false);

  const studentYears = useMemo(() => {
		return currentFYP ? BuildStudentYears(currentFYP) : [];
	}, [currentFYP]);

  if (!isLoading && !currentFYP) {
    return <NoFYP/>;
  }
  
  return (
    <div>
      <NavBar utility={<Overhead/>}/>
      <div className={Style.CoursesPage}>
        <ModalProvider>
          <AddButton />
          <ModalManager />
        </ModalProvider>
        <YearsList studentYears={studentYears} columns={columns} isLoading={isLoading}/>
      </div>
    </div>
  );
}

function Courses() {
  return (
    <CoursesPageProvider>
      <CoursesBody />
    </CoursesPageProvider>
  );
}

export default Courses;