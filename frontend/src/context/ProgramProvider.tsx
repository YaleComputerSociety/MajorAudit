
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ProgramDict } from "@/types/type-program";

// Define context type
interface ProgramContextType {
  // progDict: ProgramDict;
  // setProgDict: (dict: ProgramDict) => void;
  // baseProgDict: ProgramDict;
  isLoading: boolean;
  // error: string | null;
  // resetToBase: () => void;
}

const ProgramContext = createContext<ProgramContextType | null>(null);

export function ProgramProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [baseProgDict, setBaseProgDict] = useState<ProgramDict>({});
  const [progDict, setProgDict] = useState<ProgramDict>({});
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchPrograms = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch('/api/programs');
  //       if (!response.ok) throw new Error('Failed to fetch programs');
        
  //       const fetchedData = await response.json();
  //       // Store as separate objects to prevent reference issues
  //       setBaseProgDict(JSON.parse(JSON.stringify(fetchedData)));
  //       setProgDict(JSON.parse(JSON.stringify(fetchedData)));
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'Unknown error');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchPrograms();
  // }, []);

  // // Deep clone when resetting to base
  // const resetToBase = useCallback(() => {
  //   setProgDict(JSON.parse(JSON.stringify(baseProgDict)));
  // }, [baseProgDict]);

  return (
    <ProgramContext.Provider value={{ 
      // progDict, 
      // setProgDict, 
      // baseProgDict,
      isLoading,
      // error,
      // resetToBase
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
