import React from 'react';

/* Small solid label for section names, ages, status. */
export function Badge({ children, tone = 'purple', size = 'md', style, ...rest }) {
  const tones = {
    purple: ['var(--scout-purple)', 'var(--scout-white)'],
    teal: ['var(--scout-teal)', 'var(--scout-white)'],
    navy: ['var(--scout-navy)', 'var(--scout-white)'],
    red: ['var(--scout-red)', 'var(--scout-white)'],
    green: ['var(--status-success)', 'var(--scout-white)'],
    yellow: ['var(--scout-yellow)', 'var(--scout-black)'],
    pink: ['var(--scout-pink)', 'var(--scout-black)'],
    blue: ['var(--scout-blue)', 'var(--scout-white)'],
    ink: ['var(--ink-100)', 'var(--text-body)']
  };
  const [bg, fg] = tones[tone] || tones.purple;
  const s = size === 'sm' ? { fontSize: 11, padding: '3px 8px' } : { fontSize: 13, padding: '5px 12px' };
  return <span style={{ background: bg, color: fg, fontFamily: 'var(--font-brand)', fontWeight: 'var(--weight-black)', borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', lineHeight: 1.3, ...s, ...style }} {...rest}>{children}</span>;
}
