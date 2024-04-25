import React, { useState, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'; 
import { useTheme } from "./contexts/themeContext";

import Login from "./pages/Login";
import Graduation from './pages/Graduation';
import Courses from './pages/Courses';
import Majors from './pages/Majors';
import Themes from './pages/Themes';

function Router() {
  const [auth] = useState(true); 
  const { theme } = useTheme();

  return (
    <div>
      <Routes>
        <Route path="/"             element={auth ? <Navigate to="/graduation"/> : <Navigate to="/login"/>}/> 
        <Route path="/login"        element={auth ? <Navigate to="/graduation"/> : <Login/>}/> 

        <Route path="/graduation"   element={auth ? <Graduation/> : <Navigate to="/login"/>}/> 
        <Route path="/courses"      element={auth ? <Courses/> : <Navigate to="/login"/>}/> 
        <Route path="/majors"       element={auth ? <Majors/> : <Navigate to="/login"/>}/> 

        <Route path="/themes"       element={auth ? <Themes/> : <Navigate to="/login"/>}/> 
      </Routes>
    </div>
  );
}

export default Router;