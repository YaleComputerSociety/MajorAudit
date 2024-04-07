
import React, { useState } from 'react';
import styles from "./App.module.css";

import Graduation from "./pages/Graduation";
import Courses from "./pages/Courses";

import malogo from "./commons/images/ma.png";
import prof from "./commons/images/profile.png";

function NavBar(props: { setShowCourses: Function }) {
  return (
    <div className={styles.NavBar}>
      <div className={styles.column} style={{ height: "100%", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <img src={malogo} alt="" style={{ width: "50px", height: "auto", marginTop: "10px" }}/>
          <button className={styles.NavButton} onClick={() => props.setShowCourses((prev: boolean) => !prev)}>_-_</button>
        </div>
        <img src={prof} alt="" style={{ width: "25px", height: "auto", marginBottom: "15px" }}/>
      </div>
    </div>
  );
}

function App() {
  const [slideCourses, setSlideCourses] = useState(false);

  return (
    <div className={styles.row}>
      <NavBar setShowCourses={setSlideCourses}/>
      <div className={styles.Page}>
        <Graduation />
        <div className={`${styles.coursesPage} ${slideCourses ? styles.coursesEnter : styles.coursesExit}`}>
          <Courses />
        </div>
      </div>
    </div>
  );
}

export default App;
