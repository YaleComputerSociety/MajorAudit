
import { Database } from '@/types/supabase_newer'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export function safeArray<T>(arr: T[] | null | undefined): T[] {
  return arr || [];
}

export function safeBoolean(value: boolean | null | undefined): boolean {
  return value ?? false;
}

export function safeNumber(value: number | null | undefined): number {
  return value ?? 0;
}

export function safeString(value: string | null | undefined): string {
  return value ?? "";
}