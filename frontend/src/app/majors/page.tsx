
"use client";
import { useAuth } from "@/context/AuthProvider";
import { usePrograms } from "@/context/ProgramProvider";

import { useState, useEffect } from "react";
import Style from "./Majors.module.css";

import { MajorsIndex } from "@/types/type-program"; 
import { initializeMajorsIndex, updateMajorsIndex } from "./MajorsUtils";

import NavBar from "@/components/navbar/NavBar";
import Overhead from "./overhead/Overhead";
import Metadata from "./metadata/Metadata";
import Requirements from "./requirements/Requirements";
import { fill } from "@/utils/preprocessing/Fill";

function Majors()
{
	const { user } = useAuth();
	const { progDict, setProgDict } = usePrograms();

	const progKeys = Object.keys(progDict);
	const [filteredProgKeys, setFilteredProgKeys] = useState<string[]>(progKeys);
	const [index, setIndex] = useState<MajorsIndex | null>(null);
	const [listView, setListView] = useState<boolean>(false);

	useEffect(() => {
    if(progKeys.length > 0){
      setFilteredProgKeys(progKeys);
    }
  }, [progDict]);
	
  useEffect(() => {
		if (typeof window !== "undefined" && filteredProgKeys.length > 0) {
			const storedIndex = sessionStorage.getItem("majorsIndex");
			setIndex(initializeMajorsIndex(storedIndex, filteredProgKeys)); 
		}
	}, [filteredProgKeys]);

  useEffect(() => {
    if(typeof window !== "undefined" && index !== null){
      sessionStorage.setItem("majorsIndex", JSON.stringify(index));
    }
  }, [index]);

  const updateIndex = (newIndex: Partial<MajorsIndex>) => {
		setListView(false);
		setIndex((prev) => updateMajorsIndex(prev, newIndex, filteredProgKeys));
	};

  if (index === null || !filteredProgKeys.length) return null;

	return(
    <div>
      {/* <NavBar utility={<Overhead user={user} setIndex={updateIndex}/>}/>
      <div className={Style.MajorsPage}>
				<div className={Style.ListButton} onClick={() => setListView((prev) => !prev)}/>
				<div className={Style.ListButton} style={{ marginTop: "200px" }} onClick={() => fill(user.FYP.studentCourses, progDict, setProgDict)}/>
				<Metadata 
					listView={listView} 
					index={index} setIndex={updateIndex} 
					filteredProgKeys={filteredProgKeys}
				/>
				<div className={Style.Divider}/>
				<Requirements majorsIndex={listView ? null : index}/>
      </div> */}
    </div>
  );
}

export default Majors;
