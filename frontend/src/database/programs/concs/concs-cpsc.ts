
import { ConcentrationSubrequirement, ConcentrationRequirement, DegreeConcentration } from "@/types/type-program";

import { CPSC_201, CPSC_202, MATH_244, CPSC_223, CPSC_323, CPSC_365, CPSC_366, CPSC_381, CPSC_490, SC_CPSC_201, SC_CPSC_223, SC_CPSC_323, SC_CPSC_381 } from "../../data-courses";

// CORE

const CORE_1: ConcentrationSubrequirement = {
	subreq_name: "INTRO",
	subreq_desc: "",
	subreq_flex: false,
	subreq_courses_req_count: 1,
	subreq_options: [
		{
			o: CPSC_201,
			s: null,
		}
	]
}

const CORE_2: ConcentrationSubrequirement = {
	subreq_name: "DISCRETE MATH",
	subreq_desc: "",
	subreq_flex: false,
	subreq_courses_req_count: 1,
	subreq_options: [
		{
			o: CPSC_202,
			s: null,
		},
		{
			o: MATH_244,
			s: null,
		},
	]
}

const CORE_3: ConcentrationSubrequirement = {
	subreq_name: "DATA STRUCTURES",
	subreq_desc: "",
	subreq_flex: false,
	subreq_courses_req_count: 1,
	subreq_options: [
		{
			o: CPSC_223,
			s: null,
		}
	]
}

const CORE_4: ConcentrationSubrequirement = {
	subreq_name: "SYSTEMS",
	subreq_desc: "",
	subreq_flex: false,
	subreq_courses_req_count: 1,
	subreq_options: [
		{
			o: CPSC_323,
			s: null,
		}
	]
}

const CORE_5: ConcentrationSubrequirement = {
	subreq_name: "ALGORITHMS",
	subreq_desc: "",
	subreq_flex: false,
	subreq_courses_req_count: 1,
	subreq_options: [
		{
			o: CPSC_365,
			s: null,
		},
		{
			o: CPSC_366,
			s: null,
		},
	]
}

const CPSC_CORE: ConcentrationRequirement = {
	req_name: "CORE",
	req_desc: "",
	courses_required_count: 5,
	subreqs_list: [CORE_1, CORE_2, CORE_3, CORE_4, CORE_5]
}

// ELECTIVE

const ELEC_MULT_BA: ConcentrationSubrequirement = {
	subreq_name: "",
	subreq_desc: "Intermediate or advanced CPSC courses, traditionally numbered 300+.",
	subreq_flex: false,
	subreq_courses_req_count: 3,
	subreq_options: [
		{ o: null, s: null, n: { e: { dept: "CPSC", min: 300, max: 999 } } },
		{ o: null, s: null, n: { e: { dept: "CPSC", min: 300, max: 999 } } },
		{ o: null, s: null, n: { e: { dept: "CPSC", min: 300, max: 999 } } },
	]
}

const ELEC_MULT_BS: ConcentrationSubrequirement = {
	subreq_name: "",
	subreq_desc: "Intermediate or advanced CPSC courses, traditionally numbered 300+.",
	subreq_flex: false,
	subreq_courses_req_count: 5,
	subreq_options: [
		{ o: null, s: null, n: { e: { dept: "CPSC", min: 300, max: 999 } } },
		{ o: null, s: null, n: { e: { dept: "CPSC", min: 300, max: 999 } } },
		{ o: null, s: null, n: { e: { dept: "CPSC", min: 300, max: 999 } } },
		{ o: null, s: null, n: { e: { dept: "CPSC", min: 300, max: 999 } } },
		{ o: null, s: null, n: { e: { dept: "CPSC", min: 300, max: 999 } } },
	]
}

const ELEC_SUB: ConcentrationSubrequirement = {
	subreq_name: "",
	subreq_desc: "Standard elective or DUS approved extra-department substitution.",
	subreq_flex: true,
	subreq_courses_req_count: 1,
	subreq_options: [
		{ o: null, s: null, n: { e: { dept: "CPSC", min: 300, max: 999 }, a: true } },
	]
}

const CPSC_BA_ELEC: ConcentrationRequirement = {
	req_name: "ELECTIVE",
	req_desc: "",
	courses_required_count: 4,
	subreqs_list: [ELEC_SUB, ELEC_MULT_BA]
}

const CPSC_BS_ELEC: ConcentrationRequirement = {
	req_name: "ELECTIVE",
	req_desc: "",
	courses_required_count: 6,
	subreqs_list: [ELEC_SUB, ELEC_MULT_BS]
}

// SENIOR

const SEN_PROJ: ConcentrationSubrequirement = {
	subreq_name: "SENIOR PROJECT",
	subreq_desc: "",
	subreq_flex: false,
	subreq_courses_req_count: 1,
	subreq_options: [
		{
			o: CPSC_490,
			s: null,
		}
	]
}

const CPSC_SENIOR: ConcentrationRequirement = {
	req_name: "SENIOR",
	req_desc: "",
	courses_required_count: 1,
	subreqs_list: [SEN_PROJ]
}

// EXPORT

export const CONC_CPSC_BA_I: DegreeConcentration = {
	user_status: 1,
	conc_name: "",
	conc_desc: "",
	conc_reqs: [CPSC_CORE, CPSC_BA_ELEC, CPSC_SENIOR]
}

export const CONC_CPSC_BS_I: DegreeConcentration = {
	user_status: 0,
	conc_name: "",
	conc_desc: "",
	conc_reqs: [CPSC_CORE, CPSC_BS_ELEC, CPSC_SENIOR]
}
