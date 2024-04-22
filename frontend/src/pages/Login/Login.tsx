
import React, { useState } from "react";
import navStyles from "./../../navbar/NavBar.module.css";
import logo from "./../../commons/images/ma_logo.png";

function NavBar() {
  return(
    <div className={navStyles.NavBar}>
      <div style={{ marginLeft: "20px" }}>
        <img src={logo} alt="" style={{ width: "150px", height: "auto", marginRight: "10px" }}/>
      </div>
    </div>
  );
}


function Login(){
  return(
    <div>
      <NavBar/>

    </div>
  )
}

export default Login;

