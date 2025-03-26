
import React, { useState } from 'react';
import BaseModal from '../base-modal/BaseModal';
// import styles from './UploadCoursesModal.module.css';

const UploadCoursesModal: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    
    // File upload logic would go here
    // For demonstration, simulating an upload delay
    console.log('Uploading file:', file.name);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Upload successful');
      // Handle success
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <BaseModal title="Upload Courses">
			<div>
				
			</div>
      {/* <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.uploadArea}>
          <input
            type="file"
            id="courseFile"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          <label htmlFor="courseFile" className={styles.fileLabel}>
            {file ? file.name : 'Choose CSV or Excel file'}
          </label>
          <p className={styles.helpText}>
            Supported formats: .csv, .xlsx, .xls
          </p>
        </div>
        
        {file && (
          <div className={styles.fileInfo}>
            <p>Selected file: {file.name}</p>
            <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
        
        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={!file || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Courses'}
          </button>
        </div>
      </form> */}
    </BaseModal>
  );
};

export default UploadCoursesModal;
