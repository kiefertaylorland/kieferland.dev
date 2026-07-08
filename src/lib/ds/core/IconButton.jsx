import React from "react";

/**
 * IconButton — a square button for a single icon (pass an SVG or glyph as
 * children). Always provide `label` for accessibility.
 */
export function IconButton({
  children,
  label,
  variant = "ghost",
  size = "md",
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const dims = { sm: "1.75rem", md: "2.25rem", lg: "2.75rem" };
  const [hover, setHover] = React.useState(false);

  const variants = {
    ghost: {
      background: "transparent",
      color: "var(--color-text-muted)",
      border: "1px solid transparent",
    },
    outline: {
      background: "var(--color-bg)",
      color: "var(--color-text)",
      border: "1px solid var(--color-border-strong)",
    },
    solid: {
      background: "var(--color-accent)",
      color: "var(--color-accent-text)",
      border: "1px solid var(--color-accent)",
    },
  };
  const hoverBg = {
    ghost: "var(--color-bg-subtle)",
    outline: "var(--color-bg-subtle)",
    solid: "var(--color-accent-strong)",
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dims[size],
        height: dims[size],
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition:
          "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
        ...variants[variant],
        ...(hover && !disabled
          ? {
              background: hoverBg[variant],
              color: variant === "ghost" ? "var(--color-text)" : undefined,
            }
          : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
