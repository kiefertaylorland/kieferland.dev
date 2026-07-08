import React from "react";

/**
 * Metric — a single measured value with a mono figure and a small label. The
 * backbone of the evidence/data language: coverage %, pass rates, counts.
 * Optional `tone` tints the value with the gate palette.
 */
export function Metric({
  value,
  label,
  tone = "default",
  sub,
  style,
  ...rest
}) {
  const tones = {
    default: "var(--color-text)",
    accent: "var(--color-accent)",
    pass: "var(--color-pass-500)",
    warn: "var(--color-warn-500)",
    fail: "var(--color-fail-500)",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-3xl)",
          fontWeight: "var(--font-weight-medium)",
          letterSpacing: "var(--tracking-tight)",
          lineHeight: 1,
          color: tones[tone] || tones.default,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
          color: "var(--color-text-faint)",
        }}
      >
        {label}
      </span>
      {sub && (
        <span
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)",
          }}
        >
          {sub}
        </span>
      )}
    </div>
  );
}
