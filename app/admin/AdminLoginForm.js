'use client';

import { useActionState } from 'react';
import { adminLogin } from '@/lib/actions';
import { Input } from '@/design-system/components/forms/Input.jsx';
import { Button } from '@/design-system/components/core/Button.jsx';

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLogin, {});

  return (
    <form action={action} style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: 420 }}>
      <Input id="passcode" name="passcode" type="password" label="Admin passcode" required />
      {state?.error ? (
        <p style={{ color: 'var(--status-error)', fontWeight: 'var(--weight-bold)', fontSize: 14 }}>
          {state.error}
        </p>
      ) : null}
      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? 'Checking…' : 'Log in'}
      </Button>
    </form>
  );
}
