
import { MajorsIndex } from "@/types/type-program";
import { Course, User } from "@/types/type-user";
import { ConcentrationSubrequirement } from "@/types/type-program";

function updateUserWithNewSubreq(
  prevUser: User,
  majorsIndex: MajorsIndex,
  reqIndex: number,
  subreqIndex: number,
  updatedSubreq: ConcentrationSubrequirement
): User {
  const updatedUser = { ...prevUser };

  // Directly access the correct structures using indices
  const program = updatedUser.FYP.prog_list[majorsIndex.prog];
  const degree = program.prog_degs[majorsIndex.deg];
  const concentration = degree.deg_concs[majorsIndex.conc];
  const requirement = concentration.conc_reqs[reqIndex];

  // ✅ Modify only the affected subrequirement
  const updatedSubreqs = [...requirement.subreqs_list];
  updatedSubreqs[subreqIndex] = updatedSubreq;

  // ✅ Modify only the affected requirement
  const updatedConcReqs = [...concentration.conc_reqs];
  updatedConcReqs[reqIndex] = { ...requirement, subreqs_list: updatedSubreqs };

  // ✅ Modify only the affected concentration
  const updatedConcentration = { ...concentration, conc_reqs: updatedConcReqs };

  // ✅ Modify only the affected degree
  const updatedDegree = {
    ...degree,
    deg_concs: degree.deg_concs.map((conc, idx) =>
      idx === majorsIndex.conc ? updatedConcentration : conc
    )
  };

  // ✅ Modify only the affected program
  const updatedProgram = {
    ...program,
    prog_degs: program.prog_degs.map((deg, idx) =>
      idx === majorsIndex.deg ? updatedDegree : deg
    )
  };

  // ✅ Modify only the affected user object
  return {
    ...updatedUser,
    FYP: {
      ...updatedUser.FYP,
      prog_list: updatedUser.FYP.prog_list.map((prog, idx) =>
        idx === majorsIndex.prog ? updatedProgram : prog
      )
    }
  };
}

export function addCourseInSubreq(
  setUser: Function, 
  majorsIndex: MajorsIndex,
  reqIndex: number,
  subreqIndex: number,
  courseCode: string
): boolean {
  setUser((prevUser: User) => {
    const program = prevUser.FYP.prog_list[majorsIndex.prog];
    const degree = program.prog_degs[majorsIndex.deg];
    const concentration = degree.deg_concs[majorsIndex.conc];
    const requirement = concentration.conc_reqs[reqIndex];
    const subreq = requirement.subreqs_list[subreqIndex];

    // ✅ Find the StudentCourse that matches the course code
    const matchingStudentCourse = prevUser.FYP.studentCourses.find((studentCourse) =>
      studentCourse.course.codes.includes(courseCode)
    );

    if (!matchingStudentCourse) return prevUser; // 🚨 No update if course doesn't exist

    // ✅ Find the first null spot in courses_options
    const updatedCoursesOptions = [...subreq.courses_options];
    const firstNullIndex = updatedCoursesOptions.indexOf(null);
    if (firstNullIndex === -1) return prevUser; // 🚨 No space available, no update

    updatedCoursesOptions[firstNullIndex] = matchingStudentCourse.course; // Replace null with new course

    // ✅ Add the StudentCourse to `student_courses_satisfying`
    const updatedStudentCourses = [...subreq.student_courses_satisfying, matchingStudentCourse];

    // ✅ Create the updated subrequirement
    const updatedSubreq = {
      ...subreq,
      courses_options: updatedCoursesOptions,
      student_courses_satisfying: updatedStudentCourses
    };

    return updateUserWithNewSubreq(prevUser, majorsIndex, reqIndex, subreqIndex, updatedSubreq);
  });

  return true; // ✅ Successfully added course
}

export function removeCourseInSubreq(
  setUser: Function,
  majorsIndex: MajorsIndex,
  reqIndex: number,
  subreqIndex: number,
  course: Course | null, 
  isStudentCourse?: boolean
) {
  setUser((prevUser: User) => {
    const program = prevUser.FYP.prog_list[majorsIndex.prog];
    const degree = program.prog_degs[majorsIndex.deg];
    const concentration = degree.deg_concs[majorsIndex.conc];
    const requirement = concentration.conc_reqs[reqIndex];
    const subreq = requirement.subreqs_list[subreqIndex];

    // ✅ Modify `courses_options` directly
    const updatedCoursesOptions = [...subreq.courses_options];
    const courseIndex = updatedCoursesOptions.indexOf(course);
    if (courseIndex !== -1) {
      updatedCoursesOptions[courseIndex] = null;
    }

    // ✅ Filter out StudentCourse if necessary
    const updatedStudentCourses = isStudentCourse
      ? subreq.student_courses_satisfying.filter((sc) => sc.course !== course)
      : subreq.student_courses_satisfying;

    // ✅ Create the updated subrequirement
    const updatedSubreq = {
      ...subreq,
      courses_options: updatedCoursesOptions,
      student_courses_satisfying: updatedStudentCourses
    };

    return updateUserWithNewSubreq(prevUser, majorsIndex, reqIndex, subreqIndex, updatedSubreq);
  });
}
