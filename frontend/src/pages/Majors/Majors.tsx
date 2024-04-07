
import React, { useState } from 'react';
import styles from "./Majors.module.css";

import ProgramRequirementsBox from "./components/ProgramRequirementsBox";
import ProgramMetadataBox from "./components/ProgramMetadataBox";

import { CPSC, ECON, HIST } from "./../../commons/mock/MockProgram";
const programs = [CPSC, ECON, HIST];

const pinned = ["Computer Science", "English"];

function PinnedDegree(props: { degree: String }) {
  return(
    <div className={styles.PinnedMajor}>
      {props.degree}
    </div>
  );
}

function Storage() {
  return (
    <div style={{ marginLeft: "20px", marginBottom: "70px" }}>
      <div className={styles.row} style={{ alignItems: "baseline" }}>
        <div style={{ fontSize: "30px", fontWeight: "550", marginBottom: "14px", marginRight: "16px" }}>
          Yale College Majors
        </div>
        <PinnedDegree degree={"✓ Cognitive Science"}/>
        <PinnedDegree degree={"Computer Science"}/>
      </div>
      <div style={{ width: "100%", padding: "2px", border: "1px solid #dcdcdc", borderRadius: "20px", display: "flex", alignItems: "center" }}>
        <input type="text" placeholder="Search Majors..." style={{ flex: 1, border: "none", outline: "none", borderRadius: "18px", padding: "10px", fontSize: "16px" }}/>
      </div>
    </div>
  );
}

function Majors() {

  // Which Program
  const [currdex, setCurrdex] = useState(0);
  const alterCurrdex = (dir: number) => { 
    setCurrdex((currdex + dir + programs.length) % programs.length);
    setCurrDegree(0); 
  };
  const seeProgram = (dir: number) => { 
    return programs[(currdex + dir + programs.length) % programs.length]; 
  };

  // Which Degree
  const [currDegree, setCurrDegree] = useState(0);
  const alterCurrDegree = (num: number) => { 
    setCurrDegree(num); 
  };
  
  return(
    <div className={styles.column} style={{ justifyContent: "center" }}>
      <Storage/>
      <div className={styles.row} style={{ alignItems: "center" }}>
        <ProgramMetadataBox 
          program={programs[currdex]} 
          scrollProgram={alterCurrdex} 
          seeProgram={seeProgram}
          whichDegree={currDegree}
          alterCurrDegree={alterCurrDegree}/>
        <ProgramRequirementsBox degree={programs[currdex].degrees[currDegree]}/>
      </div>
    </div>
  );
};

export default Majors;
