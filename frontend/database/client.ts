
// database/client.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase_new'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

interface GlobalWithSupabase {
  supabase: ReturnType<typeof createClient<Database>> | undefined
}

const globalForSupabase = global as unknown as GlobalWithSupabase

export const supabase = globalForSupabase.supabase || 
  createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  })

// Only assign the client to the global object in non-production environments
if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase
}

export default supabase
