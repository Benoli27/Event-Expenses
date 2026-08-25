import React from 'react';

/* Functional UI icons. The brand defines no icon set, so Lucide (CDN) is a
   documented substitution chosen for its clean, even-stroke character. */
export function Icon({ name, size = 20, strokeWidth, tone = 'currentColor', style, ...rest }) {
  size = Number(size) || 20;
  return (
    <img
      src={`https://unpkg.com/lucide-static@0.454.0/icons/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      style={{ display: 'block', flex: 'none', width: size, height: size, ...style }}
      {...rest}
    />
  );
}
