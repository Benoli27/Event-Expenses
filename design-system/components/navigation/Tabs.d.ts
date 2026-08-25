/**
 * Underlined tab row; the active tab carries a 4px purple rule.
 */
export interface TabsProps {
  items?: Array<string | { label: string; value: string }>;
  value?: string;
  onChange?: (value: string) => void;
  /** 'inverse' for use on purple or on photography. */
  tone?: 'light' | 'inverse';
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
