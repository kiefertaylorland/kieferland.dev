---
title: "About"
description: "AI Assurance & Software Quality Engineering"
ShowReadingTime: false
ShowToc: false
---

I'm Kiefer, an AI Assurance Engineer who owns quality end to end as the sole QA engineer for a regulated HR-tech and payroll EOR platform.

I authored my organization's software testing framework and AI/LLM testing framework, now applied across three products.

I'm strongest at deciding what is worth testing under real capacity constraints, and at proving coverage is enforced rather than merely observed.

I write here about software testing, quality assurance, application security, AI/LLMs, and life. Currently residing in San Diego, California.

[LinkedIn](https://linkedin.com/in/kieferland) | [GitHub](https://github.com/kiefertaylorland) | [TryHackMe](https://tryhackme.com/p/sutherland) | [Email](mailto:kiefertaylorland@gmail.com)

## Core Competencies

#### Testing

Risk-based Test Strategy | Test Architecture & Design | Unit Testing | Integration Testing | End-to-end Testing | Smoke Testing | API Testing | Regression Testing | Mutation Testing | Coverage Instrumentation & CI Enforcement | Flaky-test Triage | Quality Gate Design

#### Methodology

Defect Lifecycle Management | Requirements Traceability | Accessibility (WCAG, axe-core) | Security & RBAC Testing | AI/LLM Feature Testing | AI Governance (NIST AI RMF, ISO/IEC 42001, OWASP LLM Top 10) | Software Development Lifecycle (SDLC) | Software Test Lifecycle (STLC) | Agile | Scrum | Shift-left Strategy

#### Technologies

TypeScript | JavaScript | Python | SQL | Playwright | Vitest | pgTAP | Stryker | axe-core | Postman/Newman | GitHub Actions | Jenkins | Supabase | Jira | Claude Code

## Experience

### AI Assurance Engineer

#### Regulated HR Tech & Payroll Platform — Aug 2026 to Present

- Own automated testing, mutation testing, and security policy verification across internal applications and client-facing products.
- Authored the AI agent and LLM testing policy, organized on NIST AI RMF with per-statement traceability to the OWASP LLM Top 10, ISO/IEC 42001 and 23894, SOC 2, and GDPR — covering bias and fairness testing on the four-fifths rule, release gating, human oversight, and model and prompt change management.
- Established adversarial testing of AI features as an unconditional release blocker: prompt injection direct and indirect through retrieval and upload paths, sensitive information disclosure, agent least-privilege enumerated and verified programmatically rather than by stated intent, upload quarantine, cross-agent leakage, and excessive agency.
- Run a two-tier mutation testing program: a unit-scope Stryker gate that fails the build below a break threshold of 60, and an integration-scope tier that mutates the server-action and authorization layer against a live database, held advisory until its integration coverage lands.
- Own row-level security verification covering 88% of entities against live data, with a policy-weakening canary that deliberately loosens a policy to confirm the suite catches the regression, and automated policy coverage reporting that keeps authorization coverage visible and trending.
- Co-authored an internal AI assurance audit capability mapping a product's AI surface against NIST AI RMF, ISO/IEC 42001 and 27001, SOC 2, GDPR, the EU AI Act, and the OWASP LLM Top 10.

### Software Quality Assurance Engineer I

#### Regulated HR Tech & Payroll Platform — Dec 2024 to Aug 2026

- Sole QA engineer; owned quality strategy, test infrastructure, and AI testing policy across six product teams.
- Authored the company's adopted QA & Testing Framework — a risk-based standard that classifies each product and measures 20 test categories from real tool output.
- Authored the adopted Gate Policy: test suites enter as advisory on pull requests and earn merge-blocking status only after a two-week zero-false-block trial; smoke and critical flows block unconditionally from day one.
- Authored the adopted Flaky-Test Policy, defining flaky precisely — fails then passes on retry twice within a rolling seven-day window with no code change — to separate flake from a broken test.
- Built a multi-layer suite of 3,500+ tests spanning unit, integration, end-to-end, and database-layer testing; raised measured unit coverage on the flagship platform to 91.24% lines and 87.33% branches, then enforced 88% line, 88% statement, 91% function, and 83% branch floors in CI so it cannot silently regress.
- Built 12 CI workflows including a nightly critical-path E2E subset, a full weekly run, and a weekly mutation job; verified 8 required status checks on branch protection.
- Triaged flaky E2E failures against 20 archived run-history snapshots, separating regression from flake with evidence rather than by re-running.
- Built /QASweep, a four-agent Claude Code verification skill producing one scored scorecard per pull request or repository; its first run surfaced tests silently failing for weeks and zero E2E coverage on an admin route.
- Top contributor to the Playwright automation suite for a client-facing staffing platform during its migration from legacy PHP to TypeScript, covering company, order, job-description, and reporting flows plus an insecure-direct-object-reference authorization check, with multi-environment and tag-based CI execution.
- Authored that repository's AI code-assistant instructions and reusable test-generation and review-refactor prompts, standardizing how AI-assisted tests were produced and reviewed.
- Advised six new products standing up testing from zero.
- Discovered and disclosed application security and privacy defects, including sensitive data exposed through an unauthenticated client bundle and a messaging path that misclassified a high-risk user disclosure without escalation.

### Software Quality Assurance Analyst

#### Workforce Software Organization — Oct 2023 to Dec 2024

- Built an API smoke and role-based access control (RBAC) suite covering critical workflows with custom JavaScript assertions.
- Authored functional and non-functional tests for payroll, worker management, and minimum-wage compliance; verified data consistency across single sign-on (SSO), payrolling, and timekeeping integrations.
- Triaged and verified Jira tickets and pull requests; managed test-environment deployments with Jenkins.

### Junior System Administrator

#### Internal IT Operations — Feb 2022 to Oct 2023

- Automated Apple device lifecycle management with Jamf.
- Built an IT asset-management system for SOC 2 Type 2 readiness.
- Managed 150+ devices through secure decommissioning per NIST SP 800-88.

### IT Support Technician

#### Sports Technology Support — Jun 2021 to Feb 2022

- Hardware testing and cross-platform support.

## Projects

- **qa_agent_exploratory** — exploratory testing agent built on Vercel's eve AI agent framework.
- **ai_testing_framework** — agent trust-layer framework carrying the OWASP LLM Top 10 and NIST AI RMF as machine-readable control catalogs, with adversarial eval adapters and OpenTelemetry tracing.
- **kieferland.dev** — writing on testing methodology, AI assurance, and application security.

## Education

- **M.S., Cybersecurity & Information Assurance** — Western Governors University (2024)
- **B.S., Cybersecurity & Information Assurance** — Western Governors University (2023)

## Certifications

- AWS Certified Cloud Practitioner
- CompTIA CySA+
- CompTIA PenTest+
- CompTIA Security+
- CompTIA Network+
- CompTIA A+
