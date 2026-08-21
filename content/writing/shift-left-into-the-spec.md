---
title: "Shift Left, For Real: Testing and Security Belong in the Spec"
date: 2026-08-20
tags: ["QA", "testing", "security", "AI", "shift-left"]
description: "The test and security plan belongs in the spec, not the PR. What changed when I moved it there."
---

## Background

The [risk-based framework](/writing/lean-sqa-framework/) I built scores and gates test suites. The [AI extension](/writing/testing-what-you-cant-enumerate/) does the same for agents and LLM features. Both answer *how much testing, and where does it block a merge.*

Neither answers *when.*

## The Problem

Lately, *when* has been the problem.

A feature ships, the PR lands, and that's the first time QA sees it. Testing becomes archaeology: reconstruct what the feature was supposed to do from the diff, then work out what wasn't tested. The finding is always the same. The happy path got built and got tested, and nothing else did. Negative cases, edge cases, the security boundary: all discovered in review, all retrofitted under merge pressure, all one release behind where they should have been.

That's chasing the PR. The rubric was right. The location was wrong.

## The Solution

Same rubric, moved upstream. The test and security plan goes into the spec or the ticket before a developer opens an editor: happy path, negative path, edge cases, and security, scored and scoped the way the framework already scores everything else. Data access × action reversibility × external visibility, highest axis sets the floor. A read-only feature over sensitive data still earns the full security pass. A low-risk internal tool gets a short plan and an owner, not a rubber stamp.

Three references do distinct jobs here. NIST AI RMF supplies the risk posture (govern, map, measure, manage) applied to a feature before it's built instead of audited after. The Testing Pyramid shapes how the plan distributes across unit, integration, and end-to-end, instead of defaulting to "we'll click through it manually." STLC anchors where in the lifecycle this happens: requirements and design, not post-merge review.

I turned this into a Claude Code skill. It either writes the plan for a bare brief or audits one already sitting in a spec, filling in a coverage matrix across those four categories per test layer. I benchmarked it against not using it on a small set of scored, synthetic eval specs, with no real product or client data anywhere near it. Pass rate went from 62% to 92%. It costs roughly three times the tokens and no meaningful time.

That trade buys catching a missing token-revocation test, or a security property that exists only as "verified manually," while it's still a paragraph in a spec instead of a regression in production. It's the same audit as before, run against words on a page rather than a stranger's PR.

## The Rulebooks

This week the plan stopped being a skill I run and became rules a repo enforces.

One docs-only PR on a private repo I work in: 427 lines added, three removed. Two rulebooks at the root, one for testing and one for AI and agent governance, a draft ADR proposing the test stack, and four small edits to wire them in.

Both rulebooks sit in the read order the coding agents load before they do any work, and each one ends in a checklist the review agents check every PR against. The PR template now asks for three things under Tests: a TDD evidence block (the failing output verbatim, then the passing output, same command both times), a scenario matrix with one row per changed behavior and a column each for happy, negative, edge, and security, and the risk tier.

No numeric coverage gate, and there won't be one. A percentage measures lines touched. The matrix measures scenarios someone thought about.

The tier is defined once and used by both files. Three axes, scored 0 to 2: data access scope, action reversibility, external visibility. The tier decides how deep the matrix goes.

- Tier 0: happy path plus one negative.
- Tier 1: the full matrix, no N/A cell left unexplained.
- Tier 2: Tier 1 plus a live-suite run and denial tests.
- Tier 3: Tier 2 plus adversarial cases, an audit-log assertion, and a human sign-off recorded in the PR before merge.

Denial gets proven at the layer that enforces it, as the wrong principal, through the real path: row-level security with the identity variables set, the verifier rejecting the bad token. A missing button is not a security test.

The AI rulebook splits in two. Part A binds every PR today and governs the agents working on the repo: least privilege per task tier, no real PII in an agent's context, no agent-triggered merge or deploy, and anything an agent reads from outside the repo treated as untrusted input. Part B binds nothing yet. It activates on the first PR that puts a model call in shipped product code, and it's written now so that PR inherits the OWASP LLM Top 10 mapping, the pinned eval set, fairness testing for anything that ranks people, and prompts-as-code change management, instead of inventing all of it on a deadline.

That's the same move as putting the plan in the spec, one level up. Write the rules while nothing is installed and the reversal cost is zero.
