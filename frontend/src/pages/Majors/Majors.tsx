
import React, { useState } from 'react';
import styles from "./Majors.module.css";
import MajorRequirementsBox from "./components/MajorRequirementsBox";
import MajorMetadataBox from "./components/MajorMetadataBox";

import { CPSC, CPLT, CSEC } from "./mock/mock";
const majors = [CPSC, CPLT, CSEC];

export const Majors = () => {
  const [currdex, setCurrdex] = useState(0);

  const alterCurrdex = (dir: number) => {
    setCurrdex((currdex + dir + majors.length) % majors.length);
  };

  const seeMajor= (dir: number) => {
    return majors[(currdex + dir + majors.length) % majors.length];
  };

  return (
    <div className={styles.container}>
      <MajorMetadataBox major={majors[currdex]} ferrisMajor={alterCurrdex} seeMajor={seeMajor}/>
      <MajorRequirementsBox major={majors[currdex]} />
    </div>
  );
};

export default Majors;
