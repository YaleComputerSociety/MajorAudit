
import { useRef, useState, useEffect } from "react";
import Style from "./AddSemesterButton.module.css";

import { StudentSemester, StudentYear } from "@/types/type-user";

function executeAddSemester(
  props: { studentYear: StudentYear, setStudentYears: Function }, 
  inputRef: React.RefObject<HTMLInputElement | null>, 
  setDropVis: Function
) {
  if (inputRef.current) {
    const newTermString = inputRef.current.value.trim();

    // Ensure input is a valid 6-digit number
    if (!/^\d{6}$/.test(newTermString)) {
      return;
    }

    const newTermNumber = Number(newTermString);

    // Create a new semester object
    const newSemester: StudentSemester = {
      term: newTermNumber,
      studentCourses: [],
      active: true,
    };

    // Update studentYears with a new array reference
    props.setStudentYears((prevYears: StudentYear[]) => {
      return prevYears.map(year => {
        if (year.grade === props.studentYear.grade) {
          return {
            ...year,
            studentSemesters: [...year.studentSemesters, newSemester] // Create new array
          };
        }
        return year;
      });
    });

    setDropVis(false);
  }
}



function AddSemesterButton(props: { studentYear: StudentYear, setStudentYears: Function }) {
  const [dropVis, setDropVis] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setDropVis(false);
      }
    }

    if (dropVis) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropVis]);

  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     executeAddSemester(props, inputRef, setDropVis);
  //   }
  // };

  return (
    <div ref={buttonRef}>
      {!dropVis ? (
        <button className={Style.AddButton} onClick={() => setDropVis(true)}>+</button>
      ) : (
        <div className={Style.AddCanvas}>
          <div className={Style.Row} style={{ alignItems: "center" }}>
            <div className={Style.RemoveButton} onClick={() => setDropVis(false)}></div>
            <input
              ref={inputRef}
              type="text"
              placeholder="03"
              // onKeyPress={handleKeyPress}
              maxLength={6}
              className={Style.CodeBox}
            />
            <div className={Style.RemoveButton} onClick={() => executeAddSemester(props, inputRef, setDropVis)}></div>
          </div>
        </div>
      )}
    </div>
  );
}


export default AddSemesterButton;
