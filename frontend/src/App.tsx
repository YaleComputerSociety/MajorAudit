
import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes  } from 'react-router-dom'; 
import $ from "jquery";

import Login from "./pages/Login";
import Graduation from './pages/Graduation';
import Courses from './pages/Courses';
import Majors from './pages/Majors';

interface AuthProps {
  auth: boolean | null;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P & AuthProps>) => {
  return (props: P) => {
    const [auth, setAuth] = useState(true);

    $.ajax({
      url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/check_login",
      xhrFields: { withCredentials: true }
    }).done((data: string | null) => {
      if (data) {
        console.log(data);
        setAuth(true);
      } else {
        console.log(data);
        setAuth(false);
      }
    });

    if (auth === null) {
      // Display a loading state while checking login
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} auth={auth} />;
  };
};

interface AppProps extends AuthProps {}

function App({ auth }: AppProps) {
  return (
    <div>
      <Routes>
        <Route path="/" element={auth ? <Navigate to="/graduation" /> : <Navigate to="/login" />} />
        <Route path="/login" element={auth ? <Navigate to="/graduation" /> : <Login />} />
        <Route path="/graduation" element={auth ? <Graduation /> : <Navigate to="/login" />} />
        <Route path="/courses" element={auth ? <Courses /> : <Navigate to="/login" />} />
        <Route path="/majors" element={auth ? <Majors /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default withAuth(App);


// function App() {

//   const [auth, setAuth] = useState(true); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     $.ajax({
//       url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/check_login",
//       xhrFields: { withCredentials: true }
//     }).done((data: string | null) => {
//       if(data) {
//         console.log(data);
//         setAuth(true);
//       }else{
//         console.log(data);
//         setAuth(false);
//       }
//       setLoading(false);
//     });
//   }, []);

//   if (loading) {
//     // Display a loading state while checking login
//     return <div>Loading...</div>;
//   }

//   return (
//   <div>
//     <Routes>
//       <Route path="/"             element={auth ? <Navigate to="/graduation"/> : <Navigate to="/login"/>}/> 
//       <Route path="/login"        element={auth ? <Navigate to="/graduation"/> : <Login/>}/> 

//       <Route path="/graduation"   element={auth ? <Graduation/> : <Navigate to="/login"/>}/>
//       <Route path="/courses"      element={auth ? <Courses/> : <Navigate to="/login"/>}/> 
//       <Route path="/majors"       element={auth ? <Majors/> : <Navigate to="/login"/>}/> 
//     </Routes>
//   </div>
//   );
// }

// export default App;
