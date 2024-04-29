import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'; 

import Login from "./pages/Login";
import Graduation from './pages/Graduation';
import Courses from './pages/Courses';
import Majors from './pages/Majors';
import About from './pages/OtherPages/About/About';
import FAQ from './pages/OtherPages/FAQ/FAQ';

function Router() {
  const [auth] = useState(true); 

  return (
    <div>
      <Routes>
        <Route path="/"             element={auth ? <Navigate to="/graduation"/> : <Navigate to="/login"/>}/> 
        <Route path="/login"        element={auth ? <Navigate to="/graduation"/> : <Login/>}/> 

        <Route path="/graduation"   element={auth ? <Graduation/> : <Navigate to="/login"/>}/> 
        <Route path="/courses"      element={auth ? <Courses/> : <Navigate to="/login"/>}/> 
        <Route path="/majors"       element={auth ? <Majors/> : <Navigate to="/login"/>}/> 

        <Route path="/about"        element={<About/>}/> 
        <Route path="/FAQ"          element={<FAQ/>}/> 
      </Routes>
    </div>
  );
}

export default Router;