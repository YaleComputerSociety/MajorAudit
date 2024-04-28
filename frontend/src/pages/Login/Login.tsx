
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

import navStyles from "./../../navbar/NavBar.module.css";
import logo from "./../../commons/images/ma_logo.png";

import { CGSC, CPSC, ECON, HIST } from "./../../commons/mock/MockProgram";

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

  useEffect(() => {
    $.ajax({
      url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/get_majors",
      method: "GET",
      xhrFields: { withCredentials: true }
    }).done((data: JSON | null) => {
      if(data) {
        console.log("yee!");
        let strPrograms = JSON.stringify(data);
        if (JSON.stringify(data).length < 3) strPrograms = JSON.stringify([CGSC, CPSC, ECON, HIST]);
        localStorage.setItem("programList", strPrograms);
      }else{
        const programs = [CGSC, CPSC, HIST];
        let strPrograms = JSON.stringify(programs);
        localStorage.setItem("programList", strPrograms);
        console.log("noo!");
      }
    });
  }, []);

  return(
    <div>
      <NavBar/>

    </div>
  )
}

export default Login;

