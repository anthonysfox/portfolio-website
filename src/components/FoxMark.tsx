interface Props {
  className?: string;
  style?: React.CSSProperties;
  /** Convenience for fixed pixel widths (e.g. the nav). Omit to size via CSS. */
  size?: number;
}

/**
 * The fox logo — a background-removed version of the source artwork.
 * Height is left automatic so the mark keeps its aspect ratio at any width.
 */
export default function FoxMark({ className, style, size }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/fox-mark.png"
      alt="Fox"
      width={size}
      className={className}
      style={{ display: "block", height: "auto", ...style }}
    />
  );
}
