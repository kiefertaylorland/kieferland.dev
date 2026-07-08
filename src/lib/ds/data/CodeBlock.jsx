import React from "react";

/**
 * CodeBlock — monospace code / data surface with an optional filename header and
 * copy button. Inset background, hairline border, no syntax coloring (kept
 * understated — this is an audit surface, not a playground).
 */
export function CodeBlock({ children, filename, style, ...rest }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    const text = typeof children === "string" ? children : "";
    if (navigator.clipboard && text) navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--color-bg-subtle)",
        fontFamily: "var(--font-mono)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 0.75rem",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-bg-inset)",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
          }}
        >
          {filename || "shell"}
        </span>
        <button
          type="button"
          onClick={copy}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: copied ? "var(--color-pass-500)" : "var(--color-text-faint)",
          }}
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "0.75rem",
          fontSize: "var(--text-sm)",
          lineHeight: "var(--leading-snug)",
          color: "var(--color-text)",
          overflowX: "auto",
        }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
