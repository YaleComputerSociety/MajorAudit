
"use client"; 
import { createContext, useContext, useState, useEffect } from "react"; 
import { User } from "@/types/type-user"; 
import { Ryan } from "@/database/mock/data-user"; 
// import { usePrograms } from "@/context/ProgramProvider"; 
// import { fill } from "@/utils/preprocessing/Fill";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Define context type 
interface AuthContextType {
  auth: { loggedIn: boolean };
  setAuth: (auth: { loggedIn: boolean }) => void;
  user: User;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode })
{
  // const { setProgDict, baseProgDict } = usePrograms();
  const [auth, setAuth] = useState({ loggedIn: false });
  const [user, setUser] = useState<User>(Ryan);

  // Create a stable reference to the combined reset and fill function
  // const resetAndFill = useCallback(() => {
  //   const studentCourses = user.FYP.studentCourses;
    
  //   if (studentCourses.length > 0) {
  //     // Create a deep clone of baseProgDict
  //     const freshCopy = JSON.parse(JSON.stringify(baseProgDict));
      
  //     // Pass the fresh copy to fill - the fill function will handle the state update
  //     fill(studentCourses, freshCopy, setProgDict);
  //   }
  // }, [user.FYP.studentCourses, baseProgDict, setProgDict]);

  // Check for existing Supabase session on load
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setAuth({ loggedIn: true });
        
        // Fetch user data from your database
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userData) {
          // Map the database user to your User type
          const appUser: User = {
            ...Ryan, // Start with default structure
            netID: userData.netid,
            name: userData.name,
          };
          
          setUser(appUser);
        } else {
          console.error('Error fetching user data:', error);
        }
      }
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setAuth({ loggedIn: true });
        // You would fetch user data here as well, similar to above
      } else if (event === 'SIGNED_OUT') {
        setAuth({ loggedIn: false });
        setUser(Ryan); // Reset to default user
      }
    });
    
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setAuth({ loggedIn: false });
    setUser(Ryan);
  };

  // Update program data when courses change
  // useEffect(() => {
  //   if (user.FYP.studentCourses.length > 0) {
  //     resetAndFill();
  //   }
  // }, [user.FYP.studentCourses, resetAndFill]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, logout }}>
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
