// frontend/context/CoursesContext.tsx

'use client';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useTransition,
	useEffect
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

  toggleYearCollapsed: (yearGrade: string) => void;
  isYearCollapsed: (yearGrade: string) => boolean;
  setActiveFYPId: (fypId: number) => void;
}


const CoursesPageContext = createContext<CoursesPageContextType | undefined>(undefined);

export function CoursesPageProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<Set<number>>(new Set());
  const [editableCourses, setEditableCourses] = useState<StudentCourse[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const [lastDragTimestamp, setLastDragTimestamp] = useState(Date.now());
	const [collapsedYearsByFYP, setCollapsedYearsByFYP] = useState<Map<number, Set<string>>>(new Map());
	const [currentFYPId, setCurrentFYPId] = useState<number | null>(null);

	useEffect(() => {
    const raw = sessionStorage.getItem("collapsedYearsByFYP");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as [number, string[]][];
      const restored = new Map<number, Set<string>>();
      parsed.forEach(([fypId, years]) => {
        restored.set(fypId, new Set(years));
      });
      setCollapsedYearsByFYP(restored);
    } catch (err) {
      console.error("Failed to restore collapsed years:", err);
    }
  }, []);

	const toggleYearCollapsed = useCallback((yearGrade: string) => {
		if (currentFYPId === null) return;
	
		setCollapsedYearsByFYP(prev => {
			const updated = new Map(prev);
			const current = new Set(updated.get(currentFYPId) ?? []);
	
			if (current.has(yearGrade)) {
				current.delete(yearGrade);
			} else {
				current.add(yearGrade);
			}
	
			updated.set(currentFYPId, current); // Replace with fresh Set
	
			// 🔥 Correct: stringify the **updated**, not the old prev
			const raw = JSON.stringify(
				Array.from(updated.entries()).map(([fypId, years]) => [fypId, Array.from(years)])
			);
			sessionStorage.setItem("collapsedYearsByFYP", raw);
	
			return updated;
		});
	}, [currentFYPId]);
	
	
	const isYearCollapsed = useCallback((yearGrade: string) => {
		if (currentFYPId === null) return false;
	
		const collapsed = collapsedYearsByFYP.get(currentFYPId);
		return collapsed ? collapsed.has(yearGrade) : false;
	}, [currentFYPId, collapsedYearsByFYP]);

	const setActiveFYPId = useCallback((fypId: number) => {
		setCurrentFYPId(fypId);
	}, []);

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
		toggleYearCollapsed,
		isYearCollapsed,
		setActiveFYPId,
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
		toggleYearCollapsed,
		isYearCollapsed,
		setActiveFYPId,
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