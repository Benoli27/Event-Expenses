'use client';
import React from 'react';

/* Inline link. Purple, underlined on hover; bold when it acts as a CTA. */
export function Link({ children, href, tone = 'purple', bold, external, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const colors = { purple: 'var(--scout-purple)', inverse: 'var(--scout-white)', ink: 'var(--text-body)' };
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ color: hover && tone === 'purple' ? 'var(--purple-80)' : colors[tone] || tone, fontWeight: bold ? 'var(--weight-bold)' : 'inherit', textDecoration: hover ? 'underline' : 'none', textUnderlineOffset: '3px', ...style }}
      {...rest}
    >
      {children}
    </a>
  );
}
