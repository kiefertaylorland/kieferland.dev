import React from "react";

/**
 * Tooltip — a small hover/focus label. Wraps its trigger children; shows `label`
 * above on hover. Dark ink chip, mono text.
 */
export function Tooltip({ label, children, style, ...rest }) {
  const [show, setShow] = React.useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      {...rest}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            padding: "0.25rem 0.5rem",
            background: "var(--color-neutral-900)",
            color: "var(--color-neutral-50)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-md)",
            pointerEvents: "none",
            zIndex: 100,
            ...style,
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
