'use client';
import React from 'react';

const fieldBase = {
  fontFamily: 'var(--font-brand)', fontWeight: 'var(--weight-regular)', fontSize: 16,
  padding: '12px 14px', minHeight: 44, width: '100%', boxSizing: 'border-box',
  background: 'var(--scout-white)', color: 'var(--text-body)',
  border: 'var(--border-width) solid var(--ink-800)', borderRadius: 'var(--radius-sm)', outline: 'none'
};
function Wrap({ label, hint, error, required, children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-brand)' }}>
      {label ? <span style={{ fontWeight: 'var(--weight-bold)', fontSize: 14, color: 'var(--text-heading)' }}>{label}{required ? <span style={{ color: 'var(--scout-red)' }}> *</span> : null}</span> : null}
      {children}
      {error ? <span style={{ fontSize: 13, fontWeight: 'var(--weight-bold)', color: 'var(--scout-red)' }}>{error}</span> : hint ? <span style={{ fontSize: 13, fontWeight: 'var(--weight-light)', color: 'var(--text-muted)' }}>{hint}</span> : null}
    </label>
  );
}

/* Multi-line text field. */
export function Textarea({ label, hint, error, required, disabled, rows = 4, value, onChange, placeholder, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <Wrap label={label} hint={hint} error={error} required={required} htmlFor={id}>
      <textarea
        id={id} rows={rows} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ ...fieldBase, minHeight: undefined, resize: 'vertical', lineHeight: 'var(--leading-body)',
          borderColor: error ? 'var(--scout-red)' : disabled ? 'var(--ink-200)' : 'var(--ink-800)',
          boxShadow: focus ? 'var(--shadow-focus)' : 'none', ...style }}
        {...rest}
      />
    </Wrap>
  );
}
