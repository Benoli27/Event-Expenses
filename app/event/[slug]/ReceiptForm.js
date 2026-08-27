'use client';

import { useActionState, useEffect, useRef } from 'react';
import { addReceipt } from '@/lib/actions';
import { Textarea } from '@/design-system/components/forms/Textarea.jsx';
import { Input } from '@/design-system/components/forms/Input.jsx';
import { Button } from '@/design-system/components/core/Button.jsx';
import { Card } from '@/design-system/components/core/Card.jsx';
import { FileDropzone } from './FileDropzone';

export function ReceiptForm({ profileId, eventSlug }) {
  const boundAddReceipt = addReceipt.bind(null, profileId, eventSlug);
  const [state, action, pending] = useActionState(boundAddReceipt, {});
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

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
      <form ref={formRef} action={action} style={{ display: 'grid', gap: 'var(--space-4)' }}>
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
        {state?.error ? (
          <p style={{ color: 'var(--status-error)', fontWeight: 'var(--weight-bold)', fontSize: 14 }}>
            {state.error}
          </p>
        ) : null}
        {state?.success ? (
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
