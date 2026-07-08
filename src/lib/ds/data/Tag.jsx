import React from "react";

/** Tag — a low-emphasis label for topics/keywords (e.g. post tags). Softer than
 * Badge; sans-case, optional dismiss. */
export function Tag({ children, onRemove, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.1875rem 0.5rem",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        color: "var(--color-text-muted)",
        background: "var(--color-bg-subtle)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        lineHeight: 1.5,
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          style={{
            display: "inline-flex",
            border: "none",
            background: "none",
            padding: 0,
            cursor: "pointer",
            color: "var(--color-text-faint)",
            lineHeight: 0,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}
