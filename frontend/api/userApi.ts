// UPDATED: frontend/api/userAPI.ts

import { FYP, StudentCourse, User } from '@/types/user';

export async function fetchUserData(): Promise<User> {
  const url = `/api/user-profile?t=${Date.now()}`;
  let response: Response;

  try {
    response = await fetch(url, {
      headers: { 'Cache-Control': 'no-cache' },
    });
  } catch (err) {
    throw new Error('Network error while fetching user data');
  }

  let data: any;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error('Malformed response received from server');
  }

  if (!response.ok) {
    throw new Error(data?.error || 'Failed to fetch user data');
  }

  if (!data.user) throw new Error('No user data returned');
  return data.user;
}

export async function addCourses(
  fyp: FYP,
  entries: {
    course_offering_id: number;
    term: string;
    status: string;
    result: string;
    sort_index: number;
  }[]
): Promise<{
  success: boolean;
  courses: StudentCourse[];
  errors: { entry: any; message: string }[];
}> {
  const response = await fetch('/api/student-courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fyp_id: fyp.id, entries }),
  });

  let data: any;
  try {
    data = await response.json();
  } catch {
    throw new Error('Malformed response while adding courses');
  }

  if (!response.ok) {
    throw new Error(data?.error || 'Failed to add courses');
  }

  return {
    success: true,
    courses: data.added || [],
    errors: data.errors || [],
  };
}


export async function removeCourses(
  fyp: FYP,
  courseIds: number[]
): Promise<{ success: boolean; removed: number[]; errors: { id: number; message: string }[] }> {
  const response = await fetch('/api/student-courses', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fyp_id: fyp.id, ids: courseIds }),
  });

  let data: any;
  try {
    data = await response.json();
  } catch {
    throw new Error('Malformed response while removing courses');
  }

  if (!response.ok) {
    throw new Error(data?.error || 'Failed to remove courses');
  }

  return {
    success: true,
    removed: data.removed || [],
    errors: data.errors || [],
  };
}

export async function updateStudentCourses(
  updates: { id: number; sort_index?: number; is_hidden?: boolean }[]
): Promise<{ success: boolean; errors?: { id: number; message: string }[] }> {

  const response = await fetch(`/api/student-courses`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates), // <-- send raw array, not wrapped in { updates: ... }
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error || 'Failed to update student courses');
  }

  return {
    success: result.success,
    errors: result.errors ?? [],
  };
}
