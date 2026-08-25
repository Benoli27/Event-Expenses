'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { updateReceipt, deleteReceipt } from '@/lib/actions';
import { Card } from '@/design-system/components/core/Card.jsx';
import { Badge } from '@/design-system/components/core/Badge.jsx';
import { Link } from '@/design-system/components/core/Link.jsx';
import { Button } from '@/design-system/components/core/Button.jsx';
import { Textarea } from '@/design-system/components/forms/Textarea.jsx';
import { Input } from '@/design-system/components/forms/Input.jsx';

export function ReceiptCard({ receipt, eventSlug, showName = true }) {
  const [editing, setEditing] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();
  const boundUpdate = updateReceipt.bind(null, receipt.id, receipt.profile_id, eventSlug);
  const [state, action, pending] = useActionState(boundUpdate, {});

  useEffect(() => {
    if (state?.success) setEditing(false);
  }, [state]);

  return (
    <Card tone="white" padding={20} style={{ marginBottom: 'var(--space-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
          {showName ? <Badge tone="purple" size="sm">{receipt.profiles?.name}</Badge> : null}
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {new Date(receipt.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div style={{ fontWeight: 'var(--weight-black)', fontSize: 'var(--text-h4)' }}>
          £{Number(receipt.amount).toFixed(2)}
        </div>
      </div>

      {editing ? (
        <form action={action} style={{ display: 'grid', gap: 'var(--space-3)' }}>
          <Textarea id={`comment-${receipt.id}`} name="comment" label="Comment" defaultValue={receipt.comment} rows={2} required />
          <Input
            id={`amount-${receipt.id}`}
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            label="Amount owed (£)"
            defaultValue={receipt.amount}
            required
          />
          {state?.error ? (
            <p style={{ color: 'var(--status-error)', fontWeight: 'var(--weight-bold)', fontSize: 13 }}>{state.error}</p>
          ) : null}
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button type="submit" size="sm" disabled={pending}>
              {pending ? 'Saving…' : 'Save'}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <>
          <p style={{ fontWeight: 'var(--weight-regular)', marginBottom: 'var(--space-3)' }}>{receipt.comment}</p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            {(receipt.receipt_files || []).map((f) => (
              <Link key={f.id} href={f.publicUrl} external>
                {f.original_filename || 'receipt file'}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={isDeleting}
              onClick={() => {
                if (confirm('Delete this receipt? This can’t be undone.')) {
                  startDeleteTransition(() => deleteReceipt(receipt.id, receipt.profile_id, eventSlug));
                }
              }}
            >
              {isDeleting ? 'Deleting…' : 'Delete'}
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
