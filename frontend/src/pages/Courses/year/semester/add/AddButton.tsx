import { useRef, useState, useEffect } from "react";
import Style from "./AddButton.module.css";

import { getCTCourses } from "./../../../../../api/api";
import { StudentCourse } from "../../../../../commons/types/TypeCourse";
import { User } from "../../../../../commons/types/TypeUser";
import { xCheckMajorsAndSet } from "./../../../CoursesUtils";

const termMappings: { [key: string]: number } = {
  "Fall 2022": 202203,
  "Spring 2023": 202301,
  "Fall 2023": 202303,
  "Spring 2024": 202401,
  "Fall 2024": 202403,
  "Spring 2025": 202501,
};
const terms = Object.keys(termMappings);

function TermSelector(props: { selectedTerm: number; onSelectTerm: Function }) {
  const [dropVis, setDropVis] = useState(false);

  const toggleDrop = () => {
    setDropVis(!dropVis);
  };

  const selectTerm = (term: string) => {
    props.onSelectTerm(termMappings[term]);
    setDropVis(false);
  };

  return (
    <div className={Style.TermBox} onClick={toggleDrop}>
      {Object.keys(termMappings).find((key) => termMappings[key] === props.selectedTerm)}
      {dropVis && (
        <div className={Style.TermOptions}>
          {terms.map((term, index) => (
            <div key={index} onClick={() => selectTerm(term)}>
              {term}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddButton(props: { term: number; user: User; setUser: Function }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLDivElement>(null); // Reference for the AddButton component
  const [active, setActive] = useState(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [selectedTerm, setSelectedTerm] = useState(props.term);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addButtonRef.current &&
        !addButtonRef.current.contains(event.target as Node)
      ) {
        deactivate();
      }
    };

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus();
      const cachedData = localStorage.getItem(`courses-${selectedTerm}`);
      if (cachedData) {
        setSearchData(JSON.parse(cachedData));
        console.log("Loaded From Cache");
      } else {
        getCTCourses(selectedTerm.toString())
          .then((data) => {
            setSearchData(data);
            try {
              localStorage.setItem(`courses-${selectedTerm}`, JSON.stringify(data));
              console.log("Retrieved & Cached");
            } catch (e: any) {
              if (e.name === "QuotaExceededError" || e.code === 22) {
                console.error("Quota Exceeded: ", e);
              } else {
                console.error("Error Unknown: ", e);
              }
            }
          })
          .catch((error) => {
            console.error("Error Retrieving: ", error);
          });
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active, selectedTerm]);

  const activate = () => {
    setActive(true);
  };

  const deactivate = () => {
    setActive(false);
  };

  const handleAddCourse = () => {
    if (inputRef.current) {
      const code = inputRef.current.value;
      const offering = searchData.find((course) => course["course_code"] === code);

      if (offering) {
        const codes = offering["listings"];
        const title = offering["title"];
        const credit = offering["credits"];
        const areas = offering["areas"];
        const skills = offering["skills"];
        const seasons = ["Fall", "Spring"];
        const course = { codes, title, credit, areas, skills, seasons };
        const status = selectedTerm === props.term ? "MA_VALID" : "MA_HYPOTHETICAL";
        const term = props.term;
        const newCourse: StudentCourse = { course, term, status };

        const isDuplicate = props.user.studentCourses.some(
          (existingCourse) =>
            existingCourse.course.title === newCourse.course.title &&
            existingCourse.term === newCourse.term
        );

        if (isDuplicate) {
          console.log("Duplicate");
        } else {
          xCheckMajorsAndSet(props.user, newCourse, props.setUser);
          deactivate();
        }
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddCourse();
    }
  };

  return (
    <div ref={addButtonRef}>
      {!active ? (
        <div className={Style.AddButton} onClick={activate}>
          +
        </div>
      ) : (
        <div className={Style.AddCanvas}>
          <div className={Style.Row} style={{ alignItems: "center" }}>
            <div className={Style.RemoveButton} onClick={deactivate}></div>
            <TermSelector selectedTerm={selectedTerm} onSelectTerm={setSelectedTerm} />
            <input
              ref={inputRef}
              type="text"
              placeholder="FREN 403"
              maxLength={9}
              onKeyPress={handleKeyPress}
              className={Style.CodeBox}
            />
            <div className={Style.ConfirmButton} onClick={handleAddCourse}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddButton;
