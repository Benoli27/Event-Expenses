'use client';
import React from 'react';

/* Radio group — circular controls, one visible choice set. */
export function Radio({ name, label, options = [], value, onChange, disabled, style, ...rest }) {
  return (
    <fieldset style={{ border: 'none', margin: 0, padding: 0, fontFamily: 'var(--font-brand)', ...style }} {...rest}>
      {label ? <legend style={{ fontWeight: 'var(--weight-bold)', fontSize: 14, color: 'var(--text-heading)', padding: 0, marginBottom: 10 }}>{label}</legend> : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map(o => {
          const val = typeof o === 'string' ? o : o.value;
          const lab = typeof o === 'string' ? o : o.label;
          const on = value === val;
          return (
            <label key={val} style={{ display: 'flex', gap: 12, alignItems: 'center', cursor: disabled ? 'not-allowed' : 'pointer' }}>
              <span style={{ position: 'relative', flex: 'none', width: 24, height: 24 }}>
                <input type="radio" name={name} value={val} checked={on} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 24, height: 24, margin: 0, cursor: 'inherit' }} />
                <span style={{ width: 24, height: 24, borderRadius: '50%', border: `var(--border-width) solid ${disabled ? 'var(--ink-200)' : on ? 'var(--scout-purple)' : 'var(--ink-800)'}`, background: 'var(--scout-white)', display: 'grid', placeItems: 'center' }}>
                  {on ? <span style={{ width: 12, height: 12, borderRadius: '50%', background: disabled ? 'var(--ink-200)' : 'var(--scout-purple)' }} /> : null}
                </span>
              </span>
              <span style={{ fontSize: 16, fontWeight: 'var(--weight-regular)', color: disabled ? 'var(--ink-400)' : 'var(--text-body)' }}>{lab}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
