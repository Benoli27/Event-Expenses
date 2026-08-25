import { createClient } from '@supabase/supabase-js';

/* Server-only client: uses the secret key, which bypasses Row Level Security.
   Never import this from a Client Component — SUPABASE_SECRET_KEY has no
   NEXT_PUBLIC_ prefix so Next.js already keeps it out of the client bundle,
   but this file should still only be reached from Server Actions/Route Handlers. */
export function createServerClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  });
}
