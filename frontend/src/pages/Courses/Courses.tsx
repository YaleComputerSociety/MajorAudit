
import React, { useState, useEffect } from "react";
import styles from "./Courses.module.css";
import YearBox from "./components/YearBox";
import { MockStudent } from "./test";

function CoursesIteration(props: { showGPA: boolean, toggleShowGPA: Function }) {
    
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.row} style={{ alignItems: "center" }}>
      <button className={`${styles.optionsButton} ${isOpen ? styles.activeButton : ''}`} onClick={toggleDropdown}>
        Options
      </button>
      {isOpen && (
        <button className={`${styles.optionsChoice} ${props.showGPA ? styles.activeButton : ''}`} onClick={() => props.toggleShowGPA()}>GPA</button>
      )}
    </div>
  );
}

export default function Courses() {

  const [showGPA, setShowGPA] = useState(false);
  const toggleShowGPA = () => {
    setShowGPA(!showGPA);
  };

  useEffect(() => {
  }, [showGPA]);

  const yearboxComponents = [];
  for (let i=0; i <MockStudent["metadata"].length; i++) {
    yearboxComponents.push(<YearBox year={MockStudent["metadata"][i]} showGPA={showGPA}/>); 
  }

  return(
    <div className={styles.container}>
      <div>
        <CoursesIteration showGPA={showGPA} toggleShowGPA={toggleShowGPA}/>
        {yearboxComponents}
      </div>
    </div>
  );
}
