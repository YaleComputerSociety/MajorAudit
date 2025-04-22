// frontend/app/courses/page.tsx

"use client";

import React, { useMemo, useState } from "react";
import Style from "./Courses.module.css";

import { useUser } from "@/context/UserProvider";
import { ModalProvider } from "./add/context/ModalContext";
import ModalManager from "./add/ModalManager";

import { BuildStudentYears } from "./CoursesUtils";

import NavBar from "../../components/navbar/NavBar";
import YearBox from "./years/YearBox";
import AddButton from "./add/button/AddButton";
import Overhead from "./overhead/Overhead";
import { CoursesPageProvider, useCoursesPage } from "../../context/CoursesContext";

// Separate component for when no FYP is available
const NoFYP = () => (
  <div>
    <NavBar />
    <div className={Style.CoursesPage}>How do you not have an FYP?</div>
  </div>
);

// Extracted YearsList component to enhance code organization
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
  const { editMode, toggleEditMode } = useCoursesPage();

  // Use a state for columns if this needs to be toggled
  const [columns, setColumns] = useState(false);
  
  // Use useMemo to compute studentYears only when currentFYP changes
  const studentYears = useMemo(() => 
    currentFYP ? BuildStudentYears(currentFYP) : []
  , [currentFYP]);

  // Only show NoFYP message if we've finished loading and still don't have an FYP
  if (!isLoading && !currentFYP) {
    return <NoFYP />;
  }
  
  // During loading, we'll continue to display the current FYP if it exists
  // If no FYP exists yet, we'll show a minimal loading indicator

  return (
    <div>
      <NavBar utility={<Overhead edit={editMode} toggleEdit={toggleEditMode} />} />
      <div className={Style.CoursesPage}>
        <ModalProvider>
          <AddButton />
          <ModalManager />
        </ModalProvider>
        <YearsList studentYears={studentYears} columns={columns} isLoading={isLoading} />
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