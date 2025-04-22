import { User, StudentCourse, FYP } from '@/types/type-user';

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

export async function fetchUserDataUtil(): Promise<User> {
  const url = `/api/user-profile?t=${Date.now()}`;
  const response = await fetch(url, {
    headers: { 'Cache-Control': 'no-cache' },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch user data');
  }

  const data = await response.json();
  if (!data.user) throw new Error('No user data returned');
  return data.user;
}

export async function addCourseUtil(
  fyp: FYP,
  termFrom: string,
  code: string,
  result: string,
  termTo: string
): Promise<{ success: boolean; course?: StudentCourse; message: string }> {
  const response = await fetch('/api/student-courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      term_from: termFrom,
      code,
      result,
      term_to: termTo,
      fyp_id: fyp.id,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to add course');
  }

  return {
    success: true,
    course: data.data,
    message: data.message || 'Course added successfully',
  };
}

export async function removeCourseUtil(
  courseId: number,
  fyp: FYP
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(
    `/api/student-courses?id=${courseId}&fyp_id=${fyp.id}`,
    {
      method: 'DELETE',
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to remove course');
  }

  return {
    success: true,
    message: data.message || 'Course removed successfully',
  };
}
