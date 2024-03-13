
import { Course, ClassLists } from "../../../commons/types";

export const EXONE: Course = {
  code: "HUMS 401",
  hasCheck: true,
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
