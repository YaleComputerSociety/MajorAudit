import React, { useState } from "react";
import DistributionTable from "./components/DistributionTable";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import styles from "./Graduation.module.css";

export default function Graduation() {
  const [currYear, setCurrYear] = React.useState("2");
  return (
    <div>
      <div>
        <p style={{ fontSize: "30px" }}>Distributions</p>
        <ToggleButtonGroup
          color="primary"
          onChange={(event, newYear) => {setCurrYear(newYear);}}
          aria-label="Platform"
        >
          <ToggleButton value="1">First-Year</ToggleButton>
          <ToggleButton value="2">Sophomore</ToggleButton>
          <ToggleButton value="3">Junior</ToggleButton>
          <ToggleButton value="4">Senior</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className={styles.distributionsContainer}>
        <DistributionTable
          year={parseInt(currYear)}
          classListHu={["LING 191", "ARCH 306"]}
          classListSo={[]}
          classListSc={["CGSC 274"]}
          classListQR={["NSCI 258", "CPSC 223"]}
          classListWR={[]}
          classListL={["KREN 110", "KREN 120"]}
        />
      </div>
    </div>
  );
}
