
"use client"; 
import { createContext, useContext, useState, useEffect } from "react"; 

import { createClient } from '@supabase/supabase-js';

// Initialize the client with appropriate config
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,  // Using non-null assertion
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
);

// Define context type 
interface AuthContextType {
  auth: { loggedIn: boolean; userId: string | null };
  setAuth: (auth: { loggedIn: boolean; userId: string | null }) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState({ loggedIn: false, userId: null as string | null });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    // Auth state change listener will handle state updates
    setIsLoading(false);
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
            setAuth({ loggedIn: true, userId: session.user.id });
          } else {
            setAuth({ loggedIn: false, userId: null });
          }
          setIsInitialized(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setAuth({ loggedIn: false, userId: null });
          setIsInitialized(true);
          setIsLoading(false);
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
          setAuth({ loggedIn: true, userId: session.user.id });
          setIsLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setAuth({ loggedIn: false, userId: null });
          setIsLoading(false);
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
    <AuthContext.Provider value={{ 
      auth, 
      setAuth, 
      logout, 
      isLoading
    }}>
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
