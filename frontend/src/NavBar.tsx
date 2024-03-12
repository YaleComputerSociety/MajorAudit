
import React from 'react';
import "./NavBar.css";
import maLogo from "./commons/images/ma_logo.png";
import { NavLink } from "react-router-dom";

const NavBar=()=>{
    return (    
        <div className='NavBar'>
            <img src={maLogo} alt="" className="logo"/>
            <NavLink to="/graduation"  className={({ isActive }) => isActive ? "activeLink" : "dormantLink"}>Graduation </NavLink>
            <NavLink to="/majors"      className={({ isActive }) => isActive ? "activeLink" : "dormantLink"}>Majors </NavLink>
            <NavLink to="/courses"     className={({ isActive }) => isActive ? "activeLink" : "dormantLink"}>Courses </NavLink>
        </div>
    )
}

export default NavBar;
