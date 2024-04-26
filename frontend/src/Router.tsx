import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'; 

import Login from "./pages/Login";
import Graduation from './pages/Graduation';
import Courses from './pages/Courses';
import Majors from './pages/Majors';
import Themes from './pages/Themes';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Releases from './pages/Releases';

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

        <Route path="/themes"       element={auth ? <Themes/> : <Navigate to="/login"/>}/> 
        <Route path="/about"        element={<About/>}/> 
        <Route path="/faq"          element={<FAQ/>}/> 
        <Route path="/releases"     element={<Releases/>}/>
      </Routes>
    </div>
  );
}

export default Router;