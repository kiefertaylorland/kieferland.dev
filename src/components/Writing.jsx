import React from "react";
import { IconClock } from "../lib/ds/icons.jsx";
import { POSTS, formatPostDate } from "../lib/content/posts.js";

export function WritingList({ limit, posts }) {
  const source = posts || POSTS;
  const rows = limit ? source.slice(0, limit) : source;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rows.map((p, i) => (
        <a
          key={p.id}
          href={`/writing#${p.id}`}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "var(--space-5)",
            padding: "var(--space-4) 0",
            borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-faint)",
              width: "5.5rem",
              flexShrink: 0,
            }}
          >
            {formatPostDate(p.date)}
          </span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 500,
                marginBottom: 2,
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
                lineHeight: "var(--leading-normal)",
              }}
            >
              {p.excerpt}
            </div>
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-faint)",
              flexShrink: 0,
            }}
          >
            <IconClock size={13} /> {p.read}
          </span>
        </a>
      ))}
    </div>
  );
}

export function Writing() {
  const allTags = [...new Set(POSTS.flatMap((p) => p.tags))];
  const [active, setActive] = React.useState(null);
  const shown = active ? POSTS.filter((p) => p.tags.includes(active)) : POSTS;

  return (
    <div style={{ padding: "var(--space-12) 0 var(--space-16)" }}>
      <h1
        style={{
          margin: 0,
          fontSize: "var(--text-3xl)",
          fontWeight: 600,
          letterSpacing: "var(--tracking-tight)",
        }}
      >
        Writing
      </h1>
      <p
        style={{
          marginTop: "var(--space-3)",
          fontSize: "var(--text-lg)",
          color: "var(--color-text-muted)",
          maxWidth: "34rem",
        }}
      >
        Notes on making AI-built software verifiable — evals, gates, and audit
        trails.
      </p>

      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          margin: "var(--space-8) 0 var(--space-2)",
        }}
      >
        <button
          onClick={() => setActive(null)}
          style={filterStyle(active === null)}
        >
          all
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            style={filterStyle(active === t)}
          >
            {t}
          </button>
        ))}
      </div>

      <WritingList posts={shown} />
    </div>
  );
}

function filterStyle(on) {
  return {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    padding: "0.25rem 0.625rem",
    borderRadius: "var(--radius-full)",
    cursor: "pointer",
    border: `1px solid ${on ? "var(--color-accent)" : "var(--color-border)"}`,
    background: on ? "var(--color-accent-50)" : "transparent",
    color: on ? "var(--color-accent-strong)" : "var(--color-text-muted)",
  };
}
