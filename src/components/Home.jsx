import React from "react";
import { Button } from "../lib/ds/core/Button.jsx";
import { Card } from "../lib/ds/data/Card.jsx";
import { Badge } from "../lib/ds/data/Badge.jsx";
import { Metric } from "../lib/ds/data/Metric.jsx";
import { Tag } from "../lib/ds/data/Tag.jsx";
import { Stamp } from "../lib/ds/brand/Stamp.jsx";
import { IconArrowRight, IconArrowUpRight } from "../lib/ds/icons.jsx";
import { WritingList } from "./Writing.jsx";
import { PROJECTS } from "../lib/content/projects.js";

const FLAGSHIPS = ["test-agent", "playwright-framework"];

export function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          display: "flex",
          gap: "var(--space-8)",
          alignItems: "flex-start",
          padding: "var(--space-16) 0 var(--space-12)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              marginBottom: "var(--space-5)",
            }}
          >
            <Badge tone="accent">検証 · verification layer</Badge>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "var(--text-4xl)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-tight)",
              lineHeight: 1.1,
            }}
          >
            One careful human signs off on software built by many agents.
          </h1>
          <p
            style={{
              marginTop: "var(--space-5)",
              fontSize: "var(--text-lg)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--leading-normal)",
              maxWidth: "34rem",
            }}
          >
            I build the evals, gates, and audit trails that make that signature
            safe. AI Quality &amp; Evals Engineer — evidence over trust.
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-3)",
              marginTop: "var(--space-8)",
            }}
          >
            <Button
              size="lg"
              onClick={() => {
                window.location.href = `/projects/${FLAGSHIPS[0]}`;
              }}
            >
              See the flagship <IconArrowRight size={16} />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                window.location.href = "/writing";
              }}
            >
              Read the writing
            </Button>
          </div>
        </div>
        <div style={{ flexShrink: 0, paddingTop: "var(--space-4)" }}>
          <Stamp glyph="検" size={128} rotate={-8} />
        </div>
      </section>

      {/* Metrics band */}
      <section
        style={{
          display: "flex",
          gap: "var(--space-12)",
          padding: "var(--space-10) 0",
          borderBottom: "1px solid var(--color-border)",
          flexWrap: "wrap",
        }}
      >
        <Metric
          value="70%"
          label="API coverage"
          tone="pass"
          sub="Postman/Newman, up from 30%"
        />
        <Metric
          value="80%"
          label="E2E coverage"
          tone="pass"
          sub="Playwright, up from 20%"
        />
        <Metric
          value="94%"
          label="Mutation score"
          tone="accent"
          sub="Stryker, up from 80%"
        />
        <Metric value="0" label="QA-attributed rollbacks" sub="during major modernization cycles" />
      </section>

      {/* Flagship projects */}
      <section style={{ padding: "var(--space-12) 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "var(--space-6)",
          }}
        >
          <h2
            style={{ margin: 0, fontSize: "var(--text-2xl)", fontWeight: 600 }}
          >
            Flagship projects
          </h2>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-faint)",
              textTransform: "uppercase",
              letterSpacing: "var(--tracking-wide)",
            }}
          >
            the verification stack
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-5)",
          }}
        >
          {FLAGSHIPS.map((id) => {
            const p = PROJECTS[id];
            const allPass = p.gates.every((g) => g.status === "pass");
            return (
              <a
                key={id}
                href={`/projects/${id}`}
                style={{ textDecoration: "none", color: "inherit", height: "100%" }}
              >
                <Card
                  interactive
                  padding="var(--space-6)"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-3)",
                      }}
                    >
                      <Stamp
                        glyph={p.kanji}
                        size={40}
                        rotate={-6}
                        tone={allPass ? "pass" : "accent"}
                      />
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "var(--text-xl)",
                          fontWeight: 600,
                        }}
                      >
                        {p.title}
                      </h3>
                    </div>
                    <IconArrowUpRight
                      size={18}
                      style={{ color: "var(--color-text-faint)" }}
                    />
                  </div>
                  <p
                    style={{
                      margin: "0 0 var(--space-5)",
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text-muted)",
                      lineHeight: "var(--leading-normal)",
                      flex: 1,
                    }}
                  >
                    {p.summary.split(".")[0] + "."}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", gap: "var(--space-2)" }}>
                      {p.stack.slice(0, 3).map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <Badge tone={allPass ? "pass" : "warn"}>
                      {allPass ? "all gates pass" : "awaiting sign-off"}
                    </Badge>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>
      </section>

      {/* Latest writing teaser */}
      <section style={{ padding: "0 0 var(--space-16)" }}>
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
            Latest writing
          </h2>
          <a
            href="/writing"
            style={{ fontSize: "var(--text-sm)", color: "var(--color-accent)" }}
          >
            All posts →
          </a>
        </div>
        <WritingList limit={3} />
      </section>
    </div>
  );
}
