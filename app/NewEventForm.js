'use client';

import { useActionState } from 'react';
import { createEvent } from '@/lib/actions';
import { Input } from '@/design-system/components/forms/Input.jsx';
import { Button } from '@/design-system/components/core/Button.jsx';

export function NewEventForm() {
  const [state, action, pending] = useActionState(createEvent, {});

  return (
    <form action={action} style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: 420 }}>
      <Input id="name" name="name" label="Event name" placeholder="Summer camp 2026" required />
      <Input id="passcode" name="passcode" type="password" label="Admin passcode" required />
      {state?.error ? (
        <p style={{ color: 'var(--status-error)', fontWeight: 'var(--weight-bold)', fontSize: 14 }}>
          {state.error}
        </p>
      ) : null}
      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? 'Creating…' : 'Create event'}
      </Button>
    </form>
  );
}
