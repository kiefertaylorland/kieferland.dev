import React from "react";
import { IconClock } from "../lib/ds/icons.jsx";
import { formatPostDate } from "../lib/content/posts.js";

export function WritingList({ posts }) {
  const rows = posts || [];
  if (rows.length === 0) {
    return (
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-muted)",
          padding: "var(--space-4) 0",
        }}
      >
        Nothing published yet — check back soon.
      </p>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rows.map((p, i) => (
        <a
          key={p.id}
          href={`#${p.id}`}
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
          <div id={p.id} style={{ flex: 1 }}>
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
