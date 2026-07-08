import React from "react";
import { Stamp } from "../lib/ds/brand/Stamp.jsx";
import { IconMoon, IconSun } from "../lib/ds/icons.jsx";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

export function SiteHeader({ currentPath = "/" }) {
  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "color-mix(in srgb, var(--color-bg) 88%, transparent)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--content-width-wide)",
          margin: "0 auto",
          padding: "0 var(--space-6)",
          height: "3.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Stamp glyph="検" size={28} rotate={-8} />
          <span style={{ fontWeight: 600, fontSize: "var(--text-base)" }}>
            Kiefer Land
          </span>
        </a>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-6)",
          }}
        >
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: 500,
                  textDecoration: "none",
                  color: active
                    ? "var(--color-text)"
                    : "var(--color-text-muted)",
                  borderBottom: active
                    ? "2px solid var(--color-accent)"
                    : "2px solid transparent",
                  paddingBottom: 2,
                }}
              >
                {item.label}
              </a>
            );
          })}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              display: "grid",
              placeItems: "center",
              width: "2rem",
              height: "2rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-strong)",
              background: "var(--color-bg)",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              visibility: theme ? "visible" : "hidden",
            }}
          >
            {theme === "light" ? <IconMoon size={16} /> : <IconSun size={16} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
