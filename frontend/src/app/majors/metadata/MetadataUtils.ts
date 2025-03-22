
// import { User, StudentConc } from "@/types/type-user";
// import { ProgramDict, MajorsIndex } from "@/types/type-program";

// export function toggleConcentrationPin(
//   setUser: Function,
//   progDict: ProgramDict,
//   majorsIndex: MajorsIndex
// ) {
//   setUser((prevUser: User) => {
//     const existingConcIndex = prevUser.FYP.decl_list.findIndex(
//       (sc) =>
//         sc.conc_majors_index.prog === majorsIndex.prog &&
//         sc.conc_majors_index.deg === majorsIndex.deg &&
//         sc.conc_majors_index.conc === majorsIndex.conc
//     );

//     if(existingConcIndex !== -1){
//       return{
//         ...prevUser,
//         FYP: {
//           ...prevUser.FYP,
//           decl_list: prevUser.FYP.decl_list.filter((_, idx) => idx !== existingConcIndex),
//         },
//       };
//     }

//     const program = progDict[majorsIndex.prog];
//     if (!program) return prevUser; 

//     const degree = program.prog_degs[majorsIndex.deg];
//     if (!degree) return prevUser; 

//     const concentration = degree.deg_concs[majorsIndex.conc];
//     if (!concentration) return prevUser; 

//     const newStudentConc: StudentConc = {
//       conc_majors_index: majorsIndex,
//       user_status: 1, 
//       user_conc: { ...concentration }, 
//       user_conc_name: concentration.conc_name,
//       selected_subreqs: {}, 
//     };

//     return{
//       ...prevUser,
//       FYP: {
//         ...prevUser.FYP,
//         decl_list: [...prevUser.FYP.decl_list, newStudentConc], 
//       },
//     };
//   });
// }
