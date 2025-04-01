
// frontend/database/server.ts

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function getSupabaseServerClient() 
{
  const cookieStore = await cookies();
    
	const supabaseServerClient = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get: (name) => cookieStore.get(name)?.value,
			},
		}
	);
  
  return supabaseServerClient;
}
