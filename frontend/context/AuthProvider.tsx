
"use client"; 
import { createContext, useContext, useState, useEffect } from "react"; 
import { User } from "@/types/type-user"; 
import { Ryan } from "@/database/mock/data-user"; 
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client - consider moving this to a separate utility file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define context type 
interface AuthContextType {
  auth: { loggedIn: boolean };
  setAuth: (auth: { loggedIn: boolean }) => void;
  user: User;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState({ loggedIn: false });
  const [user, setUser] = useState<User>(Ryan);
  const [isInitialized, setIsInitialized] = useState(false);

  // Handle user data fetch after authentication
  const fetchUserData = async (userId: string) => {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      if (userData) {
        // Map the database user to your User type
        const appUser: User = {
          ...Ryan, // Start with default structure
          netID: userData.netid || Ryan.netID,
          name: userData.name || Ryan.name,
        };
        
        setUser(appUser);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      // Keep default user if fetch fails
    }
  };

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    // Auth state change listener will handle state updates
  };

  // Single useEffect for auth state management
  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          if (session?.user) {
            setAuth({ loggedIn: true });
            await fetchUserData(session.user.id);
          } else {
            setAuth({ loggedIn: false });
            setUser(Ryan);
          }
          setIsInitialized(true);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setAuth({ loggedIn: false });
          setUser(Ryan);
          setIsInitialized(true);
        }
      }
    };

    // Initialize auth state
    initAuth();
    
    // Set up auth state listener - only fires on auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        if (event === 'SIGNED_IN' && session) {
          setAuth({ loggedIn: true });
          await fetchUserData(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setAuth({ loggedIn: false });
          setUser(Ryan);
        }
      }
    );
    
    // Cleanup function
    return () => {
      mounted = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []); // Empty dependency array - only run once on mount

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, logout }}>
      {isInitialized ? children : <div>Loading authentication...</div>}
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
