---
title: "About"
description: "Software Testing & Quality Assurance Engineering"
ShowReadingTime: false
ShowToc: false
---

I'm Kiefer, a Quality Assurance Engineer who owns quality end to end as the sole QA engineer for a regulated HR-tech and payroll EOR platform. I authored my organization's adopted risk-based QA framework, gate policy, and flaky-test policy, now applied across six product teams. I'm strongest at deciding what is worth testing under real capacity constraints, and at proving coverage is enforced rather than merely observed. I write here about software testing, application security, and life.

San Diego, California — open to remote or relocation.

[LinkedIn](https://linkedin.com/in/kieferland) | [GitHub](https://github.com/kiefertaylorland) | [Reddit](https://reddit.com/user/sutherlandsec) | [TryHackMe](https://tryhackme.com/p/sutherland) | [Email](mailto:kiefertaylorland@gmail.com)

## Core Competencies

#### Testing

Risk-based Test Strategy | Test Architecture & Design | Unit Testing | Integration Testing | End-to-end Testing | Smoke Testing | API Testing | Regression Testing | Mutation Testing | Coverage Instrumentation & CI Enforcement | Flaky-test Triage | Quality Gate Design

#### Methodology

Defect Lifecycle Management | Requirements Traceability | Accessibility (WCAG, axe-core) | Security & RBAC Testing | AI/LLM Feature Testing | Software Development Lifecycle (SDLC) | Software Test Lifecycle (STLC) | Agile | Scrum | Shift-left Strategy

#### Technologies

TypeScript | JavaScript | Python | SQL | Playwright | Vitest | pgTAP | Stryker | Postman/Newman | GitHub Actions | Jenkins | Supabase | Jira | Claude Code

## Experience

### Software Quality Assurance Engineer I

#### TCWGlobal (Cloud Motion Technologies) — HR Tech & Payroll EOR SaaS — Dec 2024 to Present

- Sole QA engineer; own quality strategy, test infrastructure, and AI testing policy across six product teams.
- Authored the company's adopted QA & Testing Framework — a risk-based standard that classifies each product and measures 20 test categories from real tool output.
- Authored the adopted Gate Policy: test suites enter as advisory on pull requests and earn merge-blocking status only after a two-week zero-false-block trial; smoke and critical flows block unconditionally from day one.
- Authored the adopted Flaky-Test Policy, defining flaky precisely — fails then passes on retry twice within a rolling seven-day window with no code change — to separate flake from a broken test.
- Raised measured unit coverage on the flagship platform to 93.23% lines / 88.51% branches, with 2,969 tests across 908 suites, then enforced an 88% line and 91% function floor in CI so it cannot silently regress.
- Built 11 CI workflows including a nightly critical-path E2E subset, a full weekly run, and a weekly mutation job; verified 8 required status checks on branch protection.
- Triaged flaky E2E failures against 20 archived run-history snapshots, separating regression from flake with evidence rather than by re-running.
- Built /QASweep, a four-agent Claude Code verification skill producing one scored scorecard per pull request or repository; its first run surfaced tests silently failing for weeks and zero E2E coverage on an admin route.
- Advise six new products standing up testing from zero.
- Discovered and disclosed application security and privacy defects, including sensitive data exposed through an unauthenticated client bundle and a messaging path that misclassified a high-risk user disclosure without escalation.

### Software Quality Assurance Analyst

#### TCWGlobal — Oct 2023 to Dec 2024

- Built an API smoke and role-based access control (RBAC) suite covering critical workflows with custom JavaScript assertions.
- Authored functional and non-functional tests for payroll, worker management, and minimum-wage compliance; verified data consistency across single sign-on (SSO), payrolling, and timekeeping integrations.
- Triaged and verified Jira tickets and pull requests; managed test-environment deployments with Jenkins.

### Junior System Administrator

#### TCWGlobal — Feb 2022 to Oct 2023

- Automated Apple device lifecycle management with Jamf.
- Built an IT asset-management system for SOC 2 Type 2 readiness.
- Managed 150+ devices through secure decommissioning per NIST SP 800-88.

### IT Support Technician

#### Foresight Sports — Jun 2021 to Feb 2022

- Hardware testing and cross-platform support.

## Projects

- **qa_agent_exploratory** — exploratory testing agent built on Vercel's eve AI agent framework.
- **kieferland.dev** — published "Lean SQA in a Regulated Industry: Building a Testing Framework That Scales."

## Education

- **M.S., Cybersecurity & Information Assurance** — Western Governors University (2024)
- **B.S., Cybersecurity & Information Assurance** — Western Governors University (2023)

## Certifications

- ISC2 SSCP
- AWS Certified Cloud Practitioner
- CompTIA CySA+
- CompTIA PenTest+
- CompTIA Security+
- CompTIA Network+
- CompTIA A+
