-- Adds a required "description" field to receipts, and makes "comment" optional.
-- Safe to run more than once. Run in the Supabase SQL Editor, same as schema.sql.

alter table receipts add column if not exists description text;
update receipts set description = '' where description is null;
alter table receipts alter column description set not null;

alter table receipts alter column comment drop not null;
