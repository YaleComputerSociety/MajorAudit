import React, { useState } from 'react';
import BaseModal from '../base-modal/BaseModal';
import { useUser } from '@/context/UserProvider';
import styles from './UploadModal.module.css';

// Util: Parse raw input into course objects
// Util: Parse raw input into course objects
function parseBatchCourses(raw: string) {
  const termMapping: Record<string, string> = {
    'Fall 2022': '202203',
    'Spring 2023': '202301',
    'Fall 2023': '202303',
    'Spring 2024': '202401',
    'Fall 2024': '202403',
    'Spring 2025': '202501',
    'Fall 2025': '202503'
  };

  const lines = raw.split('\n').map(line => line.trim());
  const courses = [];

  let currentTerm: string | null = null;

  for (const line of lines) {
    if (termMapping[line]) {
      currentTerm = termMapping[line];
    } 
    // Updated regex to support departments like "E&EB"
    else if (line && /^[A-Z&-]{2,7} ?\d{3,5}/.test(line)) {
      const [code, , grade] = line.split(/\t+/);

      if (currentTerm && code && grade) {
        const cleanCode = code.replace(/\s+/g, ' ').trim();
        const cleanGrade = grade.trim();

        // Include IP but skip W
        if (cleanGrade !== 'W') {
          courses.push({
            term_from: currentTerm,
            code: cleanCode,
            result: cleanGrade,
            term_to: currentTerm
          });
        }
      }
    }
  }

  return courses;
}


const UploadCoursesModal: React.FC = () => {
  const { addCourse } = useUser();
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{
    code: string;
    success: boolean;
    message: string;
  }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    const parsed = parseBatchCourses(input);
    const uploadResults: typeof results = [];

    for (const course of parsed) {
      try {
        const res = await addCourse(course.term_from, course.code, course.result, course.term_to);
        uploadResults.push({
          code: course.code,
          success: res.success,
          message: res.message
        });
      } catch (err) {
        uploadResults.push({
          code: course.code,
          success: false,
          message: 'Unexpected error' + err
        });
      }
    }

    setResults(uploadResults);
    setShowResults(true);
    setLoading(false);

    const allSuccessful = uploadResults.every(r => r.success);
    if (allSuccessful) {
      setTimeout(() => {
        setInput('');
        setShowResults(false);
        setResults([]);
        const closeButton = document.querySelector('[data-close-modal]') as HTMLElement;
        closeButton?.click();
      }, 500);
    }
  };

  return (
    <BaseModal title="Upload Courses">
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="courseInput">Paste your course history</label>
          <textarea
            id="courseInput"
            rows={10}
            placeholder="e.g.\nFall 2022\nCPSC 201\tIntro to CS\tA-\t1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.formInput}
            disabled={loading}
          />
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.submitButton}
            onClick={handleUpload}
            disabled={loading || !input.trim()}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

				{showResults && results.some(r => !r.success) && (
  <div className={styles.formGroup}>
    <label>Upload Errors</label>
    <ul style={{ fontSize: '14px', marginTop: '4px' }}>
      {results.filter(r => !r.success).map((r, idx) => (
        <li key={idx} style={{ color: 'red' }}>
          ❌ {r.code} — {r.message}
        </li>
      ))}
    </ul>
  </div>
)}
      </div>
    </BaseModal>
  );
};

export default UploadCoursesModal;
