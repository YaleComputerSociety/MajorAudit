
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      programs: {
        Row: {
          id: number
          name: string
          abbreviation: string
          student_count: number | null
          website_link: string | null
          catalog_link: string | null
        }
        Insert: {
          id?: number
          name: string
          abbreviation: string
          student_count?: number | null
          website_link?: string | null
          catalog_link?: string | null
        }
        Update: {
          id?: number
          name?: string
          abbreviation?: string
          student_count?: number | null
          website_link?: string | null
          catalog_link?: string | null
        }
        Relationships: []
      }
      degrees: {
        Row: {
          id: number
          type: string
          program_id: number
          note: string | null
        }
        Insert: {
          id?: number
          type: string
          program_id: number
          note?: string | null
        }
        Update: {
          id?: number
          type?: string
          program_id?: number
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "degrees_program_id_fkey"
            columns: ["program_id"]
            referencedRelation: "programs"
            referencedColumns: ["id"]
          }
        ]
      }
      concentrations: {
        Row: {
          id: number
          name: string | null
          note: string | null
          degree_id: number
          description: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          note?: string | null
          degree_id: number
          description?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          note?: string | null
          degree_id?: number
          description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concentrations_degree_id_fkey"
            columns: ["degree_id"]
            referencedRelation: "degrees"
            referencedColumns: ["id"]
          }
        ]
      }
      concentration_requirements: {
        Row: {
          id: number
          requirement_index: number
          concentration_id: number
          requirement_id: number
        }
        Insert: {
          id?: number
          requirement_index: number
          concentration_id: number
          requirement_id: number
        }
        Update: {
          id?: number
          requirement_index?: number
          concentration_id?: number
          requirement_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "concentration_requirements_concentration_id_fkey"
            columns: ["concentration_id"]
            referencedRelation: "concentrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "concentration_requirements_requirement_id_fkey"
            columns: ["requirement_id"]
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          }
        ]
      }
      requirements: {
        Row: {
          id: number
          name: string
          description: string | null
          courses_required_count: number | null
          subreqs_required_count: number | null
          checkbox: boolean | null
          note: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          courses_required_count?: number | null
          subreqs_required_count?: number | null
          checkbox?: boolean | null
          note?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          courses_required_count?: number | null
          subreqs_required_count?: number | null
          checkbox?: boolean | null
          note?: string | null
        }
        Relationships: []
      }
      subrequirements: {
        Row: {
          id: number
          name: string | null
          description: string | null
          courses_required_count: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          description?: string | null
          courses_required_count?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          description?: string | null
          courses_required_count?: number | null
        }
        Relationships: []
      }
      requirement_subrequirements: {
        Row: {
          id: number
          subrequirement_index: number | null
          description: string | null
          requirement_id: number
          subrequirement_id: number
        }
        Insert: {
          id?: number
          subrequirement_index?: number | null
          description?: string | null
          requirement_id: number
          subrequirement_id: number
        }
        Update: {
          id?: number
          subrequirement_index?: number | null
          description?: string | null
          requirement_id?: number
          subrequirement_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "requirement_subrequirements_requirement_id_fkey"
            columns: ["requirement_id"]
            referencedRelation: "requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirement_subrequirements_subrequirement_id_fkey"
            columns: ["subrequirement_id"]
            referencedRelation: "subrequirements"
            referencedColumns: ["id"]
          }
        ]
      }
      subrequirement_options: {
        Row: {
          id: number
          option_index: number | null
          note: string | null
          subrequirement_id: number
          option_id: number | null
        }
        Insert: {
          id?: number
          option_index?: number | null
          note?: string | null
          subrequirement_id: number
          option_id?: number | null
        }
        Update: {
          id?: number
          option_index?: number | null
          note?: string | null
          subrequirement_id?: number
          option_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "subrequirement_options_subrequirement_id_fkey"
            columns: ["subrequirement_id"]
            referencedRelation: "subrequirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subrequirement_options_option_id_fkey"
            columns: ["option_id"]
            referencedRelation: "options"
            referencedColumns: ["id"]
          }
        ]
      }
      options: {
        Row: {
          id: number
          option_course_id: string | null
          elective_range: string | null
          is_any_okay: boolean | null
          flags: string | null
        }
        Insert: {
          id?: number
          option_course_id?: string | null
          elective_range?: string | null
          is_any_okay?: boolean | null
          flags?: string | null
        }
        Update: {
          id?: number
          option_course_id?: string | null
          elective_range?: string | null
          is_any_okay?: boolean | null
          flags?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "options_option_course_id_fkey"
            columns: ["option_course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          requirements: string | null
          professors: string[]
          distributions: string[]
          flags: string[]
          credits: number
          term: string
          is_colsem: boolean | null
          is_fysem: boolean | null
          is_sysem: boolean | null
          codes: string[]
          seasons: string[]
        }
        Insert: {
          id: string
          title: string
          description?: string | null
          requirements?: string | null
          professors?: string[]
          distributions?: string[]
          flags?: string[]
          credits: number
          term: string
          is_colsem?: boolean | null
          is_fysem?: boolean | null
          is_sysem?: boolean | null
          codes?: string[]
          seasons?: string[]
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          requirements?: string | null
          professors?: string[]
          distributions?: string[]
          flags?: string[]
          credits?: number
          term?: string
          is_colsem?: boolean | null
          is_fysem?: boolean | null
          is_sysem?: boolean | null
          codes?: string[]
          seasons?: string[]
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
