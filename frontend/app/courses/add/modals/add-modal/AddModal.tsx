import React, { useState } from 'react';
import BaseModal from '../base-modal/BaseModal';
import styles from './AddModal.module.css';
import { useModal } from '../../context/ModalContext';
import { useUser } from '@/context/UserProvider';

const AddCourseModal: React.FC = () => {
  const { closeModal } = useModal();
  const { addCourses, isLoading } = useUser();

  const termOptions = ["202503", "202501", "202403", "202401", "202303", "202301", "202203"];
  const resultOptions = ['A-C', 'CR', 'D/F/W'];

  const [courseData, setCourseData] = useState({
    term_from: "", 
    code: "",
    result: "", 
    term_to: "" 
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));

    if (validationError) {
      setValidationError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseData.term_from || !courseData.code || !courseData.result || !courseData.term_to) {
      setValidationError('All fields are required');
      return;
    }

    try {
      const response = await addCourses([courseData]);

      if (response.success && response.courses.length > 0) {
        setCourseData({
          term_from: "",
          code: "",
          result: "", 
          term_to: ""
        });
        closeModal();
      } else {
        setValidationError(response.errors[0]?.message || 'Failed to add course');
      }
    } catch {
      setValidationError('Unexpected error occurred while adding course.');
    }
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
            required
            className={styles.formInput}
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
            required
            className={styles.formInput}
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
            required
            className={styles.formInput}
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
