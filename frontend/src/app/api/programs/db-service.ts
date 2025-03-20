import prisma from '@/database/client'

export async function fetchProgramHierarchy() {
  return prisma.program.findMany({
    include: {
      degrees: {
        include: {
          concentrations: {
            include: {
              concentration_requirements: {
                include: {
                  requirement: {
                    include: {
                      requirement_subrequirements: {
                        include: {
                          subrequirement: {
                            include: {
                              subrequirement_options: {
                                include: {
                                  option: {
                                    include: {
                                      course: true
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
}
