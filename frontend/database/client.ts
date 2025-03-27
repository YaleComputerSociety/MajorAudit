
// database/client.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase_new'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
if (!supabaseUrl) {
  console.error('[Supabase Client] NEXT_PUBLIC_SUPABASE_URL is missing');
}

// Client-side (public) client with anon key
interface GlobalWithSupabase {
  supabase: ReturnType<typeof createClient<Database>> | undefined
}

const globalForSupabase = global as unknown as GlobalWithSupabase

// Public client with limited privileges (for client-side use)
export const supabase = globalForSupabase.supabase || 
  createClient<Database>(
    supabaseUrl, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '', 
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  )

// Only assign the public client to the global object in non-production environments
if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabase = supabase
}

// Server-side client with admin privileges (service role)
// Only import this in server-side code (API routes, server components, etc.)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Only create admin client if not in browser and service key exists
const isServer = typeof window === 'undefined';
export const supabaseAdmin = (isServer && serviceRoleKey) ? 
  createClient<Database>(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: false
      }
    }
  ) : null;

// Helper function to safely access admin client
export const getAdminClient = () => {
  if (!supabaseAdmin) {
    throw new Error(
      'Supabase admin client is not available. ' +
      'This may be because you are in a browser environment or the service role key is missing.'
    );
  }
  return supabaseAdmin;
}

// Default export is the public client
export default supabase
