export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      concentration_requirements: {
        Row: {
          concentration_id: number | null
          id: number
          note: string | null
          requirement_id: number | null
          requirement_index: number | null
        }
        Insert: {
          concentration_id?: number | null
          id?: number
          note?: string | null
          requirement_id?: number | null
          requirement_index?: number | null
        }
        Update: {
          concentration_id?: number | null
          id?: number
          note?: string | null
          requirement_id?: number | null
          requirement_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "concentration_requirements_concentration_id_fkey"
            columns: ["concentration_id"]
            isOneToOne: false
            referencedRelation: "concentrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concentration_requirements_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      concentrations: {
        Row: {
          degree_id: number
          description: string | null
          id: number
          name: string | null
          note: string | null
        }
        Insert: {
          degree_id: number
          description?: string | null
          id?: number
          name?: string | null
          note?: string | null
        }
        Update: {
          degree_id?: number
          description?: string | null
          id?: number
          name?: string | null
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concentrations_degree_id_fkey"
            columns: ["degree_id"]
            isOneToOne: false
            referencedRelation: "degrees"
            referencedColumns: ["id"]
          },
        ]
      }
      course_codes: {
        Row: {
          code: string
          course_id: number
          first_term_used: string
          id: number
          last_term_used: string
        }
        Insert: {
          code: string
          course_id: number
          first_term_used: string
          id?: number
          last_term_used: string
        }
        Update: {
          code?: string
          course_id?: number
          first_term_used?: string
          id?: number
          last_term_used?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_codes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_offerings: {
        Row: {
          course_id: number
          flags: string[] | null
          id: number
          professors: string[] | null
          term: string
        }
        Insert: {
          course_id: number
          flags?: string[] | null
          id?: number
          professors?: string[] | null
          term: string
        }
        Update: {
          course_id?: number
          flags?: string[] | null
          id?: number
          professors?: string[] | null
          term?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_offerings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          credits: number | null
          description: string | null
          distributions: string[] | null
          id: number
          is_colsem: boolean | null
          is_fysem: boolean | null
          requirements: string | null
          title: string
          universal_course_id: string | null
        }
        Insert: {
          credits?: number | null
          description?: string | null
          distributions?: string[] | null
          id?: number
          is_colsem?: boolean | null
          is_fysem?: boolean | null
          requirements?: string | null
          title: string
          universal_course_id?: string | null
        }
        Update: {
          credits?: number | null
          description?: string | null
          distributions?: string[] | null
          id?: number
          is_colsem?: boolean | null
          is_fysem?: boolean | null
          requirements?: string | null
          title?: string
          universal_course_id?: string | null
        }
        Relationships: []
      }
      created_courses: {
        Row: {
          code: string 
          credits: number 
          distributions: string[] 
          id: number
          title: string 
        }
        Insert: {
          code: string 
          credits?: number 
          distributions: string[] 
          id?: number
          title: string 
        }
        Update: {
          code?: string | null
          credits?: number | null
          distributions?: string[] | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      degrees: {
        Row: {
          id: number
          note: string | null
          program_id: number
          type: string
        }
        Insert: {
          id?: number
          note?: string | null
          program_id: number
          type: string
        }
        Update: {
          id?: number
          note?: string | null
          program_id?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "degrees_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      fyp: {
        Row: {
          id: number
          language_placement: string | null
          name: string | null
          term_arrangement: string | null
          user_id: string | null
        }
        Insert: {
          id?: number
          language_placement?: string | null
          name?: string | null
          term_arrangement?: string | null
          user_id?: string | null
        }
        Update: {
          id?: number
          language_placement?: string | null
          name?: string | null
          term_arrangement?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fyp_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      options: {
        Row: {
          course_id: number | null
          elective_range: string | null
          flags: string[] | null
          id: number
          is_any_okay: boolean | null
          is_colsem_okay: boolean | null
          is_CR_okay: boolean | null
          is_fysem_okay: boolean | null
          note: string | null
        }
        Insert: {
          course_id?: number | null
          elective_range?: string | null
          flags?: string[] | null
          id?: number
          is_any_okay?: boolean | null
          is_colsem_okay?: boolean | null
          is_CR_okay?: boolean | null
          is_fysem_okay?: boolean | null
          note?: string | null
        }
        Update: {
          course_id?: number | null
          elective_range?: string | null
          flags?: string[] | null
          id?: number
          is_any_okay?: boolean | null
          is_colsem_okay?: boolean | null
          is_CR_okay?: boolean | null
          is_fysem_okay?: boolean | null
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "options_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          abbreviation: string
          catalog_link: string | null
          dus: string | null
          id: number
          name: string
          student_count: number | null
          website_link: string | null
        }
        Insert: {
          abbreviation: string
          catalog_link?: string | null
          dus?: string | null
          id?: number
          name: string
          student_count?: number | null
          website_link?: string | null
        }
        Update: {
          abbreviation?: string
          catalog_link?: string | null
          dus?: string | null
          id?: number
          name?: string
          student_count?: number | null
          website_link?: string | null
        }
        Relationships: []
      }
      requirement_subrequirements: {
        Row: {
          id: number
          note: string | null
          requirement_id: number | null
          subrequirement_id: number | null
          subrequirement_index: number | null
        }
        Insert: {
          id?: number
          note?: string | null
          requirement_id?: number | null
          subrequirement_id?: number | null
          subrequirement_index?: number | null
        }
        Update: {
          id?: number
          note?: string | null
          requirement_id?: number | null
          subrequirement_id?: number | null
          subrequirement_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "requirement_subrequirements_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirement_subrequirements_subrequirement_id_fkey"
            columns: ["subrequirement_id"]
            isOneToOne: false
            referencedRelation: "subrequirements"
            referencedColumns: ["id"]
          },
        ]
      }
      requirements: {
        Row: {
          checkbox: boolean
          courses_required_count: number
          description: string | null
          id: number
          name: string
          note: string | null
          subreqs_required_count: number
        }
        Insert: {
          checkbox?: boolean
          courses_required_count?: number
          description?: string | null
          id?: number
          name: string
          note?: string | null
          subreqs_required_count?: number
        }
        Update: {
          checkbox?: boolean
          courses_required_count?: number
          description?: string | null
          id?: number
          name?: string
          note?: string | null
          subreqs_required_count?: number
        }
        Relationships: []
      }
      student_courses: {
        Row: {
          course_offering_id: number | null
          created_course_id: number | null
          fyp_id: number | null
          id: number
          is_hidden: boolean | null
          result: string
          sort_index: number
          status: string
          term: string
					pref_code: string | null
        }
        Insert: {
          course_offering_id?: number | null
          created_course_id?: number | null
          fyp_id?: number | null
          id?: number
          is_hidden?: boolean | null
          result: string
          sort_index: number
          status: string
          term: string
					pref_code: string | null
        }
        Update: {
          course_offering_id?: number | null
          created_course_id?: number | null
          fyp_id?: number | null
          id?: number
          is_hidden?: boolean | null
          result?: string
          sort_index?: number
          status?: string
          term?: string
					pref_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_courses_course_offering_id_fkey"
            columns: ["course_offering_id"]
            isOneToOne: false
            referencedRelation: "course_offerings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_courses_created_course_id_fkey"
            columns: ["created_course_id"]
            isOneToOne: false
            referencedRelation: "created_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_courses_fyp_id_fkey"
            columns: ["fyp_id"]
            isOneToOne: false
            referencedRelation: "fyp"
            referencedColumns: ["id"]
          },
        ]
      }
      subrequirement_options: {
        Row: {
          id: number
          note: string | null
          option_id: number | null
          option_index: number | null
          subrequirement_id: number | null
        }
        Insert: {
          id?: number
          note?: string | null
          option_id?: number | null
          option_index?: number | null
          subrequirement_id?: number | null
        }
        Update: {
          id?: number
          note?: string | null
          option_id?: number | null
          option_index?: number | null
          subrequirement_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "subrequirement_options_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subrequirement_options_subrequirement_id_fkey"
            columns: ["subrequirement_id"]
            isOneToOne: false
            referencedRelation: "subrequirements"
            referencedColumns: ["id"]
          },
        ]
      }
      subrequirements: {
        Row: {
          courses_required_count: number
          description: string | null
          id: number
          name: string | null
          note: string | null
        }
        Insert: {
          courses_required_count?: number
          description?: string | null
          id?: number
          name?: string | null
          note?: string | null
        }
        Update: {
          courses_required_count?: number
          description?: string | null
          id?: number
          name?: string | null
          note?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          name: string | null
          net_id: string
        }
        Insert: {
          id: string
          name?: string | null
          net_id: string
        }
        Update: {
          id?: string
          name?: string | null
          net_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
