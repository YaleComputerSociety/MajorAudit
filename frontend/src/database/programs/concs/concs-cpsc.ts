
import { ConcentrationSubrequirement, ConcentrationRequirement, DegreeConcentration } from "@/types/type-program";

import { CPSC_201, CPSC_202, MATH_244, CPSC_223, CPSC_323, CPSC_365, CPSC_366, CPSC_490 } from "../../data-courses";
import { SC_CPSC_201, SC_CPSC_223, SC_CPSC_323 } from "../../data-studentcourses";

// CORE

const CORE_SUB_INTRO: ConcentrationSubrequirement = {
	subreq_name: "INTRO",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_201],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [SC_CPSC_201],
}

const CORE_SUB_MATH: ConcentrationSubrequirement = {
	subreq_name: "DISCRETE MATH",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_202, MATH_244],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const CORE_SUB_DATA: ConcentrationSubrequirement = {
	subreq_name: "DATA STRUCTURES",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_223],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [SC_CPSC_223],
}

const CORE_SUB_SYSTEMS: ConcentrationSubrequirement = {
	subreq_name: "SYSTEMS",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_323],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [SC_CPSC_323],
}

const CORE_SUB_ALGOS: ConcentrationSubrequirement = {
	subreq_name: "ALGORITHMS",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_365, CPSC_366],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const CPSC_CORE: ConcentrationRequirement = {
	req_name: "CORE",
	req_desc: "",
	courses_required_count: 5,
	courses_satisfied_count: 3,
	subreqs_list: [CORE_SUB_INTRO, CORE_SUB_MATH, CORE_SUB_DATA, CORE_SUB_SYSTEMS, CORE_SUB_ALGOS]
}

// ELECTIVE

const ELEC_MULT_BA: ConcentrationSubrequirement = {
	subreq_name: "",
	subreq_desc: "Intermediate or advanced CPSC courses, traditionally numbered 300+.",
	courses_required: 3,
	courses_options: [null, null, null],
	courses_elective_range: { dept: "CPSC", min_code: 300, max_code: 999 },
	courses_any_bool: false,
	student_courses_satisfying: []
}

const ELEC_MULT_BS: ConcentrationSubrequirement = {
	subreq_name: "",
	subreq_desc: "Intermediate or advanced CPSC courses, traditionally numbered 300+.",
	courses_required: 5,
	courses_options: [null, null, null, null, null],
	courses_elective_range: { dept: "CPSC", min_code: 300, max_code: 999 },
	courses_any_bool: false,
	student_courses_satisfying: []
}

const ELEC_SUB: ConcentrationSubrequirement = {
	subreq_name: "",
	subreq_desc: "Standard elective or DUS approved extra-department substitution.",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: { dept: "CPSC", min_code: 300, max_code: 999 },
	courses_any_bool: true,
	student_courses_satisfying: []
}

const CPSC_BA_ELEC: ConcentrationRequirement = {
	req_name: "ELECTIVE",
	req_desc: "",
	courses_required_count: 4,
	courses_satisfied_count: 0,
	subreqs_list: [ELEC_SUB, ELEC_MULT_BA]
}

const CPSC_BS_ELEC: ConcentrationRequirement = {
	req_name: "ELECTIVE",
	req_desc: "",
	courses_required_count: 6,
	courses_satisfied_count: 0,
	subreqs_list: [ELEC_SUB, ELEC_MULT_BS]
}

// SENIOR

const SEN_PROJ: ConcentrationSubrequirement = {
	subreq_name: "SENIOR PROJECT",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [CPSC_490],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const CPSC_SENIOR: ConcentrationRequirement = {
	req_name: "SENIOR",
	req_desc: "",
	courses_required_count: 1,
	courses_satisfied_count: 0,
	subreqs_list: [SEN_PROJ]
}

// EXPORT

export const CONC_CPSC_BA_I: DegreeConcentration = {
	conc_name: "",
	conc_desc: "",
	conc_reqs: [CPSC_CORE, CPSC_BA_ELEC, CPSC_SENIOR]
}

export const CONC_CPSC_BS_I: DegreeConcentration = {
	conc_name: "",
	conc_desc: "",
	conc_reqs: [CPSC_CORE, CPSC_BS_ELEC, CPSC_SENIOR]
}