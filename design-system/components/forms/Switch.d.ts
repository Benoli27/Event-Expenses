/** Binary toggle for settings that take effect immediately. Use Checkbox inside forms that are submitted. */
export interface SwitchProps {
  label?: string; checked?: boolean; disabled?: boolean; id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
