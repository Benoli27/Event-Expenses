-- Adds per-event "profiles" (click-your-name identity) and switches receipts
-- to reference a profile instead of a raw submitter_name string.
-- Safe to run more than once. Run in the Supabase SQL Editor, same as schema.sql.
--
-- Deletes any existing receipts/receipt_files (test data only, not needed).

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (event_id, name)
);

create index if not exists profiles_event_id_idx on profiles(event_id);

delete from receipt_files;
delete from receipts;

alter table receipts add column if not exists profile_id uuid references profiles(id) on delete cascade;
alter table receipts alter column profile_id set not null;
alter table receipts drop column if exists submitter_name;

create index if not exists receipts_profile_id_idx on receipts(profile_id);

alter table profiles enable row level security;
