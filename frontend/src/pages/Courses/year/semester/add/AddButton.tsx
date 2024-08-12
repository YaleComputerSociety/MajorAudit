import { useRef, useState, useEffect } from "react";
import Style from "./AddButton.module.css";
import { User } from "../../../../../commons/types/TypeUser";
import { fetchAndCacheCourses, handleAddCourse } from "./AddUtils";

const termMappings: { [key: string]: number } = {
  "Spring 2025": 202501,
  "Fall 2024": 202403,
  "Spring 2024": 202401,
  "Fall 2023": 202303,
  "Spring 2023": 202301,
  "Fall 2022": 202203,
};
const terms = Object.keys(termMappings);

function AddButton(props: { term: number; user: User; setUser: Function }) {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);
	const [dropVis, setDropVis] = useState(false);

	const [selectedTerm, setSelectedTerm] = useState(props.term);
  const [searchData, setSearchData] = useState<any[]>([]);

  useEffect(() => {
    if(active){
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus();
      fetchAndCacheCourses(selectedTerm, setSearchData);
    }else{
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active, selectedTerm]);

  useEffect(() => {
		console.log("dropVis updated:", dropVis);
	}, [dropVis]);
 
  const chooseTerm = (term: string) => {
    setSelectedTerm(termMappings[term]);
    setDropVis(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      handleAddCourse(inputRef, searchData, selectedTerm, props, setActive);
    }
  };

	const handleClickOutside = (event: MouseEvent) => {
    if(addButtonRef.current && !addButtonRef.current.contains(event.target as Node)){
      if(dropVis){
        setDropVis(false);
				console.log("dropVis")
      }else{
        setActive(false)
				console.log("failure: ", dropVis)
      }
    }
  };

  return (
    <div ref={addButtonRef}>
      {!active ? (
        <div className={Style.AddButton} onClick={() => setActive(true)}>
          +
        </div>
      ) : (
        <div className={Style.AddCanvas}>
          <div className={Style.Row} style={{ alignItems: "center" }}>
            <div className={Style.RemoveButton} onClick={() => setActive(false)}>

						</div>
            <div className={Style.TermBox} onClick={() => setDropVis(!dropVis)}>
              {Object.keys(termMappings).find((key) => termMappings[key] === selectedTerm)}
              {dropVis && (
                <div className={Style.TermOptions}>
                  {terms.map((term, index) => (
                    <div key={index} onClick={() => chooseTerm(term)} className={termMappings[term] === selectedTerm ? Style.SelectedTerm : ""}>
                      {term}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input ref={inputRef} type="text" placeholder="FREN 403"  maxLength={9} onKeyPress={handleKeyPress} className={Style.CodeBox}>
				
						</input>
            <div className={Style.ConfirmButton} onClick={() => handleAddCourse(inputRef, searchData, selectedTerm, props, setActive)}>

						</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddButton;
