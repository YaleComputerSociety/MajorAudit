
import { useState, useEffect, useRef } from "react";
import Style from "./MajorSearch.module.css";
import { User, StudentDegree } from "../../../../commons/types/TypeUser";
import { ALL_PROGRAM_METADATAS } from "../../../../commons/mock/MockDegreeMetadata";

function MajorSearchBar(props: { 
	user: User, 
	setProgramIndex: Function 
}){
	const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFullSelection, setIsFullSelection] = useState(false); 
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsFullSelection(false); 
    if(term){
      const filtered = ALL_PROGRAM_METADATAS
        .map(program => program[0].name)
        .filter(name => name.toLowerCase().includes(term.toLowerCase()));
      setFilteredPrograms(filtered);
      setShowDropdown(true);
    } else {
      setFilteredPrograms([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (name: string) => {
    const index = ALL_PROGRAM_METADATAS.findIndex(program => program[0].name === name);
    props.setProgramIndex(index);
    setSearchTerm(name);
    setIsFullSelection(true); // Indicate that a full name was selected
    setFilteredPrograms([]);
    setShowDropdown(false);
    inputRef.current?.blur(); // Unfocus the input box after selection
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  const handleInputFocus = () => {
    if (searchTerm) {
      const filtered = ALL_PROGRAM_METADATAS
        .map(program => program[0].name)
        .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredPrograms(filtered);
      setShowDropdown(true);
    }
    if (isFullSelection && inputRef.current) {
      inputRef.current.select(); // Select all text if a full name was previously selected
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={Style.SearchContainer} ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus} // Add focus event listener
        className={Style.searchBarInput}
        placeholder="Search Majors..."
        style={{ width: "400px" }}
      />
      {showDropdown && (
        <div className={Style.searchBarDropdown}>
          {filteredPrograms.map((name, index) => (
            <div
              key={index}
              onClick={() => handleSelect(name)}
              className={Style.searchBarItem}
              onMouseDown={(e) => e.preventDefault()}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MajorSearchBar;
