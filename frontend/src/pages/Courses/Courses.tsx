
import React, { useState, useEffect } from "react";
import styles from "./Courses.module.css";

import YearBox from "./components/YearBox";
import AddCourseMenu from "./components/add_course/AddCourse";

import { MockStudent } from "./../../commons/mock/MockStudent";

export interface DisplaySetting {
  rating: boolean,
  workload: boolean,
}

const defaultDisplaySetting = { rating: true, workload: true };

function Settings(props: { displaySetting: DisplaySetting, updateDisplaySetting: Function }) {
    
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => { setIsOpen(!isOpen); };

  const throwBack = (key: string) => {
    if(key === "rating"){
      const newSetting = { ...props.displaySetting, rating: !props.displaySetting.rating };
      props.updateDisplaySetting(newSetting);
    } else 
    if(key === "workload"){
      const newSetting = { ...props.displaySetting, workload: !props.displaySetting.workload };
      props.updateDisplaySetting(newSetting);
    }
  }

  return (
    <div className={styles.row} style={{ alignItems: "center" }}>
      <button className={`${styles.optionsButton} ${isOpen ? styles.activeButton : ''}`} onClick={toggleDropdown}>
        Options
      </button>
      {isOpen && (
        <div style={{ display: "flex" }}>
          <button className={`${styles.optionsChoice} ${props.displaySetting.rating ? styles.activeButton : ''}`} onClick={() => throwBack("rating")}>
            Rating
          </button>
          <button className={`${styles.optionsChoice} ${props.displaySetting.workload ? styles.activeButton : ''}`} onClick={() => throwBack("workload")}>
            Workload
          </button>
        </div>
      )}
    </div>
  );
}

function Courses() {

  const [displaySetting, setDisplaySetting] = useState(defaultDisplaySetting);
  const updateDisplaySetting = (newSetting: DisplaySetting) => { setDisplaySetting(newSetting); };
  useEffect(() => {}, [displaySetting]);

  const [addCourse, setAddCourse] = useState(false);
  const toggleAddCourse = () => { setAddCourse(!addCourse); };
  useEffect(() => {}, [addCourse]);

  const yearboxComponents = [];
  for(let i=0; i <MockStudent["metadata"].length; i++) 
  {
    yearboxComponents.push(<YearBox year={MockStudent["metadata"][i]} displaySetting={displaySetting}/>); 
  }

  return(
    <div className={styles.CoursesPage}>
      <button className={styles.AddCourseButton} onClick={toggleAddCourse}>
        +
      </button>
      <div className={`${styles.AddCourseMenuDormant} ${addCourse ? styles.AddCourseMenuActive : ''}`}>
        {addCourse && (<AddCourseMenu/>)}
      </div>
      <div className={styles.column}>
        {yearboxComponents}
      </div>
    </div>
  );
}

// {/* <Settings displaySetting={displaySetting} updateDisplaySetting={updateDisplaySetting}/> */}

export default Courses;
