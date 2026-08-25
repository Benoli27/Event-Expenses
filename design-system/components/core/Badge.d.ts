/** Small solid label — section name, age range, status. Black weight, sentence case. */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: 'purple' | 'teal' | 'navy' | 'red' | 'green' | 'yellow' | 'pink' | 'blue' | 'ink';
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
