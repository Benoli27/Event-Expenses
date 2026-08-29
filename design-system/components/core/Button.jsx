'use client';
import React from 'react';

const TONES = {
  primary:   { bg: 'var(--scout-purple)', fg: 'var(--scout-white)', border: 'transparent', hoverBg: 'var(--purple-80)' },
  secondary: { bg: 'var(--scout-teal)',   fg: 'var(--scout-white)', border: 'transparent', hoverBg: 'var(--teal-80)' },
  outline:   { bg: 'transparent',         fg: 'var(--scout-purple)', border: 'var(--scout-purple)', hoverBg: 'var(--purple-05)' },
  inverse:   { bg: 'var(--scout-white)',  fg: 'var(--scout-purple)', border: 'transparent', hoverBg: 'var(--purple-05)' },
  ghost:     { bg: 'transparent',         fg: 'var(--scout-purple)', border: 'transparent', hoverBg: 'var(--purple-05)' }
};
const SIZES = {
  sm: { padding: '8px 16px', fontSize: 14, minHeight: 36 },
  md: { padding: '12px 24px', fontSize: 16, minHeight: 44 },
  lg: { padding: '16px 32px', fontSize: 18, minHeight: 52 }
};

/* Sentence-case, bold, square-edged call to action. */
export function Button({ children, variant = 'primary', size = 'md', fullWidth, disabled, iconStart, iconEnd, as = 'button', href, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const t = TONES[variant] || TONES.primary;
  const s = SIZES[size] || SIZES.md;
  const Tag = href ? 'a' : as;
  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={Tag === 'button' ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-brand)', fontWeight: 'var(--weight-bold)', fontSize: s.fontSize,
        padding: s.padding, minHeight: s.minHeight, lineHeight: 1.2, boxSizing: 'border-box',
        display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined,
        alignItems: 'center', justifyContent: 'center', gap: 8,
        background: disabled ? 'var(--ink-200)' : (hover ? t.hoverBg : t.bg),
        color: disabled ? 'var(--ink-400)' : t.fg,
        border: `var(--border-width) solid ${disabled ? 'transparent' : t.border}`,
        borderRadius: 'var(--radius-sm)', textDecoration: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background var(--duration-base) var(--ease-standard)',
        ...style
      }}
      {...rest}
    >
      {iconStart}{children}{iconEnd}
    </Tag>
  );
}
