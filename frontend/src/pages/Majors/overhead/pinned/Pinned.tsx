
import { useState, useEffect, useRef } from "react";
import Style from "./Pinned.module.css";
import { StudentDegree, User } from "../../../../commons/types/TypeUser";
import { Program } from "../../../../commons/types/TypeProgram";

import MajorSearchBar from "../search/MajorSearch";


function DegreeIcon(props: { studentDegree: StudentDegree, programs: Program[], setCurrdex: Function }) {
  const mark = (status: string) => {
    let mark = "";
    switch (status) {
      case "DA":
        mark = "✓";
        break;
      case "ADD":
        mark = "⚠";
        break;
      case "PIN":
        mark = "📌";
        break;
      default:
        mark = "";
    }
    return (
      <div className={Style.Mark}>
        {mark}
      </div>
    );
  };

  return (
    <div className={Style.DegreeIcon} onClick={() => props.setCurrdex(props.studentDegree.programIndex)}>
      {mark(props.studentDegree.status)}{props.programs[props.studentDegree.programIndex].abbreviation}
    </div>
  );
}

function Pinned(props: { user: User, setCurrdex: Function }) {
  return (
		<div>
			{props.user.studentDegrees.map((studentDegree, index) => (
				<DegreeIcon
					key={index}
					studentDegree={studentDegree}
					programs={props.user.programs}
					setCurrdex={props.setCurrdex}
				/>
			))}
		</div>
  );
}

export default Pinned;
