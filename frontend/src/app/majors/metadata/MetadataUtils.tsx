
import { User } from "@/types/type-user";
import { StudentDegree } from "@/types/type-program";

export function pinProgram(
  currProgram: number,
  currDegree: number,
  user: User,
  setUser: Function,
) {
  // Find if the program is already in degreeDeclarations
  const existingDegree = user.FYP.degreeDeclarations.find(
    (degree) => degree.programIndex === currProgram
  );

  if (existingDegree) {
    if (existingDegree.status === "PIN") {
      // Unpin the program (remove it from degreeDeclarations)
      const updatedUser: User = {
        ...user,
        FYP: {
          ...user.FYP,
          degreeDeclarations: user.FYP.degreeDeclarations.filter(
            (degree) => degree.programIndex !== currProgram
          ),
        },
      };
      setUser(updatedUser);
    }
  } else {
    // Pin the program if it's not already pinned or added
    const newStudentDegree: StudentDegree = {
      status: "PIN",
      programIndex: currProgram,
      degreeIndex: currDegree,
    };

    const updatedUser: User = {
      ...user,
      FYP: {
        ...user.FYP,
        degreeDeclarations: [...user.FYP.degreeDeclarations, newStudentDegree],
      },
    };
    setUser(updatedUser);
  }
}


// Utility function to add a program
export function addProgram(
  currProgram: number,
  currDegree: number,
  user: User,
  setUser: Function
) {
  // Find if the program already exists in degreeDeclarations
  const existingDegree = user.FYP.degreeDeclarations.find(
    (degree) => degree.programIndex === currProgram
  );

  if (existingDegree) {
    if (existingDegree.status === "ADD") {
      // Unadd the program (remove it from degreeDeclarations)
      const updatedUser: User = {
        ...user,
        FYP: {
          ...user.FYP,
          degreeDeclarations: user.FYP.degreeDeclarations.filter(
            (degree) => degree.programIndex !== currProgram
          ),
        },
      };
      setUser(updatedUser);
    } else if (existingDegree.status === "PIN") {
      // Change status from "PIN" to "ADD"
      const updatedUser: User = {
        ...user,
        FYP: {
          ...user.FYP,
          degreeDeclarations: user.FYP.degreeDeclarations.map((degree) =>
            degree.programIndex === currProgram
              ? { ...degree, status: "ADD" }
              : degree
          ),
        },
      };
      setUser(updatedUser);
    }
  } else {
    // Add the program if it's not already pinned or added
    const newStudentDegree: StudentDegree = {
      status: "ADD",
      programIndex: currProgram,
      degreeIndex: currDegree,
    };

    const updatedUser: User = {
      ...user,
      FYP: {
        ...user.FYP,
        degreeDeclarations: [...user.FYP.degreeDeclarations, newStudentDegree],
      },
    };
    setUser(updatedUser);
  }
}
