import React from "react";

/**
 * Button — the primary action control.
 * Variants: primary (朱 stamp fill), secondary (bordered ink), ghost (text-only),
 * danger (fail red). Sizes: sm, md, lg.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "0.375rem 0.75rem",
      fontSize: "var(--text-sm)",
      gap: "0.375rem",
    },
    md: { padding: "0.5rem 1rem", fontSize: "var(--text-sm)", gap: "0.5rem" },
    lg: {
      padding: "0.6875rem 1.375rem",
      fontSize: "var(--text-base)",
      gap: "0.5rem",
    },
  };

  const variants = {
    primary: {
      background: "var(--color-accent)",
      color: "var(--color-accent-text)",
      border: "1px solid var(--color-accent)",
    },
    secondary: {
      background: "var(--color-bg)",
      color: "var(--color-text)",
      border: "1px solid var(--color-border-strong)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-text)",
      border: "1px solid transparent",
    },
    danger: {
      background: "var(--color-fail-500)",
      color: "#fff",
      border: "1px solid var(--color-fail-500)",
    },
  };

  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    primary: "var(--color-accent-strong)",
    secondary: "var(--color-bg-subtle)",
    ghost: "var(--color-bg-subtle)",
    danger: "#9a3232",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: sizes[size].gap,
        padding: sizes[size].padding,
        fontFamily: "var(--font-sans)",
        fontSize: sizes[size].fontSize,
        fontWeight: "var(--font-weight-medium)",
        lineHeight: 1,
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition:
          "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
        ...variants[variant],
        ...(hover && !disabled ? { background: hoverBg[variant] } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
