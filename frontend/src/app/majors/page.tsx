
"use client";
import { useState } from "react";
import { useAuth } from "../providers";

import Style from "./Majors.module.css";
import NavBar from "@/components/navbar/NavBar";
import Overhead from "./overhead/Overhead";
import Metadata from "./metadata/Metadata";
import Requirements from "./requirements/Requirements";

function Majors()
{
	const { user, setUser } = useAuth();
	const { programs } = user.FYP.programs;

	const [index, setIndex]  = useState({ conc: 0, deg: 0, prog: 0});
  const updateIndex: Function = (index: { conc: number, deg: number, prog: number}) => {
		setIndex(index)
	};

	const peekProgram = (dir: number) => {
    return programs[(index.prog + dir + programs.length) % programs.length];
  };

  return(
    <div>
			{/* utility={<Overhead user={user} setProgramIndex={updateProgramIndex}/>} */}
      <NavBar/>
      <div className={Style.MajorsPage}>
        <Metadata
          program={programs[index.prog]}
					index={index}
					setIndex={updateIndex}
					peekProgram={peekProgram}
        />
				<div className={Style.Divider}/>
        <Requirements
					conc={programs[index.prog][index.deg][index.conc]}
        />
      </div>
    </div>
  );
}

export default Majors;
