// frontend/app/majors/page.tsx

"use client";
import { usePrograms } from "../../context/ProgramProvider";
import { useState, useEffect, useMemo, useCallback } from "react";
import Style from "./Majors.module.css";
import { MajorsIndex } from "@/types/user";
import { initializeMajorsIndex, updateMajorsIndex } from "./MajorsUtils";
import NavBar from "../../components/navbar/NavBar";
import Overhead from "./overhead/Overhead";
import Metadata from "./metadata/Metadata";
import Requirements from "./requirements/Requirements";

import { useUser } from "@/context/UserProvider"; 
import { fill } from "@/utils/fill"; 

function Majors() {
  const { progDict, setProgDict, baseProgDict, isLoading, error } = usePrograms();
	const { currentFYP } = useUser();
  const [listView, setListView] = useState<boolean>(false);
  const [index, setIndex] = useState<MajorsIndex | null>(null);

	useEffect(() => {
		if (!currentFYP) return;
		const clonedBase = JSON.parse(JSON.stringify(baseProgDict)); // Deep clone to prevent mutation
		fill(currentFYP.studentCourses, clonedBase, setProgDict);
	}, [currentFYP, baseProgDict, setProgDict]);

	// Memoize filtered keys to prevent unnecessary recalculations
  const filteredProgKeys = useMemo(() => {
    return Object.keys(progDict);
  }, [progDict]);

  // Memoize the updateIndex function to prevent recreating on every render
  const updateIndex = useCallback((newIndex: Partial<MajorsIndex>) => {
    setListView(false);
    setIndex((prev) => updateMajorsIndex(prev, newIndex, filteredProgKeys));
  }, [filteredProgKeys]);

  // Combine the session storage logic into a single effect with proper dependencies
  useEffect(() => {
    if (typeof window === "undefined" || filteredProgKeys.length === 0) return;
    
    // Only retrieve from session storage once when keys are available
    if (index === null) {
      const storedIndex = sessionStorage.getItem("majorsIndex");
      setIndex(initializeMajorsIndex(storedIndex, filteredProgKeys));
    } else {
      // Only update session storage when index changes
      sessionStorage.setItem("majorsIndex", JSON.stringify(index));
    }
  }, [filteredProgKeys, index]);

  // Display loading state while data is being fetched
  if (isLoading) {
    return(
      <div>
        <NavBar utility={<Overhead listView={listView} setListView={setListView}/>}/>
        <div className={Style.MajorsPage}>
          <div>Loading Programs</div>
        </div>
      </div>
    );
  }

  // Display error message if fetch failed
  if (error) {
    return (
      <div>
        <NavBar utility={<Overhead listView={listView} setListView={setListView}/>}/>
        <div className={Style.MajorsPage}>
          <div>Error Loading Programs: {error}</div>
        </div>
      </div>
    );
  }

  // Only render the component when data is available
  if (index === null || !filteredProgKeys.length) return null;

  return (
    <div>
      <NavBar utility={<Overhead listView={listView} setListView={setListView}/>}/>
      <div className={Style.MajorsPage}>
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
