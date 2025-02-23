import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: Int
    net_id: String
    first_name: String
    last_name: String
  }

  type Major {
    id: Int
    major_name: String
    major_code: String
    description: String
  }

  type MajorType {
    id: Int
    major_id: Int
    type: String
  }

  type MajorVersion {
    id: Int
    major_type_id: Int
    catalog_year: Int
  }

  type MajorRequirement {
    id: Int
    major_version_id: Int
    requirement_name: String
    requirement_type: Int
    description: String
    required: Int
  }

  type SubRequirement {
    id: Int
    major_requirements_id: Int
    requirement_name: String
    required: Int
  }

  type SubRequirementCourse {
    id: Int
    major_subrequirement_id: Int
    course_id: String
    additional_course_id: String
  }

  type StudentMajor {
    id: Int
    student_id: Int
    major_version_id: Int
    declaration_date: Int
  }

  type Query {
    users: [User]
    majors: [Major]
    major_types: [MajorType]
    major_versions: [MajorVersion]
    major_requirements: [MajorRequirement]
    major_subrequirements: [SubRequirement]
    subrequirement_courses: [SubRequirementCourse]
    student_majors: [StudentMajor]
  }
`;
