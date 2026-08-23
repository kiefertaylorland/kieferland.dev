---
title: "Lean SQA in a Regulated Industry: Twenty Test Categories, Five Phases"
date: 2026-07-11
tags: ["QA", "testing", "frameworks", "compliance", "appsec"]
description: "A risk-based testing framework for regulated products: twenty test categories, a five-phase workflow, and a rubric that decides where QA effort goes."
---

## Background

Over the last week I've been building a risk-based framework for testing software products and documenting evidence for audits.

The products handle PII, worker and employer data, payrolling, staffing and placement, benefits, prescreening, compliance, Vendor Management Systems (VMSs), Managed Service Providers (MSPs), and all kinds of other fun stuff. 

They serve clients in the US and in jurisdictions across the EU, the UK, and Canada.

## The Problem

Testing had to keep pace with developers who had just picked up agentic coding tools, and it couldn't.

Until the QA team adopted those tools too, testing our products was mostly manual. 

Regression testing was painful and slow, taking days of a small QA team's time. 

Automation was close to non-existent: a handful of unit and UI tests that never ran in CI, so they caught no regressions and told us nothing about quality.

## The Solution

Manual testing got deprioritized, not eliminated. Risk-based automation went first.

Working from the test pyramid and from functional and non-functional testing practice, I built a single workflow with five phases:

- Classify: High-Risk or Standard. HR products are High-Risk by default.
- Measure: 20 test categories from the tool output.
- Score: Invest / Keep / Hold / Drop.
- Gate: test suites earn merge-blocking status after an advisory period. The smoke suite blocks from day one.
- Govern: dual sign-off, escalation paths, and quarterly reviews.

## The Defaults

Every project includes the following default test suites:

- Unit
- Security: role-based access control (RBAC)
- UI: smoke and E2E
- Regression

## The Definitions

| **Category** | **Definition** | **Coverage signal to report** |
| :--- | :--- | :--- |
| **Unit** | Smallest testable units in isolation | Line/branch % (v8 or equivalent) |
| **Integration** | Components working together. Name the layers, because they test different things: database (RLS/pgTAP), service (internal API), cross-system (payroll/identity connectors). Multi-jurisdiction and EOR connectors are a distinct sub-layer; decompose and report per jurisdiction in the audit fill | % of entities or integration points covered, per layer |
| **Integration — Third-Party Data Handling** | Compliance posture of data exchanged with external vendors (payroll processors, background-check vendors, E-Verify, tax-filing APIs): encryption in transit, audit trail of what was sent and received, retention alignment, SLA verification. Distinct from whether the connector works | Drop-by-default for early products, but the row must exist so the question has a home when a vendor integration ships |
| **System / E2E** | Full user journeys through the real stack (Playwright) | % of high-risk modules with ≥1 spec |
| **Smoke** | Critical-path checks pre-release | Absorbs Sanity by default. Split only if the deploy pipeline diverges from the release pipeline |
| **API / Interface** | Merged category: route-level functional behavior and contract/schema validation | % of routes tested; schema validation present Y/N |
| **Regression** | Existing suites re-run on a cadence; usually satisfied via unit/E2E gates | Cadence + gate reference |
| **Mutation** | Do the existing tests actually assert anything (Stryker)? | Mutation score (% mutants killed) |
| **Security — Access Control & Data Boundaries** | AuthZ/RLS correctness plus data-boundary assertions: the right data visible to the right roles across PII, pay, and identity tiers, with no cross-tenant or cross-client bleed | For SOC 2-scoped products, note which controls these tests evidence (e.g. [CC6.1](https://www.isms.online/soc-2/controls/logical-and-physical-access-controls-cc6-1-explained/), Logical Access & Information Protection) |
| **Security — Vulnerability Scanning** | SAST, dependency scanning, secrets detection. Three distinct failure modes; report each | Per sub-scope: SAST Y/N, deps Y/N, secrets Y/N |
| **Performance** | Response-time measurement against a stated budget | Stated budget + measured p95 |
| **Load** | Behavior at expected concurrent volume | Pass/fail at stated volume |
| **Stress** | Behavior beyond expected volume; failure modes and recovery | Pass/fail at stated ceiling |
| **Reliability** | Sustained-operation correctness: concurrency, retries, idempotency, crash recovery | Count of verified failure-mode scenarios |
| **Compatibility** | Browser/device/version matrix actually exercised | # of targets in CI vs. supported list |
| **Accessibility** | WCAG conformance at component level (vitest-axe) and flow level (E2E + axe) | % of components scanned; # of flows scanned |
| **Usability** | Formal user studies or heuristic reviews | Sessions run |
| **Globalization** | i18n readiness: framework, encoding, RTL, date/number formats | N/A until an i18n framework exists |
| **Localization** | Translated-content correctness per locale | Locales verified |
| **Exploratory** | Structured session-based exploration beyond scripted tests | Sessions logged |

## The Framework

The blank template. One row per category, filled in per project.

| **Category** | **Tooling & pipeline ref** | **Coverage signal** | **CI gate** | **Priority** | **Owner** | **Revisit trigger** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Unit** | | | | | | |
| **Integration** | | | | | | |
| **Integration — Third-Party Data Handling** | | | | | | |
| **System / E2E** | | | | | | |
| **Smoke** | | | | | | |
| **API / Interface** | | | | | | |
| **Regression** | | | | | | |
| **Mutation** | | | | | | |
| **Security — Access Control & Data Boundaries** | | | | | | |
| **Security — Vulnerability Scanning** | | | | | | |
| **Performance** | | | | | | |
| **Load** | | | | | | |
| **Stress** | | | | | | |
| **Reliability** | | | | | | |
| **Compatibility** | | | | | | |
| **Accessibility** | | | | | | |
| **Usability** | | | | | | |
| **Globalization** | | | | | | |
| **Localization** | | | | | | |
| **Exploratory** | | | | | | |

## The Example

| **Category** | **Tooling & pipeline ref** | **Coverage signal** | **CI gate** | **Priority** | **Owner** | **Revisit trigger (Hold & Drop)** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Unit** | Vitest + v8 | ≥ 80% line/branch coverage | `Required-PR`, coverage threshold gate enabled | Keep | QA Lead | — |
| **Integration** | RLS + pgTAP, database layer | High % of entities covered | `Advisory-PR`, intended Required, branch protection pending | Hold | QA Lead | Pending flip from `Advisory-PR` to `Required-PR` |
| **System / E2E** | Playwright | High % of HIGH-risk modules covered | Nightly critical subset; full run weekly | Invest | QA Lead | — |
| **Smoke** | Playwright smoke config | 100% of critical paths | `Advisory-PR`, intended Required from day one | Keep | QA Lead | Sanity merged: no separate deploy pipeline, so post-deploy sanity = smoke. Split only if the deploy pipeline diverges |
| **API / Interface** | Partial route tests (Vitest) + a second, overlapping Playwright project | Partial route coverage; schema/contract validation 0% | None | Hold — consolidate the two overlapping suites before growing | QA Lead | Contract tier: first external API consumer |
| **Regression** | Unit + E2E suites on cadence | Currently satisfied via unit/E2E gates (no separate suite needed while those run on cadence) | `Advisory-PR` + nightly (via unit/E2E gates; branch protection pending) | Keep | QA Lead | — |
| **Mutation** | Stryker | Latest run's score not yet recorded | Weekly on a scheduled cadence + manual dispatch; break threshold enforced on unit scope. Integration scope wired but intentionally not in CI until integration tests exist | Hold — record the latest score, then re-score (Keep or Invest) | QA Lead | Promote once the latest mutation score is recorded in the audit |
| **Security — Access Control & Data Boundaries** | RLS + pgTAP; evidences [SOC 2 CC6.1 (Logical Access & Information Protection)](https://www.isms.online/soc-2/controls/logical-and-physical-access-controls-cc6-1-explained/) | High % of entities with RLS tests (the same RLS suite as the Integration row — two lenses, not double-counted); cross-tenant and pay-tier boundary assertions not yet named | `Advisory-PR`, intended Required, branch protection pending | Hold | QA Lead | Promote to Invest when cross-tenant and pay-tier boundary assertions are named, written, and CI-gated. SOC 2: these tests evidence [CC6.1](https://www.isms.online/soc-2/controls/logical-and-physical-access-controls-cc6-1-explained/) only; map the rest of the [CC6/CC7](https://soc2auditors.org/insights/soc-2-security-controls/)/[C1](https://www.isms.online/soc-2/controls/confidentiality-c1-2-explained/) cluster (RBAC, audit logging, encryption, access review, classification) to test rows or named non-test controls before any SOC 2 audit (owner: QA Lead) |
| **Security — Vulnerability Scanning** | Dependabot (deps). Secrets: platform-native secret scanning, enable this sprint (one config change). SAST: none | Deps: Y · Secrets: N (enabling — Invest) · SAST: N | None (Dependabot runs async; secret scanning enforces platform-side once enabled) | Invest (secrets) / Hold (SAST) | QA Lead | SAST: adoption decision (Semgrep or CodeQL), owner Infra team — wire as `Advisory-PR`, escalate per the gate lifecycle. Secrets: no trigger, enable now |
| **Performance** | None | 0%, no tooling | None | Drop | QA Lead | Real traffic scale number |
| **Load** | None | 0%, no tooling | None | Drop | QA Lead | Real traffic scale number |
| **Stress** | None | 0%, no tooling | None | Drop | QA Lead | Real traffic scale number |
| **Reliability** | 1 targeted concurrency test | 1 verified failure-mode scenario | `Advisory-PR` (unit job, branch protection pending) | Hold | QA Lead | Expand scenarios at real scale or first concurrency incident |
| **Compatibility** | Playwright, primary browser only | 1 of 1 CI-exercised browser; no other targets declared | `Advisory-PR` (smoke; branch protection pending) + nightly (E2E), primary browser only | Hold | QA Lead | Multi-browser demand signal (stakeholder request or non-primary-browser usage in analytics) |
| **Accessibility** | vitest-axe (component tier); 0 E2E flows | Multiple components scanned; 0 flows scanned | `Advisory-PR` (component tier, branch protection pending) / none (E2E tier) | Invest — E2E tier (org-wide internal tool: near-external weight) | QA Lead | — |
| **Usability** | None | 0 sessions | None | Drop | QA Lead | Dedicated QA/UX hire |
| **Globalization** | None, no i18n framework | N/A | None | Drop | QA Lead | Multi-country UI rollout |
| **Localization** | None | N/A | None | Drop | QA Lead | Multi-country UI rollout |
| **Exploratory** | Informal QA triage (session notes, no formal charters) | 0 formal sessions logged | None | Drop | QA Lead | Dedicated QA hire; keep lightweight session notes meanwhile |
