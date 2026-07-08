import React from "react";
import { Button } from "../lib/ds/core/Button.jsx";
import { Card } from "../lib/ds/data/Card.jsx";
import { Badge } from "../lib/ds/data/Badge.jsx";
import { Tag } from "../lib/ds/data/Tag.jsx";
import { CodeBlock } from "../lib/ds/data/CodeBlock.jsx";
import { Callout } from "../lib/ds/feedback/Callout.jsx";
import { Stamp } from "../lib/ds/brand/Stamp.jsx";
import { GateStatus } from "../lib/ds/brand/GateStatus.jsx";
import { IconGitHub, IconCheck } from "../lib/ds/icons.jsx";
import { PROJECTS } from "../lib/content/projects.js";

const GATE_CONFIG = `gate: evals
require:
  pass_rate: ">= 0.98"
  regressions: 0
  human_signoff: true
quarantine:
  flaky: allow   # never blocks merge`;

export function ProjectDetail({ id }) {
  const p = PROJECTS[id] || PROJECTS.gatekeeper;
  const [signed, setSigned] = React.useState(false);

  const gates = p.gates.map((g) =>
    signed && g.status === "pending"
      ? { ...g, status: "pass", value: "signed", detail: "approved just now" }
      : g,
  );
  const allClear = gates.every((g) => g.status === "pass");

  return (
    <div style={{ padding: "var(--space-8) 0 var(--space-16)" }}>
      <a
        href="/"
        style={{
          display: "inline-block",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-muted)",
          marginBottom: "var(--space-6)",
          textDecoration: "none",
        }}
      >
        ← back
      </a>

      {/* Header */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-6)",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              gap: "var(--space-2)",
              marginBottom: "var(--space-4)",
            }}
          >
            <Badge tone="neutral">{p.year}</Badge>
            <Badge tone="neutral">{p.role}</Badge>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "var(--text-4xl)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            {p.title}
          </h1>
          <p
            style={{
              marginTop: "var(--space-3)",
              fontSize: "var(--text-xl)",
              color: "var(--color-text-muted)",
            }}
          >
            {p.tagline}
          </p>
        </div>
        <Stamp
          glyph={p.kanji}
          size={104}
          rotate={-8}
          tone={allClear ? "pass" : "accent"}
        />
      </div>

      <p
        style={{
          marginTop: "var(--space-6)",
          fontSize: "var(--text-lg)",
          lineHeight: "var(--leading-relaxed)",
          maxWidth: "42rem",
        }}
      >
        {p.summary}
      </p>

      <div
        style={{
          display: "flex",
          gap: "var(--space-2)",
          marginTop: "var(--space-5)",
        }}
      >
        {p.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      {/* Gate panel */}
      <section style={{ marginTop: "var(--space-12)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "var(--space-4)",
          }}
        >
          <h2
            style={{ margin: 0, fontSize: "var(--text-2xl)", fontWeight: 600 }}
          >
            Verification gates
          </h2>
          <Badge tone={allClear ? "pass" : "warn"}>
            {allClear ? "ready to sign" : "awaiting sign-off"}
          </Badge>
        </div>
        <Card padding="var(--space-4)">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            {gates.map((g) => (
              <GateStatus key={g.name} {...g} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "var(--space-5)",
              paddingTop: "var(--space-5)",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              {allClear
                ? "All gates green. Your signature will be recorded in the audit trail."
                : "Sign off to record approval and turn the pending gate green."}
            </span>
            <Button onClick={() => setSigned(true)} disabled={signed}>
              {signed ? (
                <>
                  Signed <IconCheck size={16} />
                </>
              ) : (
                "Sign off"
              )}
            </Button>
          </div>
        </Card>
      </section>

      {/* Config + note */}
      <section
        style={{
          marginTop: "var(--space-12)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-6)",
          alignItems: "start",
        }}
      >
        <div>
          <h3
            style={{
              margin: "0 0 var(--space-3)",
              fontSize: "var(--text-lg)",
              fontWeight: 600,
            }}
          >
            Gate config
          </h3>
          <CodeBlock filename="gatekeeper.yml">{GATE_CONFIG}</CodeBlock>
        </div>
        <div>
          <h3
            style={{
              margin: "0 0 var(--space-3)",
              fontSize: "var(--text-lg)",
              fontWeight: 600,
            }}
          >
            Design note
          </h3>
          <Callout tone="note" title="Why a gate, not a review">
            A review is a person reading diffs and hoping. A gate refuses to
            merge until the evidence exists — the human signs the evidence, not
            the code.
          </Callout>
          <div style={{ marginTop: "var(--space-4)" }}>
            <a
              href="https://github.com/kiertaylorland"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "var(--text-sm)",
                color: "var(--color-accent)",
                textDecoration: "none",
              }}
            >
              <IconGitHub size={16} /> View source
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
