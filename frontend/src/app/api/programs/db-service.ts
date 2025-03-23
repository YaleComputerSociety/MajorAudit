
// programs/db-service.ts
import supabase from '@/database/client'
import { Tables } from '@/types/supabase'

// Define interfaces for the hierarchical data structure
interface ProgramWithHierarchy extends Tables<"programs"> {
  degrees: DegreeWithConcentrations[];
}

interface DegreeWithConcentrations extends Tables<"degrees"> {
  concentrations: ConcentrationWithRequirements[];
}

interface ConcentrationWithRequirements extends Tables<"concentrations"> {
  concentration_requirements: ConcentrationRequirementWithDetails[];
}

interface ConcentrationRequirementWithDetails extends Tables<"concentration_requirements"> {
  requirement: RequirementWithSubrequirements | null;
}

interface RequirementWithSubrequirements extends Tables<"requirements"> {
  requirement_subrequirements: RequirementSubrequirementWithDetails[];
}

interface RequirementSubrequirementWithDetails extends Tables<"requirement_subrequirements"> {
  subrequirement: SubrequirementWithOptions | null;
}

interface SubrequirementWithOptions extends Tables<"subrequirements"> {
  subrequirement_options: SubrequirementOptionWithDetails[];
}

interface SubrequirementOptionWithDetails extends Tables<"subrequirement_options"> {
  option: OptionWithCourse | null;
}

interface OptionWithCourse extends Tables<"options"> {
  course: Tables<"courses"> | null;
}

interface PostgrestError {
  message: string;
  details: string;
  hint: string;
  code: string;
}

export async function fetchProgramHierarchy(): Promise<ProgramWithHierarchy[]> {
  // Create empty structures for null handling
  const createEmptyRequirement = (): RequirementWithSubrequirements => ({
    id: 0,
    name: '',
    description: null,
    courses_required_count: 0,
    subreqs_required_count: 0,
    checkbox: false,
    note: null,
    requirement_subrequirements: []
  });

  const createEmptySubrequirement = (): SubrequirementWithOptions => ({
    id: 0,
    name: null,
    description: null,
    courses_required_count: 0,
    note: null,
    subrequirement_options: []
  });

  try {
    // 1. Fetch programs (base level)
    const { data: programs, error: programsError } = await supabase
      .from('programs')
      .select(`
        id,
        name,
        abbreviation,
        student_count,
        website_link,
        catalog_link
      `)
    
    if (programsError || !programs) {
      console.error('Error fetching programs:', programsError)
      return []
    }

    // 2. Fetch all degrees in a single query
    const { data: allDegrees, error: degreesError } = await supabase
      .from('degrees')
      .select(`
        id, 
        type,
        note,
        program_id
      `)
    
    if (degreesError || !allDegrees) {
      console.error('Error fetching degrees:', degreesError)
      return programs.map(program => ({ ...program, degrees: [] }))
    }

    // 3. Fetch all concentrations in a single query
    const { data: allConcentrations, error: concentrationsError } = await supabase
      .from('concentrations')
      .select(`
        id,
        name,
        note,
        description,
        degree_id
      `)
    
    if (concentrationsError || !allConcentrations) {
      console.error('Error fetching concentrations:', concentrationsError)
      return programs.map(program => {
        const programDegrees = allDegrees.filter(d => d.program_id === program.id)
        return { 
          ...program, 
          degrees: programDegrees.map(degree => ({ ...degree, concentrations: [] }))
        }
      })
    }

    // 4. Fetch all concentration requirements
    const { data: allConcReqs, error: concReqsError } = await supabase
      .from('concentration_requirements')
      .select(`
        id,
        requirement_index,
        concentration_id,
        requirement_id,
        note
      `)
    
    if (concReqsError || !allConcReqs) {
      console.error('Error fetching concentration requirements:', concReqsError)
      return buildProgramsWithConcentrations(programs, allDegrees, allConcentrations, [])
    }

    // 5. Fetch all requirements
    const requirementIds = [...new Set(allConcReqs.map(cr => cr.requirement_id))]
    const { data: allRequirements, error: requirementsError } = await supabase
      .from('requirements')
      .select(`
        id,
        name,
        description,
        courses_required_count,
        subreqs_required_count,
        checkbox,
        note
      `)
      .in('id', requirementIds)
    
    if (requirementsError || !allRequirements) {
      console.error('Error fetching requirements:', requirementsError)
      return buildProgramsWithConcentrationRequirements(
        programs, allDegrees, allConcentrations, allConcReqs, []
      )
    }

    // 6. Fetch requirement subrequirements
    const { data: allReqSubreqs, error: reqSubreqsError } = await supabase
      .from('requirement_subrequirements')
      .select(`
        id,
        subrequirement_index,
        note,
        requirement_id,
        subrequirement_id
      `)
      .in('requirement_id', requirementIds)
    
    if (reqSubreqsError || !allReqSubreqs) {
      console.error('Error fetching requirement subrequirements:', reqSubreqsError)
      return buildProgramsWithRequirements(
        programs, allDegrees, allConcentrations, allConcReqs, allRequirements, []
      )
    }

    // 7. Fetch subrequirements
    const subrequirementIds = [...new Set(allReqSubreqs.map(rs => rs.subrequirement_id))]
    const { data: allSubrequirements, error: subrequirementsError } = await supabase
      .from('subrequirements')
      .select(`
        id,
        name,
        description,
        courses_required_count,
        note
      `)
      .in('id', subrequirementIds)
    
    if (subrequirementsError || !allSubrequirements) {
      console.error('Error fetching subrequirements:', subrequirementsError)
      return buildProgramsWithSubrequirements(
        programs, allDegrees, allConcentrations, allConcReqs, 
        allRequirements, allReqSubreqs, []
      )
    }

    // 8. Fetch subrequirement options
    const { data: allSubreqOptions, error: subreqOptionsError } = await supabase
      .from('subrequirement_options')
      .select(`
        id,
        option_index,
        note,
        subrequirement_id,
        option_id
      `)
      .in('subrequirement_id', subrequirementIds)
    
    if (subreqOptionsError || !allSubreqOptions) {
      console.error('Error fetching subrequirement options:', subreqOptionsError)
      return buildProgramsWithSubrequirements(
        programs, allDegrees, allConcentrations, allConcReqs, 
        allRequirements, allReqSubreqs, allSubrequirements, []
      )
    }

    // 9. Fetch options
    const optionIds = [...new Set(allSubreqOptions.map(so => so.option_id).filter(Boolean) as number[])]
    const { data: allOptions, error: optionsError } = await supabase
      .from('options')
      .select(`
        id,
        option_course_id,
        elective_range,
        is_any_okay,
        flags,
        note
      `)
      .in('id', optionIds)
    
    if (optionsError || !allOptions) {
      console.error('Error fetching options:', optionsError)
      return buildProgramsWithOptions(
        programs, allDegrees, allConcentrations, allConcReqs, 
        allRequirements, allReqSubreqs, allSubrequirements, allSubreqOptions, []
      )
    }

    // 10. Fetch courses
    const courseIds = [...new Set(allOptions.map(o => o.option_course_id).filter(Boolean) as string[])]
    
    let allCourses: Tables<"courses">[] = []
    if (courseIds.length > 0) {
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds)
      
      if (coursesError) {
        console.error('Error fetching courses:', coursesError)
      } else if (courses) {
        allCourses = courses
      }
    }

    // Now build the full hierarchy
    return buildCompleteHierarchy(
      programs, allDegrees, allConcentrations, allConcReqs, 
      allRequirements, allReqSubreqs, allSubrequirements, 
      allSubreqOptions, allOptions, allCourses
    )
  } catch (error) {
    console.error('Error fetching program hierarchy:', error)
    return []
  }
}

// Helper functions for building the hierarchy
function buildProgramsWithConcentrations(
  programs: Tables<"programs">[],
  degrees: Tables<"degrees">[],
  concentrations: Tables<"concentrations">[],
  concReqs: Tables<"concentration_requirements">[] = []
): ProgramWithHierarchy[] {
  // Helper function to create empty requirement structure
  const createEmptyRequirement = (): RequirementWithSubrequirements => ({
    id: 0,
    name: '',
    description: null,
    courses_required_count: 0,
    subreqs_required_count: 0,
    checkbox: false,
    note: null,
    requirement_subrequirements: []
  });
  return programs.map(program => {
    const programDegrees = degrees.filter(d => d.program_id === program.id)
    return {
      ...program,
      degrees: programDegrees.map(degree => {
        const degreeConcentrations = concentrations.filter(c => c.degree_id === degree.id)
        return {
          ...degree,
          concentrations: degreeConcentrations.map(concentration => ({
            ...concentration,
            concentration_requirements: concReqs
              .filter(cr => cr.concentration_id === concentration.id)
              .map(cr => ({
                ...cr,
                requirement: null
              }))
          }))
        }
      })
    }
  });
}

function buildProgramsWithConcentrationRequirements(
  programs: Tables<"programs">[],
  degrees: Tables<"degrees">[],
  concentrations: Tables<"concentrations">[],
  concReqs: Tables<"concentration_requirements">[],
  requirements: Tables<"requirements">[] = []
): ProgramWithHierarchy[] {
  return programs.map(program => {
    const programDegrees = degrees.filter(d => d.program_id === program.id)
    return {
      ...program,
      degrees: programDegrees.map(degree => {
        const degreeConcentrations = concentrations.filter(c => c.degree_id === degree.id)
        return {
          ...degree,
          concentrations: degreeConcentrations.map(concentration => ({
            ...concentration,
            concentration_requirements: concReqs
              .filter(cr => cr.concentration_id === concentration.id)
              .map(cr => ({
                ...cr,
                requirement: (() => {
                  const req = requirements.find(r => r.id === cr.requirement_id);
                  return req ? { ...req, requirement_subrequirements: [] } : null;
                })()
              }))
          }))
        }
      })
    }
  })
}

function buildProgramsWithRequirements(
  programs: Tables<"programs">[],
  degrees: Tables<"degrees">[],
  concentrations: Tables<"concentrations">[],
  concReqs: Tables<"concentration_requirements">[],
  requirements: Tables<"requirements">[],
  reqSubreqs: Tables<"requirement_subrequirements">[] = []
): ProgramWithHierarchy[] {
  return programs.map(program => {
    const programDegrees = degrees.filter(d => d.program_id === program.id)
    return {
      ...program,
      degrees: programDegrees.map(degree => {
        const degreeConcentrations = concentrations.filter(c => c.degree_id === degree.id)
        return {
          ...degree,
          concentrations: degreeConcentrations.map(concentration => ({
            ...concentration,
            concentration_requirements: concReqs
              .filter(cr => cr.concentration_id === concentration.id)
              .map(cr => {
                const requirement = requirements.find(r => r.id === cr.requirement_id)
                if (!requirement) return { ...cr, requirement: null }
                
                return {
                  ...cr,
                  requirement: {
                    ...requirement,
                    requirement_subrequirements: reqSubreqs
                      .filter(rs => rs.requirement_id === requirement.id)
                      .map(rs => ({
                        ...rs,
                        subrequirement: null
                      }))
                  }
                }
              })
          }))
        }
      })
    }
  })
}

// Apply the same pattern to all other builder functions
function buildProgramsWithSubrequirements(
  programs: Tables<"programs">[],
  degrees: Tables<"degrees">[],
  concentrations: Tables<"concentrations">[],
  concReqs: Tables<"concentration_requirements">[],
  requirements: Tables<"requirements">[],
  reqSubreqs: Tables<"requirement_subrequirements">[],
  subrequirements: Tables<"subrequirements">[] = [],
  subreqOptions: Tables<"subrequirement_options">[] = []
): ProgramWithHierarchy[] {
  return programs.map(program => {
    const programDegrees = degrees.filter(d => d.program_id === program.id)
    return {
      ...program,
      degrees: programDegrees.map(degree => {
        const degreeConcentrations = concentrations.filter(c => c.degree_id === degree.id)
        return {
          ...degree,
          concentrations: degreeConcentrations.map(concentration => ({
            ...concentration,
            concentration_requirements: concReqs
              .filter(cr => cr.concentration_id === concentration.id)
              .map(cr => {
                const requirement = requirements.find(r => r.id === cr.requirement_id)
                if (!requirement) return { ...cr, requirement: null }
                
                return {
                  ...cr,
                  requirement: {
                    ...requirement,
                    requirement_subrequirements: reqSubreqs
                      .filter(rs => rs.requirement_id === requirement.id)
                      .map(rs => {
                        const subreq = subrequirements.find(s => s.id === rs.subrequirement_id)
                        if (!subreq) return { ...rs, subrequirement: null }
                        
                        return {
                          ...rs,
                          subrequirement: {
                            ...subreq,
                            subrequirement_options: subreqOptions
                              .filter(so => so.subrequirement_id === subreq.id)
                              .map(so => ({
                                ...so,
                                option: null
                              }))
                          }
                        }
                      })
                  }
                }
              })
          }))
        }
      })
    }
  })
}

function buildProgramsWithOptions(
  programs: Tables<"programs">[],
  degrees: Tables<"degrees">[],
  concentrations: Tables<"concentrations">[],
  concReqs: Tables<"concentration_requirements">[],
  requirements: Tables<"requirements">[],
  reqSubreqs: Tables<"requirement_subrequirements">[],
  subrequirements: Tables<"subrequirements">[],
  subreqOptions: Tables<"subrequirement_options">[],
  options: Tables<"options">[] = []
): ProgramWithHierarchy[] {
  return programs.map(program => {
    const programDegrees = degrees.filter(d => d.program_id === program.id)
    return {
      ...program,
      degrees: programDegrees.map(degree => {
        const degreeConcentrations = concentrations.filter(c => c.degree_id === degree.id)
        return {
          ...degree,
          concentrations: degreeConcentrations.map(concentration => ({
            ...concentration,
            concentration_requirements: concReqs
              .filter(cr => cr.concentration_id === concentration.id)
              .map(cr => {
                const requirement = requirements.find(r => r.id === cr.requirement_id)
                if (!requirement) return { ...cr, requirement: null }
                
                return {
                  ...cr,
                  requirement: {
                    ...requirement,
                    requirement_subrequirements: reqSubreqs
                      .filter(rs => rs.requirement_id === requirement.id)
                      .map(rs => {
                        const subreq = subrequirements.find(s => s.id === rs.subrequirement_id)
                        if (!subreq) return { ...rs, subrequirement: null }
                        
                        return {
                          ...rs,
                          subrequirement: {
                            ...subreq,
                            subrequirement_options: subreqOptions
                              .filter(so => so.subrequirement_id === subreq.id)
                              .map(so => {
                                const option = options.find(o => o.id === so.option_id)
                                return {
                                  ...so,
                                  option: option ? { ...option, course: null } : null
                                }
                              })
                          }
                        }
                      })
                  }
                }
              })
          }))
        }
      })
    }
  })
}

function buildCompleteHierarchy(
  programs: Tables<"programs">[],
  degrees: Tables<"degrees">[],
  concentrations: Tables<"concentrations">[],
  concReqs: Tables<"concentration_requirements">[],
  requirements: Tables<"requirements">[],
  reqSubreqs: Tables<"requirement_subrequirements">[],
  subrequirements: Tables<"subrequirements">[],
  subreqOptions: Tables<"subrequirement_options">[],
  options: Tables<"options">[],
  courses: Tables<"courses">[]
): ProgramWithHierarchy[] {
  return programs.map(program => {
    const programDegrees = degrees.filter(d => d.program_id === program.id)
    return {
      ...program,
      degrees: programDegrees.map(degree => {
        const degreeConcentrations = concentrations.filter(c => c.degree_id === degree.id)
        return {
          ...degree,
          concentrations: degreeConcentrations.map(concentration => ({
            ...concentration,
            concentration_requirements: concReqs
              .filter(cr => cr.concentration_id === concentration.id)
              .map(cr => {
                const requirement = requirements.find(r => r.id === cr.requirement_id)
                if (!requirement) return { ...cr, requirement: null }
                
                return {
                  ...cr,
                  requirement: {
                    ...requirement,
                    requirement_subrequirements: reqSubreqs
                      .filter(rs => rs.requirement_id === requirement.id)
                      .map(rs => {
                        const subreq = subrequirements.find(s => s.id === rs.subrequirement_id)
                        if (!subreq) return { ...rs, subrequirement: null }
                        
                        return {
                          ...rs,
                          subrequirement: {
                            ...subreq,
                            subrequirement_options: subreqOptions
                              .filter(so => so.subrequirement_id === subreq.id)
                              .map(so => {
                                const option = options.find(o => o.id === so.option_id)
                                if (!option) return { ...so, option: null }
                                
                                const course = option.option_course_id 
                                  ? courses.find(c => c.id === option.option_course_id) || null
                                  : null
                                
                                return {
                                  ...so,
                                  option: {
                                    ...option,
                                    course
                                  }
                                }
                              })
                          }
                        }
                      })
                  }
                }
              })
          }))
        }
      })
    }
  })
}
