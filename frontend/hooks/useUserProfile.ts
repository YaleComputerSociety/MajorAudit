import {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { User, StudentCourse, FYP } from '@/types/type-user';
import { useAuth } from '@/context/AuthProvider';
import {
  fetchUserDataUtil,
  addCourseUtil,
  removeCourseUtil,
  getCurrentFYP,
  emptyUser,
} from './useUserProfileUtils';

interface UseUserProfileReturn {
  user: User;
  isLoading: boolean;
  error: string | null;

  refreshUserData: () => Promise<User | null>;

  currentFYP: FYP | null;
  availableFYPs: FYP[];
  setCurrentFYPIndex: (index: number) => void;

  addCourse: (
    termFrom: string,
    code: string,
    result: string,
    termTo: string
  ) => Promise<{ success: boolean; course?: StudentCourse; message: string }>;

  removeCourse: (
    courseId: number
  ) => Promise<{ success: boolean; message: string }>;
}

export function useUserProfile(): UseUserProfileReturn {
  const [user, setUser] = useState<User>(emptyUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFYPIndex, setActiveFYPIndex] = useState(0);

  const { auth } = useAuth();
  const { loggedIn } = auth;

  // Load selected FYP from localStorage
  useEffect(() => {
    const savedIndex = parseInt(localStorage.getItem('fypIndex') || '0');
    if (!isNaN(savedIndex)) setActiveFYPIndex(savedIndex);
  }, []);

  // Persist selected FYP index
  useEffect(() => {
    localStorage.setItem('fypIndex', activeFYPIndex.toString());
  }, [activeFYPIndex]);

  const setCurrentFYPIndex = useCallback((index: number) => {
    setActiveFYPIndex(index);
  }, []);

  const fetchUserData = useCallback(async (): Promise<User | null> => {
    if (!loggedIn) return null;

    try {
      setIsLoading(true);
      setError(null);
      const fetched = await fetchUserDataUtil();
      setUser(fetched);
      return fetched;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [loggedIn]);

  const refreshUserData = useCallback(() => fetchUserData(), [fetchUserData]);

  const availableFYPs = user.FYPs ?? [];

  const currentFYP = useMemo(
    () => getCurrentFYP(user, activeFYPIndex),
    [user.FYPs, activeFYPIndex]
  );

  const addCourse = useCallback(
    async (
      termFrom: string,
      code: string,
      result: string,
      termTo: string
    ) => {
      setError(null);
      setIsLoading(true);
      if (!currentFYP) return { success: false, message: 'No active FYP' };

      try {
        const response = await addCourseUtil(currentFYP, termFrom, code, result, termTo);
        if (response.success) await fetchUserData();
        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        return { success: false, message: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [currentFYP, fetchUserData]
  );

  const removeCourse = useCallback(
    async (courseId: number) => {
      setError(null);
      setIsLoading(true);
      if (!currentFYP) return { success: false, message: 'No active FYP' };

      try {
        const response = await removeCourseUtil(courseId, currentFYP);
        if (response.success) await fetchUserData();
        return response;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        return { success: false, message: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [currentFYP, fetchUserData]
  );

  useEffect(() => {
    if (loggedIn) fetchUserData();
    else setUser(emptyUser);
  }, [loggedIn, fetchUserData]);

  return {
    user,
    isLoading,
    error,
    refreshUserData,
    currentFYP,
    availableFYPs,
    setCurrentFYPIndex,
    addCourse,
    removeCourse,
  };
}
