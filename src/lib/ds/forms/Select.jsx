import React from "react";

/** Select — native dropdown, styled to match Input. Pass `options` as
 * [{value, label}] or use children <option>s. */
export function Select({
  label,
  hint,
  error,
  options,
  id,
  children,
  style,
  ...rest
}) {
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
      <div style={{ position: "relative", display: "flex" }}>
        <select
          id={inputId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none",
            width: "100%",
            boxSizing: "border-box",
            padding: "0.5rem 2rem 0.5rem 0.75rem",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text)",
            background: "var(--color-bg)",
            border: `1px solid ${borderColor}`,
            borderRadius: "var(--radius-md)",
            outline: "none",
            cursor: "pointer",
            boxShadow:
              focus && !error ? "0 0 0 3px var(--color-accent-50)" : "none",
            transition:
              "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
            ...style,
          }}
          {...rest}
        >
          {options
            ? options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))
            : children}
        </select>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text-faint)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: "absolute",
            right: "0.625rem",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
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
