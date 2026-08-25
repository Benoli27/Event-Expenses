'use client';
import React from 'react';

/* Underlined tab row. The active tab carries a 4px purple rule. */
export function Tabs({ items = [], value, onChange, tone = 'light', style, ...rest }) {
  const inverse = tone === 'inverse';
  return (
    <div role="tablist" style={{ display: 'flex', gap: 24, borderBottom: `var(--border-width) solid ${inverse ? 'rgba(255,255,255,.3)' : 'var(--border-subtle)'}`, fontFamily: 'var(--font-brand)', ...style }} {...rest}>
      {items.map(it => {
        const val = typeof it === 'string' ? it : it.value;
        const lab = typeof it === 'string' ? it : it.label;
        const on = value === val;
        return (
          <button key={val} role="tab" aria-selected={on} onClick={() => onChange && onChange(val)}
            style={{ background: 'none', border: 'none', padding: '12px 0', cursor: 'pointer', fontWeight: on ? 'var(--weight-black)' : 'var(--weight-bold)', fontSize: 16,
              color: inverse ? 'var(--scout-white)' : on ? 'var(--scout-purple)' : 'var(--text-muted)',
              boxShadow: on ? `inset 0 -4px 0 0 ${inverse ? 'var(--scout-white)' : 'var(--scout-purple)'}` : 'none',
              opacity: inverse && !on ? 0.7 : 1, transition: 'color var(--duration-base) var(--ease-standard)' }}>
            {lab}
          </button>
        );
      })}
    </div>
  );
}
