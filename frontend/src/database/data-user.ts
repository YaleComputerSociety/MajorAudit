
import { User } from "./../types/type-user";

import { CPSC_CONFIG } from "./configs/data-cpsc";
import { ECON_CONFIG } from "./configs/data-econ";
import { HIST_CONFIG } from "./configs/data-hist";
import { PLSC_CONFIG } from "./configs/data-plsc";

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
		degreeDeclarations: [],
		degreeConfigurations: [
			[HIST_CONFIG],
			[CPSC_CONFIG],
			[PLSC_CONFIG],
			[ECON_CONFIG]
		],
	}
}

export const NullUser: User = {
	name: "",
	netID: "",
	onboard: false,
	FYP: {
		studentCourses: [],
		studentTermArrangement: {
			first_year: [],
			sophomore: [],
			junior: [],
			senior: [],
		},
		languagePlacement: { language: "", level: 0 },
		degreeDeclarations: [],
		degreeConfigurations: [
			[],
			[],
			[],
			[]
		],
	}
}



