'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import { createServerClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/slug';
import { ADMIN_COOKIE, passcodeMatches } from '@/lib/admin';

/* SVG is deliberately excluded — it can carry inline <script>, and the
   receipts bucket is public, so an uploaded SVG would execute for anyone
   who opens its URL directly. */
const ALLOWED_RECEIPT_FILE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
  'application/pdf',
]);

export async function adminLogin(prevState, formData) {
  const passcode = (formData.get('passcode') || '').toString();

  if (!passcodeMatches(passcode)) {
    return { error: 'Wrong passcode.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, passcode, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/admin');
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect('/admin');
}

export async function deleteEvent(eventId) {
  const cookieStore = await cookies();
  const isAdmin = passcodeMatches(cookieStore.get(ADMIN_COOKIE)?.value);
  if (!isAdmin) return;

  const supabase = createServerClient();

  const { data: receipts } = await supabase
    .from('receipts')
    .select('id, receipt_files(storage_path)')
    .eq('event_id', eventId);

  const storagePaths = (receipts || []).flatMap((r) => (r.receipt_files || []).map((f) => f.storage_path));
  if (storagePaths.length > 0) {
    await supabase.storage.from('receipts').remove(storagePaths);
  }

  await supabase.from('events').delete().eq('id', eventId);

  revalidatePath('/admin');
}

export async function createEvent(prevState, formData) {
  const passcode = formData.get('passcode') || '';
  const name = (formData.get('name') || '').toString().trim();

  if (!passcodeMatches(passcode)) {
    return { error: 'Wrong passcode.' };
  }
  if (!name) {
    return { error: 'Give the event a name.' };
  }

  const supabase = createServerClient();
  const slug = slugify(name);

  const { error } = await supabase.from('events').insert({ name, slug });
  if (error) {
    return { error: 'Could not create the event — try again.' };
  }

  redirect(`/event/${slug}`);
}

export async function createProfile(eventId, eventSlug, prevState, formData) {
  const name = (formData.get('name') || '').toString().trim();
  if (!name) return { error: 'Enter a name.' };

  const supabase = createServerClient();

  const { data: profile, error } = await supabase
    .from('profiles')
    .insert({ event_id: eventId, name })
    .select()
    .single();

  if (error) {
    // Unique violation: someone already has this name — just open their profile
    // instead of erroring. Trust-based system, no reason to block a re-entry.
    const { data: existing } = await supabase
      .from('profiles')
      .select()
      .eq('event_id', eventId)
      .eq('name', name)
      .single();

    if (existing) {
      redirect(`/event/${eventSlug}/me/${existing.id}`);
    }
    return { error: 'Could not create your profile — try again.' };
  }

  redirect(`/event/${eventSlug}/me/${profile.id}`);
}

/* Step 1 of 2 for adding a receipt: mint signed upload URLs so the browser
   can send file bytes straight to Supabase Storage, bypassing our server —
   and therefore Vercel's hard 4.5MB Function request body limit, which phone
   camera photos blow through easily. The "receipts" storage bucket itself
   also enforces an allowed-type/size limit (see 005_receipts_bucket_limits.sql)
   since this validation step is no longer in the same request as the actual
   upload and so can't be the only guard. */
export async function createReceiptUploadUrls(profileId, files) {
  if (!Array.isArray(files) || files.length === 0) {
    return { error: 'Attach at least one photo or PDF.' };
  }
  if (files.some((f) => !f?.type || !ALLOWED_RECEIPT_FILE_TYPES.has(f.type))) {
    return { error: 'Only photos (JPEG, PNG, WEBP, HEIC, GIF) or PDFs are allowed.' };
  }

  const supabase = createServerClient();

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('event_id')
    .eq('id', profileId)
    .single();

  if (profileError || !profile) {
    return { error: 'Could not find your profile — try again.' };
  }

  const folder = `${profile.event_id}/${randomUUID()}`;
  const uploads = [];

  for (let i = 0; i < files.length; i++) {
    const safeName = files[i].name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const path = `${folder}/${i}-${safeName}`;

    const { data, error } = await supabase.storage.from('receipts').createSignedUploadUrl(path);
    if (error) {
      return { error: 'Could not prepare the upload — try again.' };
    }

    uploads.push({ path, token: data.token, original_filename: files[i].name });
  }

  return { success: true, uploads };
}

/* Step 2 of 2: called once every file has finished uploading directly to
   Storage. Only receives small text fields plus the already-uploaded file
   paths, so it stays well under Vercel's request body limit. */
export async function addReceiptWithFiles(profileId, eventSlug, formData) {
  const description = (formData.get('description') || '').toString().trim();
  const comment = (formData.get('comment') || '').toString().trim();
  const amountRaw = (formData.get('amount') || '').toString().trim();
  const amount = Number(amountRaw);

  let files;
  try {
    files = JSON.parse(formData.get('uploadedFiles') || '[]');
  } catch {
    files = [];
  }

  if (!description) return { error: 'Add a description for this receipt.' };
  if (!amountRaw || Number.isNaN(amount) || amount <= 0) {
    return { error: 'Enter the amount owed.' };
  }
  if (!Array.isArray(files) || files.length === 0) {
    return { error: 'Attach at least one photo or PDF.' };
  }

  const supabase = createServerClient();

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('event_id')
    .eq('id', profileId)
    .single();

  if (profileError || !profile) {
    return { error: 'Could not find your profile — try again.' };
  }

  const { data: receipt, error: receiptError } = await supabase
    .from('receipts')
    .insert({ event_id: profile.event_id, profile_id: profileId, description, comment: comment || null, amount })
    .select()
    .single();

  if (receiptError) {
    return { error: 'Could not save the receipt — try again.' };
  }

  const { error: filesError } = await supabase.from('receipt_files').insert(
    files.map((f) => ({
      receipt_id: receipt.id,
      storage_path: f.storage_path,
      original_filename: f.original_filename,
    }))
  );

  if (filesError) {
    return { error: 'Uploaded the files but could not save the receipt — try again.' };
  }

  revalidatePath(`/event/${eventSlug}/me/${profileId}`);
  revalidatePath(`/event/${eventSlug}/all`);
  return { success: true };
}

export async function updateReceipt(receiptId, profileId, eventSlug, prevState, formData) {
  const description = (formData.get('description') || '').toString().trim();
  const comment = (formData.get('comment') || '').toString().trim();
  const amountRaw = (formData.get('amount') || '').toString().trim();
  const amount = Number(amountRaw);

  if (!description) return { error: 'Description can’t be empty.' };
  if (!amountRaw || Number.isNaN(amount) || amount <= 0) {
    return { error: 'Enter a valid amount.' };
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from('receipts')
    .update({ description, comment: comment || null, amount, updated_at: new Date().toISOString() })
    .eq('id', receiptId);

  if (error) return { error: 'Could not save changes.' };

  revalidatePath(`/event/${eventSlug}/me/${profileId}`);
  revalidatePath(`/event/${eventSlug}/all`);
  return { success: true };
}

export async function setReceiptPaid(receiptId, profileId, eventSlug, paid) {
  const supabase = createServerClient();
  await supabase.from('receipts').update({ paid }).eq('id', receiptId);

  revalidatePath(`/event/${eventSlug}/me/${profileId}`);
  revalidatePath(`/event/${eventSlug}/all`);
  revalidatePath(`/event/${eventSlug}`);
}

export async function deleteReceipt(receiptId, profileId, eventSlug) {
  const supabase = createServerClient();

  const { data: files } = await supabase
    .from('receipt_files')
    .select('storage_path')
    .eq('receipt_id', receiptId);

  if (files && files.length > 0) {
    await supabase.storage.from('receipts').remove(files.map((f) => f.storage_path));
  }

  await supabase.from('receipts').delete().eq('id', receiptId);

  revalidatePath(`/event/${eventSlug}/me/${profileId}`);
  revalidatePath(`/event/${eventSlug}/all`);
}
