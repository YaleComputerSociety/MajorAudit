
// frontend/context/ProgramProvider.tsx

"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ProgramDict } from "@/types/type-program";
import { useAuth } from "./AuthProvider";

// Define Context Type
interface ProgramContextType {
  progDict: ProgramDict;
  setProgDict: (dict: ProgramDict) => void;
  baseProgDict: ProgramDict;
  isLoading: boolean;
  error: string | null;
  resetToBase: () => void;
  refreshFromAPI: () => Promise<void>;
}

const ProgramContext = createContext<ProgramContextType | null>(null);

export function ProgramProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [baseProgDict, setBaseProgDict] = useState<ProgramDict>({});
  const [progDict, setProgDict] = useState<ProgramDict>({});
  const [error, setError] = useState<string | null>(null);
  const { auth } = useAuth();

  // Fetch data from API
  const fetchFromAPI = useCallback(async (): Promise<ProgramDict> => {
    const response = await fetch('/api/programs', {
      credentials: 'include' // Ensures cookies are sent with the request
    });
    if (!response.ok) throw new Error('Failed to fetch programs.');
    return await response.json();
  }, []);

  // Public method to force refresh from API
  const refreshFromAPI = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const fetchedData = await fetchFromAPI();
      
      setBaseProgDict(JSON.parse(JSON.stringify(fetchedData)));
      setProgDict(JSON.parse(JSON.stringify(fetchedData)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFromAPI]);

  // Load programs from API when component mounts or user logs in
  useEffect(() => {
    async function loadPrograms() {
      if (!auth.loggedIn) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedData = await fetchFromAPI();
        
        setBaseProgDict(JSON.parse(JSON.stringify(fetchedData)));
        setProgDict(JSON.parse(JSON.stringify(fetchedData)));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }

    loadPrograms();
  }, [auth.loggedIn, fetchFromAPI]);

  // Deep clone when resetting to base
  const resetToBase = useCallback(() => {
    setProgDict(JSON.parse(JSON.stringify(baseProgDict)));
  }, [baseProgDict]);

  return (
    <ProgramContext.Provider value={{ 
      progDict, 
      setProgDict, 
      baseProgDict,
      isLoading,
      error,
      resetToBase,
      refreshFromAPI
    }}>
      {children}
    </ProgramContext.Provider>
  );
}

export function usePrograms(): ProgramContextType {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error('usePrograms must be used within a ProgramProvider');
  }
  return context;
}
