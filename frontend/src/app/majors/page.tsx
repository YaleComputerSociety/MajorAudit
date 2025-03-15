
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
	const { progDict } = usePrograms();

	const progKeys = Object.keys(progDict);
	const [filteredProgKeys, setFilteredProgKeys] = useState<string[]>(progKeys);
	const [index, setIndex] = useState<MajorsIndex | null>(null);

	useEffect(() => {
    if(progKeys.length > 0){
      setFilteredProgKeys(progKeys);
    }
  }, [progDict]);
	
  useEffect(() => {
		if (typeof window !== "undefined" && filteredProgKeys.length > 0) {
			const storedIndex = sessionStorage.getItem("majorsIndex");
			let parsedIndex: MajorsIndex = storedIndex ? JSON.parse(storedIndex) : { conc: 0, deg: 0, prog: filteredProgKeys[0] };
	
			if (!filteredProgKeys.includes(parsedIndex.prog)) {
				parsedIndex = { ...parsedIndex, prog: filteredProgKeys[0] };
			}
	
			setIndex(parsedIndex);
		}
	}, [filteredProgKeys]);

  useEffect(() => {
    if(typeof window !== "undefined" && index !== null){
      sessionStorage.setItem("majorsIndex", JSON.stringify(index));
    }
  }, [index]);

  const updateIndex = (newIndex: Partial<MajorsIndex>) => {
    setIndex((prev) => {
      if (!prev) return { conc: 0, deg: 0, prog: filteredProgKeys[0] || "" };

      return{
        ...prev,
        ...newIndex,
        prog: newIndex.prog !== undefined
          ? filteredProgKeys[
              (filteredProgKeys.indexOf(newIndex.prog) + filteredProgKeys.length) % filteredProgKeys.length
            ]
          : prev.prog,
        conc: newIndex.conc !== undefined
          ? (newIndex.conc === -1 ? (prev.conc === -1 ? 0 : -1) : newIndex.conc)
          : prev.conc,
      };
    });
  };

  if (index === null || !filteredProgKeys.length) return null;

	return(
    <div>
      <NavBar utility={<Overhead user={user} setIndex={updateIndex}/>}/>
      <div className={Style.MajorsPage}>
				<div className={Style.ListButton} onClick={() => updateIndex({ ...index, conc: -1 })}/>
				<Metadata index={index} setIndex={updateIndex} filteredProgKeys={filteredProgKeys}/>
				<div className={Style.Divider}/>
				<Requirements majorsIndex={index.conc === -1 ? null : index}/>
      </div>
    </div>
  );
}

export default Majors;
