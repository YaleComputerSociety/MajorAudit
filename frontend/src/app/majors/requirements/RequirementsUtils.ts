
import { ConcentrationSubrequirement, MajorsIndex } from "@/types/type-program";
import { Course, User } from "@/types/type-user";

export function updateCourseInSubreq(
  user: User, 
  setUser: Function,
  majorsIndex: MajorsIndex,
  subreq: ConcentrationSubrequirement, 
  course: Course | null, 
  action: "add" | "remove",
  isStudentCourse?: boolean
) {
  setUser((prevUser: User) => {
    const updatedUser = { ...prevUser }; // Clone user object

    // Locate the correct program, degree, and concentration
    const program = updatedUser.FYP.prog_list[majorsIndex.prog];
    const degree = program.prog_degs[majorsIndex.deg];
    const concentration = degree.deg_concs[majorsIndex.conc];

    // Locate the requirement that contains this subrequirement
    const requirementIndex = concentration.conc_reqs.findIndex((req) =>
      req.subreqs_list.includes(subreq)
    );

    if (requirementIndex === -1) return prevUser; // Safety check

    // Create a **new** subrequirement list with modifications
    const updatedSubreqs = concentration.conc_reqs[requirementIndex].subreqs_list.map((s) => {
      if (s !== subreq) return s; // Keep other subreqs unchanged

      return {
        ...s,
        courses_options: [...s.courses_options].map((c) => (c === course ? null : c)), // Ensure a new array is created
        student_courses_satisfying: isStudentCourse
          ? [...s.student_courses_satisfying].filter((sc) => sc.course !== course) // Ensure a new array is created
          : s.student_courses_satisfying,
      };
    });

    // Create a **new** requirement list with the updated subrequirement
    const updatedConcReqs = concentration.conc_reqs.map((req, idx) =>
      idx === requirementIndex ? { ...req, subreqs_list: updatedSubreqs } : req
    );

    // Create a **new** concentration object with updated requirements
    const updatedConcentration = { ...concentration, conc_reqs: updatedConcReqs };

    // Create a **new** degree object with updated concentrations
    const updatedDegree = {
      ...degree,
      deg_concs: degree.deg_concs.map((conc, idx) =>
        idx === majorsIndex.conc ? updatedConcentration : conc
      ),
    };

    // Create a **new** program object with updated degrees
    const updatedProgram = {
      ...program,
      prog_degs: program.prog_degs.map((deg, idx) =>
        idx === majorsIndex.deg ? updatedDegree : deg
      ),
    };

    // Create a **new** user object with updated programs
    const updatedUserFinal = {
      ...updatedUser,
      FYP: {
        ...updatedUser.FYP,
        prog_list: updatedUser.FYP.prog_list.map((prog, idx) =>
          idx === majorsIndex.prog ? updatedProgram : prog
        ),
      },
    };

    return updatedUserFinal;
  });
}

