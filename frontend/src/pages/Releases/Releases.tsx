import React from "react";
import MeDropdown from "../../navbar/account/MeDropdown";
import nav_styles from "../../navbar/NavBar.module.css";
import img_logo from "../../commons/images/ma_logo.png";
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


function Releases() {
  return(
    <div>
        <NavBar/>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center",  height: "100vh"}}>
            <p>There is nothing here yet!</p>
        </div>
    </div>
  )
}

export default Releases;

