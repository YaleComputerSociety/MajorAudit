// frontend/app/courses/add/modals/add-modal/AddModal.tsx

import React, { useState } from 'react';
import BaseModal from '../base-modal/BaseModal';
import styles from './AddModal.module.css';
import { useModal } from '../../context/ModalContext';
import { useCoursesPage } from '@/context/CoursesContext';
import { tryGetNewStudentCourse } from '@/utils/studentCourseUtils'; 
import { StudentCourse, CourseEntry } from '@/types/user';

const AddCourseModal: React.FC = () => {
  const { closeModal } = useModal();
  const { editableCourses, setEditableCourses } = useCoursesPage();

  const termOptions = ["202503", "202501", "202403", "202401", "202303", "202301", "202203"];
  const resultOptions = ['A-C', 'CR', 'D/F/W'];

  const [courseData, setCourseData] = useState({
    term_from: "", 
    code: "",
    result: "", 
    term_to: "" 
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { term_from, term_to, code, result } = courseData;

    if (!term_from || !term_to || !code || !result) {
      setValidationError('All fields are required');
      setIsLoading(false);
      return;
    }

    const sort_index =
      editableCourses?.filter(c => c.term === term_to).length ?? 0;

    const courseEntry: CourseEntry = { ...courseData, sort_index };

    const newCourse: StudentCourse | null = await tryGetNewStudentCourse(courseEntry);

    if (!newCourse) {
      setValidationError('Could not find or add course.');
      setIsLoading(false);
      return;
    }

    setEditableCourses(prev => (prev ? [...prev, newCourse] : [newCourse]));
    closeModal();
    setIsLoading(false);
  };

  const handleCancel = () => {
    setCourseData({
      term_from: "",
      code: "",
      result: "", 
      term_to: ""
    });
    setValidationError('');
    closeModal();
  };

  return (
    <BaseModal title="Add Course">
      <form onSubmit={handleSubmit} className={styles.form}>
        {validationError && (
          <div className={styles.errorMessage}>{validationError}</div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="term_from">Term From</label>
          <select
            id="term_from"
            name="term_from"
            value={courseData.term_from}
            onChange={handleChange}
            className={styles.formInput}
            required
            disabled={isLoading}
          >
            <option value="">Select Term</option>
            {termOptions.map(term => (
              <option key={`from-${term}`} value={term}>{term}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="code">Course Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={courseData.code}
            onChange={handleChange}
            placeholder="e.g., CS101"
            className={styles.formInput}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="result">Result</label>
          <select
            id="result"
            name="result"
            value={courseData.result}
            onChange={handleChange}
            className={styles.formInput}
            required
            disabled={isLoading}
          >
            <option value="">Select Result</option>
            {resultOptions.map(result => (
              <option key={result} value={result}>{result}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="term_to">Term To</label>
          <select
            id="term_to"
            name="term_to"
            value={courseData.term_to}
            onChange={handleChange}
            className={styles.formInput}
            required
            disabled={isLoading}
          >
            <option value="">Select Term</option>
            {termOptions.map(term => (
              <option key={`to-${term}`} value={term}>{term}</option>
            ))}
          </select>
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Course'}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddCourseModal;
