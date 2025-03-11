
"use client";
import { useState } from "react";
import { useAuth } from "../providers";
import { MajorsIndex } from "@/types/type-program"; 

import Style from "./Majors.module.css";
import NavBar from "@/components/navbar/NavBar";
import Overhead from "./overhead/Overhead";
import Metadata from "./metadata/Metadata";
import Requirements from "./requirements/Requirements";

function Majors()
{
	const { user } = useAuth();

	const [index, setIndex] =  useState<MajorsIndex>({ conc: 0, deg: 0, prog: 0});
  const updateIndex: Function = (index: MajorsIndex) => {
		index.prog = index.prog % user.FYP.programs.length;
		setIndex(index);
	};

	const peekProgram = (dir: number) => {
    return user.FYP.programs[(index.prog + dir + user.FYP.programs.length) % user.FYP.programs.length].prog_data;
  };

  return(
    <div>
			{/* utility={<Overhead user={user} setProgramIndex={updateProgramIndex}/>} */}
      <NavBar/>
      <div className={Style.MajorsPage}>
        <Metadata
          program={user.FYP.programs[index.prog]}
					index={index}
					setIndex={updateIndex}
					peekProgram={peekProgram}
        />
				<div className={Style.Divider}/>
        <Requirements conc={user.FYP.programs[index.prog].prog_degs[index.deg].deg_concs[index.conc]}/>
      </div>
    </div>
  );
}

export default Majors;
