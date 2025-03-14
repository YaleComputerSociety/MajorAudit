
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
  return {
    ...prevUser,
    FYP: {
      ...prevUser.FYP,
      decl_list: prevUser.FYP.decl_list.map((studentConc) => {
        if(
          studentConc.conc_majors_index.prog === majorsIndex.prog &&
          studentConc.conc_majors_index.deg === majorsIndex.deg &&
          studentConc.conc_majors_index.conc === majorsIndex.conc
        ){
          const updatedConcReqs = studentConc.user_conc.conc_reqs.map((req, idx) =>
            idx === reqIndex
              ? { ...req, subreqs_list: req.subreqs_list.map((subreq, sidx) =>
                  sidx === subreqIndex ? updatedSubreq : subreq
                ) }
              : req
          );

          return { ...studentConc, user_conc: { ...studentConc.user_conc, conc_reqs: updatedConcReqs } };
        }
        return studentConc;
      }),
    },
  };
}

export function addCourseInSubreq(
  setUser: Function, 
  majorsIndex: MajorsIndex,
  reqIndex: number,
  subreqIndex: number,
  courseCode: string
) {
  setUser((prevUser: User) => {
    const userConc = prevUser.FYP.decl_list.find(
      (sc) => sc.conc_majors_index.prog === majorsIndex.prog &&
              sc.conc_majors_index.deg === majorsIndex.deg &&
              sc.conc_majors_index.conc === majorsIndex.conc
    );

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

    const updatedSubreq = {
      ...subreq,
      courses_options: updatedCoursesOptions,
      student_courses_satisfying: [...subreq.student_courses_satisfying, matchingStudentCourse],
    };

    return updateUserWithNewSubreq(prevUser, majorsIndex, reqIndex, subreqIndex, updatedSubreq);
  });
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
    const userConc = prevUser.FYP.decl_list.find(
      (sc) => sc.conc_majors_index.prog === majorsIndex.prog &&
              sc.conc_majors_index.deg === majorsIndex.deg &&
              sc.conc_majors_index.conc === majorsIndex.conc
    );

    if (!userConc) return prevUser; // 🚨 Safety check

    const requirement = userConc.user_conc.conc_reqs[reqIndex];
    const subreq = requirement.subreqs_list[subreqIndex];

    // ✅ Modify `courses_options`
    const updatedCoursesOptions = subreq.courses_options.map((c) => (c === course ? null : c));

    // ✅ Modify `student_courses_satisfying`
    const updatedStudentCourses = isStudentCourse
      ? subreq.student_courses_satisfying.filter((sc) => sc.course !== course)
      : subreq.student_courses_satisfying;

    // ✅ Create updated subrequirement
    const updatedSubreq = {
      ...subreq,
      courses_options: updatedCoursesOptions,
      student_courses_satisfying: updatedStudentCourses
    };

    return updateUserWithNewSubreq(prevUser, majorsIndex, reqIndex, subreqIndex, updatedSubreq);
  });
}
