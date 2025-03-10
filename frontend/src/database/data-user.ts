
import { User } from "./../types/type-user";
import { PROG_CPSC } from "./programs/data-program";

export const Ryan: User = {
	name: "Ryan",
	netID: "rgg32",
	onboard: false,
	FYP: {
		studentCourses: [],
		studentTermArrangement: {
			first_year: [0, 202403, 202501],
			sophomore: [0, 202503, 202601],
			junior: [0, 202603, 202701],
			senior: [0, 202703, 202801],
		},
		languagePlacement: { language: "Spanish", level: 5 },
		programs: [PROG_CPSC],
		declarations: [],
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



