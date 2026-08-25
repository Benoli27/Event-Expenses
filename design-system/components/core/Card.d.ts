/**
 * Flat content block — white with a 2px rule, a solid palette colour, or photo-topped.
 * No rounded-corner-plus-coloured-left-border patterns; the brand is square and flat.
 */
export interface CardProps {
  children?: React.ReactNode;
  tone?: 'white' | 'subtle' | 'purple' | 'teal' | 'navy' | 'yellow' | 'black';
  /** Photograph across the top of the card. */
  image?: string;
  imageAlt?: string;
  /** Small black-weight kicker above the title. */
  eyebrow?: string;
  title?: string;
  /** Adds the shallow --shadow-card. Off by default: the identity is flat. */
  elevated?: boolean;
  padding?: number;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
