
// db-service.ts
import prisma from '@/database/client'

export async function fetchProgramHierarchy() {
  const programs = await prisma.program.findMany()
  
  return Promise.all(programs.map(async program => {
    const degrees = await prisma.degree.findMany({
      where: { program_id: program.id }
    })
    
    const degreesWithRelations = await Promise.all(degrees.map(async degree => {
      const concentrations = await prisma.concentration.findMany({
        where: { degree_id: degree.id }
      })
      
      const concentrationsWithRequirements = await Promise.all(concentrations.map(async concentration => {
        const concentrationRequirements = await prisma.concentrationRequirement.findMany({
          where: { concentration_id: concentration.id },
          include: { requirement: true }
        })
        
        const requirementsWithSubreqs = await Promise.all(
          concentrationRequirements.map(async cr => {
            const requirementSubrequirements = await prisma.requirementSubrequirement.findMany({
              where: { requirement_id: cr.requirement_id },
              include: { subrequirement: true }
            })
            
            const subrequirementsWithOptions = await Promise.all(
              requirementSubrequirements.map(async rs => {
                const subrequirementOptions = await prisma.subrequirementOption.findMany({
                  where: { subrequirement_id: rs.subrequirement_id }
                });
                
                const optionsWithDetails = await Promise.all(
                  subrequirementOptions.map(async so => {
                    if (so.option_id) {
                      const option = await prisma.option.findUnique({
                        where: { id: so.option_id }
                      });
                      
                      if (option && option.option_course_id) {
                        const course = await prisma.course.findUnique({
                          where: { id: option.option_course_id }
                        });
                        
                        return { 
                          ...so, 
                          option: { ...option, course } 
                        };
                      }
                      
                      return { ...so, option };
                    }
                    
                    return so;
                  })
                );
                
                return {
                  ...rs,
                  subrequirement: {
                    ...rs.subrequirement,
                    subrequirement_options: optionsWithDetails
                  }
                }
              })
            )
            
            return {
              ...cr,
              requirement: {
                ...cr.requirement,
                requirement_subrequirements: subrequirementsWithOptions
              }
            }
          })
        )
        
        return {
          ...concentration,
          concentration_requirements: requirementsWithSubreqs
        }
      }))
      
      return {
        ...degree,
        concentrations: concentrationsWithRequirements
      }
    }))
    
    return {
      ...program,
      degrees: degreesWithRelations
    }
  }))
}
