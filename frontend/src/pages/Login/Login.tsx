import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

import navStyles from "../../navbar/NavBar.module.css";
import logo from "../../commons/images/ma_logo.png";
import loginPageImage from "../../commons/images/reallycoolguy.jpg";

function NavBar() {
  return (
    <div className={navStyles.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img
          src={logo}
          alt=""
          style={{ width: "150px", height: "auto", marginRight: "10px" }}
        />
      </div>
      {/* <PageLinks />
      <MeDropdown /> */}
    </div>
  );
}

function Login() {
  return (
    <div>
      <NavBar />
      <div className={styles.centerDiv}>
        <div style={{width: "450px"}}>
          <h1>The best place to explore and plan your major at Yale</h1>
          <ul className={styles.featureListStyle}>
            <li className={styles.featureItemStyle}>Explore all 80+ majors at Yale</li>
            <li className={styles.featureItemStyle}>Check all your distributional requirements are satisfied</li>
            <li className={styles.featureItemStyle}>Plan out all your courses in the traditional four-year plan</li>
            <li className={styles.featureItemStyle}>Look at this really cool guy to the right</li>
          </ul>
          <div className={styles.loginButtons}>
            {/* <a
              href={`${API_ENDPOINT}/api/auth/cas?redirect=${window.location.origin}/catalog`}
              className={clsx(styles.btn, styles.login, 'me-2')}
            >
              Login with CAS
            </a> */}
            <Link to="/graduation" className={styles.btn} style={{marginRight: "8px"}}>
              Login with CAS
            </Link>
            <Link to="/courses" className={styles.btn} style={{marginRight: "8px"}}>
              About Us
            </Link>
            <Link to="/majors" className={styles.btn}>
              Guest
            </Link>
          </div>
        </div>
        <img alt="Landing page" src={loginPageImage} width="450"/>
      </div>
    </div>
  );
}

export default Login;
