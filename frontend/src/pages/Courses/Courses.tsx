
import React, { useState, useEffect } from "react";
import styles from "./Courses.module.css";
import YearBox from "./components/YearBox";
import { MockStudent } from "./../../commons/mock/MockStudent";

export interface DisplaySetting {
  semesterStack: boolean,
  rating: boolean,
  workload: boolean,
}

const defaultDisplaySetting = { semesterStack: false, rating: true, workload: true };

function Settings(props: { displaySetting: DisplaySetting, updateDisplaySetting: Function }) {
    
  const throwBack = (key: string) => {
    if(key === "rating"){
      const newSetting = { ...props.displaySetting, rating: !props.displaySetting.rating };
      props.updateDisplaySetting(newSetting);
    } else 
    if(key === "workload"){
      const newSetting = { ...props.displaySetting, workload: !props.displaySetting.workload };
      props.updateDisplaySetting(newSetting);
    } else 
    if(key === "stack"){
      const newSetting = { ...props.displaySetting, semesterStack: !props.displaySetting.semesterStack };
      props.updateDisplaySetting(newSetting);
    }
  }

  return (
    <div className={styles.CourseBar}>
      <button className={`${styles.optionsChoice} ${props.displaySetting.semesterStack ? styles.activeButton : ''}`} onClick={() => throwBack("stack")}>
        Stack
      </button>
      <button className={`${styles.optionsChoice} ${props.displaySetting.rating ? styles.activeButton : ''}`} onClick={() => throwBack("rating")}>
        Rating
      </button>
      <button className={`${styles.optionsChoice} ${props.displaySetting.workload ? styles.activeButton : ''}`} onClick={() => throwBack("workload")}>
        Workload
      </button>
    </div>
  );
}

function Courses() {

  const [displaySetting, setDisplaySetting] = useState(defaultDisplaySetting);
  const updateDisplaySetting = (newSetting: DisplaySetting) => {
    setDisplaySetting(newSetting);
  };

  useEffect(() => {
  }, [displaySetting]);

  const yearboxComponents = [];
  for (let i=0; i <MockStudent["metadata"].length; i++) {
    yearboxComponents.push(<YearBox year={MockStudent["metadata"][i]} displaySetting={displaySetting}/>); 
  }

  return(
    <div className={styles.CoursesMain}>
      <div style={{ fontSize: "30px", fontWeight: "550", marginBottom: "30px"}}>
        Your Yale Courses
      </div>
      {/* <Settings displaySetting={displaySetting} updateDisplaySetting={updateDisplaySetting}/> */}
      <div className={styles.courseContainer}>
        {yearboxComponents}
      </div>
    </div>
  );
}

export default Courses;
