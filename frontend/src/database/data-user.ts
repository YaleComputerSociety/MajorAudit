
import { User } from "./../types/type-user";
import { PROG_CPSC, PROG_ECON, PROG_HIST, PROG_PLSC } from "./programs/data-program";
import { SC_CPSC_201 } from "./data-courses";

export const Ryan: User = {
	name: "Ryan",
	netID: "rgg32",
	onboard: false,
	FYP: {
		studentCourses: [SC_CPSC_201],
		studentTermArrangement: {
			first_year: [0, 202403, 202501],
			sophomore: [0, 202503, 202601],
			junior: [0, 202603, 202701],
			senior: [0, 202703, 202801],
		},
		languagePlacement: { language: "Spanish", level: 5 },
		prog_list: [PROG_CPSC, PROG_ECON, PROG_HIST, PROG_PLSC],
		decl_list: [{ user_status: 1, majors_index: { conc: 0, deg: 0, prog: 0 } }],
	}
}

// export const NullUser: User = {
// 	name: "",
// 	netID: "",
// 	onboard: false,
// 	FYP: {
// 		studentCourses: [],
// 		studentTermArrangement: {
// 			first_year: [],
// 			sophomore: [],
// 			junior: [],
// 			senior: [],
// 		},
// 		languagePlacement: { language: "", level: 0 },
// 		degreeDeclarations: [],
// 		degreeConfigurations: [
// 			[],
// 			[],
// 			[],
// 			[]
// 		],
// 	}
// }



