/**
 * The Scouts logotype and fleur-de-lis, in the four supplied lock-ups.
 * Always a single colour: purple, black or white (nation colours for devolved Scouting).
 */
export interface LogoProps {
  /** Which supplied artwork to render. Stack is preferred when there is room. */
  variant?: 'stack' | 'horizontal' | 'wordmark' | 'fleur';
  /** Single-colour tone. 'current' inherits the CSS color property. */
  tone?: 'purple' | 'black' | 'white' | 'blue' | 'red' | 'green' | 'current';
  /** Rendered height of the mark in px. Defaults per variant. */
  height?: number;
  /** Group/District/County name set below the logotype in Extra Bold, e.g. "8th Sutton". No extra words. */
  personalisation?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
