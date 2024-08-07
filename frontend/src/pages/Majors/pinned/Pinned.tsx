
import { useState } from "react";
import Style from "./Pinned.module.css";
import { StudentDegree, User } from "../../../commons/types/TypeUser";
import { Program } from "../../../commons/types/TypeProgram";

function SearchBar(props: { user: User, setCurrdex: Function }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = props.user.programs
        .map(program => program.abbreviation)
        .filter(abbreviation => abbreviation.toLowerCase().includes(term.toLowerCase()));
      setFilteredPrograms(filtered);
      setShowDropdown(true);
    } else {
      setFilteredPrograms([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (abbreviation: string) => {
    const index = props.user.programs.findIndex(program => program.abbreviation === abbreviation);
    props.setCurrdex(index);
    setSearchTerm(abbreviation);
    setFilteredPrograms([]);
    setShowDropdown(false);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className="search-bar-input"
        placeholder="Search programs..."
      />
      {showDropdown && (
        <div className="search-bar-dropdown">
          {filteredPrograms.map((abbreviation, index) => (
            <div
              key={index}
              onClick={() => handleSelect(abbreviation)}
              className="search-bar-item"
              onMouseDown={(e) => e.preventDefault()} // prevent input blur
            >
              {abbreviation}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DegreeIcon(props: { studentDegree: StudentDegree, programs: Program[], setCurrdex: Function }) {
  const mark = (status: string) => {
    let mark = "";
    switch (status) {
      case "DA":
        mark = "✓";
        break;
      case "ADD":
        mark = "⚠";
        break;
      case "PIN":
        mark = "📌";
        break;
      default:
        mark = "";
    }
    return (
      <div className={Style.Mark}>
        {mark}
      </div>
    );
  };

  return (
    <div className={Style.DegreeIcon} onClick={() => props.setCurrdex(props.studentDegree.programIndex)}>
      {mark(props.studentDegree.status)}{props.programs[props.studentDegree.programIndex].abbreviation}
    </div>
  );
}

function Pinned(props: { user: User, setCurrdex: Function }) {
  return (
		<div className={Style.Column}>
			<div>
				<SearchBar user={props.user} setCurrdex={props.setCurrdex}/>
			</div>
			<div>
				{props.user.studentDegrees.map((studentDegree, index) => (
					<DegreeIcon
						key={index}
						studentDegree={studentDegree}
						programs={props.user.programs}
						setCurrdex={props.setCurrdex}
					/>
				))}
			</div>
		</div>
  );
}

export default Pinned;
