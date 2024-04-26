import React, { useState, useEffect } from "react";
import styles from "./Courses.module.css";

import YearBox from "./components/YearBox";
import AddCourseMenu from "./components/add_course/AddCourse";

import { MockStudent } from "./../../commons/mock/MockStudent";
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

export interface DisplaySetting {
  rating: boolean;
  workload: boolean;
}

const defaultDisplaySetting = { rating: true, workload: true };

function Settings(props: {
  displaySetting: DisplaySetting;
  updateDisplaySetting: Function;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const throwBack = (key: string) => {
    if (key === "rating") {
      const newSetting = {
        ...props.displaySetting,
        rating: !props.displaySetting.rating,
      };
      props.updateDisplaySetting(newSetting);
    } else if (key === "workload") {
      const newSetting = {
        ...props.displaySetting,
        workload: !props.displaySetting.workload,
      };
      props.updateDisplaySetting(newSetting);
    }
  };

  return (
    <div className={styles.row} style={{ alignItems: "center" }}>
      <button
        className={`${styles.optionsButton} ${
          isOpen ? styles.activeButton : ""
        }`}
        onClick={toggleDropdown}
      >
        Options
      </button>
      {isOpen && (
        <div style={{ display: "flex" }}>
          <button
            className={`${styles.optionsChoice} ${
              props.displaySetting.rating ? styles.activeButton : ""
            }`}
            onClick={() => throwBack("rating")}
          >
            Rating
          </button>
          <button
            className={`${styles.optionsChoice} ${
              props.displaySetting.workload ? styles.activeButton : ""
            }`}
            onClick={() => throwBack("workload")}
          >
            Workload
          </button>
        </div>
      )}
    </div>
  );
}

function Courses() {
  const [displaySetting, setDisplaySetting] = useState(defaultDisplaySetting);
  const updateDisplaySetting = (newSetting: DisplaySetting) => {
    setDisplaySetting(newSetting);
  };
  useEffect(() => {}, [displaySetting]);

  const [addCourse, setAddCourse] = useState(false);
  const toggleAddCourse = () => {
    setAddCourse(!addCourse);
  };
  useEffect(() => {}, [addCourse]);

  const yearboxComponents = [];
  for (let i = 0; i < MockStudent["metadata"].length; i++) {
    yearboxComponents.push(
      <YearBox
        year={MockStudent["metadata"][i]}
        displaySetting={displaySetting}
      />
    );
  }

  return (
    <div>
      <NavBar />
      <Settings
        displaySetting={displaySetting}
        updateDisplaySetting={updateDisplaySetting}
      />
      <div className={styles.CoursesPage}>
        <button className={styles.AddCourseButton} onClick={toggleAddCourse}>
          +
        </button>
        <div
          className={`${styles.AddCourseMenuDormant} ${
            addCourse ? styles.AddCourseMenuActive : ""
          }`}
        >
          {addCourse && <AddCourseMenu />}
        </div>
        <div className={styles.column}>{yearboxComponents}</div>
      </div>
    </div>
  );
}

export default Courses;
