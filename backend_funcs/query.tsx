import { gql, useQuery } from "@apollo/client";
import React from "react";

const GET_MAJORS = gql`
  query GetMajors {
    users {
      id
      net_id
      first_name
      last_name
    }
    student_majors {
      id
      student_id
      major_version_id
      declaration_date
    }
    majors {
      id
      major_name
      major_code
      description
    }
    major_types {
      id
      major_id
      type
    }
    major_versions {
      id
      major_type_id
      catalog_year
    }
    major_requirements {
      id
      major_version_id
      requirement_name
      requirement_type
      description
      required
    }
    major_subrequirements {
      id
      major_requirements_id
      requirement_name
      required
    }
    subrequirement_courses {
      id
      major_subrequirement_id
      course_id
      additional_course_id
    }
  }
`;

export default function get_data()
{
  const { loading, error, data } = useQuery(GET_MAJORS);

  if (loading) return <p>Loading majors...</p>;
  if (error) {
    console.error("Error fetching majors:", error);
    return <p>Error: {error.message}</p>;
  }

  return data;
}