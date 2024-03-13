
import React, { useState } from "react";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import styles from "./Graduation.module.css";

import DistributionTable from "./components/DistributionTable";
import { EXABC } from "./mock/mock";

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
  const [currYear, setCurrYear] = React.useState("2");
  return (
    <div className={styles.container}>
      <GraduationRecommendations/>

      <div style={{ display: "flex", alignItems: "baseline" }}>
        {/* Distributions and Toggle on Top of Table*/}
        <div className={styles.containerDistributions}> 
          <div style={{ display: "flex", marginRight: "80px" }}>
            <div style={{ fontSize: "30px", fontWeight: "500"  }}>Distributions</div>
            <ToggleButtonGroup color="primary" onChange={(event, newYear) => {setCurrYear(newYear);}} aria-label="Platform">
              <ToggleButton value="1">First-Year</ToggleButton>
              <ToggleButton value="2">Sophomore</ToggleButton>
              <ToggleButton value="3">Junior</ToggleButton>
              <ToggleButton value="4">Senior</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
            <DistributionTable year={parseInt(currYear)} cls={EXABC}/>
          </div>
        </div>
        <GraduationOverview/>
      </div>
    </div>
  );
}

export default Graduation;
