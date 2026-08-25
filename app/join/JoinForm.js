'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/design-system/components/forms/Input.jsx';
import { Button } from '@/design-system/components/core/Button.jsx';

export function JoinForm() {
  const [code, setCode] = useState('');
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const slug = code.trim().toLowerCase().replace(/\s+/g, '-');
    if (slug) router.push(`/event/${slug}`);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-4)', maxWidth: 420 }}>
      <Input
        id="code"
        name="code"
        label="Event code"
        placeholder="e.g. summer-camp-2026-a1b2"
        hint="The bit after /event/ in the link you were sent."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <Button type="submit" variant="primary" size="lg">
        Go to event
      </Button>
    </form>
  );
}
