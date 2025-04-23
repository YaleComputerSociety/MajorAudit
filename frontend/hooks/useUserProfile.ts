// frontend/hooks/useUserProfile.ts (consolidated)

import {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { User, StudentCourse, FYP, CourseEntry } from '@/types/user';
import { useAuth } from '@/context/AuthProvider';
import {
  fetchUserData,
  addCourses as apiAddCourses,
  removeCourses as apiRemoveCourses,
  updateStudentCourses
} from '@/api/userApi';

// Moved from useUserProfileUtils.ts
const emptyUser: User = {
  name: '',
  netID: '',
  FYPs: [],
};

// Moved from useUserProfileUtils.ts and improved
function getCurrentFYP(user: User, fypIndex: number): FYP | null {
  console.log("🧠 getCurrentFYP recomputing:", fypIndex);
  if (
    user.FYPs.length === 0 ||
    fypIndex < 0 ||
    fypIndex >= user.FYPs.length
  ) {
    return null;
  }

  const fyp = user.FYPs[fypIndex];
  
  // Create a new reference without re-sorting - preserve the existing order
  // This avoids interfering with the sorting done in the drag handler
  return {
    ...fyp,
    studentCourses: [...fyp.studentCourses]
  };
}

interface UseUserProfileReturn {
  user: User;
  isLoading: boolean;
  error: string | null;

  refreshUserData: () => Promise<User | null>;

  currentFYP: FYP | null;
  availableFYPs: FYP[];
  setCurrentFYPIndex: (index: number) => void;

  addCourses: (
    entries: CourseEntry[]
  ) => Promise<{ 
    success: boolean; 
    courses: StudentCourse[]; 
    errors: { entry: CourseEntry; message: string }[] 
  }>;

  removeCourses: (
    courseIds: number[]
  ) => Promise<{ 
    success: boolean; 
    removed: number[]; 
    errors: { id: number; message: string }[] 
  }>;

  toggleCourseHidden: (courseId: number, hidden: boolean) => void;
  
  updateStudentCoursePosition: (updatedCourses: StudentCourse[]) => void;
}

export function useUserProfile(): UseUserProfileReturn {
  const { auth } = useAuth();
  const { loggedIn } = auth;

  const [user, setUser] = useState<User>(emptyUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeFYPIndex, setActiveFYPIndex] = useState(() => {
    const savedIndex = parseInt(localStorage.getItem('fypIndex') || '0');
    return isNaN(savedIndex) ? 0 : savedIndex;
  });

  const [currentFYP, setCurrentFYP] = useState<FYP | null>(null);

  useEffect(() => {
    localStorage.setItem('fypIndex', activeFYPIndex.toString());
  }, [activeFYPIndex]);

  const setCurrentFYPIndex = useCallback((index: number) => {
    setActiveFYPIndex(index);
  }, []);

  const refreshUserData = useCallback(async (): Promise<User | null> => {
    if (!loggedIn) return null;

    setIsLoading(true);
    setError(null);
    try {
      const fetched = await fetchUserData();
      setUser(fetched);
      return fetched;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [loggedIn]);

  const withLoading = async <T>(fn: () => Promise<T | null>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await fn();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addCourses = useCallback<UseUserProfileReturn['addCourses']>(
    async (entries) => {
      if (!currentFYP) return { success: false, courses: [], errors: entries.map(e => ({ entry: e, message: 'No active FYP' })) };

      const response = await withLoading(() => apiAddCourses(currentFYP, entries));
      if (response && response.success) {
        setUser(prev => ({
          ...prev,
          FYPs: prev.FYPs.map(fyp =>
            fyp.id === currentFYP.id
              ? { ...fyp, studentCourses: [...fyp.studentCourses, ...response.courses] }
              : fyp
          )
        }));
      }
      return response || { success: false, courses: [], errors: entries.map(e => ({ entry: e, message: 'Unexpected error' })) };
    },
    [currentFYP]
  );

  const removeCourses = useCallback<UseUserProfileReturn['removeCourses']>(
    async (courseIds) => {
      if (!currentFYP) return { success: false, removed: [], errors: courseIds.map(id => ({ id, message: 'No active FYP' })) };

      const response = await withLoading(() => apiRemoveCourses(currentFYP, courseIds));
      if (response && response.success) {
        setUser(prev => ({
          ...prev,
          FYPs: prev.FYPs.map(fyp =>
            fyp.id === currentFYP.id
              ? {
                  ...fyp,
                  studentCourses: fyp.studentCourses.filter(c => !response.removed.includes(c.id))
                }
              : fyp
          )
        }));
      }
      return response || { success: false, removed: [], errors: courseIds.map(id => ({ id, message: 'Unexpected error' })) };
    },
    [currentFYP]
  );

	const toggleCourseHidden = useCallback(
		(courseId: number, hidden: boolean) => {
			// Optimistically update local state
			setUser(prev => ({
				...prev,
				FYPs: prev.FYPs.map(fyp => {
					if (fyp.id !== currentFYP?.id) return fyp;
					return {
						...fyp,
						studentCourses: fyp.studentCourses.map(course =>
							course.id === courseId ? { ...course, is_hidden: hidden } : course
						)
					};
				})
			}));
	
			// Use batch backend update
			updateStudentCourses([{ id: courseId, is_hidden: hidden }]).catch((error) => {
				console.error("Error updating course hidden state:", error);
				// Optional: rollback UI or show error
			});
		},
		[currentFYP?.id]
	);

	const updateStudentCoursePosition = useCallback(
		async (updatedCourses: StudentCourse[]) => {
			if (!currentFYP) return;
	
			const courseUpdates = updatedCourses.map(course => ({
				id: course.id,
				sort_index: course.sort_index
			}));
	
			// Optimistically update UI
			setUser(prev => {
				const updatedFYPs = prev.FYPs.map(fyp => {
					if (fyp.id !== currentFYP.id) return fyp;
	
					const updateMap = new Map(courseUpdates.map(c => [c.id, c.sort_index]));
					const updatedStudentCourses = fyp.studentCourses.map(course => 
						updateMap.has(course.id)
							? { ...course, sort_index: updateMap.get(course.id)! }
							: course
					);
	
					return { ...fyp, studentCourses: updatedStudentCourses };
				});
	
				return { ...prev, FYPs: updatedFYPs };
			});
	
			try {
				await updateStudentCourses(courseUpdates);
			} catch (err) {
				console.error("Failed to persist course reorder:", err);
				// Optional: rollback or show error
			}
		},
		[currentFYP]
	);

  const availableFYPs = user.FYPs ?? [];

  // Recalculate current FYP when user or activeFYPIndex changes
  useEffect(() => {
    console.log("Recalculating currentFYP from user state");
    const fyp = getCurrentFYP(user, activeFYPIndex);
    setCurrentFYP(fyp);
  }, [user, activeFYPIndex]);

  // Initial data fetch
  useEffect(() => {
    if (loggedIn) refreshUserData();
    else setUser(emptyUser);
  }, [loggedIn, refreshUserData]);

  return {
    user,
    isLoading,
    error,
    refreshUserData,
    currentFYP,
    availableFYPs,
    setCurrentFYPIndex,
    addCourses,
    removeCourses,
    toggleCourseHidden,
    updateStudentCoursePosition
  };
}