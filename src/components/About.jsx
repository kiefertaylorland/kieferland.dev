import React from "react";
import { Button } from "../lib/ds/core/Button.jsx";
import { Metric } from "../lib/ds/data/Metric.jsx";
import { Callout } from "../lib/ds/feedback/Callout.jsx";
import { Stamp } from "../lib/ds/brand/Stamp.jsx";
import { IconGitHub, IconMail } from "../lib/ds/icons.jsx";

const TIMELINE = [
  {
    year: "2026",
    text: "Building the verification layer — evals, gates, and audit trails for agent-built software.",
  },
  {
    year: "2024",
    text: "Led quality for an agentic code platform; shipped the first merge-gate that required signed evidence.",
  },
  {
    year: "2021",
    text: "Backend + infra. Learned that the test suite is the only documentation anyone trusts.",
  },
];

export function About() {
  return (
    <div style={{ padding: "var(--space-12) 0 var(--space-16)" }}>
      <div
        style={{
          display: "flex",
          gap: "var(--space-8)",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
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
              marginTop: "var(--space-2)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              color: "var(--color-accent)",
            }}
          >
            AI Quality &amp; Evals Engineer
          </p>
          <p
            style={{
              marginTop: "var(--space-5)",
              fontSize: "var(--text-lg)",
              lineHeight: "var(--leading-relaxed)",
              maxWidth: "40rem",
            }}
          >
            I work on the boring, load-bearing part of AI software: the checks
            that let a person put their name on work they did not type. The
            thesis is simple — as agents write more of the code, the scarce
            resource becomes verified trust, and someone has to build the
            machinery that produces it.
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-3)",
              marginTop: "var(--space-6)",
            }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                window.location.href = "https://github.com/kiertaylorland";
              }}
            >
              <IconGitHub size={16} /> GitHub
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                window.location.href = "mailto:kiefer.land@tcwglobal.com";
              }}
            >
              <IconMail size={16} /> Email
            </Button>
          </div>
        </div>
        <Stamp
          glyph="証"
          label="verified"
          size={96}
          rotate={-8}
          style={{ flexDirection: "column", gap: "var(--space-3)" }}
        />
      </div>

      <section
        style={{
          marginTop: "var(--space-12)",
          display: "flex",
          gap: "var(--space-12)",
          flexWrap: "wrap",
          paddingBottom: "var(--space-10)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Metric value="5+" label="Years in quality" />
        <Metric value="7" label="Gates in production" tone="accent" />
        <Metric value="0" label="Escapes I'll admit to" tone="pass" />
      </section>

      <section style={{ marginTop: "var(--space-10)" }}>
        <h2
          style={{
            margin: "0 0 var(--space-6)",
            fontSize: "var(--text-2xl)",
            fontWeight: 600,
          }}
        >
          Track record
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {TIMELINE.map((t, i) => (
            <div
              key={t.year}
              style={{
                display: "flex",
                gap: "var(--space-6)",
                padding: "var(--space-4) 0",
                borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-accent)",
                  width: "3rem",
                  flexShrink: 0,
                }}
              >
                {t.year}
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--text-base)",
                  color: "var(--color-text)",
                  lineHeight: "var(--leading-normal)",
                  maxWidth: "40rem",
                }}
              >
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "var(--space-10)" }}>
        <Callout tone="pass" title="Working principle">
          Trust doesn't scale; evidence does. Every claim this site makes about
          my work is meant to be something you could, in principle, replay and
          check.
        </Callout>
      </section>
    </div>
  );
}
