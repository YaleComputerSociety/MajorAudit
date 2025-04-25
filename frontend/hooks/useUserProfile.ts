import { useState, useCallback, useEffect } from 'react';
import { User, StudentCourse, FYP } from '@/types/user';
import { useAuth } from '@/context/AuthProvider';
import {
  fetchUserData,
  addCourses as apiAddCourses,
  removeCourses as apiRemoveCourses,
  updateStudentCourses
} from '@/api/userApi';
import { diffStudentCourses, cloneStudentCoursesDeep } from '@/utils/studentCourseUtils';

const emptyUser: User = {
  name: '',
  netID: '',
  FYPs: [],
};

function getCurrentFYP(user: User, fypIndex: number): FYP | null {
  if (
    user.FYPs.length === 0 ||
    fypIndex < 0 ||
    fypIndex >= user.FYPs.length
  ) {
    return null;
  }
  const fyp = user.FYPs[fypIndex];
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

	getClonedStudentCourses: () => StudentCourse[];
  updateCourses: (updatedCourses: StudentCourse[]) => Promise<void>;
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

	const getClonedStudentCourses = useCallback(() => {
		return currentFYP ? cloneStudentCoursesDeep(currentFYP.studentCourses) : [];
	}, [currentFYP]);

  const updateCourses = useCallback(
    async (newCourses: StudentCourse[]) => {
      if (!currentFYP) return;

      const oldCourses = currentFYP.studentCourses;
      const { toAdd, toRemove, toUpdate } = diffStudentCourses(oldCourses, newCourses);
      const newStateCourses = [...newCourses];

      // Add new courses
			if (toAdd.length > 0) {
				const entries = toAdd.map(c => ({
					course_offering_id: c.courseOffering.id,
					term: c.term,
					result: c.result,
					status: c.status,
					sort_index: c.sort_index,
				}));

				const response = await apiAddCourses(currentFYP, entries);
				if (response.success) {
					const addedCourses = response.courses;

					// Replace placeholder objects in newStateCourses with the returned real ones
					for (let i = 0; i < newStateCourses.length; i++) {
						const c = newStateCourses[i];
						if (c.id !== -1) continue;

						const match = addedCourses.find(ac =>
							ac.courseOffering.id === c.courseOffering.id &&
							ac.term === c.term &&
							ac.result === c.result &&
							ac.status === c.status &&
							ac.sort_index === c.sort_index
						);

						if (match) {
							newStateCourses[i] = match;
						}
					}
				}
			}

      // Remove courses
      if (toRemove.length > 0) {
        await apiRemoveCourses(currentFYP, toRemove);
      }

      // Update existing courses
      if (toUpdate.length > 0) {
        await updateStudentCourses(toUpdate);
      }

      // Update local state
      setUser(prev => {
        const updatedFYPs = prev.FYPs.map(fyp =>
          fyp.id === currentFYP.id
            ? { ...fyp, studentCourses: newStateCourses }
            : fyp
        );
        return { ...prev, FYPs: updatedFYPs };
      });
    },
    [currentFYP]
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
		getClonedStudentCourses,
    updateCourses
  };
}
