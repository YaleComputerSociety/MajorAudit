
import React, { useState } from "react";
import styles from "./Graduation.module.css";

import { getData } from "../../api/api";

import GraduationDistribution from "./components/DistributionTable";
import GraduationOverview from "./components/Overview";

import { CPSC } from "./../../commons/mock/MockProgram";
import MeDropdown from "../../navbar/account/MeDropdown";
import nav_styles from "./../../navbar/NavBar.module.css";
import img_logo from "./../../commons/images/ma_logo.png";
import PageLinks from "./../../navbar/PageLinks";

function NavBar() {
  return (
    <div className={nav_styles.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img
          src={img_logo}
          alt=""
          style={{ width: "150px", height: "auto", marginRight: "10px" }}
        />
      </div>
      <PageLinks/>
      {/* <MeDropdown/> */}
    </div>
  );
}

function Recommendations() {
  return(
    <div>
      <div style={{ fontSize: "30px", fontWeight: "500" }}>Hello, Ryn!</div>
    </div>
  );
}

function Graduation() {
  const UserYear = () => {
    return 2;
  };
  const [currYear, setCurrYear] = useState(UserYear());
  const alterCurrYear = (num: number) => {
    setCurrYear(num);
  };

  const locSyncData = () => {
    console.log("exec: locSyncData")
    var event = new CustomEvent("scrapeData", {
      detail: { action: "openWebsite" }
    });
    document.dispatchEvent(event);
  };

  const initLocalStorage = async () => {
    try {
      const allData = await getData();
  
      if (!allData) {
        console.error("No data returned from getData");
        return;
      }
  
      const jsonData = typeof allData === "object" ? JSON.stringify(allData) : allData;
  
      let parsedData;
      try {
        parsedData = JSON.parse(jsonData);
        console.log("Parsed JSON Data: ", parsedData);
      } catch (error) {
        console.error("Failed To Parse JSON Data From getData: ", error);
        return;
      }

      // studentName
      const studentName = parsedData?.name;
      if (!studentName) {
        console.error("No studentName In Parsed Data");
        return;
      }
      localStorage.setItem("studentName", JSON.stringify(studentName));
      console.log("studentName Saved To localStorage");
  
      // yearTree
      const yearTree = parsedData?.yearTree;
      if (!yearTree) {
        console.error("No courseList In Parsed Data");
        return;
      }
      localStorage.setItem("yearTree", JSON.stringify(yearTree));
      console.log("yearTree Saved To localStorage");

    } catch (error) {
      console.error("Error In initLocalStorage: ", error);
    }
  };

  return (
    <div>
      <NavBar />

      <div className={styles.GraduationPage}>
        <div className={styles.row}>
          <div className={styles.column} style={{ marginRight: "60px" }}>
            <Recommendations/>
            <div onClick={locSyncData} className={styles.btn} style={{marginRight: "8px"}}>
              Sync Data
            </div>
            <div onClick={initLocalStorage} className={styles.btn} style={{marginRight: "8px"}}>
              Init Courses
            </div>
            <GraduationDistribution currYear={currYear} alterCurrYear={alterCurrYear}/>
          </div>
          <GraduationOverview degree={CPSC.degrees[0]} />
        </div>
      </div>
    </div>
  );
}

export default Graduation;
