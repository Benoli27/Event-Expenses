'use client';
import React from 'react';

/* Small black label on hover or focus. */
export function Tooltip({ children, label, placement = 'top', style, ...rest }) {
  const [show, setShow] = React.useState(false);
  const pos = placement === 'bottom'
    ? { top: '100%', marginTop: 8, left: '50%', transform: 'translateX(-50%)' }
    : { bottom: '100%', marginBottom: 8, left: '50%', transform: 'translateX(-50%)' };
  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)} {...rest}>
      {children}
      {show ? (
        <span role="tooltip" style={{ position: 'absolute', ...pos, background: 'var(--scout-black)', color: 'var(--scout-white)', fontFamily: 'var(--font-brand)', fontWeight: 'var(--weight-regular)', fontSize: 13, lineHeight: 1.35, padding: '7px 10px', borderRadius: 'var(--radius-sm)', whiteSpace: 'nowrap', zIndex: 20 }}>{label}</span>
      ) : null}
    </span>
  );
}
