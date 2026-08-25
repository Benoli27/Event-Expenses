'use client';
import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

/* Modal panel over a dark scrim. Square, flat, with a purple or white header. */
export function Dialog({ open = true, title, children, footer, onClose, tone = 'white', width = 520, style, ...rest }) {
  if (!open) return null;
  const head = tone === 'purple'
    ? { background: 'var(--scout-purple)', color: 'var(--scout-white)' }
    : { background: 'var(--scout-white)', color: 'var(--text-heading)', borderBottom: 'var(--border-width) solid var(--border-subtle)' };
  return (
    <div role="dialog" aria-modal="true" aria-label={title} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'grid', placeItems: 'center', padding: 24, fontFamily: 'var(--font-brand)', ...style }} {...rest}>
      <div style={{ width, maxWidth: '100%', background: 'var(--surface-card)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-raised)', overflow: 'hidden' }}>
        <div style={{ ...head, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <span style={{ fontWeight: 'var(--weight-black)', fontSize: 'var(--text-h4)', lineHeight: 1.2 }}>{title}</span>
          {onClose ? <IconButton icon="x" label="Close" size={36} variant={tone === 'purple' ? 'inverse' : 'ghost'} onClick={onClose} /> : null}
        </div>
        <div style={{ padding: 20, fontWeight: 'var(--weight-light)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', color: 'var(--text-body)' }}>{children}</div>
        {footer ? <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>{footer}</div> : null}
      </div>
    </div>
  );
}
