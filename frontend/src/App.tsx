
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import Courses from './pages/Courses';
import Graduation from './pages/Graduation';
import Majors from './pages/Majors';

function App() {
  return (
  <>
    <Navbar/>
    <div className="App">
      <Routes>        
        <Route path="/courses"      element={<Courses/>} />
        <Route path="/graduation"   element={<Graduation/>}/>
        <Route path="/majors"       element={<Majors/>}/>
      </Routes>
    </div>
  </>
  
  );
}

export default App;
