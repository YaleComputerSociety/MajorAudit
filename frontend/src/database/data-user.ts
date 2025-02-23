
import { User } from "./../types/type-user";
import { CPSC_CONFIG } from "./data-cpsc";

export const Ryan: User = {
	name: "Ryan",
	netID: "rgg32",
	onboard: false,
	FYP: {
		studentCourses: [
			{ term: 202403, status: "DA", result: "GRADE_PASS", course: { codes: ["CPSC 201"], title: "Intro To Computer Science", credit: 1, dist: ["QR"], seasons: [] } },
			{ term: 202501, status: "DA", result: "GRADE_PASS", course: { codes: ["MATH 244"], title: "Discrete Mathematics", credit: 1, dist: ["QR"], seasons: [] } },
			{ term: 202503, status: "MA", result: "IP", course: { codes: ["CPSC 223"], title: "Data Structures", credit: 1, dist: ["QR"], seasons: [] } },
		],
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



