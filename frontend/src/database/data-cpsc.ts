

import { DegreeConfiguration, TypeOneRequirement, TypeOneSubrequirement } from "@/types/type-program";


const CPSC_201: TypeOneSubrequirement = {
	requirement_name: "INTRO",
	requirement_description: "",
	must_choose_n_courses: 1,
	courses: [{ codes: ["CPSC 201"], title: "Introduction To Computer Science", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }],
	any: true,
}

const CPSC_202: TypeOneSubrequirement = {
	requirement_name: "MATH",
	requirement_description: "",
	must_choose_n_courses: 1,
	courses: [
		{ codes: ["CPSC 202"], title: "Math Tools For Computer Scientists", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] },
		{ codes: ["MATH 244"], title: "Discrete Mathematics", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] },
	],
	any: true,
}

const CPSC_223: TypeOneSubrequirement = {
	requirement_name: "DATA STRUCTURES",
	requirement_description: "",
	must_choose_n_courses: 1,
	courses: [{ codes: ["CPSC 223"], title: "Data Structures", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }],
}

const CPSC_323: TypeOneSubrequirement = {
	requirement_name: "SYSTEMS",
	requirement_description: "",
	must_choose_n_courses: 1,
	courses: [{ codes: ["CPSC 323"], title: "Systems", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }],
}

const CPSC_365: TypeOneSubrequirement = {
	requirement_name: "ALGORITHMS",
	requirement_description: "",
	must_choose_n_courses: 1,
	courses: [
		{ codes: ["CPSC 365"], title: "Algorithms", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] },
		{ codes: ["CPSC 366"], title: "Intensive Algorithms", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] },
	],
}

const CPSC_CORE: TypeOneRequirement = {
	requirement_name: "CORE",
	requirement_description: "",
	must_choose_n_subrequirements: 5,
	subrequirements: [CPSC_201, CPSC_202, CPSC_223, CPSC_323, CPSC_365]
}

const CPSC_ELEC: TypeOneSubrequirement = {
	requirement_name: "",
	requirement_description: "",
	must_choose_n_courses: 1,
	courses: [],
	elective_range: { department: "CPSC", min_code: 300, max_code: 999 }
}

const CPSC_ELECTIVE: TypeOneRequirement = {
	requirement_name: "ELECTIVES",
	requirement_description: "",
	must_choose_n_subrequirements: 4,
	subrequirements: [CPSC_ELEC, CPSC_ELEC, CPSC_ELEC, CPSC_ELEC]
}

const CPSC_SENIOR_CLASS: TypeOneSubrequirement = {
	requirement_name: "",
	requirement_description: "",
	must_choose_n_courses: 1,
	courses: [{ codes: ["CPSC 490"], title: "Systems", credit: 1, dist: ["QR"], seasons: ["Fall", "Spring"] }],
}

const CPSC_SENIOR: TypeOneRequirement = {
	requirement_name: "SENIOR",
	requirement_description: "",
	must_choose_n_subrequirements: 1,
	subrequirements: [CPSC_SENIOR_CLASS]
}

export const CPSC_CONFIG: DegreeConfiguration = {
	degreeRequirements: [CPSC_CORE, CPSC_ELECTIVE, CPSC_SENIOR]
}