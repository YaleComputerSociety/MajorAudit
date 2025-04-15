// frontend/hooks/useUserProfile.ts

import { useState, useCallback, useRef, useEffect } from 'react';
import { User, StudentCourse } from '@/types/type-user';
import { useAuth } from '@/context/AuthProvider';

const emptyUser: User = {
  name: '',
  netID: '',
  FYP: {
    studentCourses: [],
    languagePlacement: '',
    studentTermArrangement: ''
  }
};

interface UseUserProfileReturn {
  user: User;
  isLoading: boolean;
  error: string | null;
  refreshUserData: () => Promise<User | null>;
  addCourse: (termFrom: string, code: string, result: string, termTo: string) => Promise<{
    success: boolean;
    course?: StudentCourse;
    message: string;
  }>;
	removeCourse: (courseId: number) => Promise<{
		success: boolean;
		message: string;
	}>;
  validateCourse: (code: string, termFrom: string) => Promise<boolean>;
}

export function useUserProfile(): UseUserProfileReturn {
  const [user, setUser] = useState<User>(emptyUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { auth } = useAuth();
  const { loggedIn } = auth;
  
  // Use refs to track ongoing requests and last user data
  const fetchInProgressRef = useRef<boolean>(false);
  const userDataRef = useRef<User>(emptyUser);
  
  // Fetch user data with cache busting to ensure fresh data
  const fetchUserData = useCallback(async (): Promise<User | null> => {
    // Prevent duplicate fetches
    if (fetchInProgressRef.current || !loggedIn) {
      return userDataRef.current;
    }
    
    try {
      setIsLoading(true);
      fetchInProgressRef.current = true;
      
      // Clear any previous errors
      if (error) setError(null);
      
      // Add cache busting to force a fresh request
      const url = `/api/user-profile?t=${Date.now()}`;
      const response = await fetch(url, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user data');
      }
      
      const data = await response.json();
      
      if (!data.user) {
        setUser(emptyUser);
        userDataRef.current = emptyUser;
        return null;
      }
      
      // Update the ref first
      userDataRef.current = data.user;
      
      // Then update state
      setUser(data.user);
      
      return data.user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
      fetchInProgressRef.current = false;
    }
  }, [loggedIn, error]);
  
  // Public method to refresh user data
  const refreshUserData = useCallback(async (): Promise<User | null> => {
    if (loggedIn) {
      return fetchUserData();
    }
    return null;
  }, [fetchUserData, loggedIn]);
  
  // Add course with improved refresh handling
  const addCourse = useCallback(async (
    termFrom: string,
    code: string,
    result: string,
    termTo: string
  ) => {
    // Reset error state and set loading state
    if (error) setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/student-courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          term_from: termFrom,
          code,
          result,
          term_to: termTo
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add course');
      }
      
      // Wait a brief moment to ensure backend processing is complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Explicitly fetch fresh data after adding a course
      await fetchUserData();
      
      return {
        success: true,
        course: data.data,
        message: data.message || 'Course added successfully'
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error adding course:', errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserData, error]);

	const removeCourse = useCallback(async (courseId: number) => {
		// Reset error state and set loading state
		if (error) setError(null);
		setIsLoading(true);
		
		try {
			const response = await fetch(`/api/student-courses?id=${courseId}`, {
				method: 'DELETE',
			});
			
			const data = await response.json();
			
			if (!response.ok) {
				throw new Error(data.error || 'Failed to remove course');
			}
			
			// Wait a brief moment to ensure backend processing is complete
			await new Promise(resolve => setTimeout(resolve, 100));
			
			// Explicitly fetch fresh data after removing a course
			await fetchUserData();
			
			return {
				success: true,
				message: data.message || 'Course removed successfully'
			};
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
			setError(errorMessage);
			console.error('Error removing course:', errorMessage);
			return {
				success: false,
				message: errorMessage
			};
		} finally {
			setIsLoading(false);
		}
	}, [fetchUserData, error]);
  
  // Course validation
  const validateCourse = useCallback(async (code: string, termFrom: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/student-courses/validate?code=${encodeURIComponent(code)}&term=${encodeURIComponent(termFrom)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to validate course');
      }
      
      const data = await response.json();
      // Clear any previous errors if successful
      if (error) setError(null);
      return data.exists;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return false;
    }
  }, [error]);
  
  // Initial data fetch on mount or auth change
  useEffect(() => {
    let isMounted = true;
    
    if (loggedIn && !fetchInProgressRef.current) {
      fetchUserData().then(result => {
        // Only update state if component is still mounted
        if (isMounted && result) {
          // State updates are already handled in fetchUserData
        }
      });
    } else if (!loggedIn && isMounted) {
      setUser(emptyUser);
      userDataRef.current = emptyUser;
    }
    
    return () => {
      isMounted = false;
    };
  }, [loggedIn, fetchUserData]);
  
  return {
    user,
    isLoading,
    error,
    refreshUserData,
    addCourse,
		removeCourse,
    validateCourse
  };
}