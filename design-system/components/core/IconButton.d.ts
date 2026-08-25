/** Icon-only square control. Minimum 44px hit target. */
export interface IconButtonProps {
  /** Lucide icon name, or a node (e.g. <Fleur/>). */
  icon: string | React.ReactNode;
  /** Accessible label — required, since there is no visible text. */
  label: string;
  variant?: 'ghost' | 'solid' | 'inverse';
  size?: number;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
