
// NEW TYPES

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
          concentration_id: number
          id: number
          note: string | null
          requirement_id: number
          requirement_index: number
        }
        Insert: {
          concentration_id: number
          id?: number
          note?: string | null
          requirement_id: number
          requirement_index: number
        }
        Update: {
          concentration_id?: number
          id?: number
          note?: string | null
          requirement_id?: number
          requirement_index?: number
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
      courses: {
        Row: {
          codes: string[] | null
          credits: number
          description: string | null
          distributions: string[] | null
          flags: string[] | null
          id: string
          is_colsem: boolean | null
          is_fysem: boolean | null
          is_sysem: boolean | null
          professors: string[] | null
          requirements: string | null
          seasons: string[] | null
          term: string
          title: string
        }
        Insert: {
          codes?: string[] | null
          credits: number
          description?: string | null
          distributions?: string[] | null
          flags?: string[] | null
          id: string
          is_colsem?: boolean | null
          is_fysem?: boolean | null
          is_sysem?: boolean | null
          professors?: string[] | null
          requirements?: string | null
          seasons?: string[] | null
          term: string
          title: string
        }
        Update: {
          codes?: string[] | null
          credits?: number
          description?: string | null
          distributions?: string[] | null
          flags?: string[] | null
          id?: string
          is_colsem?: boolean | null
          is_fysem?: boolean | null
          is_sysem?: boolean | null
          professors?: string[] | null
          requirements?: string | null
          seasons?: string[] | null
          term?: string
          title?: string
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
        }
        Insert: {
          id?: number
          language_placement?: string | null
          name?: string | null
          term_arrangement?: string | null
        }
        Update: {
          id?: number
          language_placement?: string | null
          name?: string | null
          term_arrangement?: string | null
        }
        Relationships: []
      }
      options: {
        Row: {
          elective_range: string | null
          flags: string[] | null
          id: number
          is_any_okay: boolean | null
          note: string | null
          option_course_id: string | null
        }
        Insert: {
          elective_range?: string | null
          flags?: string[] | null
          id?: number
          is_any_okay?: boolean | null
          note?: string | null
          option_course_id?: string | null
        }
        Update: {
          elective_range?: string | null
          flags?: string[] | null
          id?: number
          is_any_okay?: boolean | null
          note?: string | null
          option_course_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subreq_course_options_option_course_id_fkey"
            columns: ["option_course_id"]
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
          id: number
          name: string
          student_count: number | null
          website_link: string | null
        }
        Insert: {
          abbreviation: string
          catalog_link?: string | null
          id?: number
          name: string
          student_count?: number | null
          website_link?: string | null
        }
        Update: {
          abbreviation?: string
          catalog_link?: string | null
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
          requirement_id: number
          subrequirement_id: number
          subrequirement_index: number | null
        }
        Insert: {
          id?: number
          note?: string | null
          requirement_id: number
          subrequirement_id: number
          subrequirement_index?: number | null
        }
        Update: {
          id?: number
          note?: string | null
          requirement_id?: number
          subrequirement_id?: number
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
          course_id: string
          fyp_id: number | null
          id: string
          result: string
          status: string
          term: string
        }
        Insert: {
          course_id: string
          fyp_id?: number | null
          id?: string
          result: string
          status: string
          term: string
        }
        Update: {
          course_id?: string
          fyp_id?: number | null
          id?: string
          result?: string
          status?: string
          term?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
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
          option_id: number
          option_index: number | null
          subrequirement_id: number
        }
        Insert: {
          id?: number
          note?: string | null
          option_id: number
          option_index?: number | null
          subrequirement_id: number
        }
        Update: {
          id?: number
          note?: string | null
          option_id?: number
          option_index?: number | null
          subrequirement_id?: number
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
