
import React, { useState, useEffect } from "react";
import styles from "./Courses.module.css";
import YearBox from "./components/YearBox";
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

export default function Courses() {

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
    <div className={styles.CoursesPage}>
      <div>
        <Settings displaySetting={displaySetting} updateDisplaySetting={updateDisplaySetting}/>
        {yearboxComponents}
      </div>
    </div>
  );
}
