
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { ProgramDict } from "@/types/type-program";
import { PROG_DICT } from "@/database/programs/data-program";

const ProgramContext = createContext<{ progDict: ProgramDict }>({ progDict: {} });

export function ProgramProvider({ children }: { children: React.ReactNode }) {
  
  const [progDict, setProgDict] = useState<ProgramDict>({});

  useEffect(() => {
    setProgDict(PROG_DICT);
  }, []); 

  return (
    <ProgramContext.Provider value={{ progDict }}>
      {children}
    </ProgramContext.Provider>
  );
}

export function usePrograms() {
  return useContext(ProgramContext);
}

