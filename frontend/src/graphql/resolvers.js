import supabase from "../lib/supabaseClient";

export const resolvers = {
  Query: {
    users: async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
    majors: async () => {
      const { data, error } = await supabase.from("majors").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
    major_types: async () => {
      const { data, error } = await supabase.from("major_types").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
    major_versions: async () => {
      const { data, error } = await supabase.from("major_versions").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
    major_requirements: async () => {
      const { data, error } = await supabase.from("major_requirements").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
    major_subrequirements: async () => {
      const { data, error } = await supabase.from("major_subrequirements").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
    subrequirement_courses: async () => {
      const { data, error } = await supabase.from("subrequirement_courses").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
    student_majors: async () => {
      const { data, error } = await supabase.from("student_majors").select("*");
      if (error) throw new Error(error.message);
      return data;
    }
  },
};
