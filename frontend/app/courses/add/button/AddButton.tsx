
import { useState, useRef, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import Style from "./AddButton.module.css";
import { useCoursesPage } from "@/context/CoursesContext";

function InnerSpinner() {
  return <div className={Style.innerSpinner} />;
}

function AddButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
	const { isCourseInserting } = useCoursesPage();

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (modalType: 'addCourse' | 'uploadCourses' | 'createCourse'): void => {
    setIsOpen(false);
    openModal(modalType);
  };

  return (
    <div className={Style.addButtonContainer} ref={dropdownRef}>
			<button 
				className={Style.AddButton} 
				onClick={toggleDropdown}
				aria-label="Add options"
				disabled={isCourseInserting} // Disable during insertion
			>
				{isCourseInserting ? <InnerSpinner /> : '+'}
			</button>
      
      {isOpen && (
        <div className={Style.dropdownMenu}>
          <button 
            className={Style.dropdownItem}
            onClick={() => handleOptionClick("addCourse")}
            tabIndex={0}
          >
            Add course
          </button>
          <button 
            className={Style.dropdownItem}
            onClick={() => handleOptionClick("uploadCourses")}
            tabIndex={0}
          >
            Upload courses
          </button>
          <button 
            className={Style.dropdownItem}
            onClick={() => handleOptionClick("createCourse")}
            tabIndex={0}
          >
            Create course
          </button>
        </div>
      )}
    </div>
  );
}

export default AddButton;
