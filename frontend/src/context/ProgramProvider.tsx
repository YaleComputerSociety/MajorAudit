
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Program } from "@/types/type-program";

import { PROG_LIST } from "@/database/programs/data-program";

const ProgramContext = createContext<{ progList: Program[] }>({ progList: [] });

export function ProgramProvider({ children }: { children: React.ReactNode }) {
  
	const [progList, setProgList] = useState<Program[]>([]);

  useEffect(() => {
		setProgList(PROG_LIST)
	}, []); 

  return(
    <ProgramContext.Provider value={{ progList }}>
      {children}
    </ProgramContext.Provider>
  );
}

export function usePrograms() {
  return useContext(ProgramContext);
}
