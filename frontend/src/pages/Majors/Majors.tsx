import React from "react";
import styles from "./Majors.module.css";
import ReqBoxSub from "./components/RequirementsBox";

export const Majors = () => 
{
  return (
    <div className={styles.FloatRight}>
      <div className={styles.Requirements}>
        <div>
          <h1>Requirements</h1>
          <div>
            <ReqBoxSub title="CORE" content = "Classes"/>
            <ReqBoxSub title="ELECTIVES" content = "Classes"/>
            <ReqBoxSub title="SENIOR REQUIREMENT" content = "Classes"/>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Majors;
