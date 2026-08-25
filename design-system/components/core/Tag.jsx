'use client';
import React from 'react';

/* Outlined, selectable filter chip. */
export function Tag({ children, selected, onClick, disabled, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-pressed={selected}
      style={{
        fontFamily: 'var(--font-brand)', fontWeight: 'var(--weight-bold)', fontSize: 14,
        padding: '8px 16px', minHeight: 36, borderRadius: 'var(--radius-pill)', cursor: disabled ? 'not-allowed' : 'pointer',
        background: disabled ? 'var(--ink-100)' : selected ? 'var(--scout-purple)' : hover ? 'var(--purple-05)' : 'transparent',
        color: disabled ? 'var(--ink-400)' : selected ? 'var(--scout-white)' : 'var(--scout-purple)',
        border: `var(--border-width) solid ${disabled ? 'var(--ink-200)' : 'var(--scout-purple)'}`,
        transition: 'background var(--duration-base) var(--ease-standard)', ...style
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
