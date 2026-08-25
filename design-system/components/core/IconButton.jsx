'use client';
import React from 'react';
import { Icon } from '../brand/Icon.jsx';

/* Square icon-only control — nav toggles, close, pagination. */
export function IconButton({ icon, label, variant = 'ghost', size = 44, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    ghost: { bg: hover ? 'var(--purple-05)' : 'transparent', fg: 'var(--scout-purple)' },
    solid: { bg: hover ? 'var(--purple-80)' : 'var(--scout-purple)', fg: 'var(--scout-white)' },
    inverse: { bg: hover ? 'rgba(255,255,255,.18)' : 'transparent', fg: 'var(--scout-white)' }
  };
  const t = tones[variant] || tones.ghost;
  return (
    <button
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: t.bg, color: t.fg, border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'background var(--duration-base) var(--ease-standard)', ...style }}
      {...rest}
    >
      {typeof icon === 'string' ? <Icon name={icon} size={Math.round(size * 0.5)} /> : icon}
    </button>
  );
}
