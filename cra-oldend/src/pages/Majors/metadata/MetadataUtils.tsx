
import { User } from "../../../types/TypeUser";

// Utility function to pin a program
export function pinProgram(currProgram: number, currDegree: number, user: User, setUser: Function) {
  const existingDegree = user.FYP.degreeDeclarations.find(degree => degree.programIndex === currProgram);

  if (existingDegree) {
    if (existingDegree.status === "PIN") {
      // Unpin the program (remove the studentDegree)
      const updatedUser = {
        ...user,
        studentDegrees: user.FYP.degreeDeclarations.filter(degree => degree.programIndex !== currProgram)
      };
      setUser(updatedUser);
    }
  } else {
    // Pin the program if it's not already pinned or added
    const newStudentDegree = {
      status: "PIN",
      programIndex: currProgram,
      degreeIndex: currDegree
    };

    const updatedUser = {
      ...user,
      studentDegrees: [...user.FYP.degreeDeclarations, newStudentDegree]
    };
    setUser(updatedUser);
  }
}

// Utility function to add a program
export function addProgram(currProgram: number, currDegree: number, user: User, setUser: Function) {
  const existingDegree = user.FYP.degreeDeclarations.find(degree => degree.programIndex === currProgram);

  if (existingDegree) {
    if (existingDegree.status === "ADD") {
      // Unadd the program (remove the studentDegree)
      const updatedUser = {
        ...user,
        studentDegrees: user.FYP.degreeDeclarations.filter(degree => degree.programIndex !== currProgram)
      };
      setUser(updatedUser);
    } else if (existingDegree.status === "PIN") {
      // Change status from "PIN" to "ADD"
      const updatedUser = {
        ...user,
        studentDegrees: user.FYP.degreeDeclarations.map(degree =>
          degree.programIndex === currProgram ? { ...degree, status: "ADD" } : degree
        )
      };
      setUser(updatedUser);
    }
  } else {
    // Add the program if it's not already pinned or added
    const newStudentDegree = {
      status: "ADD",
      programIndex: currProgram,
      degreeIndex: currDegree
    };

    const updatedUser = {
      ...user,
      studentDegrees: [...user.FYP.degreeDeclarations, newStudentDegree]
    };
    setUser(updatedUser);
  }
}
