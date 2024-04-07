
import React, { useState, useEffect } from 'react';
import styles from "./App.module.css";

import Graduation from "./pages/Graduation";

import Courses from "./pages/Courses";
import Majors from "./pages/Majors";

import malogo from "./commons/images/ma.png";
import prof from "./commons/images/profile.png";

function NavBar(props: { slideCourses: boolean, setSlideCourses: Function, setSlideMajors: Function }) {
  return (
    <div className={styles.NavBar}>
      <div className={styles.column} style={{ height: "100%", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <img src={malogo} alt="" style={{ width: "50px", height: "auto", marginTop: "10px" }}/>
          <button className={styles.NavButton} onClick={() => props.setSlideCourses((prev: boolean) => !prev)} style={{ color: props.slideCourses ? "blue" : "black" }}>-</button>
          <button className={styles.NavButton} onClick={() => props.setSlideMajors((prev: boolean) => !prev)}>^</button>
        </div>
        <img src={prof} alt="" style={{ width: "25px", height: "auto", marginBottom: "15px" }}/>
      </div>
    </div>
  );
}

function App() {
  const [slideCourses, setSlideCourses] = useState(false);
  const [slideMajors, setslideMajors] = useState(false);

  useEffect(() => {
    if (slideMajors) {
      setSlideCourses(false);
    }
  }, [slideMajors]);

  return (
    <div className={styles.row}>
      <NavBar slideCourses={slideCourses} setSlideCourses={setSlideCourses} setSlideMajors={setslideMajors}/>
      <div className={styles.Page}>
        <Graduation />
        <div className={`${styles.coursesPage} ${slideCourses ? styles.coursesEnter : styles.coursesExit}`}>
          <Courses />
        </div>
        <div className={`${styles.majorsPage} ${slideMajors ? styles.majorsEnter : styles.majorsExit}`}>
          <Majors />
        </div>
      </div>
    </div>
  );
}

export default App;
