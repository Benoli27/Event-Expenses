/**
 * Functional UI icon (menu, close, chevron, calendar…).
 * SUBSTITUTION: the Scout brand defines no icon set; Lucide is used from CDN.
 * For the brand's own glyph use <Fleur /> instead.
 */
export interface IconProps {
  /** Lucide icon name in kebab-case, e.g. "menu", "chevron-right", "calendar-days". */
  name: string;
  /** Square size in px. */
  size?: number;
  strokeWidth?: number;
  tone?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
