
import { useRef, useState, useEffect } from "react";
import Style from "./AddCourseButton.module.css";

import { User, StudentCourse } from "@/types/type-user";
import { getCatalogCourse } from "@/database/data-catalog";

interface AddCourseDisplay {
	active: boolean;
	dropVis: boolean;
}

const terms = [202203, 202301];

function executeAddCourse(
  props: { term: number; user: User; setUser: Function },
	inputRef: React.RefObject<HTMLInputElement | null>,
  selectedTerm: number,
  setAddDisplay: Function
){
  if(inputRef.current){
    const targetCode = inputRef.current.value;
    const targetCourse = getCatalogCourse(selectedTerm, targetCode);

    if(targetCourse){
      const status = selectedTerm === props.term ? "MA_VALID" : "MA_HYPOTHETICAL";
      const newCourse: StudentCourse = { course: targetCourse, status, term: props.term };

      const updatedSemesters = props.user.FYP.studentSemesters.map((semester) => {
        if (semester.season === selectedTerm) {
          return { ...semester, studentCourses: [...semester.studentCourses, newCourse] };
        }
        return semester;
      });

			props.setUser({ ...props.user, FYP: { ...props.user.FYP, studentSemesters: updatedSemesters } });
			setAddDisplay((prevState: AddCourseDisplay) => ({ ...prevState, active: false }));
    }
  }
}

function AddCourseButton(props: { term: number; user: User; setUser: Function }) {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLDivElement>(null);

  const [addDisplay, setAddDisplay] = useState<AddCourseDisplay>({ active: false, dropVis: false });
	const [selectedTerm, setSelectedTerm] = useState(props.term);

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
			executeAddCourse(props, inputRef, selectedTerm, setAddDisplay);
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
            <div className={Style.RemoveButton} onClick={() => executeAddCourse(props, inputRef, selectedTerm, setAddDisplay)}>

						</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourseButton;
