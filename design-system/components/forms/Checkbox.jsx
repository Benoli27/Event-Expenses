'use client';
import React from 'react';

/* Square checkbox with a 2px ink box and purple fill when checked. */
export function Checkbox({ label, hint, checked, onChange, disabled, id, style, ...rest }) {
  return (
    <label htmlFor={id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontFamily: 'var(--font-brand)', cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>
      <span style={{ position: 'relative', flex: 'none', width: 24, height: 24, marginTop: 1 }}>
        <input id={id} type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 24, height: 24, margin: 0, cursor: 'inherit' }} {...rest} />
        <span style={{ display: 'block', width: 24, height: 24, borderRadius: 'var(--radius-sm)', border: `var(--border-width) solid ${disabled ? 'var(--ink-200)' : 'var(--ink-800)'}`, background: checked ? (disabled ? 'var(--ink-200)' : 'var(--scout-purple)') : 'var(--scout-white)', borderColor: checked && !disabled ? 'var(--scout-purple)' : undefined, transition: 'background var(--duration-fast) var(--ease-standard)' }}>
          {checked ? <img src="https://unpkg.com/lucide-static@0.454.0/icons/check.svg" alt="" width="18" height="18" style={{ display: 'block', margin: '1px', filter: 'brightness(0) invert(1)' }} /> : null}
        </span>
      </span>
      <span>
        <span style={{ fontWeight: 'var(--weight-regular)', fontSize: 16, color: disabled ? 'var(--ink-400)' : 'var(--text-body)' }}>{label}</span>
        {hint ? <span style={{ display: 'block', fontSize: 13, fontWeight: 'var(--weight-light)', color: 'var(--text-muted)' }}>{hint}</span> : null}
      </span>
    </label>
  );
}
