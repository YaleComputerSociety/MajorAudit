"use client"; 
import { createContext, useContext, useState, useEffect } from "react"; 
import { AuthChangeEvent, Session, SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Define context type 
interface AuthContextType {
  auth: { loggedIn: boolean; userId: string | null };
  setAuth: (auth: { loggedIn: boolean; userId: string | null }) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Utility for consistent, targeted logging
const debugLog = (area: string, message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Auth:${area}] ${message}`, data ? data : '');
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState({ loggedIn: false, userId: null as string | null });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  // Initialize Supabase client once in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const client = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      setSupabase(client);
      debugLog('Init', 'Browser client initialized');
    }
  }, []);

  // Function to refresh session manually
  const refreshSession = async () => {
    if (!supabase) return;
    
    setIsLoading(true);
    try {
      debugLog('Session', 'Refreshing session...');
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        debugLog('Error', 'Session refresh error', error);
        setAuth({ loggedIn: false, userId: null });
      } else if (data.session) {
        const userId = data.session.user.id;
        debugLog('Session', `User authenticated: ${userId.substring(0, 8)}...`);
        setAuth({ loggedIn: true, userId });
      } else {
        debugLog('Session', 'No active session found');
        setAuth({ loggedIn: false, userId: null });
      }
    } catch (err) {
      debugLog('Error', 'Unexpected error during refresh', err);
      setAuth({ loggedIn: false, userId: null });
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    if (!supabase) return;
    
    setIsLoading(true);
    try {
      debugLog('Auth', 'Signing out user');
      const { error } = await supabase.auth.signOut();
      if (error) {
        debugLog('Error', 'Logout error', error);
      }
      setAuth({ loggedIn: false, userId: null });
    } catch (err) {
      debugLog('Error', 'Unexpected logout error', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auth initialization effect - runs when supabase client is available
  useEffect(() => {
    if (!supabase) return;
    
    let mounted = true;
    debugLog('Init', 'Starting auth initialization');
    
    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          debugLog('Error', 'Session fetch error', error);
          if (mounted) {
            setAuth({ loggedIn: false, userId: null });
          }
        } else if (data.session?.user) {
          const userId = data.session.user.id;
          debugLog('Auth', `User authenticated: ${userId.substring(0, 8)}...`);
          if (mounted) {
            setAuth({ loggedIn: true, userId });
          }
        } else {
          debugLog('Auth', 'No active session');
          if (mounted) {
            setAuth({ loggedIn: false, userId: null });
          }
        }
        
        if (mounted) {
          setIsInitialized(true);
          setIsLoading(false);
        }
      } catch (err) {
        debugLog('Error', 'Auth initialization error', err);
        if (mounted) {
          setAuth({ loggedIn: false, userId: null });
          setIsInitialized(true);
          setIsLoading(false);
        }
      }
    };

    // Initialize auth state
    initAuth();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) return;
        
        const userId = session?.user?.id;
        debugLog('Event', `Auth state changed: ${event}${userId ? ` | ${userId.substring(0, 8)}...` : ''}`);
        
        if (event === 'SIGNED_IN' && session) {
          setAuth({ loggedIn: true, userId: session.user.id });
          setIsLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setAuth({ loggedIn: false, userId: null });
          setIsLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setAuth({ loggedIn: true, userId: session.user.id });
          setIsLoading(false);
        }
      }
    );
    
    // Cleanup function
    return () => {
      debugLog('Cleanup', 'Unmounting auth provider');
      mounted = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [supabase]); // Depend on supabase client

  // Add additional check for logged-in state after component mounts
  useEffect(() => {
    if (isInitialized && !auth.loggedIn && supabase) {
      // Double-check session after a short delay
      const timer = setTimeout(() => {
        debugLog('Check', 'Running secondary session check');
        refreshSession();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isInitialized, auth.loggedIn, supabase]);

  // Add URL pathname change detection to refresh auth
  useEffect(() => {
    if (!supabase || typeof window === 'undefined') return;
    
    const handleRouteChange = () => {
      // Check if we just came from a login or callback route
      const currentPath = window.location.pathname;
      const possibleAuthRoutes = ['/courses']; // Add other post-auth redirect pages
      
      if (possibleAuthRoutes.includes(currentPath) && !auth.loggedIn) {
        debugLog('Navigation', `Detected auth route: ${currentPath}`);
        refreshSession();
      }
    };
    
    // Run once on initial load
    handleRouteChange();
    
    // Listen for URL changes
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [supabase, auth.loggedIn]);

  return (
    <AuthContext.Provider value={{ 
      auth, 
      setAuth, 
      logout,
      refreshSession,
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