
"use client";
import { useState } from "react";
import { useAuth } from "../providers";

import { DegreeMetadata } from "@/types/type-program";
import { ALL_PROGRAM_METADATAS } from "@/database/data-degree";

import Style from "./Majors.module.css";
import NavBar from "@/components/navbar/NavBar";
import Overhead from "./overhead/Overhead";
import Metadata from "./metadata/Metadata";
import Requirements from "./requirements/Requirements";

function Majors()
{
	const { user, setUser } = useAuth();

  const [programIndex, setProgramIndex] = useState(0);

	const allProgramMetadatas: DegreeMetadata[][] = ALL_PROGRAM_METADATAS;

	const shiftProgramIndex: Function = (dir: number) => {
    setProgramIndex((programIndex + dir + allProgramMetadatas.length) % allProgramMetadatas.length);
  };

  const peekProgram = (dir: number) => {
    return allProgramMetadatas[(programIndex + dir + allProgramMetadatas.length) % allProgramMetadatas.length][0];
  };

  return(
    <div>
      <NavBar utility={<Overhead user={user} setProgramIndex={setProgramIndex}/>}/>
      <div className={Style.MajorsPage}>
        <Metadata
					user={user} 
					setUser={setUser}
          programMetadatas={allProgramMetadatas[programIndex]}
					programIndex={programIndex}
					shiftProgramIndex={shiftProgramIndex}
					peekProgram={peekProgram}
        />
				<div className={Style.Divider}/>
        <Requirements
					user={user}
					setUser={setUser}
          degreeConfiguration={user.FYP.degreeConfigurations[programIndex][0]}
        />
      </div>
    </div>
  );
}

export default Majors;
