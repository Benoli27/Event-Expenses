/**
 * The supplied 8th Sutton (TSGG) Group lock-up — stacked fleur-de-lis, "Scouts" logotype and
 * "8th Sutton (TSGG)" as one piece of artwork, in the three approved single-colour versions.
 * Prefer this over `Logo` + `personalisation` wherever the real Group identity appears;
 * `Logo` stays for national lock-ups and for other Groups' personalisation.
 */
export interface GroupLogoProps {
  /** Which supplied file to use. Purple on light, white on purple/black/photography, black for mono print. */
  tone?: 'purple' | 'black' | 'white';
  /** Rendered height in px. Keep to 30mm / ~110px and above in print. */
  height?: number;
  /** Override the artwork URL — for consuming projects that copied the PNGs elsewhere. */
  src?: string;
  style?: React.CSSProperties;
}
export declare function GroupLogo(props: GroupLogoProps): JSX.Element;
