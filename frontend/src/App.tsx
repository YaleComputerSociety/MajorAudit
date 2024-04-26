
import { useState } from "react";
import { Navigate, Route, Routes  } from 'react-router-dom'; 

import Login from "./pages/Login";
import Graduation from './pages/Graduation';
import Courses from './pages/Courses';
import Majors from './pages/Majors';
import About from "./pages/OtherPages/About/About";
import FAQ from "./pages/OtherPages/FAQ/FAQ";

import { CGSC, CPSC, ECON, HIST } from "./commons/mock/MockProgram";

function App() {

  const [auth] = useState(true); 

  const programs = [CGSC, CPSC, ECON, HIST];
  const strPrograms = JSON.stringify(programs);
  localStorage.setItem("programList", strPrograms);
  
  return (
  <div>
    <Routes>
      {/* <Route path="/"             element={auth ? <Navigate to="/graduation"/> : <Navigate to="/login"/>}/> 
      <Route path="/login"        element={auth ? <Navigate to="/graduation"/> : <Login/>}/> 

      <Route path="/graduation"   element={auth ? <Graduation/> : <Navigate to="/login"/>}/> 
      <Route path="/courses"      element={auth ? <Courses/> : <Navigate to="/login"/>}/> 
      <Route path="/majors"       element={auth ? <Majors/> : <Navigate to="/login"/>}/>  */}
      <Route path="/"             element={<Navigate to="/login"/>}/> 
      <Route path="/login"        element={<Login />}/> 

      <Route path="/graduation"   element={<Graduation/>}/> 
      <Route path="/courses"      element={<Courses/>}/> 
      <Route path="/majors"       element={<Majors/>}/>

      <Route path="/about"        element={<About/>}/>
      <Route path="/faq"          element={<FAQ/>}/>
    </Routes>
  </div>
  );
}

export default App;
