import React from "react";
import { WritingList } from "./Writing.jsx";

export function Home() {
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
          AI Quality &amp; Evals Engineer, writing about building the
          verification systems that let teams trust AI-built software.
        </p>
      </section>

      <section style={{ padding: "var(--space-10) 0 var(--space-16)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "var(--space-5)",
          }}
        >
          <h2
            style={{ margin: 0, fontSize: "var(--text-2xl)", fontWeight: 600 }}
          >
            Writing
          </h2>
          <a
            href="/writing"
            style={{ fontSize: "var(--text-sm)", color: "var(--color-accent)" }}
          >
            All posts →
          </a>
        </div>
        <WritingList limit={5} />
      </section>
    </div>
  );
}
