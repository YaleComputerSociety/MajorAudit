// frontend/app/courses/overhead/Overhead.tsx

import { useState } from "react";
import Style from "./Overhead.module.css";
import PlanSelector from "./selector/PlanSelector";
import { useCoursesPage } from '@/context/CoursesContext';
import { useUser } from '@/context/UserProvider';

function Overhead() {
  const {
    editMode,
    toggleEditMode,
    selectedCourses,
    setSelectedCourses,
    editableCourses,
    resetEditableCourses
  } = useCoursesPage();
  const { currentFYP, updateCourses } = useUser();
	const [isSaving, setIsSaving] = useState(false);

	if (!currentFYP) {
    return null; // 🔥 Hide the whole Overhead until ready
  }

  const handleSelectAll = () => {
    if (!currentFYP) return;
    const allIds = currentFYP.studentCourses.map(course => course.id);

    const isEverythingSelected = allIds.every(id => selectedCourses.has(id));
    if (isEverythingSelected) {
      setSelectedCourses(new Set());
    } else {
      setSelectedCourses(new Set(allIds));
    }
  };

  const handleEditToggle = () => {
    setSelectedCourses(new Set());
    toggleEditMode();
  };

	const handleSave = async () => {
		if (!editableCourses) return;
		setIsSaving(true); // 🚀 start spinner
		try {
			await updateCourses(editableCourses);
			resetEditableCourses();
			toggleEditMode();
		} catch (err) {
			console.error("Failed to save:", err);
		} finally {
			setIsSaving(false); // ✅ stop spinner even if save fails
		}
	};

  return (
    <div className={Style.Row}>
      <div className={Style.ButtonGroup}>
        <PlanSelector />
        <button
          className={`${Style.EditButton} ${editMode ? Style.EditButtonActive : ''}`}
          onClick={handleEditToggle}
        >
          {editMode ? 'Cancel' : 'Edit'}
        </button>

        {editMode && (
          <>
            <button
              className={Style.EditButton}
              onClick={handleSelectAll}
            >
              Select
            </button>
						<button
							className={Style.SaveButton}
							onClick={handleSave}
							disabled={isSaving}
							style={{ position: 'relative', overflow: 'hidden' }}
						>
							{isSaving && <div className={Style.SaveSpinnerRing} />}
							Save
						</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Overhead;