import React from "react";

/**
 * Stamp — the signature 検証 hanko mark. A vermillion double-ring seal with a
 * kanji glyph, slightly rotated as if pressed by hand. Use it as the "verified"
 * / "signed off" mark — sparingly, like a real stamp. Not decoration.
 *
 * Defaults to 済 (settled/approved). Common glyphs: 検 (inspect), 証 (proof),
 * 済 (done). Pass any short label via `glyph`.
 */
export function Stamp({
  glyph = "済",
  size = 72,
  rotate = -8,
  tone = "accent",
  label,
  style,
  ...rest
}) {
  const color =
    tone === "pass"
      ? "var(--color-pass-500)"
      : tone === "fail"
        ? "var(--color-fail-500)"
        : "var(--color-accent)";
  const px = typeof size === "number" ? `${size}px` : size;

  const seal = (
    <span
      aria-hidden={label ? undefined : true}
      style={{
        display: "inline-grid",
        placeItems: "center",
        width: px,
        height: px,
        borderRadius: "var(--radius-full)",
        border: `2.5px solid ${color}`,
        boxShadow: `inset 0 0 0 2px ${color}`,
        color,
        transform: `rotate(${rotate}deg)`,
        fontFamily: '"Hiragino Sans", "Yu Gothic", var(--font-sans)',
        fontWeight: 700,
        fontSize: `calc(${px} * 0.5)`,
        lineHeight: 1,
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {glyph}
    </span>
  );

  if (!label)
    return React.cloneElement(seal, {
      style: { ...seal.props.style, ...style },
      ...rest,
    });

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        fontFamily: "var(--font-mono)",
        ...style,
      }}
      {...rest}
    >
      {seal}
      <span
        style={{
          fontSize: "var(--text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
          color,
        }}
      >
        {label}
      </span>
    </span>
  );
}
