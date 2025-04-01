
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { User, StudentCourse } from "@/types/type-user";
import { useAuth } from "./AuthProvider";

// Create a default empty user object
const emptyUser: User = {
  name: '',
  netID: '',
  FYP: {
    studentCourses: [],
    languagePlacement: '',
    studentTermArrangement: ''
  }
};

// Define context type
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const authContext = useAuth();
  const { loggedIn, userId } = authContext.auth;
  const [user, setUser] = useState<User>(emptyUser);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the basic user data from our API
  const fetchUserProfile = async (): Promise<User | null> => {
    try {
      const response = await fetch('/api/user');
      
      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.status}`);
      }
      
      const data = await response.json();
      return data.user || null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Fetch the student courses from our API
  const fetchStudentCourses = async (): Promise<StudentCourse[]> => {
    try {
      const response = await fetch('/api/user/courses');
      
      if (!response.ok) {
        throw new Error(`Error fetching courses: ${response.status}`);
      }
      
      const data = await response.json();
      return data.studentCourses || [];
    } catch (error) {
      console.error('Error fetching student courses:', error);
      return [];
    }
  };

  // Handle combined user data fetch
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // First get the basic user profile
      const userData = await fetchUserProfile();
      
      if (!userData) {
        setUser(emptyUser);
        return;
      }
      
      // Then fetch the student courses
      const studentCourses = await fetchStudentCourses();
      
      // Combine the data
      const completeUser: User = {
        ...userData,
        FYP: {
          ...userData.FYP,
          studentCourses
        }
      };
      
      console.log('Complete user data:', completeUser);
      setUser(completeUser);
    } catch (err) {
      console.error('Error during user data fetch process:', err);
      setUser(emptyUser);
    } finally {
      setIsLoading(false);
    }
  };

  // Public method to refresh user data
  const refreshUserData = async () => {
    if (loggedIn) {
      await fetchUserData();
    }
  };

  // Effect to fetch user data when auth changes
  useEffect(() => {
    console.log("Auth context full object:", authContext);
    console.log("Auth state detailed:", { 
      loggedIn: loggedIn, 
      userId: userId,
      typeOfLoggedIn: typeof loggedIn,
      typeOfUserId: typeof userId,
      authObject: authContext.auth 
    });
    
    if (loggedIn && userId) {
      console.log("Condition TRUE - fetching user data");
      fetchUserData();
    } else {
      console.log("Condition FALSE - using empty user");
      // Check which condition failed
      if (!loggedIn) console.log("loggedIn is falsy:", loggedIn);
      if (!userId) console.log("userId is falsy:", userId);
      setUser(emptyUser);
    }
  }, [loggedIn, userId]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isLoading,
      refreshUserData
    }}>
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
