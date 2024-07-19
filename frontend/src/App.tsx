
import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from 'react-router-dom'; 
import { checkUser } from "./api/api";

import Globals from './Globals';
import CourseModal from './commons/components/courses/CourseModal';

import Login from "./pages/Login";
import Onboard from "./pages/Onboard/Onboard";
import Graduation from './pages/Graduation';
import Courses from './pages/Courses';
import Majors from './pages/Majors';

import { ImportSC } from "./commons/mock/MockStudent";
import { StudentCourse } from "./commons/types/TypeCourse";

function App(){

  const [auth, setAuth] = useState({ loggedIn: false, onboard: false }); 
  const checkAuth = async () => {
		const response = await checkUser();
		setAuth({
			loggedIn: response.loggedIn,
			onboard: response.onboard,
		});
	};

  useEffect(() => {
    checkAuth();
  }, []);

	const ProtectedRoute = (element: JSX.Element) => {
		if(!auth.loggedIn){
			return <Navigate to="/login"/>;
		}else 
		if(!auth.onboard){
			return <Navigate to="/onboard"/>;
		}else
		return element;
	};

	const [GlobalSC, setGlobalSC] = useState<StudentCourse[]>(ImportSC);

  return(
		<div>
			<Globals>
				<Routes>
					<Route path="/"             element={<Navigate to="/graduation"/>}/>
					<Route path="/login"        element={!auth.loggedIn ? <Login setAuth={setAuth}/> 		: <Navigate to="/onboard"/>}/>
					<Route path="/onboard"      element={!auth.onboard 	? <Onboard setAuth={setAuth} checkAuth={checkAuth}/> : <Navigate to="/graduation"/>}/>
					<Route path="/graduation" 	element={ProtectedRoute(<Graduation/>)}/> 
					<Route path="/courses" 			element={ProtectedRoute(<Courses GlobalSC={GlobalSC} setGlobalSC={setGlobalSC}/>)}/> 
					<Route path="/majors" 			element={ProtectedRoute(<Majors/>)}/> 
				</Routes>
				<CourseModal/>
			</Globals>
		</div>
  );
}

export default App;
