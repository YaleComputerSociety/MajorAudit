import React from "react";
import Table from "react-bootstrap/Table";
import DistributionTable from "./components/DistributionTable";
import styles from "./Graduation.module.css";

var currYear = 2;

export default function Graduation() {
  return (
    <div>
      <div>
        <p style={{ fontSize: "30px" }}>Distributions</p>
        <button onClick={() => {currYear = 1}}>First-Year</button>
        <button onClick={() => {currYear = 2}}>Sophomore</button>
        <button onClick={() => {currYear = 3}}>Junior</button>
        <button onClick={() => {currYear = 4}}>Senior</button>
      </div>
      <div className={styles.distributionsContainer}>
        <DistributionTable
          year={currYear}
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
