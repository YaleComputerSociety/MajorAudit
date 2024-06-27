
import React from "react";
import { checkLogin } from "../../api/api";

import navStyles from "./../../navbar/NavBar.module.css";
import logo from "./../../commons/images/ma_logo.png";
import loginPageImage from "../../commons/images/reallycoolguy.jpg";

import styles from "./Login.module.css";

function NavBar() {
  return(
    <div className={navStyles.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img src={logo} alt="" style={{ width: "150px", height: "auto" }}/>
      </div>
    </div>
  );
}

function Login(props: { setAuth: Function }){
  
  const handleLogin = async () => {
    const authStatus = await checkLogin();
    if(authStatus){
      props.setAuth(authStatus)
    }else{
      window.location.href = "http://127.0.0.1:5001/majoraudit/us-central1/functions/user_login";
    }
  };

  return(
    <div>
      <NavBar />
      <div className={styles.centerDiv}>
        <div style={{width: "450px"}}>
          <h1>Plan Your Major @ Yale</h1>
          <ul className={styles.featureListStyle}>
            <li className={styles.featureItemStyle}>Explore 80+ Majors</li>
            <li className={styles.featureItemStyle}>Check Distributional Requirements</li>
            <li className={styles.featureItemStyle}>Plan Four-Year Plan</li>
            <li className={styles.featureItemStyle}>Cool Guy</li>
          </ul>
          <div className={styles.loginButtons}>
            <div onClick={handleLogin} className={styles.btn}>
              Login w/ CAS
            </div>
          </div>
        </div>
        <img alt="Landing Page" src={loginPageImage} width="450"/>
      </div>
    </div>
  );
}

export default Login;
