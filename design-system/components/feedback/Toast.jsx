'use client';
import React from 'react';
import { Icon } from '../brand/Icon.jsx';

const TONES = {
  success: { bar: 'var(--status-success)', icon: 'check' },
  error: { bar: 'var(--status-error)', icon: 'triangle-alert' },
  info: { bar: 'var(--status-info)', icon: 'info' },
  warning: { bar: 'var(--status-warning)', icon: 'triangle-alert' }
};

/* Brief confirmation bar. Colour comes from the palette's status mapping. */
export function Toast({ children, tone = 'success', onDismiss, style, ...rest }) {
  const t = TONES[tone] || TONES.success;
  const dark = tone === 'warning';
  return (
    <div role="status" style={{ display: 'flex', alignItems: 'center', gap: 12, background: t.bar, color: dark ? 'var(--scout-black)' : 'var(--scout-white)', padding: '14px 16px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-card)', fontFamily: 'var(--font-brand)', fontWeight: 'var(--weight-bold)', fontSize: 15, ...style }} {...rest}>
      <Icon name={t.icon} size={20} style={{ filter: dark ? 'none' : 'brightness(0) invert(1)' }} />
      <span style={{ flex: 1 }}>{children}</span>
      {onDismiss ? <button onClick={onDismiss} aria-label="Dismiss" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 'var(--weight-bold)', fontSize: 14, textDecoration: 'underline' }}>Dismiss</button> : null}
    </div>
  );
}
