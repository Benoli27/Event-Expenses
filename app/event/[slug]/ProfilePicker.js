'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { createProfile } from '@/lib/actions';
import { Button } from '@/design-system/components/core/Button.jsx';
import { Input } from '@/design-system/components/forms/Input.jsx';

export function ProfilePicker({ eventId, eventSlug, profiles }) {
  const router = useRouter();
  const boundCreate = createProfile.bind(null, eventId, eventSlug);
  const [state, action, pending] = useActionState(boundCreate, {});

  return (
    <div>
      {profiles.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
          {profiles.map((p) => (
            <Button
              key={p.id}
              variant="outline"
              size="lg"
              onClick={() => router.push(`/event/${eventSlug}/me/${p.id}`)}
            >
              {p.name}
            </Button>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>
          No one has added receipts yet — be the first!
        </p>
      )}

      <form action={action} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 220px' }}>
          <Input id="name" name="name" label="Not listed? Add your name" placeholder="Your name" required />
        </div>
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? 'Adding…' : 'Add me'}
        </Button>
      </form>
      {state?.error ? (
        <p style={{ color: 'var(--status-error)', fontWeight: 'var(--weight-bold)', fontSize: 14, marginTop: 8 }}>
          {state.error}
        </p>
      ) : null}
    </div>
  );
}
