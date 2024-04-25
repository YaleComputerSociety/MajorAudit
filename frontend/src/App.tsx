
import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes  } from 'react-router-dom'; 
import $ from "jquery";

import Login from "./pages/Login";
import Graduation from './pages/Graduation';
import Courses from './pages/Courses';
import Majors from './pages/Majors';

import { CGSC, CPSC, ECON, HIST } from "./commons/mock/MockProgram";

function App() {

  const [auth, setAuth] = useState(true); 

  useEffect(() => {
    $.ajax({
      url: "https://functions-ggwttz72sa-uc.a.run.app/check_login",
      xhrFields: { withCredentials: true }
    }).done((data: string | null) => {
      if(data) {
        console.log("woo netid!");
        setAuth(true);
      }else{
        console.log("boo netid!");
        setAuth(true);
      }
    });
  }, []);

  useEffect(() => {
    $.ajax({
      url: "https://functions-ggwttz72sa-uc.a.run.app/get_majors",
      method: "GET",
      xhrFields: { withCredentials: true }
    }).done((data: JSON | null) => {
      if(data) {
        console.log("yee!");
        let strPrograms = JSON.stringify(data);
        localStorage.setItem("programList", strPrograms);
      }else{
        const programs = [CGSC, CPSC, ECON, HIST];
        let strPrograms = JSON.stringify(programs);
        localStorage.setItem("programList", strPrograms);
        console.log("noo!");
      }
    });
  }, []);

  return (
  <div>
    <Routes>
      <Route path="/"             element={auth ? <Navigate to="/graduation"/> : <Navigate to="/login"/>}/> 
      <Route path="/login"        element={auth ? <Navigate to="/graduation"/> : <Login/>}/> 

      <Route path="/graduation"   element={auth ? <Graduation/> : <Navigate to="/login"/>}/> 
      <Route path="/courses"      element={auth ? <Courses/> : <Navigate to="/login"/>}/> 
      <Route path="/majors"       element={auth ? <Majors/> : <Navigate to="/login"/>}/> 
    </Routes>
  </div>
  );
}

export default App;
