"use client";
import { createContext, useContext } from "react";
import { User, StudentCourse, FYP } from "@/types/type-user";
import { useUserProfile } from "@/hooks/useUserProfile";

interface UserContextType {
  user: User;
  isLoading: boolean;
  error: string | null;

  refreshUserData: () => Promise<User | null>;

  currentFYP: FYP | null;
  availableFYPs: FYP[];
  setCurrentFYPIndex: (index: number) => void;

  addCourses: (
    entries: {
      term_from: string;
      code: string;
      result: string;
      term_to: string;
    }[]
  ) => Promise<{
    success: boolean;
    courses: StudentCourse[];
    errors: { entry: any; message: string }[];
  }>;

  removeCourses: (
    courseIds: number[]
  ) => Promise<{
    success: boolean;
    removed: number[];
    errors: { id: number; message: string }[];
  }>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
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
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
