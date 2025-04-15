
import { MajorsIndex } from "@/types/type-user";

export function initializeMajorsIndex(
  storedIndex: string | null,
  filteredProgKeys: string[]
): MajorsIndex {
  let parsedIndex: MajorsIndex = storedIndex
    ? JSON.parse(storedIndex)
    : { conc: 0, deg: 0, prog: filteredProgKeys[0] };

  if (!filteredProgKeys.includes(parsedIndex.prog)) {
    parsedIndex = { ...parsedIndex, prog: filteredProgKeys[0] };
  }

  return parsedIndex;
}

export function updateMajorsIndex(
  prev: MajorsIndex | null,
  newIndex: Partial<MajorsIndex>,
  filteredProgKeys: string[]
): MajorsIndex {
  if (!prev) return { conc: 0, deg: 0, prog: filteredProgKeys[0] || "" };

  return {
    ...prev,
    ...newIndex,
    prog: newIndex.prog !== undefined
      ? filteredProgKeys[
          (filteredProgKeys.indexOf(newIndex.prog) + filteredProgKeys.length) % filteredProgKeys.length
        ]
      : prev.prog,
    conc: newIndex.conc ?? prev.conc,
  };
}
