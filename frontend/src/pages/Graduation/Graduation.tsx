
import React, { useState } from "react";

import GraduationDistribution from "./components/DistributionTable";
import GraduationOverview from "./components/Overview";

import { CPSC } from "./../../commons/mock/MockProgram"

function Graduation() {
  
  const UserYear = () => { return 2; }
  const [currYear, setCurrYear] = useState(UserYear());
  const alterCurrYear = (num: number) => { 
    setCurrYear(num); 
  };

  return (
    <div style={{ display: "flex", alignItems: "baseline", border: "1px solid black" }}>
      <GraduationDistribution currYear={currYear} alterCurrYear={alterCurrYear}/>
      <GraduationOverview degree={CPSC.degrees[0]}/>
    </div>
  );
}

export default Graduation;
