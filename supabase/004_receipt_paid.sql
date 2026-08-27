-- Adds a "paid" flag to receipts, so leaders can mark a claim as reimbursed.
-- Safe to run more than once. Run in the Supabase SQL Editor, same as schema.sql.

alter table receipts add column if not exists paid boolean not null default false;
