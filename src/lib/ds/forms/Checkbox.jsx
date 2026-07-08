import React from "react";

/** Checkbox — square toggle with 朱 accent when checked. Controlled or
 * uncontrolled; renders an inline label. */
export function Checkbox({
  label,
  checked,
  defaultChecked,
  disabled,
  id,
  onChange,
  style,
  ...rest
}) {
  const inputId = id || React.useId();
  return (
    <label
      htmlFor={inputId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        color: "var(--color-text)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        style={{
          width: "1.05rem",
          height: "1.05rem",
          margin: 0,
          cursor: "inherit",
          accentColor: "var(--color-accent)",
        }}
        {...rest}
      />
      {label}
    </label>
  );
}
