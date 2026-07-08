import React from "react";

/**
 * Card — a bordered surface. Elevation is a hairline border plus, at most, a
 * soft low shadow — never a heavy drop. `interactive` adds a hover lift for
 * clickable cards.
 */
export function Card({
  children,
  elevated = false,
  interactive = false,
  padding = "var(--space-6)",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: elevated ? "var(--shadow-md)" : "none",
        cursor: interactive ? "pointer" : "default",
        transition:
          "border-color var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard)",
        ...(hover
          ? {
              borderColor: "var(--color-border-strong)",
              boxShadow: "var(--shadow-md)",
            }
          : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
