import React, { useState, useMemo } from 'react';
import BaseModal from '../base-modal/BaseModal';
import styles from './CreateModal.module.css';
import { useModal } from '../../context/ModalContext';
import { useCoursesPage } from '@/context/CoursesContext';
import { useUser } from '@/context/UserProvider';
import { StudentCourse } from '@/types/user';
import { TransformTermNumber } from '@/utils/courseDisplayUtils';

const CreateCourseModal: React.FC = () => {
  const { closeModal } = useModal();
  const { editableCourses, setEditableCourses } = useCoursesPage();
  const { currentFYP } = useUser();

  const [form, setForm] = useState({
    title: '',
    code: '',
    credits: 1,
    distributions: '',
    term: '',
    result: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const targetTerms = useMemo(() => {
    const arrangement = currentFYP?.studentTermArrangement;
    if (!arrangement) return [];
    const terms = [
      ...(arrangement.first_year ?? []),
      ...(arrangement.sophomore ?? []),
      ...(arrangement.junior ?? []),
      ...(arrangement.senior ?? []),
    ];
    return terms.filter(term => term !== "0");
  }, [currentFYP]);

  const resultOptions = ['A-C', 'CR', 'D/F/W'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { title, code, credits, distributions, term, result } = form;

    if (!title || !code || !term || !result) {
      setValidationError('All fields are required');
      setIsLoading(false);
      return;
    }

    const sort_index = editableCourses?.filter(c => c.term === term).length ?? 0;

    const newCreatedCourse: StudentCourse = {
      id: -1,
      term,
      result,
      status: term ? 'DA' : 'MA', // or whatever your default status logic is
      sort_index,
      is_hidden: false,
			pref_code: "C-" + code,
      createdCourse: {
        id: -1,
        title: title.trim(),
        code: code.trim().toUpperCase(),
        distributions: distributions.split(',').map(d => d.trim()), // crude split for now
        credits: Number(credits),
      },
      courseOffering: null,
    };

    setEditableCourses(prev => (prev ? [...prev, newCreatedCourse] : [newCreatedCourse]));

    closeModal();
    setIsLoading(false);
  };

  const handleCancel = () => {
    setForm({
      title: '',
      code: '',
      credits: 1,
      distributions: '',
      term: '',
      result: '',
    });
    setValidationError('');
    closeModal();
  };

  return (
    <BaseModal title="Create New Course">
      <form onSubmit={handleSubmit} className={styles.form}>
        {validationError && (
          <div className={styles.errorMessage}>{validationError}</div>
        )}

        <div className={styles.formGroup}>
          <label>Course Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="French In France"
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Course Code</label>
          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="..."
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Credits</label>
          <input
            name="credits"
            type="number"
            min="0"
            step="0.5"
            value={form.credits}
            onChange={handleChange}
            className={styles.formInput}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Distributions (comma separated)</label>
          <input
            name="distributions"
            value={form.distributions}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="QR, WR, Sc"
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Term</label>
          <select
            name="term"
            value={form.term}
            onChange={handleChange}
            className={styles.formInput}
            required
            disabled={isLoading}
          >
            <option value="">Select Term</option>
            {targetTerms.map(term => (
              <option key={`term-${term}`} value={term}>{TransformTermNumber(term)}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Result</label>
          <select
            name="result"
            value={form.result}
            onChange={handleChange}
            className={styles.formInput}
            required
            disabled={isLoading}
          >
            <option value="">Select Result</option>
            {resultOptions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Course'}
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

export default CreateCourseModal;
