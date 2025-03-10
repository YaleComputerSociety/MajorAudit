
import { Program } from "@/types/type-program";
import { CONC_CPSC_BA_I, CONC_CPSC_BS_I } from "./concs-cpsc";

export const PROG_CPSC: Program = {
	prog_data: {
		prog_name: "Computer Science",
		prog_abbr: "CPSC",
		prog_stud_count: 0,
		prog_dus: { dus_name: "", dus_email: "", dus_address: "" },
		prog_catolog: "",
		prog_website: ""
	},
	prog_degs: [
		{ deg_type: "B.A.", deg_concs: [CONC_CPSC_BA_I] },
		{ deg_type: "B.S.", deg_concs: [CONC_CPSC_BS_I] }
	]
}

export const PROG_ECON: Program = {
	prog_data: {
		prog_name: "Economics",
		prog_abbr: "ECON",
		prog_stud_count: 0,
		prog_dus: { dus_name: "", dus_email: "", dus_address: "" },
		prog_catolog: "",
		prog_website: ""
	},
	prog_degs: [
		{
			deg_type: "B.A.",
			deg_concs: []
		},
		{
			deg_type: "B.S.",
			deg_concs: []
		}
	]
}

export const PROG_PLSC: Program = {
	prog_data: {
		prog_name: "Political Science",
		prog_abbr: "PLSC",
		prog_stud_count: 0,
		prog_dus: { dus_name: "", dus_email: "", dus_address: "" },
		prog_catolog: "",
		prog_website: ""
	},
	prog_degs: [
		{
			deg_type: "B.A.",
			deg_concs: []
		}
	]
}

export const PROG_HIST: Program = {
	prog_data: {
		prog_name: "History",
		prog_abbr: "HIST",
		prog_stud_count: 0,
		prog_dus: { dus_name: "", dus_email: "", dus_address: "" },
		prog_catolog: "",
		prog_website: ""
	},
	prog_degs: [
		{
			deg_type: "B.A.",
			deg_concs: []
		}
	]
}
