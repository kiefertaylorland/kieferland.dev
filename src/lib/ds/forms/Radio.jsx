import React from "react";

/** Radio — single choice within a group. Share a `name` across a set.
 * 朱 accent when selected. */
export function Radio({
  label,
  checked,
  defaultChecked,
  disabled,
  name,
  value,
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
        type="radio"
        name={name}
        value={value}
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
