/**
 * Single-line text field. 2px ink border, 4px corners, yellow focus ring.
 */
export interface InputProps {
  label?: string;
  /** Light-weight helper text below the field. */
  hint?: string;
  /** Bold red message; also reddens the border. */
  error?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'date';
  value?: string;
  placeholder?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
