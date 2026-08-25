'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createServerClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/slug';

export async function createEvent(prevState, formData) {
  const passcode = formData.get('passcode') || '';
  const name = (formData.get('name') || '').toString().trim();

  if (passcode !== process.env.ADMIN_PASSCODE) {
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

export async function addReceipt(eventId, eventSlug, prevState, formData) {
  const submitterName = (formData.get('submitterName') || '').toString().trim();
  const comment = (formData.get('comment') || '').toString().trim();
  const amountRaw = (formData.get('amount') || '').toString().trim();
  const amount = Number(amountRaw);
  const files = formData.getAll('files').filter((f) => f instanceof File && f.size > 0);

  if (!submitterName) return { error: 'Enter your name.' };
  if (!comment) return { error: 'Add a comment for this receipt.' };
  if (!amountRaw || Number.isNaN(amount) || amount <= 0) {
    return { error: 'Enter the amount owed.' };
  }
  if (files.length === 0) return { error: 'Attach at least one photo or PDF.' };

  const supabase = createServerClient();

  const { data: receipt, error: receiptError } = await supabase
    .from('receipts')
    .insert({ event_id: eventId, submitter_name: submitterName, comment, amount })
    .select()
    .single();

  if (receiptError) {
    return { error: 'Could not save the receipt — try again.' };
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const path = `${eventId}/${receipt.id}/${i}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      return { error: `Could not upload ${file.name} — try again.` };
    }

    await supabase.from('receipt_files').insert({
      receipt_id: receipt.id,
      storage_path: path,
      original_filename: file.name,
    });
  }

  revalidatePath(`/event/${eventSlug}`);
  return { success: true };
}

export async function updateReceipt(receiptId, eventSlug, prevState, formData) {
  const comment = (formData.get('comment') || '').toString().trim();
  const amountRaw = (formData.get('amount') || '').toString().trim();
  const amount = Number(amountRaw);

  if (!comment) return { error: 'Comment can’t be empty.' };
  if (!amountRaw || Number.isNaN(amount) || amount <= 0) {
    return { error: 'Enter a valid amount.' };
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from('receipts')
    .update({ comment, amount, updated_at: new Date().toISOString() })
    .eq('id', receiptId);

  if (error) return { error: 'Could not save changes.' };

  revalidatePath(`/event/${eventSlug}`);
  return { success: true };
}

export async function deleteReceipt(receiptId, eventSlug) {
  const supabase = createServerClient();

  const { data: files } = await supabase
    .from('receipt_files')
    .select('storage_path')
    .eq('receipt_id', receiptId);

  if (files && files.length > 0) {
    await supabase.storage.from('receipts').remove(files.map((f) => f.storage_path));
  }

  await supabase.from('receipts').delete().eq('id', receiptId);

  revalidatePath(`/event/${eventSlug}`);
}
