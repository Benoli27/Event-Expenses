/** Brief confirmation or warning bar. Status colours are palette colours. */
export interface ToastProps {
  children?: React.ReactNode;
  tone?: 'success' | 'error' | 'info' | 'warning';
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
