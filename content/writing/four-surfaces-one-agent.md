---
title: "Four Surfaces, One Agent: What the Testing Framework Missed Until I Tested the UI"
date: 2026-08-28
tags: ["QA", "testing", "AI", "LLM", "agents", "security"]
description: "The AI/LLM testing framework passed at every layer this week. The live chat window still leaked. What four rounds of testing on the same agent actually found."
---

## Background

The [risk-based framework](/writing/lean-sqa-framework/) scores and gates test suites.

The [AI extension](/writing/testing-what-you-cant-enumerate/) does the same for agents and LLM features: prompt injection, disclosure, least privilege, the whole adversarial list.

This week I ran both against a real one: a client-facing AI agent sitting on top of a read-only workforce-data API, tested against a plan a colleague had already written. Ten endpoints, one chat window, several thousand rows of other people's payroll data behind each API key.

Isolation was the one item on the plan marked non-negotiable. A key that reads across companies isn't a bug ticket, it's a business-ending finding, and most of the API-layer testing existed to try to break exactly that.

The plan assumed that if the backend held, the rest would follow. It didn't.

## The Problem

The framework treats an LLM feature as one surface. Test the prompt, test the tool calls, test what the model does under pressure, score it, move on.

A real agent isn't one surface. This one was four: the raw API underneath it, the agent itself under adversarial pressure, a second independent eval harness run against the same prompts, and the chat window a customer actually opens. The framework had a lot to say about the first three. It said nothing about what happens when all three pass clean and the fourth one doesn't.

## The Four Layers

| Layer | What it checked | Result |
|---|---|---|
| API | Auth, all 10 endpoints, query syntax, pagination, cross-endpoint consistency, data sanity, and customer isolation as a zero-tolerance gate | 20 checks, 19 passed |
| Adversarial redteam | A reference agent run through 21 cases (injection, disclosure, least privilege, cross-agent leakage, excessive agency) against the company's own AI agent testing policy | 0 critical or high findings |
| Independent eval harness | The same prompts, run a second time through an unrelated tool | 27 cases across 9 categories, 25 passed, 2 flagged |
| Live UI | The actual chat interface a customer logs into | 2 real issues, invisible to every layer above it |

Three layers cleared the agent almost completely. The fourth one didn't. That gap is the whole finding.

## The Refusal That Leaks

The eval harness scored the guardrail as working, right up until it blocked something.

Every layer before the UI tested whether the safety layer *stops* a bad request. None of them tested what it *hands back* when it does. In the live chat, a blocked prompt didn't return as a clean refusal. It came back dressed as one, carrying the guardrail's own internal bookkeeping along with it — the kind of detail that belongs in a trace log, not a chat bubble.

A refusal that tells you more than an answer would have is a leak wearing a safety label, and no adversarial test case written against the model will ever catch it, because the model did exactly what it was supposed to do. The leak was one layer downstream, in what the application did with the block.

## The Bug That Wasn't in the Data

The second miss looked like a support ticket: one client's records weren't showing up. The API disagreed. Every isolation check and every correctness check against that client's rows passed clean, twice.

The interface had mishandled a response that was already correct. Testing the API tells you the answer is right. It does not tell you the customer can see it. Those are two separate claims, and only one of them shows up in a REST client's response body.

## Where This Leaves the Framework

The framework still holds. Score the risk, gate the merge, run the adversarial suite. None of that was wrong.

It just isn't the whole test plan. The same isolation math that gates the API applies to the UI too — a leak doesn't care which layer it comes from. An agent has a backend, a model, an eval harness, and a window someone actually opens, and passing the first three tells you nothing about the fourth.

The fix isn't complicated. Add the UI as its own gated item on the checklist, held to the same isolation and disclosure bar as the API, and stop treating a clean backend as proof the product is safe.

Test the layer the framework describes. Then go test the layer the customer opens. They are not the same test, and only one of them generates a bug report.
