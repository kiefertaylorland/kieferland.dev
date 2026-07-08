import React from "react";

/** Switch — on/off toggle. 朱 track when on. Controlled via `checked`. */
export function Switch({
  label,
  checked,
  defaultChecked,
  disabled,
  onChange,
  id,
  style,
  ...rest
}) {
  const inputId = id || React.useId();
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isOn = checked !== undefined ? checked : internal;

  const handle = (e) => {
    if (checked === undefined) setInternal(e.target.checked);
    onChange && onChange(e);
  };

  return (
    <label
      htmlFor={inputId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.625rem",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        color: "var(--color-text)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <span
        style={{
          position: "relative",
          width: "2.25rem",
          height: "1.25rem",
          borderRadius: "var(--radius-full)",
          background: isOn
            ? "var(--color-accent)"
            : "var(--color-border-strong)",
          transition: "background var(--duration-normal) var(--ease-standard)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: isOn ? "calc(100% - 1rem - 2px)" : "2px",
            width: "1rem",
            height: "1rem",
            borderRadius: "var(--radius-full)",
            background: "#fff",
            boxShadow: "var(--shadow-sm)",
            transition: "left var(--duration-normal) var(--ease-standard)",
          }}
        />
      </span>
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        checked={isOn}
        disabled={disabled}
        onChange={handle}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        {...rest}
      />
      {label}
    </label>
  );
}
