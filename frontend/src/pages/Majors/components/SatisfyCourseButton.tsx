
import React, { useRef, useState } from "react";
import styles from "./../Majors.module.css";
import { User } from "../../../commons/types/TypeUser";

function SatisfyCourseButton(props: { user: User, addCourseToSubsection: Function }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);

  const activate = () => {
    setActive(true);
    inputRef.current?.focus();
  };

  const deactivate = () => {
    setActive(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      const code = inputRef.current.value.trim().toUpperCase();
      const course = props.user.studentCourses.find(sc => sc.course.codes.includes(code));

      if (course) {
        props.addCourseToSubsection(course);
        deactivate();
      }
    }
  };

  return (
    <div>
      {!active ? (
        <div className={styles.satisfyCourseButton} onClick={activate}>
          +
        </div>
      ) : (
        <div className={styles.SatisfyCourseBox}>
          <div className={styles.row} style={{ alignItems: "center" }}>
            <div className={styles.DeactivateButton} onClick={deactivate}>

            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Code..."
              maxLength={9}
              onKeyPress={handleKeyPress}
              className={styles.CodeSearch}
              // onBlur={deactivate} // Deactivate input when it loses focus
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SatisfyCourseButton;