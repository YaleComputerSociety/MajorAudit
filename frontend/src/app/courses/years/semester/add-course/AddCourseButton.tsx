
import { useRef, useState, useEffect } from "react";
import Style from "./AddCourseButton.module.css";

import { User, StudentCourse } from "@/types/type-user";
import { getCatalogCourse, getCatalogTerms } from "@/database/data-catalog";

interface AddCourseDisplay {
	active: boolean;
	termDropVis: boolean;
	resultDropVis: boolean;
}

function executeAddCourse(
  props: { term: number; user: User; setUser: Function },
	inputRef: React.RefObject<HTMLInputElement | null>,
  selectedTerm: number,
	selectedResult: string,
  setAddDisplay: Function
){
  if(inputRef.current){
    const targetCode = inputRef.current.value;
    const targetCourse = getCatalogCourse(selectedTerm, targetCode);

    if(targetCourse){
      const status = selectedTerm === props.term ? "DA" : "MA";
      const newCourse: StudentCourse = { course: targetCourse, status, term: props.term, result: selectedResult };

      const updatedCourses = [...props.user.FYP.studentCourses, newCourse];

			props.setUser({ ...props.user, FYP: { ...props.user.FYP, studentCourses: updatedCourses } });
			setAddDisplay((prevState: AddCourseDisplay) => ({ ...prevState, active: false }));
    }
  }
}

function AddCourseButton(props: { term: number; user: User; setUser: Function }) {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLDivElement>(null);

  const [addDisplay, setAddDisplay] = useState<AddCourseDisplay>({ active: false, termDropVis: false, resultDropVis: false });
  const [selectedTerm, setSelectedTerm] = useState(props.term);
  const [selectedResult, setSelectedResult] = useState("");
  const resultOptions = ["GRADE", "CR", "D/F"];

	const catalogTerms = getCatalogTerms()

  useEffect(() => {
    if(addDisplay.active){
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus();
    }

    return () => {
      if(addDisplay.active){
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [addDisplay]);

  const handleClickOutside = (event: MouseEvent) => {
    if(addRef.current && !addRef.current.contains(event.target as Node)){
      if(addDisplay.termDropVis || addDisplay.resultDropVis){
        setAddDisplay((prevState) => ({...prevState, termDropVis: false, resultDropVis: false}));
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
      executeAddCourse(props, inputRef, selectedTerm, selectedResult, setAddDisplay);
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
            <div className={Style.TermBox} onClick={() => setAddDisplay((prevState) => ({...prevState, termDropVis: !prevState.termDropVis}))}>
              {selectedTerm}
              {addDisplay.termDropVis && (
                <div className={Style.DropdownOptions}>
                  {catalogTerms.map((term, index) => (
                    <div key={index} onClick={() => setSelectedTerm(term)} className={term === selectedTerm ? Style.SelectedDropdownOption : ""}>
                      {term}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input ref={inputRef} type="text" placeholder="HIST 335" onKeyPress={handleKeyPress} maxLength={9} className={Style.CodeBox}>
            </input>
            <div className={Style.ResultBox} onClick={() => setAddDisplay((prevState) => ({...prevState, resultDropVis: !prevState.resultDropVis}))}>
              {selectedResult || ""}
              {addDisplay.resultDropVis && (
                <div className={Style.DropdownOptions}>
                  {resultOptions.map((result, index) => (
                    <div key={index} onClick={() => setSelectedResult(result)} className={result === selectedResult ? Style.SelectedDropdownOption : ""}>
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={Style.RemoveButton} onClick={() => executeAddCourse(props, inputRef, selectedTerm, selectedResult, setAddDisplay)}>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourseButton;
