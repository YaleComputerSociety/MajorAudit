
"use client";
import { useState, useEffect } from "react";
import Style from "./Graduation.module.css";
import NavBar from "@/components/navbar/NavBar";

import { Program } from "@prisma/client";

// type Course = {
//   course_id: number;
//   codes: string;
//   title: string;
//   description: string;
//   requirements?: string;
//   professors?: string[];
//   distributions?: string;
//   flags?: string;
//   credits: number;
//   season_code?: string;
//   colsem?: string;
//   fysem?: string;
//   sysem?: string;
// };

export default function Graduation() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await fetch('/api/programs')
        const data = await response.json()
				console.log(data)
        setPrograms(data)
      } catch (error) {
        console.error('Error fetching programs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  if (loading) return <div>Loading programs...</div>

  return (
    <div>
      <NavBar />
      <div>

      </div>
    </div>
  );
}
