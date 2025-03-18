
"use client";
import { useState } from "react";
import Style from "./Graduation.module.css";
import NavBar from "@/components/navbar/NavBar";

type Course = {
  course_id: number;
  codes: string;
  title: string;
  description: string;
  requirements?: string;
  professors?: string[];
  distributions?: string;
  flags?: string;
  credits: number;
  season_code?: string;
  colsem?: string;
  fysem?: string;
  sysem?: string;
};

export default function Graduation() {
  const [courses, setCourses] = useState<Course[]>([]); // Explicitly type courses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function fetchCourses() {
    setLoading(true);
    setError(null);

    fetch("/api/courses")
      .then((res) => res.json())
      .then((data: Course[]) => {
        setCourses(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <div>
      <NavBar />
      <div className={Style.GradPage}>
      </div>
    </div>
  );
}
