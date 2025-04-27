// frontend/utils/studentCourseUtils.ts

import { CourseEntry, StudentCourse } from "@/types/user";
import { normalizeStudentCourseOffering } from "@/app/api/student-courses/student-courses";

export function cloneStudentCoursesDeep(courses: StudentCourse[]): StudentCourse[] {
  return courses.map(course => {
    if (course.courseOffering) {
      return {
        ...course,
        courseOffering: {
          ...course.courseOffering,
          professors: [...course.courseOffering.professors],
          flags: [...course.courseOffering.flags],
          codes: [...course.courseOffering.codes],
          abstractCourse: {
            ...course.courseOffering.abstractCourse,
            codes: [...course.courseOffering.abstractCourse.codes],
            distributions: [...course.courseOffering.abstractCourse.distributions]
          }
        },
        createdCourse: null
      };
    } else if (course.createdCourse) {
      return {
        ...course,
        createdCourse: {
          ...course.createdCourse,
          distributions: [...course.createdCourse.distributions]
        },
        courseOffering: null
      };
    } else {
      throw new Error('Invalid StudentCourse: missing both courseOffering and createdCourse');
    }
  });
}

export async function tryGetNewStudentCourse(entry: CourseEntry): Promise<StudentCourse | null> {
  const { code, term_from, term_to, result, sort_index } = entry;

  if (!code || !term_from || !term_to || !result) return null;
  if (!/^[A-Z]{2,4} ?\d{3,4}$/.test(code)) return null;

  try {
    const res = await fetch('/api/course-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, term: term_from }),
    });

    if (!res.ok) throw new Error('Failed to fetch course info');
    const { courseOffering, course, courseCodes } = await res.json();

    if (!courseOffering) return null;

    const status = term_from === term_to ? "DA" : "MA";

    return normalizeStudentCourseOffering(
      {
        id: -1,
        fyp_id: -1,
        course_offering_id: courseOffering.id,
        term: term_to,
        status,
        result,
        sort_index,
        is_hidden: false,
				created_course_id: null
      },
      courseOffering,
      course,
      courseCodes
    );
  } catch (err) {
    console.error("❌ tryGetNewStudentCourse failed:", err);
    return null;
  }
}

export function diffStudentCourses(
  oldCourses: StudentCourse[],
  newCourses: StudentCourse[]
): {
  toAdd: StudentCourse[];
  toRemove: number[];
  toUpdate: { id: number; sort_index?: number; is_hidden?: boolean, result?: string }[];
} {
  const oldMap = new Map(oldCourses.map(c => [c.id, c]));
  const newMap = new Map(newCourses.map(c => [c.id, c]));

  const toAdd: StudentCourse[] = [];
  const toRemove: number[] = [];
  const toUpdate: { id: number; sort_index?: number; is_hidden?: boolean, result?: string }[] = [];

  for (const newCourse of newCourses) {
    if (newCourse.id === -1) {
      toAdd.push(newCourse);
    }
  }

  for (const oldCourse of oldCourses) {
    if (!newMap.has(oldCourse.id)) {
      toRemove.push(oldCourse.id);
    }
  }

  for (const newCourse of newCourses) {
    const old = oldMap.get(newCourse.id);
    if (!old || newCourse.id === -1) continue;

    const updates: { id: number; sort_index?: number; is_hidden?: boolean, result?: string } = { id: newCourse.id };
    let changed = false;

    if (old.sort_index !== newCourse.sort_index) {
      updates.sort_index = newCourse.sort_index;
      changed = true;
    }

    if (old.is_hidden !== newCourse.is_hidden) {
      updates.is_hidden = newCourse.is_hidden;
      changed = true;
    }

		if (old.result !== newCourse.result) {
      updates.result = newCourse.result;
      changed = true;
    }

    if (changed) {
      toUpdate.push(updates);
    }
  }

  return { toAdd, toRemove, toUpdate };
}