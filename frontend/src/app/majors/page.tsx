
"use client";
import { useAuth } from "@/context/AuthProvider";
import { usePrograms } from "@/context/ProgramProvider";

import { useState, useEffect } from "react";
import Style from "./Majors.module.css";

import { MajorsIndex } from "@/types/type-program"; 

import NavBar from "@/components/navbar/NavBar";
import Overhead from "./overhead/Overhead";
import Metadata from "./metadata/Metadata";
import Requirements from "./requirements/Requirements";

function Majors()
{
	const { user } = useAuth();
	const { progList } = usePrograms();

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
		console.log("old");
		console.log(newIndex);
    setIndex((prev) => ({
      ...prev!,
      ...newIndex,
      prog: newIndex.prog !== undefined
        ? (newIndex.prog + progList.length) % progList.length
        : prev!.prog,
      conc: newIndex.conc === -1 ? (prev!.conc === -1 ? 0 : -1) : newIndex.conc,
    }));
		console.log("new");
		console.log(index);
  };

  if(index === null) return null;

	return(
    <div>
      <NavBar utility={<Overhead user={user} setIndex={updateIndex}/>}/>
      <div className={Style.MajorsPage}>
				<div className={Style.ListButton} onClick={() => updateIndex({ ...index, conc: -1 })}/>
				<Metadata index={index} setIndex={updateIndex}/>
				<div className={Style.Divider}/>
				<Requirements majorsIndex={index.conc === -1 ? null : index}/>
      </div>
    </div>
  );
}

export default Majors;
