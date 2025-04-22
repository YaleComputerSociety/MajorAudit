// frontend/hooks/useUserProfileUtils.ts (no fetches)

import { User, FYP } from '@/types/user';

export const emptyUser: User = {
  name: '',
  netID: '',
  FYPs: [],
};

export function getCurrentFYP(user: User, fypIndex: number): FYP | null {
  if (
    user.FYPs.length === 0 ||
    fypIndex < 0 ||
    fypIndex >= user.FYPs.length
  ) {
    return null;
  }
  return user.FYPs[fypIndex];
}
