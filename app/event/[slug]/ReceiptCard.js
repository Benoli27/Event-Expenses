'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { updateReceipt, deleteReceipt, setReceiptPaid } from '@/lib/actions';
import { Card } from '@/design-system/components/core/Card.jsx';
import { Badge } from '@/design-system/components/core/Badge.jsx';
import { Link } from '@/design-system/components/core/Link.jsx';
import { Button } from '@/design-system/components/core/Button.jsx';
import { Textarea } from '@/design-system/components/forms/Textarea.jsx';
import { Input } from '@/design-system/components/forms/Input.jsx';

export function ReceiptCard({ receipt, eventSlug, showName = true }) {
  const [editing, setEditing] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isTogglingPaid, startPaidTransition] = useTransition();
  const boundUpdate = updateReceipt.bind(null, receipt.id, receipt.profile_id, eventSlug);
  const [state, action, pending] = useActionState(boundUpdate, {});

  useEffect(() => {
    if (state?.success) setEditing(false);
  }, [state]);

  function handleTogglePaid() {
    startPaidTransition(() => setReceiptPaid(receipt.id, receipt.profile_id, eventSlug, !receipt.paid));
  }

  return (
    <Card
      tone="white"
      padding={20}
      style={{
        marginBottom: 'var(--space-3)',
        ...(receipt.paid
          ? {
              background: 'rgba(0, 167, 148, 0.12)',
              border: 'var(--border-width-thick) solid var(--scout-teal)',
            }
          : {}),
      }}
    >
      {showName ? (
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
          <Badge tone="purple" size="sm">{receipt.profiles?.name}</Badge>
        </div>
      ) : null}

      {editing ? (
        <form action={action} style={{ display: 'grid', gap: 'var(--space-3)' }}>
          <Textarea id={`description-${receipt.id}`} name="description" label="Receipt Description" defaultValue={receipt.description} rows={1} required />
          <Textarea id={`comment-${receipt.id}`} name="comment" label="Comment" defaultValue={receipt.comment} rows={2} />
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 'var(--space-3)',
              marginBottom: receipt.comment ? 'var(--space-1)' : 'var(--space-3)',
            }}
          >
            <p style={{ margin: 0, fontSize: 'var(--text-h4)', fontWeight: 'var(--weight-black)', textAlign: 'left' }}>
              {receipt.description}
            </p>
            <div style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--weight-black)', whiteSpace: 'nowrap' }}>
              £{Number(receipt.amount).toFixed(2)}
            </div>
          </div>
          {receipt.comment ? (
            <p style={{ margin: 0, marginBottom: 'var(--space-3)', fontSize: 'var(--text-body)', fontWeight: 'var(--weight-regular)', color: 'var(--text-muted)' }}>
              {receipt.comment}
            </p>
          ) : null}
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            {(receipt.receipt_files || []).map((f) => (
              <Link key={f.id} href={f.publicUrl} external>
                {f.original_filename || 'receipt file'}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', flexWrap: 'nowrap', overflowX: 'auto' }}>
            <Button
              variant="ghost"
              size="sm"
              style={{ padding: '6px 10px', fontSize: 12, minHeight: 32, flexShrink: 0 }}
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              style={{ padding: '6px 10px', fontSize: 12, minHeight: 32, flexShrink: 0 }}
              disabled={isDeleting}
              onClick={() => {
                if (confirm('Delete this receipt? This can’t be undone.')) {
                  startDeleteTransition(() => deleteReceipt(receipt.id, receipt.profile_id, eventSlug));
                }
              }}
            >
              {isDeleting ? 'Deleting…' : 'Delete'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              style={{ padding: '6px 10px', fontSize: 12, minHeight: 32, flexShrink: 0 }}
              disabled={isTogglingPaid}
              onClick={handleTogglePaid}
            >
              {isTogglingPaid ? 'Saving…' : receipt.paid ? 'Mark as not paid' : 'Mark as paid'}
            </Button>
            {receipt.paid ? (
              <Badge tone="teal" size="sm" style={{ flexShrink: 0, marginLeft: 'var(--space-1)' }}>
                Paid
              </Badge>
            ) : null}
          </div>
        </>
      )}
    </Card>
  );
}
