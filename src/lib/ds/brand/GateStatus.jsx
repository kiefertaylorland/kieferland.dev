import React from "react";

/**
 * GateStatus — one row in a verification gate list: a status dot, the gate name,
 * an optional measured value, and a state badge. The core "audit trail" unit.
 * `status`: pass | warn | fail | pending.
 */
export function GateStatus({
  name,
  status = "pending",
  value,
  detail,
  style,
  ...rest
}) {
  const map = {
    pass: { color: "var(--color-pass-500)", label: "pass" },
    warn: { color: "var(--color-warn-500)", label: "warn" },
    fail: { color: "var(--color-fail-500)", label: "fail" },
    pending: { color: "var(--color-text-faint)", label: "…" },
  };
  const s = map[status] || map.pending;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.625rem 0.875rem",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        background: "var(--color-bg)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{
          width: "0.5rem",
          height: "0.5rem",
          borderRadius: "var(--radius-full)",
          background: s.color,
          flexShrink: 0,
          boxShadow:
            status === "pending"
              ? "none"
              : `0 0 0 3px color-mix(in srgb, ${s.color} 18%, transparent)`,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          flex: 1,
        }}
      >
        <span
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--color-text)",
          }}
        >
          {name}
        </span>
        {detail && (
          <span
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            {detail}
          </span>
        )}
      </div>
      {value != null && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)",
          }}
        >
          {value}
        </span>
      )}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wide)",
          color: s.color,
          minWidth: "3rem",
          textAlign: "right",
        }}
      >
        {s.label}
      </span>
    </div>
  );
}
