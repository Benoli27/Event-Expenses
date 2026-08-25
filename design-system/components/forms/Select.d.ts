/** Native select in the brand field treatment, with a Lucide chevron. */
export interface SelectProps {
  label?: string; hint?: string; error?: string; required?: boolean; disabled?: boolean;
  /** Strings, or {label, value} objects. */
  options?: Array<string | { label: string; value: string }>;
  value?: string; placeholder?: string; id?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
