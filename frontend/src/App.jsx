import React from "react";
import Course from "./components/Course";
import DegreeRow from "./components/DegreeRow";
import DegreeDropdown from "./components/DegreeDropdown";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className="App">
            <NavBar />
            <DegreeDropdown />
            
        </div>
    );
};
    
export default App;
