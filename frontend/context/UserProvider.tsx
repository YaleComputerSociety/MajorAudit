// frontend/context/UserProvider.tsx

"use client";
import { createContext, useContext } from "react";
import { User, StudentCourse, FYP } from "@/types/user";
import { useUserProfile } from "@/hooks/useUserProfile";

interface UserContextType {
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