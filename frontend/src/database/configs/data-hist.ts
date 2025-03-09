
import { DegreeConfiguration, DegreeRequirement, DegreeSubrequirement } from "@/types/type-program";

// PRE

const HIST_PRE: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "PRE 1800",
	subreq_desc: "",
	courses_required: 2,
	courses_options: [null, null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const HIST_PREINDUSTRIAL: DegreeRequirement = {
	req_type_id: 1,
	req_name: "PREINDUSTRIAL",
	req_desc: "",

	courses_required_count: 2,
	courses_satisfied_count: 0,

	checkbox: true,
	subreqs_list: [HIST_PRE]
}

// GLOBAL

const HIST_CORE_GLOB_AFRICA: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "AFRICA",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const HIST_CORE_GLOB_ASIA: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "ASIA",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const HIST_CORE_GLOB_EUROPE: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "EUROPE",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const HIST_CORE_GLOB_LA: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "LATIN AMERICA",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const HIST_CORE_GLOB_ME: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "MIDDLE EAST",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const HIST_CORE_GLOB_US: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "U.S.",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const HIST_GLOB_CORE: DegreeRequirement = {
	req_type_id: 1,
	req_name: "GLOBAL",
	req_desc: "",

	courses_required_count: 5,
	courses_satisfied_count: 0,

	subreqs_required_count: 5,
	subreqs_satisfied_count: 0,

	subreqs_list: [HIST_CORE_GLOB_AFRICA, HIST_CORE_GLOB_ASIA, HIST_CORE_GLOB_EUROPE, HIST_CORE_GLOB_LA, HIST_CORE_GLOB_ME, HIST_CORE_GLOB_US]
}

// SEMINAR

const HIST_DEPT_SEMINAR: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "DEPARTMENTAL",
	subreq_desc: "",
	courses_required: 2,
	courses_options: [null, null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const HIST_SEMINAR: DegreeRequirement = {
	req_type_id: 1,
	req_name: "SEMINAR",
	req_desc: "",

	courses_required_count: 2,
	courses_satisfied_count: 0,

	checkbox: true,
	subreqs_list: [HIST_DEPT_SEMINAR]
}

// ELECTIVE

const HIST_ELEC_INDIV: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "",
	subreq_desc: "",
	courses_required: 5,
	courses_options: [null, null, null, null, null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const HIST_ELECTIVE: DegreeRequirement = {
	req_type_id: 1,
	req_name: "ELECTIVE",
	req_desc: "",

	courses_required_count: 5,
	courses_satisfied_count: 0,

	subreqs_list: [HIST_ELEC_INDIV]
}

// SENIOR

const ECON_SEN_ONE: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "ONE TERM",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const ECON_SEN_TWO: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "TWO TERM",
	subreq_desc: "",
	courses_required: 2,
	courses_options: [null, null],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: []
}

const ECON_SENIOR: DegreeRequirement = {
	req_type_id: 1,
	req_name: "SENIOR",
	req_desc: "",

	courses_required_count: 0,
	courses_satisfied_count: 0,

	subreqs_required_count: 1,
	subreqs_satisfied_count: 0,

	subreqs_list: [ECON_SEN_ONE, ECON_SEN_TWO]
}

// FINAL

export const HIST_CONFIG: DegreeConfiguration = {
	reqs_list: [HIST_PREINDUSTRIAL, HIST_SEMINAR, HIST_GLOB_CORE, HIST_ELECTIVE, ECON_SENIOR]
}
