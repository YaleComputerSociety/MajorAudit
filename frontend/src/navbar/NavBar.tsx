
import React from 'react';
import styles from "./NavBar.module.css";

import img_logo from "./../commons/images/ma_logo.png";
import img_moon from "./../commons/images/moon.png";
import img_profile from "./../commons/images/profile.png";

import { NavLink } from "react-router-dom";

function NavBar() {
    return (    
        <div className={styles.NavBar}>

            <div style={{ marginLeft: "20px" }}>
                <img src={img_logo} alt="" style={{ width: "150px", height: "auto" }}/>
            </div>
            
            <div className={styles.row} style={{ marginRight: "50px" }}>
                <img src={img_moon} alt="" style={{ width: "40px", height: "30px", marginRight: "2px" }}/>
                <NavLink to="/graduation"  className={({ isActive }) => isActive ? styles.activeLink : styles.dormantLink}>Graduation </NavLink>
                <NavLink to="/courses"     className={({ isActive }) => isActive ? styles.activeLink : styles.dormantLink}>Courses </NavLink>
                <NavLink to="/majors"      className={({ isActive }) => isActive ? styles.activeLink : styles.dormantLink}>Majors </NavLink>
                <img src={img_profile} alt="" style={{ width: "24px", height: "24px", marginLeft: "14px" }}/>
            </div>

        </div>
    )
}

export default NavBar;
