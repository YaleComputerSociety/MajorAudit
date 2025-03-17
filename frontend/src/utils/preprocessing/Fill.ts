
import { StudentCourse } from "@/types/type-user";
import { ProgramDict, DegreeConcentration, ConcentrationSubrequirement } from "@/types/type-program";








export function fill(
  studentCourses: StudentCourse[],
  progDict: ProgramDict,
  setProgDict: Function
) {
  const updatedProgDict = { ...progDict };

  // Object.keys(updatedProgDict).forEach(progKey => {
  //   updatedProgDict[progKey].prog_degs = updatedProgDict[progKey].prog_degs.map(deg => ({
  //     ...deg,
  //     deg_concs: deg.deg_concs.map(conc => fillConcentration(conc, studentCourses))
  //   }));
  // });

  setProgDict(updatedProgDict);
}
