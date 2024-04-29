import { useState, useEffect } from "react";
import { Navigate, Route, Routes  } from 'react-router-dom'; 
import $ from "jquery";

import Login from "./pages/Login";
import Graduation from './pages/Graduation';
import Courses from './pages/Courses';
import Majors from './pages/Majors';

import Globals from './Globals';

import CourseModal from './commons/components/courses/CourseModal';

import { CGSC, CPSC, ECON, HIST } from "./commons/mock/MockProgram";

function App() {

  const [auth, setAuth] = useState(true); 
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   $.ajax({
  //     url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/check_login",
  //     xhrFields: { withCredentials: true }
  //   }).done((data: string | null) => {
  //     if(data) {
  //       console.log(data);
  //       setAuth(true);
  //     }else{
  //       console.log(data);
  //       setAuth(false);
  //     }
  //     setLoading(false);
  //   });
  // }, []);

  // useEffect(() => {
  //   $.ajax({
  //     url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/get_majors",
  //     method: "GET",
  //     xhrFields: { withCredentials: true }
  //   }).done((data: JSON | null) => {
  //     if(data) {
  //       console.log("yee!");
  //       console.log(JSON.stringify(data));
  //       let strPrograms = JSON.stringify(data);
  //       if (JSON.stringify(data).length < 3) strPrograms = JSON.stringify([CGSC, CPSC, ECON, HIST]);
  //       localStorage.setItem("programList", strPrograms);
  //     }else{
  //       const programs = [CGSC, CPSC, HIST];
  //       let strPrograms = JSON.stringify(programs);
  //       localStorage.setItem("programList", strPrograms);
  //       console.log("noo!");
  //     }
  //   });
  // }, []);

  if (loading) {
    // Display a loading state while checking login
    return <div>Loading...</div>;
  }

  return (
  <div>
    <Globals>
      <Routes>
        <Route path="/"             element={auth ? <Navigate to="/graduation"/> : <Navigate to="/login"/>}/> 
        <Route path="/login"        element={auth ? <Navigate to="/graduation"/> : <Login/>}/> 

        <Route path="/graduation"   element={auth ? <Graduation/> : <Navigate to="/login"/>}/>
        <Route path="/courses"      element={auth ? <Courses/> : <Navigate to="/login"/>}/> 
        <Route path="/majors"       element={auth ? <Majors/> : <Navigate to="/login"/>}/> 
      </Routes>
      <CourseModal />
    </Globals>
  </div>
  );
}

export default App;