
import { User } from "./../types/type-user";

import { SC_CPSC_201, SC_CPSC_223, SC_CPSC_323 } from "./data-studentcourses";
import { CPSC_CONFIG } from "./data-cpsc";

export const Ryan: User = {
	name: "Ryan",
	netID: "rgg32",
	onboard: false,
	FYP: {
		studentCourses: [SC_CPSC_201, SC_CPSC_223, SC_CPSC_323],
		studentTermArrangement: {
			first_year: [0, 202403, 202501],
			sophomore: [0, 202503, 202601],
			junior: [0, 202603, 202701],
			senior: [0, 202703, 202801],
		},
		languagePlacement: {
			language: "Spanish",
			level: 5,
		},
		degreeDeclarations: [],
		degreeConfigurations: [
			[CPSC_CONFIG],
			[],
			[],
			[]
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
		languagePlacement: {
			language: "",
			level: 0,
		},
		degreeDeclarations: [],
		degreeConfigurations: [
			[
			],
			[
			],
			[
			],
			[
			]
		],
	}
}



