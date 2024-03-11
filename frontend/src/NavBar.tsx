
import React from 'react';
import "./NavBar.css";
import maLogo from "./commons/ma_logo.png";
import { NavLink } from "react-router-dom";

const NavBar=()=>{
    return (    
        <div className='NavBar'>
            <img src={maLogo} className="logo"/>
            <NavLink to="/courses"     className={({ isActive }) => isActive ? "activeLink" : "dormantLink"}>Courses </NavLink>
            <NavLink to="/graduation"  className={({ isActive }) => isActive ? "activeLink" : "dormantLink"}>Graduation </NavLink>
            <NavLink to="/majors"      className={({ isActive }) => isActive ? "activeLink" : "dormantLink"}>Majors </NavLink>
        </div>
    )
}

export default NavBar;
