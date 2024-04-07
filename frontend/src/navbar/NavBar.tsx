import React from "react";
import styles from "./NavBar.module.css";

import img_logo from "./../commons/images/ma_logo.png";
import img_moon from "./../commons/images/moon.png";

import { NavLink } from "react-router-dom";
import MeDropdown from "./MeDropdown";

function NavBar() {
  return (
    <div className={styles.NavBar}>
      <div className={styles.row} style={{ marginLeft: "20px" }}>
        <img
          src={img_logo}
          alt=""
          style={{ width: "150px", height: "auto", marginRight: "10px" }}
        />
      </div>

      <div className={styles.row} style={{ marginRight: "10px" }}>
        <img
          src={img_moon}
          alt=""
          style={{ width: "40px", height: "30px", marginRight: "2px" }}
        />
        <NavLink
          to="/graduation"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.dormantLink
          }
        >
          Graduation
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.dormantLink
          }
        >
          Courses
        </NavLink>
        <NavLink
          to="/majors"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.dormantLink
          }
        >
          Majors
        </NavLink>
        <MeDropdown />
      </div>
    </div>
  );
}

export default NavBar;
