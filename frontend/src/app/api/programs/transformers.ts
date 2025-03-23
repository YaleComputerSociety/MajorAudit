
// transformers.ts
import { Option, Subrequirement, Requirement, Concentration, Degree, Program, ProgramDict } from "@/types/type-program";
import { Course } from "@/types/type-user";
import { Database } from "@/types/supabase";

// Define a type for the raw Supabase program data with all its nested relationships
type SupabaseProgram = Database['public']['Tables']['programs']['Row'] & {
  degrees?: (Database['public']['Tables']['degrees']['Row'] & {
    concentrations?: (Database['public']['Tables']['concentrations']['Row'] & {
      concentration_requirements?: (Database['public']['Tables']['concentration_requirements']['Row'] & {
        requirement?: Database['public']['Tables']['requirements']['Row'] & {
          requirement_subrequirements?: (Database['public']['Tables']['requirement_subrequirements']['Row'] & {
            subrequirement?: Database['public']['Tables']['subrequirements']['Row'] & {
              subrequirement_options?: (Database['public']['Tables']['subrequirement_options']['Row'] & {
                option?: (Database['public']['Tables']['options']['Row'] & {
                  course?: Database['public']['Tables']['courses']['Row'] | null
                }) | null
              })[] | null
            } | null
          })[] | null
        } | null
      })[] | null
    })[] | null
  })[] | null
};

// Helper to handle potentially null/undefined arrays
function safeArray<T>(arr: T[] | null | undefined): T[] {
  return arr || [];
}

// Transform functions for each entity type
export function transformCourse(courseData: Database['public']['Tables']['courses']['Row'] | null | undefined): Course | null {
  if (!courseData) return null;
  
  return {
    id: courseData.id,
    title: courseData.title,
    description: courseData.description || "",
    requirements: courseData.requirements || "",
    professors: courseData.professors || [],
    distributions: courseData.distributions || [],
    flags: courseData.flags || [],
    credits: courseData.credits,
    term: courseData.term,
    is_colsem: courseData.is_colsem || false,
    is_fysem: courseData.is_fysem || false,
    is_sysem: courseData.is_sysem || false,
    codes: courseData.codes || [],
    seasons: courseData.seasons || []
  };
}

export function transformOption(optionData: {
  option_id?: number | null;
  option_index?: number | null;
  note?: string | null;
  option?: {
    id: number;
    option_course_id?: string | null;
    elective_range?: string | null;
    is_any_okay?: boolean | null;
    flags?: string | null;
    course?: Database['public']['Tables']['courses']['Row'] | null;
  } | null;
}): Option {
  const option = optionData.option;
  
  return {
    option: option?.course ? transformCourse(option.course) : null,
    satisfier: null, // This is for student data
    elective_range: option?.elective_range || undefined,
    flags: option?.flags ? option.flags.split(',').filter(Boolean) : undefined,
    is_any_okay: option?.is_any_okay || false,
    // note: optionData.note
  };
}

export function transformSubrequirement(
  subrequirementData: Database['public']['Tables']['subrequirements']['Row'] & {
    subrequirement_options?: ({
      id: number;
      option_index?: number | null;
      note?: string | null;
      option_id?: number | null;
      option?: {
        id: number;
        option_course_id?: string | null;
        elective_range?: string | null;
        is_any_okay?: boolean | null;
        flags?: string | null;
        course?: Database['public']['Tables']['courses']['Row'] | null;
      } | null;
    })[] | null;
  } | null | undefined,
  index: number
): Subrequirement {
  if (!subrequirementData) {
    // Return default subrequirement if data is missing
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
    .sort((a, b) => (a.option_index || 0) - (b.option_index || 0));
  
  return {
    name: subrequirementData.name || "",
    description: subrequirementData.description || "",
    courses_required_count: subrequirementData.courses_required_count || 0,
    options: sortedOptions.map(transformOption),
    index: index
  };
}

export function transformRequirement(
  requirementData: Database['public']['Tables']['requirements']['Row'] & {
    requirement_subrequirements?: ({
      id: number;
      subrequirement_index?: number | null;
      description?: string | null;
      subrequirement_id: number;
      subrequirement?: Database['public']['Tables']['subrequirements']['Row'] & {
        subrequirement_options?: ({
          id: number;
          option_index?: number | null;
          note?: string | null;
          option_id?: number | null;
          option?: {
            id: number;
            option_course_id?: string | null;
            elective_range?: string | null;
            is_any_okay?: boolean | null;
            flags?: string | null;
            course?: Database['public']['Tables']['courses']['Row'] | null;
          } | null;
        })[] | null;
      } | null;
    })[] | null;
  } | null | undefined,
  index: number
): Requirement {
  if (!requirementData) {
    // Return default requirement if data is missing
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
      index: rs.subrequirement_index || 0,
      description: rs.description
    }));
  
  // Sort by index if available
  subrequirements.sort((a, b) => a.index - b.index);
  
  return {
    name: requirementData.name,
    description: requirementData.description || "",
    courses_required_count: requirementData.courses_required_count || 0,
    subreqs_required_count: requirementData.subreqs_required_count || 0,
    checkbox: requirementData.checkbox || false,
    // note: requirementData.note,
    subrequirements: subrequirements.map(
      (item, i) => transformSubrequirement(item.data, item.index || i)
    ),
    index: index
  };
}

export function transformConcentration(
  concentrationData: Database['public']['Tables']['concentrations']['Row'] & {
    concentration_requirements?: ({
      id: number;
      requirement_index: number;
      requirement_id: number;
      requirement?: Database['public']['Tables']['requirements']['Row'] & {
        requirement_subrequirements?: ({
          id: number;
          subrequirement_index?: number | null;
          description?: string | null;
          subrequirement_id: number;
          subrequirement?: Database['public']['Tables']['subrequirements']['Row'] & {
            subrequirement_options?: ({
              id: number;
              option_index?: number | null;
              note?: string | null;
              option_id?: number | null;
              option?: {
                id: number;
                option_course_id?: string | null;
                elective_range?: string | null;
                is_any_okay?: boolean | null;
                flags?: string | null;
                course?: Database['public']['Tables']['courses']['Row'] | null;
              } | null;
            })[] | null;
          } | null;
        })[] | null;
      } | null;
    })[] | null;
  } | null | undefined
): Concentration {
  if (!concentrationData) {
    // Return default concentration if data is missing
    return {
      name: "",
      description: "",
      requirements: []
    };
  }
  
  // Get requirements with their indices
  const requirements = safeArray(concentrationData.concentration_requirements)
    .filter(cr => cr.requirement != null) // Filter out nulls
    .map(cr => ({
      data: cr.requirement,
      index: cr.requirement_index
    }));
  
  // Sort by index if available
  requirements.sort((a, b) => a.index - b.index);
  
  return {
    name: concentrationData.name || "",
    description: concentrationData.description || "",
    // note: concentrationData.note,
    requirements: requirements.map(
      (item, i) => transformRequirement(item.data, item.index || i)
    )
  };
}

export function transformDegree(
  degreeData: Database['public']['Tables']['degrees']['Row'] & {
    concentrations?: (Database['public']['Tables']['concentrations']['Row'] & {
      concentration_requirements?: ({
        id: number;
        requirement_index: number;
        requirement_id: number;
        requirement?: Database['public']['Tables']['requirements']['Row'] & {
          requirement_subrequirements?: ({
            id: number;
            subrequirement_index?: number | null;
            description?: string | null;
            subrequirement_id: number;
            subrequirement?: Database['public']['Tables']['subrequirements']['Row'] & {
              subrequirement_options?: ({
                id: number;
                option_index?: number | null;
                note?: string | null;
                option_id?: number | null;
                option?: {
                  id: number;
                  option_course_id?: string | null;
                  elective_range?: string | null;
                  is_any_okay?: boolean | null;
                  flags?: string | null;
                  course?: Database['public']['Tables']['courses']['Row'] | null;
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
    // Return default degree if data is missing
    return {
      type: "",
      concentrations: []
    };
  }
  
  return {
    type: degreeData.type,
    // note: degreeData.note,
    concentrations: safeArray(degreeData.concentrations).map(transformConcentration)
  };
}

export function transformProgram(programData: SupabaseProgram): Program {
  return {
    name: programData.name,
    abbreviation: programData.abbreviation,
    student_count: programData.student_count || 0,
    website_link: programData.website_link || "",
    catolog_link: programData.catalog_link || "", 
    degrees: safeArray(programData.degrees).map(transformDegree)
  };
}

export function createProgramDict(programs: Program[]): ProgramDict {
  const programDict: ProgramDict = {};
  programs.forEach(program => {
    programDict[program.abbreviation] = program;
  });
  return programDict;
}
