// frontend/hooks/useUserProfileUtils.ts (no fetches)

import { User, FYP } from '@/types/user';

export const emptyUser: User = {
  name: '',
  netID: '',
  FYPs: [],
};

export function getCurrentFYP(user: User, fypIndex: number): FYP | null {
  console.log("🧠 getCurrentFYP recomputing:", fypIndex);
  if (
    user.FYPs.length === 0 ||
    fypIndex < 0 ||
    fypIndex >= user.FYPs.length
  ) {
    return null;
  }

  const fyp = user.FYPs[fypIndex];
  
  // Create a new reference without re-sorting - preserve the existing order
  // This avoids interfering with the sorting done in the drag handler
  return {
    ...fyp,
    studentCourses: [...fyp.studentCourses]
  };
}