
import { useState, useEffect, useRef } from "react";
import Style from "./Pinned.module.css";
import { StudentDegree, User } from "../../../../commons/types/TypeUser";
import { ALL_PROGRAM_METADATAS } from "../../../../commons/mock/MockDegreeMetadata";

import MajorSearchBar from "../search/MajorSearch";


function DegreeIcon(props: { studentDegree: StudentDegree, setProgramIndex: Function }) {
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
    <div className={Style.DegreeIcon} onClick={() => props.setProgramIndex(props.studentDegree.programIndex)}>
      {mark(props.studentDegree.status)}{ALL_PROGRAM_METADATAS[props.studentDegree.programIndex][0].abbr}
    </div>
  );
}

function Pinned(props: { user: User, setProgramIndex: Function }) {
  return (
		<div>
			{props.user.FYP.degreeDeclarations.map((studentDegree, index) => (
				<DegreeIcon
					key={index}
					studentDegree={studentDegree}
					setProgramIndex={props.setProgramIndex}
				/>
			))}
		</div>
  );
}

export default Pinned;
