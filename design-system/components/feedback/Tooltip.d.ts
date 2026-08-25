/** Small black hover/focus label. Never the only place information lives. */
export interface TooltipProps {
  children?: React.ReactNode;
  label?: string;
  placement?: 'top' | 'bottom';
  style?: React.CSSProperties;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
