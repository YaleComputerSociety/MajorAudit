
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import $ from "jquery";

import navStyles from "./../../navbar/NavBar.module.css";
import logo from "./../../commons/images/ma_logo.png";
import loginPageImage from "../../commons/images/reallycoolguy.jpg";

import styles from "./Login.module.css";

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

function NetidLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    $.ajax({
      url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/check_login",
      xhrFields: { withCredentials: true }
    }).done((data: string | null) => {
      if(data) {
        console.log("woo netid!");
        console.log(data);
        navigate("/graduation");
      }else{
        console.log("boo netid!");
        console.log(data);
        window.location.href = "http://127.0.0.1:5001/majoraudit/us-central1/functions/user_login"
        //navigate("/graduation");
      }
    });
  });
}


function Login(){
  return(
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
            <button onClick={NetidLogin} className={styles.btn} style={{marginRight: "8px"}}>
              Login with CAS
            </button>
            <Link to="/about" className={styles.btn} style={{marginRight: "8px"}}>
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
