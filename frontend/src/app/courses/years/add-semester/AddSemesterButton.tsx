
import { useRef, useState, useEffect } from "react";
import Style from "./AddSemesterButton.module.css";

import { User, StudentSemester } from "@/types/type-user";

function executeAddSemester(props: { user: User; setUser: Function }, inputRef: React.RefObject<HTMLInputElement | null>, setDropVis: Function)
{
  if(inputRef.current)
	{
    const newTermString = inputRef.current.value.trim();
    if(!/^\d{6}$/.test(newTermString)){
      return;
    }

    const newTermNumber = Number(newTermString);
    const newSemester: StudentSemester = {
      term: newTermNumber,
      studentCourses: [],
    };

    const updatedSemesters = [...props.user.FYP.studentSemesters, newSemester];
    props.setUser({ ...props.user, FYP: { ...props.user.FYP, studentSemesters: updatedSemesters } });
    setDropVis(false);
  }
}


function AddSemesterButton(props: { user: User; setUser: Function })
{
	const [dropVis, setDropVis] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);


	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
				setDropVis(false);
			}
		}
	
		if(dropVis){
			document.addEventListener("mousedown", handleClickOutside);
		}
	
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropVis]); 

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(event.key === "Enter"){
			executeAddSemester(props, inputRef, setDropVis);
		}
	};

	return (
    <div ref={buttonRef}>
      {!dropVis ? (
        <button className={Style.AddButton} onClick={() => setDropVis(true)}>
          +
        </button>
      ) : (
				<div className={Style.AddCanvas}>
					<div className={Style.Row} style={{ alignItems: "center" }}>
						<div className={Style.RemoveButton} onClick={() => setDropVis(false)}>

						</div>
						<input ref={inputRef} type="text" placeholder="202503" onKeyPress={handleKeyPress} maxLength={6} className={Style.CodeBox}>
						
						</input>
						<div className={Style.RemoveButton} onClick={() => executeAddSemester(props, inputRef, setDropVis)}>

						</div>
					</div>
				</div>
      )}
    </div>
  );
}

export default AddSemesterButton;
