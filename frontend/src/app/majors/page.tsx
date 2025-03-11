
"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../providers";
import { MajorsIndex } from "@/types/type-program"; 

import Style from "./Majors.module.css";
import NavBar from "@/components/navbar/NavBar";
// import Overhead from "./overhead/Overhead";
import Metadata from "./metadata/Metadata";
import Requirements from "./requirements/Requirements";

function Majors()
{
	const { user } = useAuth();
	const [index, setIndex] = useState<MajorsIndex>({ conc: 0, deg: 0, prog: 0 });
	
	useEffect(() => {
    if(typeof window !== "undefined"){
      const storedIndex = sessionStorage.getItem("majorsIndex");
      if(storedIndex){
        setIndex(JSON.parse(storedIndex));
      }
    }
  }, []);

  useEffect(() => {
    if(typeof window !== "undefined"){
      sessionStorage.setItem("majorsIndex", JSON.stringify(index));
    }
  }, [index]);

	const updateIndex = (newIndex: MajorsIndex) => {
		if(newIndex.conc === -1){
			setIndex({ ...newIndex, deg: 0, conc: index.conc === -1 ? 0 : -1 });
			return;
		}
		setIndex({ ...newIndex, prog: (newIndex.prog + user.FYP.programs.length) % user.FYP.programs.length });
	};

	return(
    <div>
      <NavBar utility={<div className={Style.EditButton} onClick={() => updateIndex({ ...index, conc: -1 })}/>}/>
      <div className={Style.MajorsPage}>
				<Metadata programs={user.FYP.programs} index={index} setIndex={updateIndex}/>
				<div className={Style.Divider}/>
				<Requirements conc={index.conc === -1 ? null : user.FYP.programs[index.prog].prog_degs[index.deg].deg_concs[index.conc]} />
      </div>
    </div>
  );
}

export default Majors;
