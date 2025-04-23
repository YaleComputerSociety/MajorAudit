import Style from "./Overhead.module.css";
import PlanSelector from "./selector/PlanSelector";
import { useCoursesPage } from '@/context/CoursesContext';
import { useUser } from '@/context/UserProvider';

function Overhead() {
  const { editMode, toggleEditMode, selectedCourses, setSelectedCourses } = useCoursesPage();
  const { currentFYP, removeCourses } = useUser();

  const handleSelectAll = () => {
		if (!currentFYP) return;
		const allIds = currentFYP.studentCourses.map(course => course.id);
	
		const isEverythingSelected = allIds.every(id => selectedCourses.has(id));
		if (isEverythingSelected) {
			setSelectedCourses(new Set()); // Deselect all
		} else {
			setSelectedCourses(new Set(allIds)); // Select all
		}
	};

  const handleDeleteSelected = async () => {
    if (selectedCourses.size === 0) return;
    const courseIds = Array.from(selectedCourses);
    await removeCourses(courseIds);
    setSelectedCourses(new Set());
  };

	const handleEditToggle = () => {
		setSelectedCourses(new Set());
		toggleEditMode();
	}

  return (
    <div className={Style.Row}>
      <div className={Style.ButtonGroup}>
				<PlanSelector />
        <button
          className={`${Style.EditButton} ${editMode ? Style.EditButtonActive : ''}`}
          onClick={handleEditToggle}
        >
          {editMode ? 'Done' : 'Edit'}
        </button>
        {editMode && (
          <>
            <button
              className={Style.SelectAllButton}
              onClick={handleSelectAll}
            >
              Select All
            </button>
            <button
              className={`${Style.DeleteButton} ${selectedCourses.size === 0 ? Style.DeleteButtonDisabled : ''}`}
              onClick={handleDeleteSelected}
              disabled={selectedCourses.size === 0}
            >
              Delete Selected
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Overhead;
