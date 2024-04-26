import Globals from './Globals';
import Router from './Router';
import CourseModal from './commons/components/courses/CourseModal';

import { CGSC, CPSC, ECON, HIST } from "./commons/mock/MockProgram";

function App() {
  const programs = [CGSC, CPSC, ECON, HIST];
  const strPrograms = JSON.stringify(programs);
  localStorage.setItem("programList", strPrograms);
  
  return (
    <div>
      <Globals>
          <Router />
          <CourseModal />
      </Globals>
    </div>
  );
}

export default App;