
import { useState } from "react";
import { Navigate, Route, Routes } from 'react-router-dom'; 

import Globals from './Globals';
import CourseModal from './commons/components/modals/CourseModal';

import Login from "./pages/Login/Login";
import Onboard from "./pages/Onboard/Onboard";

import Graduation from "./pages/Graduation/Graduation";
import Courses from "./pages/Courses/Courses";
import Majors from "./pages/Majors/Majors";

import { getAuth, getUser, syncUser } from "./api/api";
import { AuthState, nullAuthState, User, nullUser } from "./types/TypeUser";

import { Ryan } from "./database/User";

function App(){

	// const [auth, setAuth] = useState<AuthState>(nullAuthState); 
	const [auth, setAuth] = useState<AuthState>({ loggedIn: true, onboard: true }); 
  const checkAuth = async () => {
		const response = await getAuth();
		// console.log("checkAuth() -> API: getAuth() -> ", response);
		setAuth({
			loggedIn: response.loggedIn,
			onboard: response.onboard,
		});
	};

	// const [user, setUser] = useState<User>(nullUser); 
	const [user, setUser] = useState<User>(Ryan); 
	// const initUser = async () => {
  //   const response = await getUser();
	// 	// console.log("initUser() -> API: getUser() -> ", response)
	// 	setUser({
	// 		name: response.name,
	// 		netID: response.netID,
	// 		onboard: response.onboard,
	// 		FYP: response.FYP,
	// 	});
  // };

	// useEffect(() => {
	// 	checkAuth();
  // }, []);

  // useEffect(() => {
	// 	if(auth.loggedIn && auth.onboard){
	// 		initUser();
	// 	}
  // }, [auth]);

	// useEffect(() => {
	// 	if(auth.loggedIn && auth.onboard){
	// 		syncUser(user);
	// 	}
  // }, [user]);

	const ProtectedRoute = (element: JSX.Element) => {
		if(!auth.loggedIn){
			return <Navigate to="/login"/>;
		}else 
		if(!auth.onboard){
			return <Navigate to="/onboard"/>;
		}else
		return element;
	};

	return(
		<div>
			<Globals>
				<Routes>
					<Route path="/"             element={ProtectedRoute(<Navigate to="/graduation"/>)}/>
					<Route path="/login"        element={!auth.loggedIn ? <Login/> : (!auth.onboard ? <Navigate to="/onboard"/> : <Navigate to="/graduation"/>)}/>
					<Route path="/onboard"      element={!auth.onboard 	? <Onboard 	checkAuth={checkAuth}/> : <Navigate to="/graduation"/>}/>
					<Route path="/graduation" 	element={ProtectedRoute(<Graduation user={user} setUser={setUser}/>)}/> 
					<Route path="/courses" 			element={ProtectedRoute(<Courses 		user={user} setUser={setUser}/>)}/> 
					<Route path="/majors" 			element={ProtectedRoute(<Majors  		user={user} setUser={setUser}/>)}/> 
				</Routes>
				<CourseModal/>
			</Globals>
		</div>
  );
}

export default App;
