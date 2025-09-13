
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { AuthChangeEvent, Session, SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

interface AuthContextType {
  auth: { loggedIn: boolean; userId: string | null };
  setAuth: (auth: { loggedIn: boolean; userId: string | null }) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState({ loggedIn: false, userId: null as string | null });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  // Initialize Supabase client once
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const client = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      setSupabase(client);
    }
  }, []);

  const refreshSession = async () => {
    if (!supabase) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setAuth({ loggedIn: false, userId: null });
      } else {
        setAuth({ loggedIn: true, userId: data.session.user.id });
      }
    } catch {
      setAuth({ loggedIn: false, userId: null });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!supabase) return;
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setAuth({ loggedIn: false, userId: null });
    } catch {
      // Silent fail
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize auth when supabase becomes available
  useEffect(() => {
    if (!supabase) return;

    let mounted = true;

    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
          if (mounted) setAuth({ loggedIn: false, userId: null });
        } else {
          if (mounted) setAuth({ loggedIn: true, userId: data.session.user.id });
        }
      } catch {
        if (mounted) setAuth({ loggedIn: false, userId: null });
      } finally {
        if (mounted) {
          setIsInitialized(true);
          setIsLoading(false);
        }
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) return;
        if (event === 'SIGNED_IN' && session) {
          setAuth({ loggedIn: true, userId: session.user.id });
        } else if (event === 'SIGNED_OUT') {
          setAuth({ loggedIn: false, userId: null });
        } else if (event === 'TOKEN_REFRESHED' && session) {
          setAuth({ loggedIn: true, userId: session.user.id });
        }
        setIsLoading(false);
      }
    );

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, [supabase]);

  // 🌟 Refresh session once after initialization (extra safety)
  useEffect(() => {
    if (isInitialized && !auth.loggedIn && supabase) {
      refreshSession();
    }
  }, [isInitialized, supabase, auth.loggedIn]);

  return (
    <AuthContext.Provider value={{ 
      auth, 
      setAuth, 
      logout, 
      refreshSession, 
      isLoading,
      isInitialized
    }}>
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
