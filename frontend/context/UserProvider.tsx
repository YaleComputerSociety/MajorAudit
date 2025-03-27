
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/type-user";
import { fetchUserProfile } from "@/app/api/user/user-service";
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

  // Handle user data fetch
  const fetchUserData = async (userId: string) => {
    setIsLoading(true);
    try {
      const userData = await fetchUserProfile(userId);
      
      if (userData) {
        console.log(userData);
        setUser(userData);
      } else {
        // If no user data found, use the empty user template
        console.log(emptyUser);
        setUser(emptyUser);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setUser(emptyUser);
    } finally {
      setIsLoading(false);
    }
  };

  // Public method to refresh user data
  const refreshUserData = async () => {
    if (userId) {
      await fetchUserData(userId);
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
			fetchUserData(userId);
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
