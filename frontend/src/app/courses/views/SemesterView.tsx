import React from "react";
import SemesterBox from "../semester/SemesterBox";
import Style from "./SemesterView.module.css";
import { StudentSemester, User } from "@/types/type-user";

interface SemesterViewProps {
  semesters: StudentSemester[];
  edit: boolean;
  user: User;
  setUser: Function;
}

function SemesterView({ semesters, edit, user, setUser }: SemesterViewProps) {
  return (
    <div className={Style.semesterView}>
      {semesters.map((semester) => (
        <SemesterBox
          key={semester.season}
          edit={edit}
          studentSemester={semester}
          user={user}
          setUser={setUser}
        />
      ))}
    </div>
  );
}

export default SemesterView;