-- Event Expenses schema.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Security model: every table has Row Level Security enabled with NO policies,
-- so the publishable (anon) key cannot read or write anything directly. All
-- reads/writes go through Next.js Server Actions using the secret key, which
-- bypasses RLS. This is the trust-based model the app is designed around:
-- access control happens at the "who has the event link / admin passcode"
-- level, not at the database level.

create extension if not exists "pgcrypto";

create table events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table receipts (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  submitter_name text not null,
  comment text not null,
  amount numeric(10, 2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index receipts_event_id_idx on receipts(event_id);

create table receipt_files (
  id uuid primary key default gen_random_uuid(),
  receipt_id uuid not null references receipts(id) on delete cascade,
  storage_path text not null,
  original_filename text,
  created_at timestamptz not null default now()
);

create index receipt_files_receipt_id_idx on receipt_files(receipt_id);

alter table events enable row level security;
alter table receipts enable row level security;
alter table receipt_files enable row level security;

-- Storage bucket for receipt photos/PDFs. Public so downloaded/exported links
-- work directly without signing — consistent with the "anyone with the event
-- link" trust model. Uploads still only happen server-side via the secret key.
insert into storage.buckets (id, name, public)
values ('receipts', 'receipts', true)
on conflict (id) do nothing;
