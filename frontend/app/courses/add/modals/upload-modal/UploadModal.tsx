// UPDATED: UploadCoursesModal.tsx

import React, { useState } from 'react';
import BaseModal from '../base-modal/BaseModal';
import { useUser } from '@/context/UserProvider';
import styles from './UploadModal.module.css';

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
    } else if (line && /^[A-Z&-]{2,7} ?\d{3,5}/.test(line)) {
      const [code, , grade] = line.split(/\t+/);
      if (currentTerm && code && grade && grade !== 'W') {
        courses.push({
          term_from: currentTerm,
          code: code.replace(/\s+/g, ' ').trim(),
          result: grade.trim(),
          term_to: currentTerm
        });
      }
    }
  }

  return courses;
}

const UploadCoursesModal: React.FC = () => {
  const { addCourses } = useUser();
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{ code: string; success: boolean; message: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

	const handleUpload = async () => {
		setLoading(true);
		const parsed = parseBatchCourses(input);
	
		if (!parsed.length) {
			setResults([{ code: '-', success: false, message: 'No valid input' }]);
			setShowResults(true);
			setLoading(false);
			return;
		}
	
		const { courses, errors } = await addCourses(parsed);
	
		const mergedResults = parsed.map(entry => {
			const successEntry = courses.find(a => a.courseOffering.codes.includes(entry.code));
			const errorEntry = errors.find(e => e.entry.code === entry.code);
			if (successEntry) return { code: entry.code, success: true, message: 'Added' };
			return { code: entry.code, success: false, message: errorEntry?.message || 'Unknown error' };
		});
	
		setResults(mergedResults);
		setShowResults(true);
		setLoading(false);
	
		if (mergedResults.every(r => r.success)) {
			setTimeout(() => {
				setInput('');
				setResults([]);
				setShowResults(false);
				document.querySelector('[data-close-modal]')?.dispatchEvent(new MouseEvent('click'));
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
