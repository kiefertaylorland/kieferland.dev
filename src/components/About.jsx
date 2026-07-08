import React from "react";
import { Button } from "../lib/ds/core/Button.jsx";
import { Metric } from "../lib/ds/data/Metric.jsx";
import { Callout } from "../lib/ds/feedback/Callout.jsx";
import { Stamp } from "../lib/ds/brand/Stamp.jsx";
import { IconGitHub, IconMail, IconArrowUpRight } from "../lib/ds/icons.jsx";

const TIMELINE = [
  {
    year: "2026",
    text: "Scaling QA throughput with Claude Code agentic workflows — custom /ship and /loop skills and MCP integrations, including an eval-graded custom skill scoring 100% vs. a 61.9% baseline. Grew an internal Next.js/Supabase app's test suite from 316 to 940+ tests at 100% line+branch coverage on changed files, hardened with Stryker mutation testing (80% → ~94%), plus a live-database RLS integration suite. Shipped 6 side projects this year using autonomous agent pipelines with full CI gate discipline (+53K verified lines merged in a single month).",
  },
  {
    year: "2025",
    text: "Built an AI-assisted test case generation system in ChatGPT with human oversight for requirements analysis, test planning, and scenario authoring — improving test coverage 35%. Used GitHub Copilot and VS Code Agent Mode to cut regression cycle time 50%.",
  },
  {
    year: "2024",
    text: "Promoted to Software QA Engineer I at TCWGlobal — expanded API automation coverage 30% → 70% (Postman/Newman, Jenkins CI) and E2E automation 20% → 80% (Playwright). Earned an M.S. in Cybersecurity & Information Assurance from Western Governors University.",
  },
  {
    year: "2023",
    text: "Promoted to Software QA Analyst at TCWGlobal (Oct) — authored 150+ functional and edge-case regression scenarios and led QA through a PHP → Next.js/NestJS migration with zero rollbacks. Earned a B.S. in Cybersecurity & Information Assurance from Western Governors University.",
  },
  {
    year: "2022",
    text: "Started at TCWGlobal as an IT Support Technician (Feb) — built an IT asset management system (70% better inventory accuracy) and managed the lifecycle of 150+ devices with NIST 800-88–compliant data disposal. Promoted to Junior System Administrator (Dec) — automated MacBook provisioning with Jamf (60% faster new-hire setup) and led security hardening across 250+ Windows/Linux systems, sustaining 99%+ uptime.",
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
                window.location.href = "https://github.com/kiefertaylorland";
              }}
            >
              <IconGitHub size={16} /> GitHub
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                window.location.href = "https://linkedin.com/in/kieferland";
              }}
            >
              <IconArrowUpRight size={16} /> LinkedIn
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                window.location.href = "mailto:kiefertaylorland@gmail.com";
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
        <Metric value="4+" label="Years at TCWGlobal" />
        <Metric value="7" label="Security certifications" tone="accent" />
        <Metric value="0" label="QA-attributed rollbacks" tone="pass" />
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
                  width: "4.5rem",
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
