
"use client";
// import { useAuth } from "@/context/AuthProvider";
import { usePrograms } from "@/context/ProgramProvider";

import { useState, useEffect } from "react";
import Style from "./Majors.module.css";

import { MajorsIndex } from "@/types/type-user";
import { initializeMajorsIndex, updateMajorsIndex } from "./MajorsUtils";

import NavBar from "@/components/navbar/NavBar";
import Overhead from "./overhead/Overhead";
import Metadata from "./metadata/Metadata";
import Requirements from "./requirements/Requirements";

function Majors() {
  // const { user } = useAuth();
  const { progDict, isLoading, error } = usePrograms();

  const progKeys = Object.keys(progDict);
  const [filteredProgKeys, setFilteredProgKeys] = useState<string[]>([]);
  const [index, setIndex] = useState<MajorsIndex | null>(null);
  const [listView, setListView] = useState<boolean>(false);

  // Set filtered keys when progDict changes
  useEffect(() => {
    if (progKeys.length > 0) {
      setFilteredProgKeys(progKeys);
    }
  }, [progDict]);
  
  // Initialize index from session storage when filtered keys change
  useEffect(() => {
    if (typeof window !== "undefined" && filteredProgKeys.length > 0) {
      const storedIndex = sessionStorage.getItem("majorsIndex");
      setIndex(initializeMajorsIndex(storedIndex, filteredProgKeys)); 
    }
  }, [filteredProgKeys]);

  // Update session storage when index changes
  useEffect(() => {
    if (typeof window !== "undefined" && index !== null) {
      sessionStorage.setItem("majorsIndex", JSON.stringify(index));
    }
  }, [index]);

  const updateIndex = (newIndex: Partial<MajorsIndex>) => {
    setListView(false);
    setIndex((prev) => updateMajorsIndex(prev, newIndex, filteredProgKeys));
  };

  // Display loading state while data is being fetched
  if (isLoading) {
    return(
			<div>
				<NavBar utility={<Overhead />}/>
				<div className={Style.MajorsPage}>
					<div>Loading programs data...</div>
				</div>
			</div>
    );
  }

  // Display error message if fetch failed
  if (error) {
    return (
			<div>
				<NavBar utility={<Overhead />}/>
				<div className={Style.MajorsPage}>
					<div>Error loading programs: {error}</div>
				</div>
			</div>
    );
  }

  // Only render the component when data is available
  if (index === null || !filteredProgKeys.length) return null;

  return (
    <div>
      {/* <NavBar utility={<Overhead user={user} setIndex={updateIndex}/>}/> */}
      <NavBar utility={<Overhead />}/>
      <div className={Style.MajorsPage}>
        <div className={Style.ListButton} onClick={() => setListView((prev) => !prev)} />
        <Metadata 
          listView={listView} 
          index={index} 
          setIndex={updateIndex} 
          filteredProgKeys={filteredProgKeys}
        />
        <div className={Style.Divider} />
        <Requirements majorsIndex={listView ? null : index} />
      </div>
    </div>
  );
}

export default Majors;
