// frontend/context/CoursesContext.tsx

'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useTransition } from 'react';

interface CoursesPageContextType {
  editMode: boolean;
  toggleEditMode: () => void;
  selectedCourses: Set<number>;
  setSelectedCourses: React.Dispatch<React.SetStateAction<Set<number>>>;
  toggleCourseSelection: (courseId: number) => void;
  isPending: boolean;
}

const CoursesPageContext = createContext<CoursesPageContextType | undefined>(undefined);

export function CoursesPageProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = useCallback(() => setEditMode(prev => !prev), []);

  const [selectedCourses, setSelectedCourses] = useState<Set<number>>(new Set());
  const [isPending, startTransition] = useTransition();

  // Optimized function to toggle course selection
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

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    editMode,
    toggleEditMode,
    selectedCourses,
    setSelectedCourses,
    toggleCourseSelection,
    isPending
  }), [editMode, toggleEditMode, selectedCourses, setSelectedCourses, toggleCourseSelection, isPending]);

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