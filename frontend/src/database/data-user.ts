
import { User } from "./../types/type-user";
import { SC_CPSC_201 } from "./data-courses";
import { CONC_HIST_BA_GLOB } from "./programs/concs/concs-hist";

export const Ryan: User = {
	name: "Ryan",
	netID: "rgg32",
	onboard: false,
	FYP: {
		studentCourses: [SC_CPSC_201],
		studentTermArrangement: {
			first_year: [0, 202403, 202501],
			sophomore: [0, 202503, 202601],
			junior: [0, 202603, 202701],
			senior: [0, 202703, 202801],
		},
		languagePlacement: { language: "Spanish", level: 5 },
		decl_list: [
			{
				conc_majors_index: { prog: "HIST", deg: 0, conc: 0 }, 
				user_status: 1,
				user_conc: CONC_HIST_BA_GLOB,
				user_conc_name: "",
				selected_subreqs: {},
			}
		],
	}
}
