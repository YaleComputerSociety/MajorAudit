
import { MajorsIndex } from "@/types/type-program";
import { Course, User, StudentConc } from "@/types/type-user";
import { ConcentrationSubrequirement } from "@/types/type-program";

export function getStudentConcentration(
	user: User, 
	majorsIndex: MajorsIndex
): StudentConc | undefined {
  return user.FYP.decl_list.find(
    (sc) => 
      sc.conc_majors_index.prog === majorsIndex.prog &&
      sc.conc_majors_index.deg === majorsIndex.deg &&
      sc.conc_majors_index.conc === majorsIndex.conc
  );
}

function updateUserWithNewSubreq(
  prevUser: User,
  majorsIndex: MajorsIndex,
  reqIndex: number,
  subreqIndex: number,
  updatedSubreq: ConcentrationSubrequirement
): User {
  const matchingConc = getStudentConcentration(prevUser, majorsIndex);
  if (!matchingConc) return prevUser;

  return {
    ...prevUser,
    FYP: {
      ...prevUser.FYP,
      decl_list: prevUser.FYP.decl_list.map((studentConc) =>
        studentConc === matchingConc
          ? {
              ...studentConc,
              user_conc: {
                ...studentConc.user_conc,
                conc_reqs: studentConc.user_conc.conc_reqs.map((req, idx) =>
                  idx === reqIndex
                    ? {
                        ...req,
                        subreqs_list: req.subreqs_list.map((subreq, sidx) =>
                          sidx === subreqIndex ? updatedSubreq : subreq
                        ),
                      }
                    : req
                ),
              },
            }
          : studentConc
      ),
    },
  };
}

export function addCourseInSubreq(
  setUser: Function, 
  majorsIndex: MajorsIndex,
  reqIndex: number,
  subreqIndex: number,
  courseCode: string
){
  setUser((prevUser: User) => {
    const userConc = getStudentConcentration(prevUser, majorsIndex);
    if (!userConc) return prevUser; 

    const requirement = userConc.user_conc.conc_reqs[reqIndex];
    const subreq = requirement.subreqs_list[subreqIndex];

    const matchingStudentCourse = prevUser.FYP.studentCourses.find((sc) =>
      sc.course.codes.includes(courseCode)
    );

    if (!matchingStudentCourse) return prevUser; 

    const updatedCoursesOptions = [...subreq.courses_options];
    const firstNullIndex = updatedCoursesOptions.indexOf(null);
    if (firstNullIndex === -1) return prevUser; 

    updatedCoursesOptions[firstNullIndex] = matchingStudentCourse.course;

    return updateUserWithNewSubreq(prevUser, majorsIndex, reqIndex, subreqIndex, {
      ...subreq,
      courses_options: updatedCoursesOptions,
      student_courses_satisfying: [...subreq.student_courses_satisfying, matchingStudentCourse],
    });
  });
}

export function removeCourseInSubreq(
  setUser: Function,
  majorsIndex: MajorsIndex,
  reqIndex: number,
  subreqIndex: number,
  course: Course | null, 
  isStudentCourse?: boolean
){
  setUser((prevUser: User) => {
    const userConc = getStudentConcentration(prevUser, majorsIndex);
    if (!userConc) return prevUser; 

    const requirement = userConc.user_conc.conc_reqs[reqIndex];
    const subreq = requirement.subreqs_list[subreqIndex];

    // ✅ Remove student course
    const updatedStudentCourses = isStudentCourse
      ? subreq.student_courses_satisfying.filter((sc) => sc.course !== course)
      : subreq.student_courses_satisfying;

    // ✅ Remove the course & ensure nulls don't exceed `courses_required`
    let updatedCoursesOptions = subreq.courses_options.map((c) => (c === course ? null : c));
    const nullCount = updatedCoursesOptions.filter((c) => c === null).length;
    
    if (nullCount > subreq.courses_required) {
      updatedCoursesOptions = updatedCoursesOptions.filter((c) => c !== null);
      updatedCoursesOptions = [...updatedCoursesOptions, ...Array(subreq.courses_required).fill(null)];
    }

    return updateUserWithNewSubreq(prevUser, majorsIndex, reqIndex, subreqIndex, {
      ...subreq,
      courses_options: updatedCoursesOptions,
      student_courses_satisfying: updatedStudentCourses,
    });
  });
}

export function toggleSubreqSelection(
  setUser: Function, 
  majorsIndex: MajorsIndex, 
  reqIndex: number, 
  subreqIndex: number, 
  maxSelected: number
) {
  setUser((prevUser: User) => {
    // ✅ Find the matching concentration
    const userConc = getStudentConcentration(prevUser, majorsIndex);
    if (!userConc) return prevUser; // 🚨 Safety check

    // ✅ Create a fresh copy of selected_subreqs
    const updatedSelectedSubreqs = { ...userConc.selected_subreqs };

    // ✅ Get currently selected subreqs or default to an empty array
    const currentSelected = updatedSelectedSubreqs[reqIndex] ?? [];

    let newSelected = [...currentSelected];

    if (newSelected.includes(subreqIndex)) {
      // ✅ Remove if already selected
      newSelected = newSelected.filter((i) => i !== subreqIndex);
    } else if (newSelected.length < maxSelected) {
      // ✅ Add if under max limit
      newSelected.push(subreqIndex);
    }

    // ✅ Ensure `selected_subreqs` is always properly structured
    updatedSelectedSubreqs[reqIndex] = newSelected.length > 0 ? newSelected : [];

    // ✅ Return a fully **new** user object with updates applied
    return {
      ...prevUser,
      FYP: {
        ...prevUser.FYP,
        decl_list: prevUser.FYP.decl_list.map((studentConc) =>
          studentConc.conc_majors_index.prog === majorsIndex.prog &&
          studentConc.conc_majors_index.deg === majorsIndex.deg &&
          studentConc.conc_majors_index.conc === majorsIndex.conc
            ? {
                ...studentConc,
                selected_subreqs: updatedSelectedSubreqs, // ✅ Fully replace with new object
              }
            : studentConc
        ),
      },
    };
  });
}

