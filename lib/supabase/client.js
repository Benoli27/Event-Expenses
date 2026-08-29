import { createClient } from '@supabase/supabase-js';

/* Browser-safe client: uses the publishable key, which has no access unless
   the operation is separately authorized (e.g. a signed storage upload URL).
   Used for uploading receipt files directly from the browser to Supabase
   Storage, bypassing our server so large phone photos don't hit Vercel's
   4.5MB Function request body limit. */
export function createBrowserClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}
