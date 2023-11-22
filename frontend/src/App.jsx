import React from "react";
import DegreeDropdown from "./components/Courses/DegreeDropdown";
import NavBar from "./components/NavBar";
import Majors from "./pages/Majors";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Graduation from "./components/Graduation/Graduation";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path='/' element={<DegreeDropdown />} />
                    <Route path='/graduation' element={<Graduation />} />
                    <Route path='/majors' element={<Majors />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
