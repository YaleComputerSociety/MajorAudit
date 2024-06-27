
import { useState, useEffect } from "react";
import { checkLogin } from "./api/api";

import Globals from './Globals';

import CourseModal from './commons/components/courses/CourseModal';
import { Navigate, Route, Routes } from 'react-router-dom'; 

import Login from "./pages/Login";
import Graduation from './pages/Graduation';
import Courses from './pages/Courses';
import Majors from './pages/Majors';
// import About from './pages/OtherPages/About/About';
// import FAQ from './pages/OtherPages/FAQ/FAQ';

function App() {

  const [auth, setAuth] = useState(false); 

  const checkAuthStatus = async () => {
    const isLoggedIn = await checkLogin();
    setAuth(isLoggedIn);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
  <div>
    <Globals>
      <Routes>
        <Route path="/"             element={auth ? <Navigate to="/graduation"/> : <Navigate to="/login"/>}/> 
        <Route path="/login"        element={auth ? <Navigate to="/graduation"/> : <Login setAuth={setAuth}/>}/> 

        <Route path="/graduation"   element={auth ? <Graduation/> : <Navigate to="/login"/>}/> 
        <Route path="/courses"      element={auth ? <Courses/> : <Navigate to="/login"/>}/> 
        <Route path="/majors"       element={auth ? <Majors/> : <Navigate to="/login"/>}/> 

        {/* <Route path="/about"        element={<About/>}/>  */}
        {/* <Route path="/FAQ"          element={<FAQ/>}/>  */}
      </Routes>
      <CourseModal />
    </Globals>
  </div>
  );
}

export default App;