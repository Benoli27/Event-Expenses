/** Radio group for two to five mutually exclusive choices. */
export interface RadioProps {
  /** Shared input name — required for grouping. */
  name: string;
  label?: string;
  options?: Array<string | { label: string; value: string }>;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
