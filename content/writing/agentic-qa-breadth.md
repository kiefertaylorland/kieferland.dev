---
title: "What agentic QA actually looks like when you check the commit log"
date: 2026-07-10
tags: ["qa", "agents"]
description: "Real commits from my own projects; not a claim about what agents can do."
---

Here's what a two-week window across my own projects actually shows.

No rounding, no invented percentages, everything below links to the real commit.

## Coverage that closes a queue, not a percentage

On `payment-chaser`, a small invoice-chasing tool I built myself, the agent worked through a backlog of deferred hardening work as a defined, numbered queue — not an open-ended "improve coverage" prompt:

- [`0863d60`](https://github.com/kiefertaylorland/payment-chaser/commit/0863d60) — closed 12 TODO items in one pass.
- [`ab0de8d`](https://github.com/kiefertaylorland/payment-chaser/commit/ab0de8d) — Coverage hardening: added edge-case tests, then explicitly marked the branches that were genuinely unreachable instead of chasing them for a number.

The second commit matters more than the first. The easy failure mode is padding the percentage with tests that assert nothing.

## The same bugs, found as a cluster

`payment-chaser` is a money-moving app, so these are the bugs that actually matter. Three correctness fixes, all in the same family of problem (races and timing on the send/reconcile path):

- [`d6ac9c4`](https://github.com/kiefertaylorland/payment-chaser/commit/d6ac9c4) — `commitSent` must not clear paid/bounce halts on reconcile; the safety gate that stops a double-send.
- [`445b480`](https://github.com/kiefertaylorland/payment-chaser/commit/445b480) — Fixed fencing-token precision and a stale-status write-back gate in the send path.
- [`9d2719f`](https://github.com/kiefertaylorland/payment-chaser/commit/9d2719f) — Replaced ad hoc comparisons with a shared constant-time compare across auth paths.

Three related fixes in a short window is what it looks like when systematically reviewing money-critical paths for a specific failure class, not just running a linter.

## Mutation testing isn't tied to one stack

`meguru`, a spaced-repetition CLI I've been building in Go, got the same treatment as a TypeScript project would:

- [`3202114`](https://github.com/kiefertaylorland/meguru/commit/3202114) — Strengthened tests based on Gremlins mutation-testing results. Gremlins is Go's mutation-testing tool, the equivalent of Stryker for a JS/TS codebase.
- [`750217b`](https://github.com/kiefertaylorland/meguru/commit/750217b) — Implemented the minimum viable product (MVP) — storage, deck, scheduler, review, and both a TUI and plain CLI, including tests in the same commit.

That second commit is the breadth: five subsystems, shipped together, tested together, in one pass. Not five separate PRs spread over a week.

## What I'm not claiming

I also do this at my day job, on a larger production app, with a weekly mutation-testing gate enforced in CI and a written, risk-based test strategy. That work is documented in general terms on my [About page](/about), without naming the codebase, since it isn't mine to publish commit-by-commit. Everything with a linked hash above is a personal project I can point to directly.

<div class="callout callout-note">
  <div class="callout-title">The actual claim</div>
  <div class="callout-body">Not "agents write perfect tests." Just: given a defined backlog, a real bug class, or a new codebase, an agent working under CI gates closed the queue, found the related bugs, and used the right tool for the stack.</div>
</div>

<div class="metric-row">
  <div class="metric"><span class="metric-value">12</span><span class="metric-label">Deferred TODOs closed in one release</span></div>
  <div class="metric metric-accent"><span class="metric-value">2</span><span class="metric-label">Languages, one mutation-testing discipline</span></div>
  <div class="metric metric-pass"><span class="metric-value">6</span><span class="metric-label">Side projects shipped this year</span><span class="metric-sub">per my About page</span></div>
</div>

[← Back home](/)
