---
title: "Testing What You Can't Enumerate: A QA Framework for AI Agents and LLMs"
date: 2026-08-10
tags: ["QA", "testing", "AI", "LLM", "security", "compliance"]
description: "Extending a risk-based testing framework to AI agents and LLM-backed features, where the input space is unbounded and percentage coverage stops meaning anything."
---

## Background

Last month I wrote about the [risk-based testing framework](/writing/lean-sqa-framework/) I built to keep QA on pace with agentic coding: twenty test categories, five phases, and a scoring rubric that decides where the effort goes.

Then the products started shipping AI features.

The same products as before — PII, worker and employer data, payrolling, staffing and placement, benefits, prescreening, compliance. Now with an LLM somewhere in the decision path.

The framework didn't cover it. Not because it was wrong, but because every coverage signal in it assumes you can count the thing you're covering.

A note on scope before the rest of it. This policy covers the US, the UK, and Canada. The EU AI Act and the APAC frameworks are deliberately out of scope, because we don't operate as a direct employer in those jurisdictions today.

That exclusion is the point. Scope to where you actually have exposure, then write down why you excluded the rest and who owns revisiting it. An unwritten exclusion isn't a scope decision, it's a gap nobody has noticed yet.

## The Problem

The original framework breaks in four places.

**You can't enumerate the input space.** 80% line coverage means something. "80% of prompts" means nothing. There is no denominator.

**The artifact under test changes without a code change.** A prompt edit shifts behavior as much as a refactor does, and it produces a diff that most review processes wave through.

**The same input doesn't produce the same output.** Regression testing assumes determinism. Run the suite twice, get two different answers, and "did this regress" stops being a yes/no question.

**The failure modes have no home.** There is no row in a twenty-category table for "the model was talked out of its instructions," or "the agent sent an email nobody approved," or "it passed on launch day and drifted by day two hundred."

So the coverage signal has to change in kind. Not *how much did we cover* — you can't know. What you can know is *which named failure classes have a test, and did it hold.*

That's the whole shift. Every table below is built on it.

## The Solution

AI and agent features are High-Risk by default. This layers on top of the existing twenty categories, it doesn't replace them — an AI feature gets the standard rubric *and* everything here.

[NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) is the organizing standard. The OWASP LLM Top 10, ISO/IEC 42001 and 23894, and SOC 2 get layered in as "this control also satisfies X" rather than tracked as four parallel programs. One control, multiple credit. You implement once and claim it four times, which is the only way a small QA team gets through a compliance surface this wide.

The same five phases, adapted:

- Classify: three axes, scored per agent. Details below.
- Measure: 13 AI categories on top of the standard 20.
- Score: Invest / Keep / Hold / Drop. Unchanged.
- Gate: the Advisory-then-Required lifecycle still applies, with one exception noted below.
- Govern: dual sign-off plus Legal on first release of a high-risk feature, exceptions with a named signer and an expiry, quarterly review, and a changelog.

### Classify

Not fixed tiers. Score each agent low/medium/high on three axes, and the highest score on any one axis sets the floor.

| **Axis** | **Low** | **Medium** | **High** |
| :--- | :--- | :--- | :--- |
| **Data access scope** | No PII/pay/identity data; public or synthetic only | Reads PII/pay/identity data, single-tenant, no cross-tenant reach | Reads PII/pay/identity data with cross-tenant reach, or writes it |
| **Action reversibility** | Read-only; produces an answer, takes no action | Writes or modifies internal records; reversible and audit-logged | Irreversible or hard to reverse: sends external comms, initiates payment, deletes data |
| **External visibility** | Output seen only by internal, authenticated users | Output seen by external clients but not third parties | Output or action reaches a third party directly |

Any medium brings in the full adversarial suite and audit-trail requirements at full strength. Any high brings in mandatory human oversight and the fastest escalation path, regardless of how the other two score.

The consequence worth stating plainly: **a read-only agent can still be high-risk.** An agent that only answers questions, but answers them over PII with cross-tenant reach, scores high on data access alone. That pulls in the full adversarial and audit requirements even though it can't do anything. "It just reads" is not a scoping argument.

All-low agents can scope down human-oversight checkpoints and rollback drills. Record that decision and its owner. Don't silently skip it.

### Gate

One exception to the Advisory-then-Required lifecycle.

Critical or High findings on prompt injection, sensitive information disclosure, agent isolation, or upload quarantine block production release unconditionally. Not after a trial period. Not advisory first. From day one.

That's the single non-negotiable in this policy. Everything else earns its blocking status the normal way.

### Govern

Model and prompt changes get the same treatment as code. Any change to a model version, system prompt, guardrail config, fine-tuning data, or retrieval corpus re-runs the bias dataset, the adversarial suite, and the affected E2E specs. A change that materially moves behavior — refusal rate, tone, benchmark accuracy past a named threshold — goes through full entry and exit criteria, not an abbreviated path.

Rollback is documented and *tested* before first release, with a stated time budget. An untested rollback is a hope.

Incidents aren't closed until the failure mode is added to the adversarial suite. A jailbreak that worked in production is a test case you were missing.

The policy itself gets a changelog, because the law underneath it moves faster than the policy does.

## The Defaults

Every AI feature includes:

- Bias test dataset, protected attributes, synthetic or de-identified
- Adversarial suite — injection, disclosure, excessive agency
- Audit record per test run, with model and prompt version pinned
- Human-oversight checkpoint before any adverse or irreversible action
- One named drift signal, with a stated cadence

## The Definitions

| **Category** | **Definition** | **Coverage signal to report** |
| :--- | :--- | :--- |
| **Bias & Fairness** | Disparate impact on outcomes about a person: hiring, pay, benefits eligibility, performance, disciplinary flags | Selection-rate ratio against the four-fifths (80%) rule, per protected attribute; protected-attribute coverage of the test set |
| **Prompt Injection** | Instruction override via direct user input or indirectly via retrieved, uploaded, or ingested content | Named attack classes attempted vs. defended: instruction override, role-play jailbreak, injected content in RAG and upload paths |
| **Sensitive Information Disclosure** | Whether the model can be induced to reveal data outside the requester's authorized scope, including via indirect or reformatted queries | Disclosure probe classes run, direct and indirect; leak count, which must be 0 |
| **Agent Isolation & Least Privilege** | The agent's tool access, data access, and outbound capability, enumerated and verified — not asserted | % of enumerated capabilities with a **programmatic** assertion. Testing the agent's stated intent doesn't count |
| **Excessive Agency** | Whether the agent can take an action — write, send, purchase, delete — outside its explicitly enumerated whitelist | Out-of-scope action attempts blocked / attempted |
| **Upload & Ingestion Quarantine** | Untrusted content isolated and scanned before it can influence agent behavior or reach other tools | Quarantine verified Y/N, per ingestion path |
| **Cross-Agent Leakage** | Whether one agent's data or tool access can be reached or inferred by another agent sharing infrastructure | Agent pairs tested / agent pairs sharing infrastructure |
| **AI Supply Chain** | Integrity of third-party models, plugins, and MCP-style tools the agent depends on | Per sub-scope: pinned Y/N, approved registry Y/N, scanned Y/N |
| **Human Oversight & Contestability** | Human checkpoint before adverse or irreversible outcomes, plus a documented path for an affected person to contest one | Checkpoints identified vs. covered by an E2E spec; contestability path tested Y/N |
| **Model & Prompt Change Regression** | Re-run of bias, adversarial, and affected E2E suites on any model, prompt, guardrail, or corpus change | Change events vs. change events that triggered the suite |
| **Reproducibility & Audit Record** | Every run captures model/prompt version, dataset reference, timestamp, identity, and result; the run can be re-executed within a stated tolerance | % of runs with a complete audit record; reproducibility spot-check result |
| **Drift Monitoring** | Post-deployment signal — output distribution shift, refusal-rate change, accuracy on a held-out set — checked on a stated cadence | Signal named Y/N, cadence, last check. "No monitoring" is a valid Drop, but it has to be a named one |
| **Test-Data Privacy & DPIA** | Synthetic or de-identified data by default in test environments; DPIA trigger evaluated and the outcome recorded | Test-data provenance (synthetic / de-identified / exception-approved); DPIA evaluation recorded Y/N |

Note what the right-hand column stopped doing. Only two rows report a coverage percentage, and both count artifacts — enumerated capabilities, test runs — rather than inputs. The one other percentage in the table is the 80% bias threshold, which is a pass mark, not a measure of how much got covered. Everything else reports named classes, ratios, and Y/N per path.

That's the concession the domain forces. You can't say how much of the input space you covered, so you say exactly which failures you went looking for.

## The Framework

| **Category** | **Tooling & pipeline ref** | **Coverage signal** | **CI gate** | **Priority** | **Owner** | **Revisit trigger** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bias & Fairness** | | | | | | |
| **Prompt Injection** | | | | | | |
| **Sensitive Information Disclosure** | | | | | | |
| **Agent Isolation & Least Privilege** | | | | | | |
| **Excessive Agency** | | | | | | |
| **Upload & Ingestion Quarantine** | | | | | | |
| **Cross-Agent Leakage** | | | | | | |
| **AI Supply Chain** | | | | | | |
| **Human Oversight & Contestability** | | | | | | |
| **Model & Prompt Change Regression** | | | | | | |
| **Reproducibility & Audit Record** | | | | | | |
| **Drift Monitoring** | | | | | | |
| **Test-Data Privacy & DPIA** | | | | | | |

## The Example

A read-only query agent over sensitive workforce data. Authenticated internal and client-admin users only. No write access.

Scored: **low** on action reversibility, **low** on external visibility, **high** on data access scope. One high axis, so the full adversarial and audit requirements apply to an agent that can't do anything but answer questions.

This is a first pass at a policy that is still pending sign-off, and the table shows it. Most rows have no tooling yet.

| **Category** | **Tooling & pipeline ref** | **Coverage signal** | **CI gate** | **Priority** | **Owner** | **Revisit trigger** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Bias & Fairness** | None — agent ranks nothing and scores nobody | N/A at current scope | None | Drop | QA Lead | Any ranking, scoring, or filtering of people enters the feature |
| **Prompt Injection** | Manual probe set, 3 attack classes, not yet codified | 3 classes attempted / 3 defended; no indirect-path coverage | None — **intended blocking from day one** | Invest | QA Lead | — |
| **Sensitive Information Disclosure** | Manual probe set; indirect/reformatted query patterns identified, not automated | Direct probes run; indirect classes named but not executed. Leaks: 0 to date | None — **intended blocking from day one** | Invest | QA Lead | — |
| **Agent Isolation & Least Privilege** | Access enumerated in the requirements doc; no programmatic assertions | 0% of enumerated capabilities programmatically asserted | None — **intended blocking from day one** | Invest — highest priority row in this table | QA Lead | — |
| **Excessive Agency** | None — no write path exists to test | N/A while read-only | None | Hold | QA Lead | First write capability, tool call with side effects, or outbound action |
| **Upload & Ingestion Quarantine** | None — no upload or ingestion path | N/A | None | Drop | QA Lead | First document upload or RAG corpus |
| **Cross-Agent Leakage** | None — single agent, no shared agent infrastructure | N/A | None | Drop | QA Lead | Second agent deployed on shared infrastructure |
| **AI Supply Chain** | Model provider pinned by version; no dependency scan on agent-invoked tools | Pinned: Y · Approved registry: Y · Scanned: N | None | Hold | QA Lead | Scan wiring — bundle with the existing dependency scanning work |
| **Human Oversight & Contestability** | None — no adverse decisions in scope, agent informs nothing binding | 0 checkpoints identified | None | Hold | QA Lead | Output begins to materially inform a decision about a person |
| **Model & Prompt Change Regression** | Ad hoc — changes re-tested by judgment, no defined suite | Change events: not tracked | None | Invest | QA Lead | — |
| **Reproducibility & Audit Record** | Prompt versions in git; model version and dataset ref not captured per run | ~0% of runs with a complete audit record | None | Invest | QA Lead | — |
| **Drift Monitoring** | None | No signal named | None | Hold | QA Lead | First production traffic at sustained volume |
| **Test-Data Privacy & DPIA** | Synthetic fixtures only; DPIA trigger not yet evaluated | Provenance: synthetic (Y) · DPIA evaluation recorded: N | None | Invest — DPIA evaluation is a one-sitting task | QA Lead | — |

Six Invest rows. Three of them are the unconditional blockers, and the fourth blocking category — upload quarantine — is a Drop only because there's no ingestion path to attack yet. That ordering isn't a coincidence. The rows that block release are the rows that get built first, and everything else waits for a trigger.

The isolation row is the one that matters most and reads worst: capabilities enumerated in prose, zero of them asserted in code. Prose is not a test. Until those assertions exist, what we have is a description of what the agent is supposed to reach, which is exactly the intent-based assurance this policy exists to replace.

## A Note on the Standards

Cite these carefully. The ground is moving.

The [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) 2025 revision consolidated several 2023 items — insecure output handling and plugin design folded into broader categories — so numbering that looks stable in one blog post won't match another. Cite by concept, re-verify the number.

Canada's AIDA is *proposed* federal legislation, not enacted. PIPEDA is what binds today. Treating AIDA as a current requirement is a common and confident error.

The Colorado AI Act's effective date and scope are worth re-confirming every quarter, because compliance-deadline legislation gets delayed and amended more often than it gets enforced on schedule.

[NYC Local Law 144](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page) applies to automated employment decision tools used on NYC-covered employers or candidates, and requires an independent bias audit within the preceding 12 months. Confirm applicability per product before treating it as binding.

The UK's ICO AI guidance and DSIT principles are guidance, not a single binding AI statute. Best-practice benchmarks, not compliance requirements.

Being precise about what *isn't* binding yet is worth as much as knowing what is. It's the difference between a policy an auditor trusts and one they start double-checking.
