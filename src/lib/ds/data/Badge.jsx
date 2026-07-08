import React from "react";

/**
 * Badge — a small status pill. `tone` maps to the semantic gate palette
 * (pass/warn/fail) plus neutral and accent. Use for gate outcomes and states,
 * not decoration.
 */
export function Badge({ children, tone = "neutral", style, ...rest }) {
  const tones = {
    neutral: {
      bg: "var(--color-bg-inset)",
      fg: "var(--color-text-muted)",
      bd: "var(--color-border)",
    },
    accent: {
      bg: "var(--color-accent-50)",
      fg: "var(--color-accent-strong)",
      bd: "var(--color-accent-200)",
    },
    pass: {
      bg: "var(--color-pass-100)",
      fg: "var(--color-pass-500)",
      bd: "var(--color-pass-500)",
    },
    warn: {
      bg: "var(--color-warn-100)",
      fg: "var(--color-warn-500)",
      bd: "var(--color-warn-500)",
    },
    fail: {
      bg: "var(--color-fail-100)",
      fg: "var(--color-fail-500)",
      bd: "var(--color-fail-500)",
    },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3125rem",
        padding: "0.125rem 0.5rem",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--font-weight-medium)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        color: t.fg,
        background: t.bg,
        border: `1px solid ${t.bd}`,
        borderRadius: "var(--radius-full)",
        lineHeight: 1.5,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
