/** Multi-line text field. Same border and focus treatment as Input. */
export interface TextareaProps {
  label?: string; hint?: string; error?: string; required?: boolean; disabled?: boolean;
  rows?: number; value?: string; placeholder?: string; id?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}
export declare function Textarea(props: TextareaProps): JSX.Element;
