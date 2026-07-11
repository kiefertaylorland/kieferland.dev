---
title: "What agentic QA looks like when you check the commit log"
date: 2026-07-08
tags: ["qa", "agents"]
description: "Real commits from my own projects, not a claim about what agents can do."
---

"Agents can do QA now" is a cheap claim. A commit log either backs it up or it doesn't. Here's what a two-week window across my own projects actually shows — no rounding, no invented percentages, everything below links to the real commit.

## Coverage that closes a queue, not a percentage

On `payment-chaser`, a small invoice-chasing tool I run myself, the agent worked through a backlog of deferred hardening work as a defined, numbered queue — not an open-ended "improve coverage" prompt:

- [`0863d60`](https://github.com/kiefertaylorland/payment-chaser/commit/0863d60) — v0.3.0 — closed all 12 deferred TODO items in one release.
- [`ab0de8d`](https://github.com/kiefertaylorland/payment-chaser/commit/ab0de8d) — Coverage hardening: added edge-case tests, then explicitly marked the branches that were genuinely unreachable instead of chasing them for a number.

That second commit matters more than the first. The easy failure mode for agent-driven coverage work is padding the percentage with tests that assert nothing. Marking a branch unreachable is a judgment call, and it's the kind of judgment call that's easy to verify after the fact — you can go read the branch.

## The same bugs, found as a cluster

Also in `payment-chaser` — a money-moving app, so these are the bugs that actually matter — three correctness fixes landed close together, all in the same family of problem (races and timing on the send/reconcile path):

- [`d6ac9c4`](https://github.com/kiefertaylorland/payment-chaser/commit/d6ac9c4) — `commitSent` must not clear paid/bounce halts on reconcile — the safety gate that stops a double-send.
- [`445b480`](https://github.com/kiefertaylorland/payment-chaser/commit/445b480) — Fixed fencing-token precision and a stale-status write-back gate in the send path.
- [`9d2719f`](https://github.com/kiefertaylorland/payment-chaser/commit/9d2719f) — Replaced ad hoc comparisons with a shared constant-time compare across auth paths.

One fix in isolation is normal engineering. Three related fixes in a short window is what it looks like when something is actually reviewing the money-critical paths for a specific failure class, not just running a linter.

## Mutation testing isn't tied to one stack

`meguru`, a spaced-repetition CLI I've been building in Go, got the same treatment as a TypeScript project would:

- [`3202114`](https://github.com/kiefertaylorland/meguru/commit/3202114) — Strengthened tests based on gremlins mutation-testing results — gremlins is Go's mutation-testing tool, the equivalent of Stryker for a JS/TS codebase.
- [`750217b`](https://github.com/kiefertaylorland/meguru/commit/750217b) — Implemented the full M1 walking skeleton — storage, deck, scheduler, review, and both a TUI and plain CLI — with tests included in the same commit.

That second commit is the breadth claim in miniature: five subsystems, shipped together, tested together, in one pass — not five separate PRs spread over a week.

## What I'm not claiming

I also do this at my day job, on a larger production app, with a weekly mutation-testing gate enforced in CI and a written, risk-based test strategy — that work is documented in general terms on my [About page](/about), without naming the codebase, since it isn't mine to publish commit-by-commit. Everything with a linked hash above is a personal project I can point to directly.

<div class="callout callout-note">
  <div class="callout-title">The actual claim</div>
  <div class="callout-body">Not "agents write perfect tests." Just: given a defined backlog, a real bug class, or a new codebase in an unfamiliar language, an agent working under CI gates closed the queue, found the related bugs, and used the right tool for the stack — and every one of those sentences links to a commit you can go read.</div>
</div>

<div class="metric-row">
  <div class="metric"><span class="metric-value">12</span><span class="metric-label">Deferred TODOs closed in one release</span></div>
  <div class="metric metric-accent"><span class="metric-value">2</span><span class="metric-label">Languages, one mutation-testing discipline</span></div>
  <div class="metric metric-pass"><span class="metric-value">6</span><span class="metric-label">Side projects shipped this year</span><span class="metric-sub">per my About page</span></div>
</div>

[← Back home](/)
