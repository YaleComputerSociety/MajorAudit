
import React, { useState } from "react";
import styles from "./Graduation.module.css";

import GraduationDistribution from "./components/DistributionTable";
import GraduationOverview from "./components/Overview";

import { CPSC } from "./../../commons/mock/MockProgram"

function Recommendations(){
  return(
    <div>
      <div style={{ fontSize: "30px", fontWeight: "500" }}>
        Hello, Ryan!
      </div>
    </div>
  );
}

function Graduation() {

const UserYear = () => { return 2; }
const [currYear, setCurrYear] = useState(UserYear());
const alterCurrYear = (num: number) => { 
  setCurrYear(num); 
};

return (
  <div className={styles.row}>
    <div className={styles.column} style={{ justifyContent: "space-between", marginRight: "30px" }}>
      <Recommendations/>
      <GraduationDistribution currYear={currYear} alterCurrYear={alterCurrYear}/>
    </div>
    <GraduationOverview degree={CPSC.degrees[0]}/>
  </div>
);
}

export default Graduation;

