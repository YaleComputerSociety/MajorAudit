// frontend/context/UserProvider.tsx

"use client";
import { createContext, useContext } from "react";
import { User, StudentCourse } from "@/types/type-user";
import { useUserProfile } from "@/hooks/useUserProfile";

// Clean, focused context type definition
interface UserContextType {
  // Core user data
  user: User;
  isLoading: boolean;
  error: string | null;
  
  // Core operations
  refreshUserData: (includeCourses?: boolean) => Promise<User | null>;
  
  // Course-specific operations
  validateCourse: (code: string, termFrom: string) => Promise<boolean>;
  addCourse: (
    termFrom: string,
    code: string,
    result: string,
    termTo: string
  ) => Promise<{
    success: boolean;
    course?: StudentCourse;
    message: string;
  }>;
	removeCourse: (courseId: number) => Promise<{
    success: boolean;
    message: string;
  }>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  // Use our optimized hook that handles all user data management
  const userProfile = useUserProfile();
  
  return (
    <UserContext.Provider value={userProfile}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
