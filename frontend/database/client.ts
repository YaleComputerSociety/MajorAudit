
// src/database/client.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Create a singleton client
const globalForSupabase = global as unknown as { supabase: ReturnType<typeof createClient<Database>> }

export const supabase = globalForSupabase.supabase || 
  createClient<Database>(supabaseUrl, supabaseKey)

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = supabase

export default supabase
