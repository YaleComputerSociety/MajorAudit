// UPDATED: frontend/hooks/useUserProfile.ts

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
} from '@/api/userApi';
import {
  getCurrentFYP,
  emptyUser,
} from './useUserProfileUtils';

import { updateStudentCourse } from '@/api/userApi'; // import it

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
  ) => Promise<{ success: boolean; removed: number[]; errors: { id: number; message: string }[] }>;

	toggleCourseHidden: (courseId: number, hidden: boolean) => void;
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
	
			// Fire-and-forget backend patch
			updateStudentCourse(courseId, { is_hidden: hidden }).catch(() => {
				// Optional: revert on error, but you can skip this
			});
		},
		[currentFYP?.id]
	);

  const availableFYPs = user.FYPs ?? [];

  useEffect(() => {
    const fyp = getCurrentFYP(user, activeFYPIndex);
    setCurrentFYP(fyp);
  }, [user, activeFYPIndex]);

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
		toggleCourseHidden
  };
}
