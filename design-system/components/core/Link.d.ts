/** Inline text link. Purple on white, white on colour; underline appears on hover. */
export interface LinkProps {
  children?: React.ReactNode;
  href?: string;
  tone?: 'purple' | 'inverse' | 'ink';
  /** Bold weight — for the house sign-off pattern (scouts.org.uk/join). */
  bold?: boolean;
  external?: boolean;
  style?: React.CSSProperties;
}
export declare function Link(props: LinkProps): JSX.Element;
