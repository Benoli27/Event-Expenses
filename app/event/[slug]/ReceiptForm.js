'use client';

import { useRef, useState } from 'react';
import { createReceiptUploadUrls, addReceiptWithFiles } from '@/lib/actions';
import { createBrowserClient } from '@/lib/supabase/client';
import { Textarea } from '@/design-system/components/forms/Textarea.jsx';
import { Input } from '@/design-system/components/forms/Input.jsx';
import { Button } from '@/design-system/components/core/Button.jsx';
import { Card } from '@/design-system/components/core/Card.jsx';
import { FileDropzone } from './FileDropzone';

export function ReceiptForm({ profileId, eventSlug }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const description = (formData.get('description') || '').toString().trim();
    const comment = (formData.get('comment') || '').toString().trim();
    const amount = (formData.get('amount') || '').toString().trim();
    const files = formData.getAll('files').filter((f) => f instanceof File && f.size > 0);

    if (!description) return setError('Add a description for this receipt.');
    if (!amount || Number(amount) <= 0) return setError('Enter the amount owed.');
    if (files.length === 0) return setError('Attach at least one photo or PDF.');

    setPending(true);
    try {
      const prep = await createReceiptUploadUrls(
        profileId,
        files.map((f) => ({ name: f.name, type: f.type }))
      );
      if (prep?.error) {
        setError(prep.error);
        return;
      }

      const supabase = createBrowserClient();
      const uploaded = [];
      for (let i = 0; i < files.length; i++) {
        const { path, token, original_filename } = prep.uploads[i];
        const { error: uploadError } = await supabase.storage
          .from('receipts')
          .uploadToSignedUrl(path, token, files[i]);

        if (uploadError) {
          setError(`Could not upload ${files[i].name} — try again.`);
          return;
        }
        uploaded.push({ storage_path: path, original_filename });
      }

      const finalData = new FormData();
      finalData.set('description', description);
      finalData.set('comment', comment);
      finalData.set('amount', amount);
      finalData.set('uploadedFiles', JSON.stringify(uploaded));

      const result = await addReceiptWithFiles(profileId, eventSlug, finalData);
      if (result?.error) {
        setError(result.error);
        return;
      }

      setSuccess(true);
      formRef.current?.reset();
    } finally {
      setPending(false);
    }
  }

  return (
    <Card tone="white" padding={24} style={{ marginBottom: 'var(--space-6)' }}>
      <h2
        style={{
          fontSize: 'var(--text-h4)',
          fontWeight: 'var(--weight-black)',
          marginBottom: 'var(--space-4)',
        }}
      >
        Add a receipt
      </h2>
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-4)' }}>
        <FileDropzone name="files" accept="image/*,application/pdf" multiple />
        <Textarea id="description" name="description" label="Receipt Description" rows={1} required />
        <Textarea id="comment" name="comment" label="Comment" rows={3} />
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          label="Amount owed (£)"
          placeholder="0.00"
          required
        />
        {error ? (
          <p style={{ color: 'var(--status-error)', fontWeight: 'var(--weight-bold)', fontSize: 14 }}>{error}</p>
        ) : null}
        {success ? (
          <p style={{ color: 'var(--status-success)', fontWeight: 'var(--weight-bold)', fontSize: 14 }}>
            Receipt added.
          </p>
        ) : null}
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? 'Uploading…' : 'Add receipt'}
        </Button>
      </form>
    </Card>
  );
}
