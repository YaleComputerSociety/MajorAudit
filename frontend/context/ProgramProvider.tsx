
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ProgramDict } from "@/types/type-program";

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

const DB_NAME = "programsDB";
const STORE_NAME = "programs";
const DB_VERSION = 1;
const KEY = "programDict";

const ProgramContext = createContext<ProgramContextType | null>(null);

export function ProgramProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [baseProgDict, setBaseProgDict] = useState<ProgramDict>({});
  const [progDict, setProgDict] = useState<ProgramDict>({});
  const [error, setError] = useState<string | null>(null);
  const [dbReady, setDbReady] = useState(false);
  const [db, setDb] = useState<IDBDatabase | null>(null);

  // Initialize IndexedDB
  useEffect(() => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      setDb(database);
      setDbReady(true);
    };

    request.onerror = (event) => {
      console.error("IndexedDB error:", (event.target as IDBOpenDBRequest).error);
      setError("Failed to initialize database");
      setDbReady(true); // Still set ready so we can fall back to API
    };

    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  // Save to IndexedDB
  const saveToIndexedDB = useCallback(
    (data: ProgramDict) => {
      if (!db) return Promise.reject("Database not initialized");

      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        
        // Store data with timestamp
        const dataWithMeta = {
          data: data,
          timestamp: Date.now()
        };
        
        const request = store.put(dataWithMeta, KEY);

        request.onsuccess = () => resolve();
        request.onerror = () => reject("Error saving to IndexedDB");
      });
    },
    [db]
  );

  // Get from IndexedDB
  const getFromIndexedDB = useCallback((): Promise<{ data: ProgramDict, timestamp: number } | null> => {
    if (!db) return Promise.reject("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(KEY);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject("Error retrieving from IndexedDB");
    });
  }, [db]);

  // Fetch data from API and update cache
  const fetchFromAPI = useCallback(async (): Promise<ProgramDict> => {
    const response = await fetch('/api/programs');
    if (!response.ok) throw new Error('Failed to fetch programs.');
    const fetchedData = await response.json();
    
    // Store in IndexedDB for future use
    if (db) {
      try {
        await saveToIndexedDB(fetchedData);
      } catch (err) {
        console.warn("Failed to save to IndexedDB", err);
      }
    }
    
    return fetchedData;
  }, [db, saveToIndexedDB]);

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

  // Load programs - either from IndexedDB or API
  useEffect(() => {
    async function loadPrograms() {
      if (!dbReady) return;
      
      setIsLoading(true);
      
      try {
        // Try to get from IndexedDB first
        if (db) {
          try {
            const cachedResult = await getFromIndexedDB();
            if (cachedResult && cachedResult.data && Object.keys(cachedResult.data).length > 0) {
              setBaseProgDict(JSON.parse(JSON.stringify(cachedResult.data)));
              setProgDict(JSON.parse(JSON.stringify(cachedResult.data)));
              setIsLoading(false);
              return;
            }
          } catch (err) {
            console.warn("Failed to retrieve from IndexedDB, falling back to API", err);
            // Continue to API fetch if IndexedDB retrieval fails
          }
        }

        // If we get here, either no cached data or IndexedDB failed
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
  }, [dbReady, db, getFromIndexedDB, fetchFromAPI]);

  // Update IndexedDB when progDict changes
  useEffect(() => {
    if (!isLoading && db && Object.keys(progDict).length > 0) {
      saveToIndexedDB(progDict).catch(err => {
        console.error("Failed to update IndexedDB with new program data:", err);
      });
    }
  }, [progDict, isLoading, db, saveToIndexedDB]);

  // Deep clone when resetting to base.
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
