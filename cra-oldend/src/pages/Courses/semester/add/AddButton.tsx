
import { useRef, useState, useEffect } from "react";
import Style from "./AddButton.module.css";
import { User } from "../../../../types/TypeUser";

// import { fetchAndCacheCourses, handleAddCourse } from "./AddUtils";
import { executeAddCourse } from "./AddUtils";

import { AddCourseDisplay, nullAddCourseDisplay } from "../../../../types/TypeCourse";

// const termMappings: { [key: string]: number } = {
//   "Spring 2025": 202501,
//   "Fall 2024": 202403,
//   "Spring 2024": 202401,
//   "Fall 2023": 202303,
//   "Spring 2023": 202301,
//   "Fall 2022": 202203,
// };
// const terms = Object.keys(termMappings);
const terms = [202203, 202301];

function AddButton(props: { term: number; user: User; setUser: Function }) {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLDivElement>(null);

  const [addDisplay, setAddDisplay] = useState<AddCourseDisplay>(nullAddCourseDisplay);

	const [selectedTerm, setSelectedTerm] = useState(props.term);
  // const [searchData, setSearchData] = useState<any[]>([]);

  useEffect(() => {
    if(addDisplay.active){
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus();
      // fetchAndCacheCourses(selectedTerm, setSearchData);
    }

    return () => {
			if(addDisplay.active){
				document.removeEventListener("mousedown", handleClickOutside);
			}
    };
  }, [addDisplay]);

	const handleClickOutside = (event: MouseEvent) => {
    if(addRef.current && !addRef.current.contains(event.target as Node)){
      if(addDisplay.dropVis){
        setAddDisplay((prevState) => ({...prevState, dropVis: false}));
				setTimeout(() => {
					if(inputRef.current){
							inputRef.current.focus();
						}
				}, 0);
      }else{
				setAddDisplay((prevState) => ({...prevState, active: false}));
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      executeAddCourse(inputRef, selectedTerm, props, setAddDisplay);
    }
  };

  return(
    <div ref={addRef}>
      {!addDisplay.active ? (
        <div className={Style.AddButton} onClick={() => setAddDisplay((prevState) => ({...prevState, active: true}))}>
          +
        </div>
      ) : (
        <div className={Style.AddCanvas}>
          <div className={Style.Row} style={{ alignItems: "center" }}>
            <div className={Style.RemoveButton} onClick={() => setAddDisplay((prevState) => ({...prevState, active: false}))}>

						</div>
            <div className={Style.TermBox} onClick={() => setAddDisplay((prevState) => ({...prevState, dropVis: !addDisplay.dropVis}))}>
              {selectedTerm}
              {addDisplay.dropVis && (
              <div className={Style.TermOptions}>
                {terms.map((term, index) => (
                  <div key={index} onClick={() => setSelectedTerm(term)} className={term === selectedTerm ? Style.SelectedTerm : ""}>
                    {term}
                  </div>
                ))}
              </div>
            )}
          </div>
            <input ref={inputRef} type="text" placeholder="FREN 403" onKeyPress={handleKeyPress} maxLength={9} className={Style.CodeBox}>
						
						</input>
            <div className={Style.RemoveButton} onClick={() => executeAddCourse(inputRef, selectedTerm, props, setAddDisplay)}>

						</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddButton;
