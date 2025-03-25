
import React, { useState } from 'react';
import BaseModal from '../base-modal/BaseModal';
import styles from './AddModal.module.css';
import { useModal } from '../../context/ModalContext';

const AddCourseModal: React.FC = () => {
  const { closeModal } = useModal();

  const termOptions = [
    'Fall 2023', 'Spring 2024', 'Summer 2024', 
    'Fall 2024', 'Spring 2025', 'Summer 2025',
    'Fall 2025', 'Spring 2026', 'Summer 2026'
  ];
  
  const resultOptions = ['A-C', 'CR', 'D-F', 'W'];
  
  const [courseData, setCourseData] = useState({
    term_from: "", // Default to no selection
    code: "",
    result: "", // Added result field
    term_to: "" // Default to no selection
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding course:', courseData);
    // Handle submission logic here
    closeModal();
  };

  const handleCancel = () => {
    // Reset form values and close modal
    setCourseData({
      term_from: "",
      code: "",
      result: "", // Added result field in reset
      term_to: ""
    });
    closeModal();
  };

  return (
    <BaseModal title="Add Course">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="term_from">Term From</label>
          <select
            id="term_from"
            name="term_from"
            value={courseData.term_from}
            onChange={handleChange}
            required
            className={styles.formInput}
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
          >
            <option value="">Select Term</option>
            {termOptions.map(term => (
              <option key={`to-${term}`} value={term}>{term}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Add Course
          </button>
          <button 
            type="button" 
            className={styles.cancelButton} 
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddCourseModal;
