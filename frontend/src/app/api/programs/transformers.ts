
// programs/transformers.ts
import { Option, Subrequirement, Requirement, Concentration, Degree, Program, ProgramDict } from "@/types/type-program";
import { Course } from "@/types/type-user";
import { Tables, safeArray, safeBoolean, safeNumber, safeString } from "@/types/db-helpers";

/**
 * Transforms a course database record to the frontend Course type
 */
export function transformCourse(courseData: Tables<"courses"> | null | undefined): Course | null {
  if (!courseData) return null;
  
  return {
    id: courseData.id,
    title: courseData.title,
    description: safeString(courseData.description),
    requirements: safeString(courseData.requirements),
    professors: safeArray(courseData.professors),
    distributions: safeArray(courseData.distributions),
    flags: safeArray(courseData.flags),
    credits: courseData.credits,
    term: courseData.term,
    is_colsem: safeBoolean(courseData.is_colsem),
    is_fysem: safeBoolean(courseData.is_fysem),
    is_sysem: safeBoolean(courseData.is_sysem),
    codes: safeArray(courseData.codes),
    seasons: safeArray(courseData.seasons)
  };
}

/**
 * Transforms an option database record to the frontend Option type
 */
export function transformOption(optionData: {
  option_id: number;
  option_index?: number | null;
  note?: string | null;
  option?: {
    id: number;
    option_course_id?: string | null;
    elective_range?: string | null;
    is_any_okay?: boolean | null;
    flags?: string[] | null;
    note?: string | null;
    course?: Tables<"courses"> | null;
  } | null;
}): Option {
  const option = optionData.option;
  
  return {
    option: option?.course ? transformCourse(option.course) : null,
    satisfier: null, // This is for student data
    elective_range: option?.elective_range || undefined,
    flags: option?.flags || undefined,
    is_any_okay: safeBoolean(option?.is_any_okay),
    // note: safeString(optionData.note)
  };
}

/**
 * Transforms a subrequirement database record to the frontend Subrequirement type
 */
export function transformSubrequirement(
  subrequirementData: Tables<"subrequirements"> & {
    subrequirement_options?: ({
      id: number;
      option_index?: number | null;
      note?: string | null;
      option_id: number;
      option?: {
        id: number;
        option_course_id?: string | null;
        elective_range?: string | null;
        is_any_okay?: boolean | null;
        flags?: string[] | null;
        note?: string | null;
        course?: Tables<"courses"> | null;
      } | null;
    })[] | null;
  } | null | undefined,
  index: number
): Subrequirement {
  if (!subrequirementData) {
    return {
      name: "",
      description: "",
      courses_required_count: 0,
      options: [],
      index: index
    };
  }
  
  // Sort options by option_index if available
  const options = safeArray(subrequirementData.subrequirement_options);
  const sortedOptions = [...options]
    .sort((a, b) => safeNumber(a.option_index) - safeNumber(b.option_index));
  
  return {
    name: safeString(subrequirementData.name),
    description: safeString(subrequirementData.description),
    courses_required_count: safeNumber(subrequirementData.courses_required_count),
    options: sortedOptions.map(transformOption),
    index: index
  };
}

/**
 * Transforms a requirement database record to the frontend Requirement type
 */
export function transformRequirement(
  requirementData: Tables<"requirements"> & {
    requirement_subrequirements?: ({
      id: number;
      subrequirement_index?: number | null;
      note?: string | null;
      subrequirement_id: number;
      subrequirement?: Tables<"subrequirements"> & {
        subrequirement_options?: ({
          id: number;
          option_index?: number | null;
          note?: string | null;
          option_id: number;
          option?: {
            id: number;
            option_course_id?: string | null;
            elective_range?: string | null;
            is_any_okay?: boolean | null;
            flags?: string[] | null;
            note?: string | null;
            course?: Tables<"courses"> | null;
          } | null;
        })[] | null;
      } | null;
    })[] | null;
  } | null | undefined,
  index: number
): Requirement {
  if (!requirementData) {
    return {
      name: "",
      description: "",
      courses_required_count: 0,
      subreqs_required_count: 0,
      checkbox: false,
      subrequirements: [],
      index: index
    };
  }
  
  // Get subrequirements with their indices
  const subrequirements = safeArray(requirementData.requirement_subrequirements)
    .map(rs => ({
      data: rs.subrequirement,
      index: safeNumber(rs.subrequirement_index),
      description: safeString(rs.note) // Changed from description to note
    }));
  
  // Sort by index if available
  subrequirements.sort((a, b) => a.index - b.index);
  
  return {
    name: requirementData.name,
    description: safeString(requirementData.description),
    courses_required_count: safeNumber(requirementData.courses_required_count),
    subreqs_required_count: safeNumber(requirementData.subreqs_required_count),
    checkbox: safeBoolean(requirementData.checkbox),
    // note: safeString(requirementData.note),
    subrequirements: subrequirements.map(
      (item, i) => transformSubrequirement(item.data, item.index || i)
    ),
    index: index
  };
}

/**
 * Transforms a concentration database record to the frontend Concentration type
 */
export function transformConcentration(
  concentrationData: Tables<"concentrations"> & {
    concentration_requirements?: ({
      id: number;
      requirement_index: number;
      requirement_id: number;
      note?: string | null;
      requirement?: Tables<"requirements"> & {
        requirement_subrequirements?: ({
          id: number;
          subrequirement_index?: number | null;
          note?: string | null;
          subrequirement_id: number;
          subrequirement?: Tables<"subrequirements"> & {
            subrequirement_options?: ({
              id: number;
              option_index?: number | null;
              note?: string | null;
              option_id: number;
              option?: {
                id: number;
                option_course_id?: string | null;
                elective_range?: string | null;
                is_any_okay?: boolean | null;
                flags?: string[] | null;
                note?: string | null;
                course?: Tables<"courses"> | null;
              } | null;
            })[] | null;
          } | null;
        })[] | null;
      } | null;
    })[] | null;
  } | null | undefined
): Concentration {
  if (!concentrationData) {
    return {
      name: "",
      description: "",
      requirements: []
    };
  }
  
  // Get requirements with their indices
  const requirements = safeArray(concentrationData.concentration_requirements)
    .filter(cr => cr.requirement != null)
    .map(cr => ({
      data: cr.requirement,
      index: cr.requirement_index
    }));
  
  // Sort by index if available
  requirements.sort((a, b) => a.index - b.index);
  
  return {
    name: safeString(concentrationData.name),
    description: safeString(concentrationData.description),
    // note: safeString(concentrationData.note),
    requirements: requirements.map(
      (item, i) => transformRequirement(item.data, item.index || i)
    )
  };
}

/**
 * Transforms a degree database record to the frontend Degree type
 */
export function transformDegree(
  degreeData: Tables<"degrees"> & {
    concentrations?: (Tables<"concentrations"> & {
      concentration_requirements?: ({
        id: number;
        requirement_index: number;
        requirement_id: number;
        note?: string | null;
        requirement?: Tables<"requirements"> & {
          requirement_subrequirements?: ({
            id: number;
            subrequirement_index?: number | null;
            note?: string | null;
            subrequirement_id: number;
            subrequirement?: Tables<"subrequirements"> & {
              subrequirement_options?: ({
                id: number;
                option_index?: number | null;
                note?: string | null;
                option_id: number;
                option?: {
                  id: number;
                  option_course_id?: string | null;
                  elective_range?: string | null;
                  is_any_okay?: boolean | null;
                  flags?: string[] | null;
                  note?: string | null;
                  course?: Tables<"courses"> | null;
                } | null;
              })[] | null;
            } | null;
          })[] | null;
        } | null;
      })[] | null;
    })[] | null;
  } | null | undefined
): Degree {
  if (!degreeData) {
    return {
      type: "",
      concentrations: []
    };
  }
  
  return {
    type: degreeData.type,
    // note: safeString(degreeData.note),
    concentrations: safeArray(degreeData.concentrations).map(transformConcentration)
  };
}

/**
 * Type for a fully nested program hierarchy from the database
 */
export type SupabaseProgram = Tables<"programs"> & {
  degrees?: (Tables<"degrees"> & {
    concentrations?: (Tables<"concentrations"> & {
      concentration_requirements?: (Tables<"concentration_requirements"> & {
        requirement?: Tables<"requirements"> & {
          requirement_subrequirements?: (Tables<"requirement_subrequirements"> & {
            subrequirement?: Tables<"subrequirements"> & {
              subrequirement_options?: (Tables<"subrequirement_options"> & {
                option?: (Tables<"options"> & {
                  course?: Tables<"courses"> | null
                }) | null
              })[] | null
            } | null
          })[] | null
        } | null
      })[] | null
    })[] | null
  })[] | null
};

/**
 * Transforms a program database record to the frontend Program type
 */
export function transformProgram(programData: SupabaseProgram): Program {
  return {
    name: programData.name,
    abbreviation: programData.abbreviation,
    student_count: safeNumber(programData.student_count),
    website_link: safeString(programData.website_link),
    catolog_link: safeString(programData.catalog_link), 
    degrees: safeArray(programData.degrees).map(transformDegree)
  };
}

/**
 * Creates a dictionary of programs for easier lookup
 */
export function createProgramDict(programs: Program[]): ProgramDict {
  const programDict: ProgramDict = {};
  programs.forEach(program => {
    programDict[program.abbreviation] = program;
  });
  return programDict;
}
