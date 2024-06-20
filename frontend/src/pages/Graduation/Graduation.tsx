
import React, { useState } from "react";
import styles from "./Graduation.module.css";
import $ from "jquery"

import GraduationDistribution from "./components/DistributionTable";
import GraduationOverview from "./components/Overview";

import { CPSC } from "./../../commons/mock/MockProgram";
import MeDropdown from "../../navbar/account/MeDropdown";
import nav_styles from "./../../navbar/NavBar.module.css";
import img_logo from "./../../commons/images/ma_logo.png";
import { NavLink } from "react-router-dom";

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

      <div className={nav_styles.row} style={{ marginRight: "20px" }}>
        <NavLink
          to="/graduation"
          className={({ isActive }) =>
            isActive ? nav_styles.activeLink : nav_styles.dormantLink
          }
        >
          Graduation
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive ? nav_styles.activeLink : nav_styles.dormantLink
          }
        >
          Courses
        </NavLink>
        <NavLink
          to="/majors"
          className={({ isActive }) =>
            isActive ? nav_styles.activeLink : nav_styles.dormantLink
          }
        >
          Majors
        </NavLink>
        <MeDropdown />
      </div>
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
  const locGetData = () => {
    $.ajax({
      url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/get_data",
      xhrFields: { withCredentials: true }
    }).done((data: string | null) => {
      if (data) {
        console.log("get: if");
        console.log(data);
      } else {
        console.log("get: else");
        console.log(data);
      }
    });
  };
  const locGetNetID = () => {
    $.ajax({
      url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/get_netid1",
      xhrFields: { withCredentials: true }
    }).done((data: string | null) => {
      if (data) {
        console.log("netID: if");
        console.log(data);
      } else {
        console.log("netID: else");
        console.log(data);
      }
    });
  };

    

  return (
    <div>
      <NavBar />

      <div className={styles.GraduationPage}>
        <div className={styles.row}>
          <div className={styles.column} style={{ marginRight: "60px" }}>
            <Recommendations />
            <div onClick={locSyncData} className={styles.btn} style={{marginRight: "8px"}}>
              Sync Data
            </div>
            <div onClick={locGetData} className={styles.btn} style={{marginRight: "8px"}}>
              Get Data
            </div>
            <div onClick={locGetNetID} className={styles.btn} style={{marginRight: "8px"}}>
              Get NetID
            </div>
            <GraduationDistribution
              currYear={currYear}
              alterCurrYear={alterCurrYear}
            />
          </div>
          <GraduationOverview degree={CPSC.degrees[0]} />
        </div>
      </div>
    </div>
  );
}

export default Graduation;
