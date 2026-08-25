import React from 'react';

/* Flat content block: white with a 2px rule, a solid palette colour, or a photo header. */
export function Card({ children, tone = 'white', image, imageAlt = '', eyebrow, title, elevated, padding = 24, style, ...rest }) {
  const tones = {
    white: { bg: 'var(--surface-card)', fg: 'var(--text-body)', border: 'var(--border-subtle)' },
    subtle: { bg: 'var(--surface-subtle)', fg: 'var(--text-body)', border: 'transparent' },
    purple: { bg: 'var(--scout-purple)', fg: 'var(--scout-white)', border: 'transparent' },
    teal: { bg: 'var(--scout-teal)', fg: 'var(--scout-white)', border: 'transparent' },
    navy: { bg: 'var(--scout-navy)', fg: 'var(--scout-white)', border: 'transparent' },
    yellow: { bg: 'var(--scout-yellow)', fg: 'var(--scout-black)', border: 'transparent' },
    black: { bg: 'var(--scout-black)', fg: 'var(--scout-white)', border: 'transparent' }
  };
  const t = tones[tone] || tones.white;
  return (
    <div style={{ background: t.bg, color: t.fg, border: `var(--border-width) solid ${t.border}`, borderRadius: 'var(--radius-sm)', boxShadow: elevated ? 'var(--shadow-card)' : 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column', ...style }} {...rest}>
      {image ? <img src={image} alt={imageAlt} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} /> : null}
      <div style={{ padding }}>
        {eyebrow ? <div style={{ fontSize: 'var(--text-caption)', fontWeight: 'var(--weight-black)', letterSpacing: 'var(--tracking-wide)', marginBottom: 6, opacity: 0.8 }}>{eyebrow}</div> : null}
        {title ? <div style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--weight-black)', lineHeight: 'var(--leading-snug)', marginBottom: children ? 10 : 0 }}>{title}</div> : null}
        {children ? <div style={{ fontWeight: tone === 'white' || tone === 'subtle' ? 'var(--weight-light)' : 'var(--weight-regular)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>{children}</div> : null}
      </div>
    </div>
  );
}
