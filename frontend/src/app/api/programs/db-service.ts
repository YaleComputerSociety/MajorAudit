
import supabase from '@/database/client'
import { Tables } from '@/types/supabase'

export async function fetchProgramHierarchy() {
  // Fetch programs
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
  
  if (programsError) {
    console.error('Error fetching programs:', programsError)
    return []
  }

  // For each program, fetch the complete hierarchy
  const programsWithHierarchy = await Promise.all(
    programs.map(async (program: Tables<"programs">) => {
      // Fetch degrees for this program
      const { data: degrees, error: degreesError } = await supabase
        .from('degrees')
        .select(`
          id, 
          type,
          note,
          program_id
        `)
        .eq('program_id', program.id)
      
      if (degreesError) {
        console.error(`Error fetching degrees for program ${program.id}:`, degreesError)
        return { ...program, degrees: [] }
      }

      // For each degree, fetch concentrations
      const degreesWithConcentrations = await Promise.all(
        degrees.map(async (degree: Tables<"degrees">) => {
          const { data: concentrations, error: concentrationsError } = await supabase
            .from('concentrations')
            .select(`
              id,
              name,
              note,
              description,
              degree_id
            `)
            .eq('degree_id', degree.id)
          
          if (concentrationsError) {
            console.error(`Error fetching concentrations for degree ${degree.id}:`, concentrationsError)
            return { ...degree, concentrations: [] }
          }

          // For each concentration, fetch requirements
          const concentrationsWithRequirements = await Promise.all(
            concentrations.map(async (concentration: Tables<"concentrations">) => {
              // Fetch concentration_requirements join table
              const { data: concReqs, error: concReqsError } = await supabase
                .from('concentration_requirements')
                .select(`
                  id,
                  requirement_index,
                  concentration_id,
                  requirement_id,
                  note
                `)
                .eq('concentration_id', concentration.id)
              
              if (concReqsError) {
                console.error(`Error fetching concentration_requirements for concentration ${concentration.id}:`, concReqsError)
                return { ...concentration, concentration_requirements: [] }
              }

              // For each concentration_requirement, fetch the actual requirement
              const concReqsWithDetails = await Promise.all(
                concReqs.map(async (concReq: Tables<"concentration_requirements">) => {
                  const { data: requirement, error: requirementError } = await supabase
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
                    .eq('id', concReq.requirement_id)
                    .single()
                  
                  if (requirementError) {
                    console.error(`Error fetching requirement ${concReq.requirement_id}:`, requirementError)
                    return { ...concReq, requirement: null }
                  }

                  // Fetch subrequirements for this requirement
                  const { data: reqSubreqs, error: reqSubreqsError } = await supabase
                    .from('requirement_subrequirements')
                    .select(`
                      id,
                      subrequirement_index,
                      note,
                      requirement_id,
                      subrequirement_id
                    `)
                    .eq('requirement_id', requirement?.id)
                  
                  if (reqSubreqsError) {
                    console.error(`Error fetching requirement_subrequirements for requirement ${requirement.id}:`, reqSubreqsError)
                    return { 
                      ...concReq, 
                      requirement: { 
                        ...requirement, 
                        requirement_subrequirements: [] 
                      } 
                    }
                  }

                  // For each requirement_subrequirement, fetch the actual subrequirement
                  const reqSubreqsWithDetails = await Promise.all(
                    reqSubreqs.map(async (reqSubreq: Tables<"requirement_subrequirements">) => {
                      const { data: subreq, error: subreqError } = await supabase
                        .from('subrequirements')
                        .select(`
                          id,
                          name,
                          description,
                          courses_required_count,
                          note
                        `)
                        .eq('id', reqSubreq.subrequirement_id)
                        .single()
                      
                      if (subreqError) {
                        console.error(`Error fetching subrequirement ${reqSubreq.subrequirement_id}:`, subreqError)
                        return { ...reqSubreq, subrequirement: null }
                      }

                      // Fetch options for this subrequirement
                      const { data: subreqOptions, error: subreqOptionsError } = await supabase
                        .from('subrequirement_options')
                        .select(`
                          id,
                          option_index,
                          note,
                          subrequirement_id,
                          option_id
                        `)
                        .eq('subrequirement_id', subreq?.id)
                      
                      if (subreqOptionsError) {
                        console.error(`Error fetching subrequirement_options for subrequirement ${subreq.id}:`, subreqOptionsError)
                        return { 
                          ...reqSubreq, 
                          subrequirement: { 
                            ...subreq, 
                            subrequirement_options: [] 
                          } 
                        }
                      }

                      // For each subrequirement_option, fetch the option
                      const subreqOptionsWithDetails = await Promise.all(
                        subreqOptions.map(async (subreqOption: Tables<"subrequirement_options">) => {
                          if (!subreqOption.option_id) {
                            return { ...subreqOption, option: null }
                          }

                          const { data: option, error: optionError } = await supabase
                            .from('options')
                            .select(`
                              id,
                              option_course_id,
                              elective_range,
                              is_any_okay,
                              flags,
                              note
                            `)
                            .eq('id', subreqOption.option_id)
                            .single()
                          
                          if (optionError) {
                            console.error(`Error fetching option ${subreqOption.option_id}:`, optionError)
                            return { ...subreqOption, option: null }
                          }

                          // Fetch course for this option if it exists
                          if (option?.option_course_id) {
                            const { data: course, error: courseError } = await supabase
                              .from('courses')
                              .select('*')
                              .eq('id', option.option_course_id)
                              .single()
                            
                            if (courseError) {
                              console.error(`Error fetching course ${option.option_course_id}:`, courseError)
                              return { ...subreqOption, option: { ...option, course: null } }
                            }

                            return { ...subreqOption, option: { ...option, course } }
                          }

                          return { ...subreqOption, option: { ...option, course: null } }
                        })
                      )

                      return {
                        ...reqSubreq,
                        subrequirement: {
                          ...subreq,
                          subrequirement_options: subreqOptionsWithDetails
                        }
                      }
                    })
                  )

                  return {
                    ...concReq,
                    requirement: {
                      ...requirement,
                      requirement_subrequirements: reqSubreqsWithDetails
                    }
                  }
                })
              )

              return {
                ...concentration,
                concentration_requirements: concReqsWithDetails
              }
            })
          )

          return {
            ...degree,
            concentrations: concentrationsWithRequirements
          }
        })
      )

      return {
        ...program,
        degrees: degreesWithConcentrations
      }
    })
  )

  return programsWithHierarchy
}
