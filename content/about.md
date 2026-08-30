---
title: "About"
description: "AI Assurance & Software Quality Engineering"
ShowReadingTime: false
ShowToc: false
---

I'm Kiefer, an AI Assurance Engineer. I own the automated testing, AI/LLM evals, and red teaming for a regulated HR-tech and payroll EOR platform, embedded directly in engineering.

I authored my organization's software testing framework and AI/LLM testing framework, now applied across three products.

I'm strongest at deciding what is worth testing under real capacity constraints, and at proving coverage is enforced rather than observed.

I write here about my experiences and insights in software testing, quality assurance, artificial intelligence, and application security.

[Email](mailto:kiefertaylorland@gmail.com) | [LinkedIn](https://linkedin.com/in/kieferland) | [GitHub](https://github.com/kiefertaylorland) | [TryHackMe Top 1%](https://tryhackme.com/p/sutherland)

## Core Competencies

#### Testing

AI/LLM Evals | AI/LLM Red Teaming | Application Security | Risk-based Test Strategy | Test Architecture & Design | Unit Testing | Integration Testing | End-to-end Testing | Smoke Testing | API Testing | Regression Testing | Mutation Testing | Coverage Instrumentation & CI Enforcement | Flaky-test Triage | Quality Gate Design

#### Methodology

Defect Lifecycle Management | Requirements Traceability | Accessibility (WCAG, axe-core) | Security & RBAC Testing | AI/LLM Feature Testing | AI Governance (NIST AI RMF, ISO/IEC 42001 and ISO/IEC 23894, OWASP LLM Top 10, EU AI Act, NYC Local Law 144) | Software Development Lifecycle (SDLC) | Software Test Lifecycle (STLC) | Agile | Scrum | Shift-left Strategy

#### Technologies

Promptfoo | TypeScript | JavaScript | Python | SQL | Playwright | Vitest | pgTAP | Stryker | axe-core | Postman/Newman | PostgreSQL | Supabase | GitHub Actions | Jenkins | Next.js/React | Jira | Claude Code | Codex | MCP servers

## Experience

### AI Assurance Engineer

#### Regulated HR Tech & Payroll Platform — Aug 2026 to Present

- Own automated testing, mutation testing, and security policy verification across internal applications and client-facing products.
- Authored the AI agent and LLM testing policy, organized on NIST AI RMF with per-statement traceability to the OWASP LLM Top 10, ISO/IEC 42001 and 23894, SOC 2, and GDPR — covering bias and fairness testing on the four-fifths rule, release gating, human oversight, and model and prompt change management.
- Established adversarial testing of AI features as an unconditional release blocker: prompt injection direct and indirect through retrieval and upload paths, sensitive information disclosure, agent least-privilege enumerated and verified programmatically rather than by stated intent, upload quarantine, cross-agent leakage, and excessive agency.
- Run a two-tier mutation testing program: a unit-scope Stryker gate that fails the build below a break threshold of 60, and an integration-scope tier that mutates the server-action and authorization layer against a live database, held advisory until its integration coverage lands.
- Own row-level security verification covering 88% of entities against live data, with a policy-weakening canary that deliberately loosens a policy to confirm the suite catches the regression, and automated policy coverage reporting that keeps authorization coverage visible and trending.
- Co-authored an internal AI assurance audit capability mapping a product's AI surface against NIST AI RMF, ISO/IEC 42001 and 27001, SOC 2, GDPR, the EU AI Act, and the OWASP LLM Top 10, including risk tiering of HR-domain AI as EU AI Act Annex III high-risk.
- Maintain automated accessibility testing as a quality gate rather than a post-release check: vitest-axe assertions across ~71 components run inside the blocking unit job on every pull request, with axe-core/Playwright wired at the end-to-end tier.
- Developed verification practices for AI-generated code and AI-generated test suites, targeting hallucinated interfaces, weakened assertions, and shallow coverage; built AI-assisted tooling adopted by product and engineering, including a brief-to-tests generator and a spec-stage test and security plan that risk-tiers features on data access, action reversibility, and external visibility.
- Produce audit-ready evidence for compliance and leadership: machine-readable test reports, per-release entry and exit criteria with named sign-off, an exception ledger capped at two concurrent waivers per suite, and three-year audit-record retention for high-risk AI features.

### Software Quality Assurance Engineer I

#### Regulated HR Tech & Payroll Platform — Dec 2024 to Aug 2026

- Sole owner of the platform's automated testing function; set quality strategy and test infrastructure, and advised six product teams standing up testing from zero.
- Authored the company's adopted QA & Testing Framework — a risk-based standard that classifies each product and measures 20 test categories from real tool output.
- Authored the adopted Gate Policy: test suites enter as advisory on pull requests and earn merge-blocking status only after a two-week zero-false-block trial; smoke and critical flows block unconditionally from day one.
- Authored the adopted Flaky-Test Policy, defining flaky precisely — fails then passes on retry twice within a rolling seven-day window with no code change — to separate flake from a broken test.
- Built a multi-layer suite of 3,500+ tests spanning unit, integration, end-to-end, and database-layer testing; raised measured unit coverage on the flagship platform to 91.24% lines and 87.33% branches, then enforced 88% line, 88% statement, 91% function, and 83% branch floors in CI so it cannot silently regress.
- Built 12 CI workflows including a nightly critical-path E2E subset, a full weekly run, and a weekly mutation job; verified 8 required status checks on branch protection.
- Triaged flaky E2E failures against 20 archived run-history snapshots, separating regression from flake with evidence rather than by re-running.
- Top contributor to the Playwright automation suite for a client-facing staffing platform during its migration from legacy PHP to TypeScript, covering company, order, job-description, and reporting flows plus an insecure-direct-object-reference authorization check, with multi-environment and tag-based CI execution.
- Authored that repository's AI code-assistant instructions and reusable test-generation and review-refactor prompts, standardizing how AI-assisted tests were produced and reviewed.
- Discovered and disclosed application security and privacy defects by validating cross-site scripting (XSS), role-based access control (RBAC), authentication, and sensitive-data-exposure controls.

### Software Quality Assurance Analyst

#### Regulated HR Tech & Payroll Platform — Oct 2023 to Dec 2024

- Built an API smoke and role-based access control (RBAC) suite covering critical workflows with custom JavaScript assertions.
- Authored functional and non-functional tests for payroll, worker management, and minimum-wage compliance; verified data consistency across single sign-on (SSO), payrolling, and timekeeping integrations.
- Triaged and verified Jira tickets and pull requests; managed test-environment deployments with Jenkins.

### Junior System Administrator

#### Regulated HR Tech & Payroll Platform — Dec 2022 to Oct 2023

- Automated Apple device enrollment, configuration, security, and lifecycle management with Jamf.
- Built an IT hardware asset-management system for SOC 2 Type 2 readiness.
- Assisted with a datacenter migration of switches, firewalls, and servers.

### IT Support Technician

#### Regulated HR Tech & Payroll Platform — Feb 2022 to Dec 2022

- Managed 150+ devices from procurement through secure decommissioning per NIST SP 800-88, cutting hardware spend by 20% while meeting data-compliance requirements.
- Supported Windows, macOS, and Linux environments; troubleshot networking across OpenVPN, Cisco Meraki, and FS devices.

### Help Desk Technician

#### Sports Technology Company — Jun 2021 to Feb 2022

- Hardware testing and cross-platform customer support.

## Projects

- **QASweep** — multi-agent QA verification harness. Runs a pull request or repository through four independent lenses in parallel — API, end-to-end, spec-diff, and security/authorization — then synthesizes them into one scored ship/hold scorecard. Built on Claude Code; its first run surfaced tests that had been silently failing for weeks and an admin route with zero end-to-end coverage.
- **qa_agent_exploratory** — exploratory testing agent built on Vercel's eve AI agent framework.
- **ai_testing_framework** — agent trust-layer framework carrying the OWASP LLM Top 10 and NIST AI RMF as machine-readable control catalogs, with adversarial eval adapters and OpenTelemetry tracing.
- **kieferland.dev** — writing on testing methodology, AI assurance, and application security.

## Education

- **M.S., Cybersecurity & Information Assurance** — Western Governors University (2024)
- **B.S., Cybersecurity & Information Assurance** — Western Governors University (2023)

## Certifications

- [CompTIA Security Analytics Professional](https://www.credly.com/badges/f985eeb9-e895-421a-9a32-1a42057cf57d/public_url)
- [CompTIA Secure Infrastructure Specialist](https://www.credly.com/badges/633863e5-6b41-43b0-aa50-24a60e77fe6c/public_url)
- [CompTIA CySA+](https://www.credly.com/badges/22202c28-b670-4084-965f-d7be3569c27a/public_url)
- [CompTIA PenTest+](https://www.credly.com/badges/4c4fed40-f79d-4ccf-997f-944371472f82/public_url)
- [CompTIA Security+](https://www.credly.com/badges/503e9d89-2e63-4b60-b4c0-10a70dfd6ba7/public_url)
- [CompTIA Network+](https://www.credly.com/badges/beaa0168-0d1d-4258-a1ca-3a363b6ae4c6/public_url)
- [CompTIA A+](https://www.credly.com/badges/b296e180-af31-4db8-b872-da7e16fe1ff1/public_url)
- [CompTIA Project+](https://www.credly.com/badges/b16ffac7-df1a-4613-a6a5-09f85a7ca9b9/public_url)
- [AWS Certified Cloud Practitioner](https://www.credly.com/badges/029a5b18-00de-42d1-a01b-9008e6f45834/public_url)

## Continuous Learning

[TryHackMe](https://tryhackme.com/p/sutherland) — 251 rooms completed, top 1% of users, 32 badges. Completed paths: Security Engineer, SOC Level 1, Blue Team, Jr Penetration Tester, Web Fundamentals.
