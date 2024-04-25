
import React from "react";
import styles from "./NavBar.module.css";

import { NavLink } from "react-router-dom";

function PageLinks() {
  return (
    <div style={{ display: "flex", flexDirection: "row", marginRight: "20px" }}>
    <NavLink to="/graduation" className={({ isActive }) => isActive ? styles.activeLink : styles.dormantLink }>
      Graduation
    </NavLink>
    <NavLink to="/courses" className={({ isActive }) => isActive ? styles.activeLink : styles.dormantLink }>
      Courses
    </NavLink>
    <NavLink to="/majors" className={({ isActive }) => isActive ? styles.activeLink : styles.dormantLink }>
      Majors
    </NavLink>
  </div>
  );
}

export default PageLinks;
