'use client';

import { useState, useTransition } from 'react';
import { deleteEvent } from '@/lib/actions';
import { Card } from '@/design-system/components/core/Card.jsx';
import { Button } from '@/design-system/components/core/Button.jsx';
import { Link } from '@/design-system/components/core/Link.jsx';
import { Dialog } from '@/design-system/components/feedback/Dialog.jsx';

export function EventRow({ event }) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const path = `/event/${event.slug}`;
  const exportPath = `/api/event/${event.slug}/export`;

  function handleConfirmDelete() {
    setConfirmOpen(false);
    startDeleteTransition(() => deleteEvent(event.id));
  }

  return (
    <Card tone="white" padding={20} style={{ marginBottom: 'var(--space-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontWeight: 'var(--weight-black)', fontSize: 'var(--text-h4)', marginBottom: 4 }}>
            {event.name}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Created{' '}
            {new Date(event.created_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="outline" size="sm" href={path}>
            View event
          </Button>
          <Button variant="ghost" size="sm" disabled={isDeleting} onClick={() => setConfirmOpen(true)}>
            {isDeleting ? 'Deleting…' : 'Delete event'}
          </Button>
        </div>
      </div>

      <Dialog
        open={confirmOpen}
        title={`Delete "${event.name}"?`}
        onClose={() => setConfirmOpen(false)}
        style={{ position: 'fixed' }}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmDelete}>
              Delete event
            </Button>
          </>
        }
      >
        <p style={{ marginBottom: 'var(--space-3)' }}>
          This permanently deletes the event, its receipts, and all uploaded files. This can’t be undone.
        </p>
        <p style={{ fontWeight: 'var(--weight-bold)' }}>
          Download before deleting?{' '}
          <Link href={exportPath} bold>
            Download all receipts (zip + spreadsheet)
          </Link>
        </p>
      </Dialog>
    </Card>
  );
}
