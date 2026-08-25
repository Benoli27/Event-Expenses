'use client';
import React from 'react';

/* Binary toggle for instant-effect settings. */
export function Switch({ label, checked, onChange, disabled, id, style, ...rest }) {
  return (
    <label htmlFor={id} style={{ display: 'flex', gap: 12, alignItems: 'center', fontFamily: 'var(--font-brand)', cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>
      <span style={{ position: 'relative', flex: 'none', width: 52, height: 30 }}>
        <input id={id} type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 52, height: 30, margin: 0, cursor: 'inherit' }} {...rest} />
        <span style={{ display: 'block', width: 52, height: 30, borderRadius: 'var(--radius-pill)', background: disabled ? 'var(--ink-200)' : checked ? 'var(--scout-purple)' : 'var(--ink-400)', transition: 'background var(--duration-base) var(--ease-standard)' }} />
        <span style={{ position: 'absolute', top: 4, left: checked ? 26 : 4, width: 22, height: 22, borderRadius: '50%', background: 'var(--scout-white)', transition: 'left var(--duration-base) var(--ease-standard)' }} />
      </span>
      {label ? <span style={{ fontSize: 16, fontWeight: 'var(--weight-regular)', color: disabled ? 'var(--ink-400)' : 'var(--text-body)' }}>{label}</span> : null}
    </label>
  );
}
