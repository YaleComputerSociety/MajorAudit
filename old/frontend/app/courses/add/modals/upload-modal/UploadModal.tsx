import React, { useState } from 'react';
import BaseModal from '../base-modal/BaseModal';
import { useCoursesPage } from '@/context/CoursesContext';
import { useUser } from '@/context/UserProvider';
import { tryGetNewStudentCourse } from '@/utils/studentCourseUtils';
import styles from './UploadModal.module.css';
import { StudentCourse } from '@/types/user';
import { useModal } from '../../context/ModalContext';

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
  const { currentFYP } = useUser();
  const { closeModal } = useModal();

  const [input, setInput] = useState('');
  const [toastErrors, setToastErrors] = useState<{ id: number, message: string }[]>([]);
  const { editableCourses, setEditableCourses, setIsCourseInserting, isCourseInserting } = useCoursesPage();


  const showToast = (message: string) => {
    const id = Date.now();
    setToastErrors(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToastErrors(prev => prev.filter(e => e.id !== id));
    }, 5000);
  };

  const handleUpload = async () => {
    setIsCourseInserting(true);
    const parsed = parseBatchCourses(input);

    closeModal(); // 🔐 close immediately

    if (!parsed.length || !currentFYP) {
      showToast('No valid input or missing FYP');
      setIsCourseInserting(false);
      return;
    }

    const tempCourseList = editableCourses ?? currentFYP.studentCourses;
    const courseCountByTerm = new Map<string, number>();
    for (const course of tempCourseList) {
      courseCountByTerm.set(course.term, (courseCountByTerm.get(course.term) ?? 0) + 1);
    }

    const newCourses: StudentCourse[] = [];

    for (const entry of parsed) {
      const count = courseCountByTerm.get(entry.term_to) ?? 0;
      courseCountByTerm.set(entry.term_to, count + 1);

      const fullEntry = { ...entry, sort_index: count };
      const newCourse = await tryGetNewStudentCourse(fullEntry);
      if (newCourse) {
        newCourses.push(newCourse);
      } else {
        showToast(`❌ ${entry.code}: invalid or unavailable`);
      }
    }

    if (newCourses.length > 0) {
      setEditableCourses((prev) => [...(prev ?? tempCourseList), ...newCourses]);
    }

    setInput('');
    setIsCourseInserting(false);
  };

  return (
    <>
      <BaseModal title="Upload Courses">
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="courseInput">Paste your course history</label>
            <textarea
              id="courseInput"
              rows={10}
              placeholder=""
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.formInput}
              disabled={isCourseInserting}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.submitButton}
              onClick={handleUpload}
              disabled={isCourseInserting || !input.trim()}
            >
              {isCourseInserting ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </BaseModal>

      <div className={styles.toastContainer}>
        {toastErrors.map((e) => (
          <div key={e.id} className={styles.toast}>
            {e.message}
            <button onClick={() => setToastErrors(prev => prev.filter(err => err.id !== e.id))}>×</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadCoursesModal;
