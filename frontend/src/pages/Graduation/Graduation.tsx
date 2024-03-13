
import React, { useState } from "react";
import styles from "./Graduation.module.css";
import GraduationDistribution from "./components/DistributionTable";


function GraduationRecommendations(){
  return(
    <div className={styles.containerRecommendations}>
      <div style={{ fontSize: "30px", fontWeight: "500" }}>Recomendations</div>
    </div>
  );
}



function GraduationOverview(){
  return(
    <div className={styles.containerOverview}>
      <div style={{ fontSize: "30px", fontWeight: "500" }}>Overview</div>
    </div>
  );
}

export const Graduation = () => {
  
  const UserYear = () => { return 2; }
  const [currYear, setCurrYear] = useState(UserYear());
  const alterCurrYear = (num: number) => { 

    setCurrYear(num); 
  };

  return (
    <div className={styles.container}>
      <GraduationRecommendations/>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <GraduationDistribution currYear={currYear} alterCurrYear={alterCurrYear}/>
        <GraduationOverview/>
      </div>
    </div>
  );
}

export default Graduation;
