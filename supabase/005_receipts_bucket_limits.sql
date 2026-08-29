-- Locks the "receipts" storage bucket down to safe file types and a sane
-- per-file size cap, enforced by Supabase itself at upload time. This matters
-- now that receipt files upload directly from the browser to Supabase Storage
-- (bypassing our server, to get around Vercel's 4.5MB Function body limit),
-- so our own server-side MIME allowlist can no longer be the only guard.
-- Safe to run more than once. Run in the Supabase SQL Editor, same as schema.sql.

update storage.buckets
set
  allowed_mime_types = array[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif',
    'application/pdf'
  ],
  file_size_limit = 26214400 -- 25 MB per file
where id = 'receipts';
