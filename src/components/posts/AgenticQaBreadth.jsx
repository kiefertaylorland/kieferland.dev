import React from "react";
import { Callout } from "../../lib/ds/feedback/Callout.jsx";
import { Metric } from "../../lib/ds/data/Metric.jsx";
import { IconArrowUpRight } from "../../lib/ds/icons.jsx";

function Commit({ href, hash, children }) {
  return (
    <li style={{ marginBottom: "var(--space-3)" }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-accent)",
          textDecoration: "none",
        }}
      >
        {hash}
      </a>{" "}
      <span style={{ color: "var(--color-text)" }}>{children}</span>
    </li>
  );
}

export function AgenticQaBreadth() {
  return (
    <article style={{ padding: "var(--space-10) 0 var(--space-16)" }}>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-text-faint)",
          margin: "0 0 var(--space-3)",
        }}
      >
        Jul 8, 2026 · 4 min
      </p>
      <h1
        style={{
          margin: 0,
          fontSize: "var(--text-3xl)",
          fontWeight: 600,
          letterSpacing: "var(--tracking-tight)",
          maxWidth: "38rem",
        }}
      >
        What agentic QA looks like when you check the commit log
      </h1>
      <p
        style={{
          marginTop: "var(--space-5)",
          fontSize: "var(--text-lg)",
          lineHeight: "var(--leading-relaxed)",
          maxWidth: "38rem",
        }}
      >
        "Agents can do QA now" is a cheap claim. A commit log either backs it
        up or it doesn't. Here's what a two-week window across my own
        projects actually shows — no rounding, no invented percentages,
        everything below links to the real commit.
      </p>

      <section style={{ marginTop: "var(--space-10)" }}>
        <h2
          style={{
            margin: "0 0 var(--space-4)",
            fontSize: "var(--text-2xl)",
            fontWeight: 600,
          }}
        >
          Coverage that closes a queue, not a percentage
        </h2>
        <p
          style={{
            fontSize: "var(--text-base)",
            lineHeight: "var(--leading-normal)",
            maxWidth: "40rem",
          }}
        >
          On <code>payment-chaser</code>, a small invoice-chasing tool I run
          myself, the agent worked through a backlog of deferred hardening
          work as a defined, numbered queue — not an open-ended "improve
          coverage" prompt:
        </p>
        <ul style={{ marginTop: "var(--space-4)", paddingLeft: "var(--space-5)" }}>
          <Commit
            href="https://github.com/kiefertaylorland/payment-chaser/commit/0863d60"
            hash="0863d60"
          >
            v0.3.0 — closed all 12 deferred TODO items in one release.
          </Commit>
          <Commit
            href="https://github.com/kiefertaylorland/payment-chaser/commit/ab0de8d"
            hash="ab0de8d"
          >
            Coverage hardening: added edge-case tests, then explicitly
            marked the branches that were genuinely unreachable instead of
            chasing them for a number.
          </Commit>
        </ul>
        <p
          style={{
            fontSize: "var(--text-base)",
            lineHeight: "var(--leading-normal)",
            maxWidth: "40rem",
          }}
        >
          That second commit matters more than the first. The easy failure
          mode for agent-driven coverage work is padding the percentage with
          tests that assert nothing. Marking a branch unreachable is a
          judgment call, and it's the kind of judgment call that's easy to
          verify after the fact — you can go read the branch.
        </p>
      </section>

      <section style={{ marginTop: "var(--space-10)" }}>
        <h2
          style={{
            margin: "0 0 var(--space-4)",
            fontSize: "var(--text-2xl)",
            fontWeight: 600,
          }}
        >
          The same bugs, found as a cluster
        </h2>
        <p
          style={{
            fontSize: "var(--text-base)",
            lineHeight: "var(--leading-normal)",
            maxWidth: "40rem",
          }}
        >
          Also in <code>payment-chaser</code> — a money-moving app, so these
          are the bugs that actually matter — three correctness fixes landed
          close together, all in the same family of problem (races and
          timing on the send/reconcile path):
        </p>
        <ul style={{ marginTop: "var(--space-4)", paddingLeft: "var(--space-5)" }}>
          <Commit
            href="https://github.com/kiefertaylorland/payment-chaser/commit/d6ac9c4"
            hash="d6ac9c4"
          >
            <code>commitSent</code> must not clear paid/bounce halts on
            reconcile — the safety gate that stops a double-send.
          </Commit>
          <Commit
            href="https://github.com/kiefertaylorland/payment-chaser/commit/445b480"
            hash="445b480"
          >
            Fixed fencing-token precision and a stale-status write-back
            gate in the send path.
          </Commit>
          <Commit
            href="https://github.com/kiefertaylorland/payment-chaser/commit/9d2719f"
            hash="9d2719f"
          >
            Replaced ad hoc comparisons with a shared constant-time compare
            across auth paths.
          </Commit>
        </ul>
        <p
          style={{
            fontSize: "var(--text-base)",
            lineHeight: "var(--leading-normal)",
            maxWidth: "40rem",
          }}
        >
          One fix in isolation is normal engineering. Three related fixes in
          a short window is what it looks like when something is actually
          reviewing the money-critical paths for a specific failure class,
          not just running a linter.
        </p>
      </section>

      <section style={{ marginTop: "var(--space-10)" }}>
        <h2
          style={{
            margin: "0 0 var(--space-4)",
            fontSize: "var(--text-2xl)",
            fontWeight: 600,
          }}
        >
          Mutation testing isn't tied to one stack
        </h2>
        <p
          style={{
            fontSize: "var(--text-base)",
            lineHeight: "var(--leading-normal)",
            maxWidth: "40rem",
          }}
        >
          <code>meguru</code>, a spaced-repetition CLI I've been building in
          Go, got the same treatment as a TypeScript project would:
        </p>
        <ul style={{ marginTop: "var(--space-4)", paddingLeft: "var(--space-5)" }}>
          <Commit
            href="https://github.com/kiefertaylorland/meguru/commit/3202114"
            hash="3202114"
          >
            Strengthened tests based on gremlins mutation-testing results —
            gremlins is Go's mutation-testing tool, the equivalent of
            Stryker for a JS/TS codebase.
          </Commit>
          <Commit
            href="https://github.com/kiefertaylorland/meguru/commit/750217b"
            hash="750217b"
          >
            Implemented the full M1 walking skeleton — storage, deck,
            scheduler, review, and both a TUI and plain CLI — with tests
            included in the same commit.
          </Commit>
        </ul>
        <p
          style={{
            fontSize: "var(--text-base)",
            lineHeight: "var(--leading-normal)",
            maxWidth: "40rem",
          }}
        >
          That second commit is the breadth claim in miniature: five
          subsystems, shipped together, tested together, in one pass — not
          five separate PRs spread over a week.
        </p>
      </section>

      <section style={{ marginTop: "var(--space-10)" }}>
        <h2
          style={{
            margin: "0 0 var(--space-4)",
            fontSize: "var(--text-2xl)",
            fontWeight: 600,
          }}
        >
          What I'm not claiming
        </h2>
        <p
          style={{
            fontSize: "var(--text-base)",
            lineHeight: "var(--leading-normal)",
            maxWidth: "40rem",
          }}
        >
          I also do this at my day job, on a larger production app, with a
          weekly mutation-testing gate enforced in CI and a written,
          risk-based test strategy — that work is documented in general
          terms on my{" "}
          <a href="/about" style={{ color: "var(--color-accent)" }}>
            About page
          </a>
          , without naming the codebase, since it isn't mine to publish
          commit-by-commit. Everything with a linked hash above is a
          personal project I can point to directly.
        </p>
        <div style={{ marginTop: "var(--space-6)" }}>
          <Callout tone="note" title="The actual claim">
            Not "agents write perfect tests." Just: given a defined backlog,
            a real bug class, or a new codebase in an unfamiliar language,
            an agent working under CI gates closed the queue, found the
            related bugs, and used the right tool for the stack — and every
            one of those sentences links to a commit you can go read.
          </Callout>
        </div>
      </section>

      <section
        style={{
          marginTop: "var(--space-10)",
          paddingTop: "var(--space-8)",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          gap: "var(--space-12)",
          flexWrap: "wrap",
        }}
      >
        <Metric value="12" label="Deferred TODOs closed in one release" />
        <Metric value="2" label="Languages, one mutation-testing discipline" tone="accent" />
        <Metric value="6" label="Side projects shipped this year" tone="pass" sub="per my About page" />
      </section>

      <p style={{ marginTop: "var(--space-10)" }}>
        <a
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            color: "var(--color-accent)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <IconArrowUpRight size={14} style={{ transform: "rotate(180deg)" }} />{" "}
          Back home
        </a>
      </p>
    </article>
  );
}
