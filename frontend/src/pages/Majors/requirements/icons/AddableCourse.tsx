
import React, { useRef, useState, useEffect } from "react";
import Style from "./AddableCourse.module.css";
import { User } from "../../../../commons/types/TypeUser";

function AddableCourse(props: { user: User, addCourseToSubsection: Function }) {
  
	const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);

	useEffect(() => {
		if(active){
			inputRef.current?.focus();
		}
	}, [active]);

  const activate = () => {
    setActive(true);
  };

  const deactivate = () => {
    setActive(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      const code = inputRef.current.value.trim().toUpperCase();
      const course = props.user.FYP.studentCourses.find(sc => sc.course.codes.includes(code));

      if (course) {
        props.addCourseToSubsection(course);
        deactivate();
      }
    }
  };

  return (
    <div>
      {!active ? (
        <div className={Style.AddButton} onClick={activate}>
          +
        </div>
      ) : (
        <div className={Style.AddCanvas}>
          <div className={Style.DeactivateButton} onClick={deactivate}>

					</div>
					<input ref={inputRef} type="text" placeholder="" maxLength={9} onKeyPress={handleKeyPress} className={Style.CodeSearch}
						// onBlur={deactivate} // Deactivate input when it loses focus
					/>
        </div>
      )}
    </div>
  );
}

export default AddableCourse;