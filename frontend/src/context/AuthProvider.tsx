
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User } from "@/types/type-user";
import { Ryan } from "@/database/data-user";
import { usePrograms } from "@/context/ProgramProvider";
import { fill } from "@/utils/preprocessing/Fill";

// Define context type
interface AuthContextType {
  auth: { loggedIn: boolean };
  setAuth: (auth: { loggedIn: boolean }) => void;
  user: User;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setProgDict, baseProgDict } = usePrograms();
  const [auth, setAuth] = useState({ loggedIn: false });
  const [user, setUser] = useState<User>(Ryan);

  // Create a stable reference to the combined reset and fill function
  const resetAndFill = useCallback(() => {
    const studentCourses = user.FYP.studentCourses;
    
    if (studentCourses.length > 0) {
      // Create a deep clone of baseProgDict
      const freshCopy = JSON.parse(JSON.stringify(baseProgDict));
      
      // Pass the fresh copy to fill - the fill function will handle the state update
      fill(studentCourses, freshCopy, setProgDict);
    }
  }, [user.FYP.studentCourses, baseProgDict, setProgDict]);

  // Set initial user data
  useEffect(() => {
    setUser(Ryan);
  }, []);

  // Update program data when courses change
  useEffect(() => {
    if (user.FYP.studentCourses.length > 0) {
      resetAndFill();
    }
  }, [user.FYP.studentCourses, resetAndFill]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
