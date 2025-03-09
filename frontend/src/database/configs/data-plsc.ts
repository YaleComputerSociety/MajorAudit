
import { DegreeConfiguration, DegreeRequirement, DegreeSubrequirement } from "@/types/type-program";

import { ECON_108, ECON_110, ECON_111, ECON_115, ECON_116, ECON_117, ECON_121, ECON_122, ECON_123, ECON_125, ECON_126, ECON_136, MATH_110, MATH_111, MATH_112, MATH_115, MATH_116, MATH_118, MATH_120, ENAS_151 } from "../data-courses";
import { SC_ECON_110 } from "../data-studentcourses";

// INTRO

const ECON_MATH: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "MATH",
	subreq_desc: "118 or 120 recommended. Any MATH 200+ satisfies.",
	courses_required: 1,
	courses_options: [null, MATH_110, MATH_111, MATH_112, MATH_115, MATH_116, MATH_118, MATH_120, ENAS_151],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const ECON_INTRO_MICRO: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "INTRO MICRO",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [ECON_108, ECON_110, ECON_115],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [SC_ECON_110],
}

const ECON_INTRO_MACRO: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "INTRO MACRO",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [ECON_111, ECON_116],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const ECON_INTRO: DegreeRequirement = {
	req_type_id: 1,
	req_name: "INTRO",
	req_desc: "",

	courses_required_count: 3,
	courses_satisfied_count: 1,

	subreqs_list: [ECON_MATH, ECON_INTRO_MICRO, ECON_INTRO_MACRO]
}

// CORE

const ECON_CORE_MICRO: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "INTERMEDIATE MICRO",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [ECON_121, ECON_125],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const ECON_CORE_MACRO: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "INTERMEDIATE MACRO",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [ECON_122, ECON_126],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const ECON_CORE_METRICS: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "ECONOMETRICS",
	subreq_desc: "",
	courses_required: 1,
	courses_options: [ECON_117, ECON_123, ECON_136],
	courses_elective_range: null,
	courses_any_bool: false,
	student_courses_satisfying: [],
}

const ECON_CORE: DegreeRequirement = {
	req_type_id: 1,
	req_name: "CORE",
	req_desc: "",

	courses_required_count: 3,
	courses_satisfied_count: 0,

	subreqs_list: [ECON_CORE_MICRO, ECON_CORE_MACRO, ECON_CORE_METRICS]
}

// ELECTIVE

const ECON_RANGE_ELECS: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "",
	subreq_desc: "Standard elective or DUS approved extra-department substitution.",
	courses_required: 1,
	courses_options: [null],
	courses_elective_range: { dept: "CPSC", min_code: 123, max_code: 999 },
	courses_any_bool: false,
	student_courses_satisfying: []
}

const ECON_SUB_ELEC: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "",
	subreq_desc: "Intermediate or advanced ECON courses, traditionally numbered 123+.",
	courses_required: 3,
	courses_options: [null, null, null],
	courses_elective_range: { dept: "ECON", min_code: 123, max_code: 999 },
	courses_any_bool: true,
	student_courses_satisfying: []
}

const ECON_ELECTIVES: DegreeRequirement = {
	req_type_id: 1,
	req_name: "ELECTIVE",
	req_desc: "",

	courses_required_count: 4,
	courses_satisfied_count: 0,

	subreqs_list: [ECON_SUB_ELEC, ECON_RANGE_ELECS]
}

// SENIOR

const ECON_SEN_SUB: DegreeSubrequirement = {
	subreq_type_id: 1,
	subreq_name: "SENIOR REQUIREMENT",
	subreq_desc: "",
	courses_required: 2,
	courses_options: [null, null],
	courses_elective_range: { dept: "ECON", min_code: 400, max_code: 491 },
	courses_any_bool: false,
	student_courses_satisfying: []
}

const ECON_SENIOR: DegreeRequirement = {
	req_type_id: 1,
	req_name: "SENIOR",
	req_desc: "",

	courses_required_count: 2,
	courses_satisfied_count: 0,

	subreqs_list: [ECON_SEN_SUB]
}

// FINAL

export const PLSC_CONFIG: DegreeConfiguration = {
	reqs_list: [ECON_INTRO, ECON_CORE, ECON_ELECTIVES, ECON_SENIOR]
}
