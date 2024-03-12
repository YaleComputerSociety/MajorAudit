
import React, { useState } from 'react';
import styles from "./Majors.module.css";

import ProgramRequirementsBox from "./components/ProgramRequirementsBox";
import ProgramMetadataBox from "./components/ProgramMetadataBox";

import { CPSC, ECON, HIST } from "./mock/mock";
const programs = [CPSC, ECON, HIST];

export const Majors = () => {

  // Which Program
  const [currdex, setCurrdex] = useState(0);
  const alterCurrdex = (dir: number) => { 
    setCurrdex((currdex + dir + programs.length) % programs.length); 
  };
  const seeProgram= (dir: number) => { 
    return programs[(currdex + dir + programs.length) % programs.length]; 
  };

  // Which Degree
  const [currDegree, setCurrDegree] = useState(0);
  const alterCurrDegree = (num: number) => { 
    setCurrDegree(num); 
  };

  return (
    <div className={styles.container}>
      <ProgramMetadataBox 
        program={programs[currdex]} 
        scrollProgram={alterCurrdex} 
        seeProgram={seeProgram}

        whichDegree={currDegree}
        alterCurrDegree={alterCurrDegree}/>
      <ProgramRequirementsBox degree={programs[currdex].degrees[currDegree]}/>
    </div>
  );
};

export default Majors;
