---
title: "Services"
description: "Fixed-fee verification audits for founders shipping with AI"
date: 2026-08-22
hiddenInRss: true
ShowReadingTime: false
ShowToc: false
---

I run fixed-fee verification audits for founders shipping AI-built software. You get an independent answer to one question: **is this safe to put in front of paying users?**

If you built fast with Claude, Cursor, or Codex and you're about to charge money for it — or an enterprise deal is asking questions your codebase can't yet answer — this is for you.

## What I verify

**Authorization and data exposure.** Row-level security, role-based access control, and insecure direct object references — verified programmatically against your live data model, not inferred from what the code says it intends.

**AI feature behavior.** Adversarial testing against the OWASP LLM Top 10: prompt injection, direct and indirect through retrieval and upload paths; sensitive information disclosure; excessive agency; cross-agent leakage. I test what your AI features actually do under hostile input, not what the system prompt asks them to do.

**Test suite integrity.** AI-generated test suites fail in characteristic ways: hallucinated interfaces, weakened assertions, coverage numbers that look high and prove nothing. I verify your tests would catch the bugs they claim to cover — including mutation testing where it earns its keep.

**Release readiness.** Critical-path smoke coverage, CI gates that actually block, and accessibility checks wired in as gates rather than afterthoughts.

## What you get

- A scored **ship / hold** scorecard with a clear recommendation.
- Prioritized findings with reproduction steps — ordered by what breaks in front of a paying user first.
- Evidence you can hand to an enterprise customer or a compliance reviewer, not just to your own team.

## How it works

1. **Scoping call.** A short conversation about what you've built, your stack, and what's driving the audit — a launch, a deal, a compliance question.
2. **Fixed fee, agreed up front.** You know the full cost before any work begins. No hourly meter.
3. **Audit window.** I work against your repository and a non-production environment with read-only access wherever possible.
4. **Report and walkthrough.** You get the written report plus a call to go through the findings and what to fix first.

## Why me

This is my day job. I own the automated testing, mutation testing, and authorization-verification function for a regulated HR-tech and payroll platform, and I authored its software testing and AI/LLM testing frameworks. M.S. in Cybersecurity. Full background on the [about page](/about/).

Ready to talk? [Get in touch](/contact/).
