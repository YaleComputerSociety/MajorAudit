
"use client";
import { useState, useEffect } from "react";
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

	const [index, setIndex] = useState<MajorsIndex | null>(null);

  useEffect(() => {
    if(typeof window !== "undefined"){
      const storedIndex = sessionStorage.getItem("majorsIndex");
      setIndex(storedIndex ? JSON.parse(storedIndex) : { conc: 0, deg: 0, prog: 0 });
    }
  }, []);

  useEffect(() => {
    if(typeof window !== "undefined" && index !== null){
      sessionStorage.setItem("majorsIndex", JSON.stringify(index));
    }
  }, [index]);

  const updateIndex = (newIndex: MajorsIndex) => {
    setIndex((prev) => ({
      ...prev!,
      ...newIndex,
      prog: newIndex.prog !== undefined
        ? (newIndex.prog + user.FYP.prog_list.length) % user.FYP.prog_list.length
        : prev!.prog,
      conc: newIndex.conc === -1 ? (prev!.conc === -1 ? 0 : -1) : newIndex.conc,
    }));
  };

  if(index === null) return null;

	return(
    <div>
      <NavBar utility={<Overhead user={user} setIndex={setIndex}/>}/>
      <div className={Style.MajorsPage}>
				<div className={Style.EditButton} onClick={() => updateIndex({ ...index, conc: -1 })}/>
				<Metadata programs={user.FYP.prog_list} index={index} setIndex={updateIndex}/>
				<div className={Style.Divider}/>
				<Requirements conc={index.conc === -1 ? null : user.FYP.prog_list[index.prog].prog_degs[index.deg].deg_concs[index.conc]}/>
      </div>
    </div>
  );
}

export default Majors;
