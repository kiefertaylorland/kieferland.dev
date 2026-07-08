import React from "react";

/** Textarea — multi-line text field, same framing as Input. */
export function Textarea({ label, hint, error, id, rows = 4, style, ...rest }) {
  const inputId = id || React.useId();
  const [focus, setFocus] = React.useState(false);
  const borderColor = error
    ? "var(--color-fail-500)"
    : focus
      ? "var(--color-accent)"
      : "var(--color-border-strong)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.375rem",
        fontFamily: "var(--font-sans)",
      }}
    >
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--color-text)",
          }}
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          appearance: "none",
          width: "100%",
          boxSizing: "border-box",
          padding: "0.5rem 0.75rem",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)",
          lineHeight: "var(--leading-normal)",
          color: "var(--color-text)",
          background: "var(--color-bg)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          outline: "none",
          resize: "vertical",
          boxShadow:
            focus && !error ? "0 0 0 3px var(--color-accent-50)" : "none",
          transition:
            "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
          ...style,
        }}
        {...rest}
      />
      {(hint || error) && (
        <span
          style={{
            fontSize: "var(--text-xs)",
            color: error ? "var(--color-fail-500)" : "var(--color-text-muted)",
          }}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}
