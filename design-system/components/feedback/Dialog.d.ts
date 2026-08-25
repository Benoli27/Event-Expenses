/** Modal panel over a 55% black scrim. Square corners, raised shadow. */
export interface DialogProps {
  open?: boolean;
  title?: string;
  children?: React.ReactNode;
  /** Action row, right-aligned — usually two Buttons. */
  footer?: React.ReactNode;
  onClose?: () => void;
  /** 'purple' gives the header a solid brand bar. */
  tone?: 'white' | 'purple';
  width?: number;
  style?: React.CSSProperties;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
