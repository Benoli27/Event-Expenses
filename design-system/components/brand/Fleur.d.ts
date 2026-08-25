/**
 * The fleur-de-lis on its own — the brand's single graphic device.
 * Use as a bullet, a badge, a watermark, or cropped large as a background element.
 */
export interface FleurProps {
  /** Height in px. */
  size?: number;
  tone?: 'purple' | 'black' | 'white' | 'blue' | 'red' | 'green' | 'current';
  /** Lower it (e.g. 0.12) when used as a watermark behind content. */
  opacity?: number;
  style?: React.CSSProperties;
}
export declare function Fleur(props: FleurProps): JSX.Element;
