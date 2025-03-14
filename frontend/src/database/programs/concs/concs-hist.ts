import { ConcentrationRequirement, ConcentrationSubrequirement, DegreeConcentration } from "@/types/type-program";

// PRE

const PRE_REQ: ConcentrationSubrequirement = {
	subreq_name: "PRE 1800",
	subreq_desc: "",
	courses_required: 2,
	courses_options: [null, null],
	courses_elective_range: null,
	courses_any_bool: true,
	student_courses_satisfying: [],
}

const HIST_PRE: ConcentrationRequirement = {
	req_name: "PREINDUSTRIAL",
	req_desc: "",
	courses_required_count: 2,
	courses_satisfied_count: 0,
	checkbox: true,
	subreqs_list: [PRE_REQ]
}

// GLOB CORE

const GLOB_CORE_AFRICA: ConcentrationSubrequirement = {
	subreq_name: "AFRICA",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const GLOB_CORE_ASIA: ConcentrationSubrequirement = {
	subreq_name: "ASIA",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const GLOB_CORE_EURO: ConcentrationSubrequirement = {
	subreq_name: "EUROPE",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const GLOB_CORE_LA: ConcentrationSubrequirement = {
	subreq_name: "LATIN AMERICA",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const GLOB_CORE_ME: ConcentrationSubrequirement = {
	subreq_name: "MIDDLE EAST",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const GLOB_CORE_US: ConcentrationSubrequirement = {
	subreq_name: "U.S.",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const HIST_GLOB_CORE: ConcentrationRequirement = {
	req_name: "GLOBAL",
	req_desc: "",
	courses_required_count: 5,
	courses_satisfied_count: 0,
	subreqs_required_count: 5,
	subreqs_satisfied_count: 0,
	subreqs_list: [GLOB_CORE_AFRICA, GLOB_CORE_AFRICA, GLOB_CORE_EURO, GLOB_CORE_LA, GLOB_CORE_ME, GLOB_CORE_US]
}

// SPEC CORE

const SPEC_CORE_IN: ConcentrationSubrequirement = {
	subreq_name: "REGION OR PATHWAY",
	subreq_desc: "",
	courses_required: 5,
	courses_options: [null, null, null, null, null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const SPEC_CORE_OUT: ConcentrationSubrequirement = {
	subreq_name: "OUTSIDE",
	subreq_desc: "",
	courses_required: 2,
	courses_options: [null, null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const HIST_SPEC_CORE: ConcentrationRequirement = {
	req_name: "SPECIALIST",
	req_desc: "",
	courses_required_count: 7,
	courses_satisfied_count: 0,
	subreqs_required_count: 2,
	subreqs_satisfied_count: 0,
	subreqs_list: [SPEC_CORE_IN, SPEC_CORE_OUT]
}

// SEMINAR

const SEM_REQ: ConcentrationSubrequirement = {
	subreq_name: "DEPARTMENTAL",
	subreq_desc: "",
	courses_required: 2,
	courses_options: [null, null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const HIST_SEM: ConcentrationRequirement = {
	req_name: "SEMINAR",
	req_desc: "",
	courses_required_count: 2,
	courses_satisfied_count: 0,
	checkbox: true,
	subreqs_list: [SEM_REQ]
}

// GLOB ELEC 

const GLOB_ELEC_REQ: ConcentrationSubrequirement = {
	subreq_name: "",
	subreq_desc: "",
	courses_required: 5,
	courses_options: [null, null, null, null, null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const HIST_GLOB_ELEC: ConcentrationRequirement = {
	req_name: "ELECTIVE",
	req_desc: "",
	courses_required_count: 5,
	courses_satisfied_count: 0,
	subreqs_list: [GLOB_ELEC_REQ]
}

// SPEC ELEC

const SPEC_ELEC_REQ: ConcentrationSubrequirement = {
	subreq_name: "",
	subreq_desc: "",
	courses_required: 3,
	courses_options: [null, null, null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const HIST_SPEC_ELEC: ConcentrationRequirement = {
	req_name: "ELECTIVE",
	req_desc: "",
	courses_required_count: 3,
	courses_satisfied_count: 0,
	subreqs_list: [SPEC_ELEC_REQ]
}

// SENIOR

const SEN_ONE: ConcentrationSubrequirement = {
	subreq_name: "ONE TERM",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const SEN_TWO: ConcentrationSubrequirement = {
	subreq_name: "TWO TERM",
	subreq_desc: "",
	courses_required: 2,
	courses_options: [null, null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const HIST_SEN: ConcentrationRequirement = {
	req_name: "SENIOR",
	req_desc: "",
	courses_required_count: 0,
	courses_satisfied_count: 0,
	subreqs_required_count: 1,
	subreqs_satisfied_count: 0,
	subreqs_list: [SEN_ONE, SEN_TWO]
}

// EXPORT

export const CONC_HIST_BA_GLOB: DegreeConcentration = {
	user_status: 0,
	conc_name: "GLOBALIST",
	conc_desc: "",
	conc_reqs: [HIST_PRE, HIST_GLOB_CORE, HIST_SEM, HIST_GLOB_ELEC, HIST_SEN]
}

export const CONC_HIST_BA_SPEC: DegreeConcentration = {
	user_status: 0,
	conc_name: "SPECIALIST",
	conc_desc: "",
	conc_reqs: [HIST_PRE, HIST_SPEC_CORE, HIST_SEM, HIST_SPEC_ELEC, HIST_SEN]
}
