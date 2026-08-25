/** Selectable filter chip. The one place a pill radius is used. */
export interface TagProps {
  children?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
