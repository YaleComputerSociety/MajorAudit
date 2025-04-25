// frontend/context/CoursesContext.tsx

'use client';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useTransition,
} from 'react';
import { StudentCourse } from '@/types/user';

interface CoursesPageContextType {
  editMode: boolean;
  toggleEditMode: () => void;

  selectedCourses: Set<number>;
  setSelectedCourses: React.Dispatch<React.SetStateAction<Set<number>>>;

  toggleCourseSelection: (courseId: number) => void;
  isPending: boolean;

  editableCourses: StudentCourse[] | null;
  setEditableCourses: React.Dispatch<React.SetStateAction<StudentCourse[] | null>>;

  resetEditableCourses: () => void;
  updateEditableCourse: (courseId: number, patch: Partial<StudentCourse>) => void;

	lastDragTimestamp: number;
	setLastDragTimestamp: (ts: number) => void;
}

const CoursesPageContext = createContext<CoursesPageContextType | undefined>(undefined);

export function CoursesPageProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<Set<number>>(new Set());
  const [editableCourses, setEditableCourses] = useState<StudentCourse[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const [lastDragTimestamp, setLastDragTimestamp] = useState(Date.now());

  const resetEditableCourses = useCallback(() => {
    setEditableCourses(null);
    setSelectedCourses(new Set());
  }, []);

  const toggleEditMode = useCallback(() => {
    setEditMode(prev => {
      const next = !prev;
      if (!next) resetEditableCourses(); // ← Reset courses if turning OFF edit mode
      return next;
    });
  }, [resetEditableCourses]);

  const toggleCourseSelection = useCallback((courseId: number) => {
    startTransition(() => {
      setSelectedCourses(prev => {
        const updated = new Set(prev);
        if (updated.has(courseId)) {
          updated.delete(courseId);
        } else {
          updated.add(courseId);
        }
        return updated;
      });
    });
  }, []);

  const updateEditableCourse = useCallback((courseId: number, patch: Partial<StudentCourse>) => {
    setEditableCourses(prev =>
      prev
        ? prev.map(c => (c.id === courseId ? { ...c, ...patch } : c))
        : prev
    );
  }, []);

  const contextValue = useMemo(() => ({
    editMode,
    toggleEditMode,
    selectedCourses,
    setSelectedCourses,
    toggleCourseSelection,
    isPending,
    editableCourses,
    setEditableCourses,
    resetEditableCourses,
    updateEditableCourse,
    lastDragTimestamp,
    setLastDragTimestamp,
  }), [
    editMode,
    selectedCourses,
    isPending,
    editableCourses,
    lastDragTimestamp,
    toggleEditMode,
    resetEditableCourses,
    toggleCourseSelection,
    updateEditableCourse,
  ]);

  return (
    <CoursesPageContext.Provider value={contextValue}>
      {children}
    </CoursesPageContext.Provider>
  );
}


export function useCoursesPage() {
  const context = useContext(CoursesPageContext);
  if (!context) throw new Error('useCoursesPage must be used within a CoursesPageProvider');
  return context;
}