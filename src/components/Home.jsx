import React from "react";
import { WritingList } from "./Writing.jsx";
import { POSTS } from "../lib/content/posts.js";

export function Home() {
  const allTags = [...new Set(POSTS.flatMap((p) => p.tags))];
  const [active, setActive] = React.useState(null);
  const shown = active ? POSTS.filter((p) => p.tags.includes(active)) : POSTS;

  return (
    <div>
      <section
        style={{
          padding: "var(--space-12) 0 var(--space-10)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "var(--text-3xl)",
            fontWeight: 600,
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          Kiefer Land
        </h1>
        <p
          style={{
            marginTop: "var(--space-4)",
            fontSize: "var(--text-lg)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--leading-normal)",
            maxWidth: "34rem",
          }}
        >
          Notes on making AI-built software verifiable
        </p>
      </section>

      <section style={{ padding: "var(--space-10) 0 var(--space-16)" }}>
        <div
          style={{
            display: "flex",
            gap: "var(--space-2)",
            marginBottom: "var(--space-2)",
          }}
        >
          <button
            type="button"
            aria-pressed={active === null}
            aria-label="Filter by all posts"
            onClick={() => setActive(null)}
            style={filterStyle(active === null)}
          >
            all
          </button>
          {allTags.map((t) => (
            <button
              type="button"
              aria-pressed={active === t}
              key={t}
              type="button"
              aria-pressed={active === t}
              aria-label={`Filter by ${t}`}
              onClick={() => setActive(t)}
              style={filterStyle(active === t)}
            >
              {t}
            </button>
          ))}
        </div>
        <WritingList posts={shown} />
      </section>
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
    background: on ? "var(--color-accent-100)" : "transparent",
    color: on ? "var(--color-accent-strong)" : "var(--color-text-muted)",
  };
}
