'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { addReceipt } from '@/lib/actions';
import { Input } from '@/design-system/components/forms/Input.jsx';
import { Textarea } from '@/design-system/components/forms/Textarea.jsx';
import { Button } from '@/design-system/components/core/Button.jsx';
import { Card } from '@/design-system/components/core/Card.jsx';

const NAME_KEY = 'event-expenses:name';

export function ReceiptForm({ eventId, eventSlug }) {
  const boundAddReceipt = addReceipt.bind(null, eventId, eventSlug);
  const [state, action, pending] = useActionState(boundAddReceipt, {});
  const formRef = useRef(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(NAME_KEY);
    if (saved) setName(saved);
  }, []);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      if (name) window.localStorage.setItem(NAME_KEY, name);
    }
  }, [state, name]);

  return (
    <Card tone="white" padding={24} style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
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
        <Input
          id="submitterName"
          name="submitterName"
          label="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div>
          <label
            htmlFor="files"
            style={{
              fontWeight: 'var(--weight-bold)',
              fontSize: 14,
              color: 'var(--text-heading)',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Receipt photo(s) or PDF
          </label>
          <input
            id="files"
            name="files"
            type="file"
            accept="image/*,application/pdf"
            capture="environment"
            multiple
            style={{ fontFamily: 'var(--font-brand)', fontSize: 14 }}
          />
        </div>
        <Textarea id="comment" name="comment" label="Comment" rows={3} required />
        <Input
          id="amount"
          name="amount"
          type="number"
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
