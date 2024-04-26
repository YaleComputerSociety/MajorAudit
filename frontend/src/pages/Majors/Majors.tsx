import React, { useState } from "react";
import styles from "./Majors.module.css";

import ProgramRequirementsBox from "./components/ProgramRequirementsBox";
import ProgramMetadataBox from "./components/ProgramMetadataBox";

import nav_styles from "./../../navbar/NavBar.module.css";
import img_logo from "./../../commons/images/ma_logo.png";

import { Program } from "./../../commons/types/TypeProgram";
import MeDropdown from "../../navbar/account/MeDropdown";
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
          to="/"
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
function Majors() {
  const [currdex, setCurrdex] = useState(0);
  const [currDegree, setCurrDegree] = useState(0);

  const storedPrograms = localStorage.getItem("programList");
  let programs: Program[] | null = null;

  if (storedPrograms) {
    programs = JSON.parse(storedPrograms) as Program[];
  }

  const alterCurrdex = (dir: number) => {
    if (programs && programs.length > 0) {
      setCurrdex((currdex + dir + programs.length) % programs.length);
      setCurrDegree(0);
    }
  };

  const seeProgram = (dir: number) => {
    if (programs && programs.length > 0) {
      return programs[(currdex + dir + programs.length) % programs.length];
    }
    return null;
  };

  const alterCurrDegree = (num: number) => {
    setCurrDegree(num);
  };

  if (!programs || programs.length === 0) {
    return <div></div>;
  }

  return (
    <div>
      <NavBar />
      <div className={styles.MajorsPage}>
        <ProgramMetadataBox
          program={programs[currdex]}
          scrollProgram={alterCurrdex}
          seeProgram={seeProgram}
          whichDegree={currDegree}
          alterCurrDegree={alterCurrDegree}
        />
        <ProgramRequirementsBox
          degree={programs[currdex].degrees[currDegree]}
        />
      </div>
    </div>
  );
}

export default Majors;
