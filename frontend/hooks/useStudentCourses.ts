
// frontend/hooks/useStudentCourses.ts

import { useState, useCallback } from 'react';
import { StudentCourse } from '@/types/type-user';
import { AddCourseResponse, UseStudentCoursesReturn } from '@/types/hooks';
import { useUser } from '@/context/UserProvider';

export function useStudentCourses(): UseStudentCoursesReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser, refreshUserData } = useUser();
  
  // Use the courses from the user context
  const courses = user.FYP.studentCourses;

  // Create a fetchCourses function that wraps refreshUserData and returns the right type
  const fetchCourses = useCallback(async (): Promise<StudentCourse[] | null> => {
    await refreshUserData();
    return user.FYP.studentCourses;
  }, [refreshUserData, user.FYP.studentCourses]);

  // Keep the original validateCourse implementation
  const validateCourse = useCallback(async (code: string, termFrom: string): Promise<boolean> => {
    setError(null);
    
    try {
      const response = await fetch(`/api/student-courses/validate?code=${encodeURIComponent(code)}&term=${encodeURIComponent(termFrom)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to validate course');
      }
      
      const data = await response.json();
      return data.exists;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return false;
    }
  }, []);

  // Modify addCourse to update user context after successful operation
  const addCourse = useCallback(async (
    termFrom: string,
    code: string,
    result: string,
    termTo: string
  ): Promise<AddCourseResponse> => {
    setIsLoading(true);
    setError(null);
    
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
      
      // After successful API call, refresh the user data to ensure consistency
      await refreshUserData();
      
      return {
        success: true,
        course: data.data,
        message: data.message || 'Course added successfully'
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, [refreshUserData]);

  return {
    courses,
    isLoading,
    error,
    fetchCourses,
    validateCourse,
    addCourse,
  };
}
