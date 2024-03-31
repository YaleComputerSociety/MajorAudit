
import { Course, ClassLists } from "../../../commons/types";

export const EXONE: Course = {
  code: "HUMS 401",
  seasons: ["FALL", "SPRING"],
  status: "COMPLETED",
  distributions: ["L"],
}

export const EXTWO: Course = {
  code: "CGSC 274",
  seasons: ["FALL"],
  status: "COMPLETED",
  distributions: ["So", "Sc", "QR"],
}

export const EXABC: ClassLists = {
  clHu: [EXONE],
  clSo: [EXONE, EXONE],
  clSc: [],
  clQR: [EXONE, EXTWO],
  clWR: [EXONE],
  clL:  [EXONE, EXONE],
}
