import React from "react";

/**
 * Callout — an inset note tied to the gate palette. Use for the aside voice:
 * "note", "pass", "warn", "fail". A left rule (not a full tinted card) carries
 * the tone so it stays understated.
 */
export function Callout({ children, tone = "note", title, style, ...rest }) {
  const tones = {
    note: { rule: "var(--color-border-strong)", fg: "var(--color-text-muted)" },
    pass: { rule: "var(--color-pass-500)", fg: "var(--color-pass-500)" },
    warn: { rule: "var(--color-warn-500)", fg: "var(--color-warn-500)" },
    fail: { rule: "var(--color-fail-500)", fg: "var(--color-fail-500)" },
  };
  const t = tones[tone] || tones.note;
  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        background: "var(--color-bg-subtle)",
        borderRadius: "var(--radius-md)",
        borderLeft: `3px solid ${t.rule}`,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {title && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wide)",
              color: t.fg,
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            {title}
          </div>
        )}
        <div
          style={{
            fontSize: "var(--text-sm)",
            lineHeight: "var(--leading-normal)",
            color: "var(--color-text)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
