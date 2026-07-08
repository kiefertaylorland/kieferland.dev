import React from "react";

/**
 * Dialog — a centered modal over a dimmed scrim. Understated: hairline border,
 * soft shadow, no gradient. Renders nothing when `open` is false.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  style,
  ...rest
}) {
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        padding: "var(--space-6)",
        background: "rgba(15,14,12,0.4)",
        backdropFilter: "blur(2px)",
        zIndex: 1000,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "28rem",
          background: "var(--color-bg)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
          fontFamily: "var(--font-sans)",
          overflow: "hidden",
          ...style,
        }}
        {...rest}
      >
        {title && (
          <div
            style={{
              padding: "var(--space-5) var(--space-6)",
              borderBottom: "1px solid var(--color-border)",
              fontSize: "var(--text-lg)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--color-text)",
            }}
          >
            {title}
          </div>
        )}
        <div
          style={{
            padding: "var(--space-6)",
            fontSize: "var(--text-sm)",
            lineHeight: "var(--leading-normal)",
            color: "var(--color-text-muted)",
          }}
        >
          {children}
        </div>
        {footer && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "var(--space-2)",
              padding: "var(--space-4) var(--space-6)",
              borderTop: "1px solid var(--color-border)",
              background: "var(--color-bg-subtle)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
