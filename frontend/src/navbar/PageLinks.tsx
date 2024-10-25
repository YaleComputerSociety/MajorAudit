import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Importing an icon from react-icons library

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <NavLink to="/graduation" className={({ isActive }) => (isActive ? styles.activeLink : styles.dormantLink)}>
          Graduation
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => (isActive ? styles.activeLink : styles.dormantLink)}>
          Courses
        </NavLink>
        <NavLink to="/majors" className={({ isActive }) => (isActive ? styles.activeLink : styles.dormantLink)}>
          Majors
        </NavLink>
      </div>
      <div className={styles.dropdownContainer}>
        <FaBars onClick={toggleDropdown} className={styles.icon} />
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
             <NavLink to="/about" className={({ isActive }) => (isActive ? styles.activeLink : styles.dormantLink)}>
             About
             </NavLink>
            <NavLink to="/faq" className={({ isActive }) => (isActive ? styles.activeLink : styles.dormantLink)}>
            FAQ
             </NavLink>
           
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

