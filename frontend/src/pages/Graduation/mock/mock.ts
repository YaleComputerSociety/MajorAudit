
import { Course, ClassLists } from "../../../commons/types";

export const EXONE: Course = {
  code: "HUMS 401",
  seasons: ["FALL", "SPRING"],
  status: "COMPLETED",
  distributions: ["L"],
}

export const EXABC: ClassLists = {
  clHu: [EXONE],
  clSo: [EXONE, EXONE],
  clSc: [],
  clQR: [EXONE, EXONE],
  clWR: [EXONE],
  clL:  [EXONE, EXONE],
}
