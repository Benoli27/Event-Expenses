/**
 * Primary call to action. Bold weight, sentence case, near-square corners.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = purple, secondary = teal, inverse/ghost for use on colour. */
  variant?: 'primary' | 'secondary' | 'outline' | 'inverse' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  /** Renders an anchor instead of a button. */
  href?: string;
  as?: 'button' | 'a';
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
