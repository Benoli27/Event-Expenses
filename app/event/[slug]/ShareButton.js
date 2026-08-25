'use client';

import { useState } from 'react';
import { Button } from '@/design-system/components/core/Button.jsx';

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch {
        // User cancelled the native share sheet, or it's unsupported for this
        // context — fall back to copying the link instead.
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="secondary" onClick={handleShare}>
      {copied ? 'Link copied!' : 'Share this event'}
    </Button>
  );
}
