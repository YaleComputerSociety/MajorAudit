
import { User, StudentConc } from "@/types/type-user";
import { Program, MajorsIndex } from "@/types/type-program";

export function toggleConcentrationPin(
  setUser: Function,
  progList: Program[],
  majorsIndex: MajorsIndex
) {
  setUser((prevUser: User) => {
    const existingConcIndex = prevUser.FYP.decl_list.findIndex(
      (sc) =>
        sc.conc_majors_index.prog === majorsIndex.prog &&
        sc.conc_majors_index.deg === majorsIndex.deg &&
        sc.conc_majors_index.conc === majorsIndex.conc
    );

    // ✅ If already pinned, remove it (unpin)
    if (existingConcIndex !== -1) {
      return {
        ...prevUser,
        FYP: {
          ...prevUser.FYP,
          decl_list: prevUser.FYP.decl_list.filter((_, idx) => idx !== existingConcIndex),
        },
      };
    }

    // ✅ Otherwise, pin it
    const newConc = progList[majorsIndex.prog].prog_degs[majorsIndex.deg].deg_concs[majorsIndex.conc];

    const newStudentConc: StudentConc = {
      conc_majors_index: majorsIndex,
      user_status: 1, // Assume 1 means pinned
      user_conc: { ...newConc }, // Clone conc so changes don't affect `progList`
      user_conc_name: newConc.conc_name,
    };

    return {
      ...prevUser,
      FYP: {
        ...prevUser.FYP,
        decl_list: [...prevUser.FYP.decl_list, newStudentConc], // Append to `decl_list`
      },
    };
  });
}
