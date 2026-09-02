---
title: "Lean Software Quality Assurance in a Regulated Industry"
date: 2026-07-11
tags: ["quality assurance", "QA", "software testing", "frameworks", "compliance", "software development engineer in test", "SDET", "AI", "Agents", "Agentic Development"]
description: "A risk-based software testing meta framework for regulated products."
---

## Background

Over the last week, I've been building a risk-based software testing and quality assurance framework for regulated products.

The products I work on handle PII, worker and employer data, payrolling, staffing and placement, benefits, prescreening, compliance, Vendor Management Systems (VMSs), Managed Service Providers (MSPs), etc. 

The products also serve clients and workers in the US and in jurisdictions across the EU, the UK, and Canada.

## The Problem

As agentic coding tools increasingly got better and faster at writing code, the developers on our team started writing code quicker than the QA team could keep up with.

Up to this point, testing our products was mostly manual. Regression testing was painful and slow, taking days for a small QA team to complete. 

Automation was close to non-existent. A handful of unit and UI tests never ran in CI, so regressions were never caught and the testing told us nothing about quality.

Sound familiar?

The QA team needed a way to keep pace with the increased speed and output of the development team. The solution was to adopt the same tools that the developers were using.


## The Solution

**Manual testing got deprioritized, not eliminated, and risk-based automation was prioritized.**

What do I automate first though and why? 

What tests provide the business with the most value at the least cost? 

What does ROI look like for QA? 

What is risk-based testing?

Working from frameworks such as the *test pyramid* and from industry best practices such as *functional* and *non-functional* testing, I built a meta framework that provides a consistent approach to testing across all projects.

## The Defaults

Every public-facing project includes the following default test suites:

- **Unit Testing**
- **System Integration Testing**
- **E2E UI Testing**
- **Role-based Access Control (RBAC)**

## The Definitions

The meta framework defines the following test categories.

| **Category** | **Definition** |
| :--- | :--- |
| **Unit** | Smallest testable units in isolation |
| **Integration** | Components working together. Database layer, service layer, cross-system layer.  |
| **Integration — Third-Party Data Handling** | Compliance posture of data exchanged with external vendors. |
| **System / E2E** | Full user journeys through the real stack |
| **Smoke** | Critical-path checks pre-release |
| **API / Interface** | Route-level functional behavior and contract/schema validation |
| **Regression** | Existing suites re-run on a cadence, usually satisfied via unit/integration/E2E gates |
| **Mutation** | Do the existing tests actually assert anything? |
| **Security — Access Control & Data Boundaries** | AuthN/AuthZ/RLS correctness plus data-boundary assertions. |
| **Security — Vulnerability Scanning** | SAST, dependency scanning, secrets detection. |
| **Performance** | Response-time measurement against a stated budget |
| **Load** | Behavior at expected concurrent volume |
| **Stress** | Behavior beyond expected volume; failure modes and recovery |
| **Reliability** | Sustained-operation correctness: concurrency, retries, idempotency, crash recovery |
| **Compatibility** | Browser/device/version matrix actually exercised |
| **Accessibility** | WCAG conformance |
| **Usability** | Formal user studies or heuristic reviews |
| **Globalization** | i18n readiness |
| **Localization** | Translated-content correctness per locale |
| **Exploratory** | Structured session-based UI exploration |

## The Framework

Adopt the framewok to your projects.


| **Category** | **Tooling** | **Coverage %** | **CI/CD-gated** | **Priority Level** | **Owner** | **Revisit trigger** |
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

An example of the meta framework applied to a fictitious project.

| **Category** | **Tooling** | **Coverage %** | **CI/CD-gated** | **Priority Level** | **Owner** | **Revisit trigger** |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Unit** | Vitest + v8 | ≥ 80% line/branch coverage | ✅ | - | Dev | — |
| **Integration** | RLS + pgTAP | % of entities covered | ✅ | - | Dev | - |
| **System / E2E** | Playwright |  % of HIGH-risk modules covered | ✅ | - | QA | — |
| **Smoke** | Playwright | 100% of critical paths | ✅ | - | QA | - |
| **API** | Postman | None | ✅ | - | QA |
| **Regression** | Unit + E2E suites on cadence | Currently satisfied via unit/E2E gates | ✅ | - | QA | — |
| **Mutation** | Stryker | - | 🛑 | - | Dev | - |
| **Security — Access Control & Data Boundaries** | RLS + pgTAP | High % of entities with RLS tests | 🛑 | - | QA | - |
| **Security — Vulnerability Scanning** | Dependabot + GitLeaks + SemGrep | - | ✅ | - | QA | - |
| **Performance** | None | 0%, no tooling | 🛑 | - | QA | Real traffic scale number |
| **Load** | None | 0%, no tooling | 🛑 | - | QA | Real traffic scale number |
| **Stress** | None | 0%, no tooling | 🛑 | - | QA | Real traffic scale number |
| **Reliability** | None | 0%, no tooling | 🛑 | - | QA | Real traffic scale number |
| **Compatibility** | Chromium | 1 of 1 CI-exercised browser. | ✅ | - | QA | Multi-browser demand signal |
| **Accessibility** | vitest-axe | Multiple components scanned; 0 flows scanned | ✅ | - | QA | — |
| **Usability** | None | 0 sessions | 🛑 | - | QA | - |
| **Globalization** | None, no i18n framework | N/A | 🛑 | - | QA | Multi-country UI rollout |
| **Localization** | None | N/A | 🛑 | - | QA | Multi-country UI rollout |
| **Exploratory** | Informal QA triage | 10 formal sessions logged | 🛑 | - | QA | - |

## The End

I verify AI-built software before it breaks in front of paying users and run fixed-fee verification audits for founders shipping with AI. [Work with me →](/services/)
