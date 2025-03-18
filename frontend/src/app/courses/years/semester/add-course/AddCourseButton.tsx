
import { useRef, useState, useEffect } from "react";
import Style from "./AddCourseButton.module.css";

import { useAuth } from "@/context/AuthProvider";
import { executeAddCourse } from "./AddCourseUtils";

export interface AddCourseDisplay {
	active: boolean;
	termDropVis: boolean;
	resultDropVis: boolean;
}

function AddCourseButton(props: { 
	term: number 
}){
	const { user, setUser } = useAuth();
	
  const inputRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLDivElement>(null);

  const [addDisplay, setAddDisplay] = useState<AddCourseDisplay>({ active: false, termDropVis: false, resultDropVis: false });
  const [selectedTerm, setSelectedTerm] = useState(props.term);
  const [selectedResult, setSelectedResult] = useState("GRADE");
  const resultOptions = ["GRADE", "CR", "D/F"];

	const catalogTerms = [202501]

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

  return(
    <div ref={addRef}>
      {!addDisplay.active ? (
        <div 
					className={Style.CourseBox} 
					onClick={() => setAddDisplay((prevState) => ({...prevState, active: true}))}
				>
          +
        </div>
      ) : (
        <div className={Style.CourseBox}>
					<button 
						className={Style.FuncButton} 
						style={{ background: "#ffaaaa" }}
						onClick={() => setAddDisplay((prevState) => ({...prevState, active: false}))}
					/>
					<div 
						className={Style.DropBox} 
						style={{ width: "80px" }}
						onClick={() => setAddDisplay((prevState) => ({...prevState, termDropVis: !prevState.termDropVis}))}
					>
						{selectedTerm}
						{addDisplay.termDropVis && (
							<div className={Style.DropdownOptions}>
								{catalogTerms.map((term, index) => (
									<div 
										key={index} 
										className={term === selectedTerm ? Style.SelectedDropdownOption : ""}
										onClick={() => setSelectedTerm(term)} 
									>
										{term}
									</div>
								))}
							</div>
						)}
					</div>
					<input 
						ref={inputRef} 
						type="text" 
						placeholder="MATH 225" 
						maxLength={9} 
						className={Style.InputBox}
						style={{ width: "100px" }}
					/>
					<div 
						className={Style.DropBox} 
						style={{ width: "60px" }}
						onClick={() => setAddDisplay((prevState) => ({...prevState, resultDropVis: !prevState.resultDropVis}))}
					>
						{selectedResult || ""}
						{addDisplay.resultDropVis && (
							<div className={Style.DropdownOptions}>
								{resultOptions.map((result, index) => (
									<div 
										key={index} 
										className={result === selectedResult ? Style.SelectedDropdownOption : ""}
										onClick={() => setSelectedResult(result)} 
									>
										{result}
									</div>
								))}
							</div>
						)}
					</div>
					<button 
						className={Style.FuncButton} 
						style={{ background: "#a4ffaf" }}
						onClick={() => executeAddCourse(
							inputRef,
							selectedResult,
							props.term, 
							selectedTerm,
							user, 
							setUser, 
							setAddDisplay
						)}
					/>
        </div>
      )}
    </div>
  );
}

export default AddCourseButton;
