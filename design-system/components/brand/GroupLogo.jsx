import React from 'react';

/* Resolve asset paths relative to the compiled bundle, so this works from any page depth.
   Guarded for SSR: `document` doesn't exist on the server, so this resolves to '' there —
   harmless as long as callers outside the standalone preview bundle pass an explicit `src`. */
const BASE = (() => {
  if (typeof document === 'undefined') return '';
  const s = Array.from(document.querySelectorAll('script[src]')).find(el => /_ds_bundle\.js(\?|$)/.test(el.getAttribute('src') || ''));
  if (s) return s.src.replace(/_ds_bundle\.js.*$/, '');
  return '';
})();

const FILES = {
  purple: 'assets/logo/group/8th-sutton-purple.png',
  black: 'assets/logo/group/8th-sutton-black.png',
  white: 'assets/logo/group/8th-sutton-white.png'
};

/* The supplied 8th Sutton (TSGG) lock-up: fleur, "Scouts" logotype and Group line as one artwork.
   Use this — not Logo + personalisation — anywhere the real Group identity appears. */
export function GroupLogo({ tone = 'purple', height = 120, src, style, ...rest }) {
  const file = FILES[tone] || FILES.purple;
  const h = Number(height) || 120;
  return (
    <img
      src={src || BASE + file}
      alt="Scouts — 8th Sutton (TSGG)"
      style={{ height: h, width: 'auto', display: 'block', ...style }}
      {...rest}
    />
  );
}
