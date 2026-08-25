import React from 'react';
import { Logo } from './Logo.jsx';

/* The fleur-de-lis alone — bullet, badge, watermark or large cropped graphic. */
export function Fleur({ size = 24, tone = 'purple', opacity, style, ...rest }) {
  return <Logo variant="fleur" tone={tone} height={size} style={{ opacity, ...style }} {...rest} />;
}
