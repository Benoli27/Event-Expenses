/** Square checkbox — purple fill with a white tick when checked. */
export interface CheckboxProps {
  label?: React.ReactNode; hint?: string; checked?: boolean; disabled?: boolean; id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
