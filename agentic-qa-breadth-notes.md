# Notes for "agentic-qa-breadth" — raw material, not drafted

Source: git/gh history across your repos, 2026-06-27 → 2026-07-11 (2-week window). Raw findings only — write-up is yours.

## 1. meguru — follow-on work after the MVP commit already in the post

Post currently cites `3202114` (Gremlins mutation testing) and `750217b` (MVP: storage/deck/scheduler/review/TUI+CLI in one commit). These three landed after that, same repo, same window:

- `d113a0b` (2026-07-06) — "Implement real FSRS scheduling (002-fsrs-scheduler)". Spec + tests in the same increment.
- `bd525a4` (2026-07-06) — "test(deck): decouple unit tests from registry order; generalize no-dup guarantee". Landed same day as the one below.
- `a54ab0b` (2026-07-06) — "feat(deck): generalize embed+seed pipeline; add katakana + N5 kanji/vocab decks".

Angle: the MVP commit's discipline (ship + test together) held for what came after, not just the initial push. 4 features total if you count the MVP.

Links: `https://github.com/kiefertaylorland/meguru/commit/<hash>`

## 2. Same evening, four unrelated repos — new finding, not in current post

On 2026-07-01, in roughly a 40-minute window (20:42–21:38 PT), four separate repos each got a CI-gate + test-coverage commit. Different stacks, no shared code:

- **payment-chaser** — `73e0d25` (21:11:36) — added GitHub Actions workflow (lint, typecheck, full Vitest suite against a real Postgres service container) + multi-currency totals test (USD/EUR/JPY, zero-decimal JPY, unknown-currency fallback).
- **playwright-framework** — `24aca63` (20:42:04) — centralized base URLs to one source of truth, tagged login/checkout `@smoke`, added CI workflow gating the Chromium smoke lane.
- **hacker-news-japan** — `1dc61c6` (20:47:40) — added typecheck script, CI workflow, new component/API tests, gated the Pages deploy on the new test job.
- **kanto_pokedex** — `483695c` (21:19:53) — integration tests for compare/landing pages + unit test for the health-check Cloudflare Pages Function.

Angle: title of the post is "breadth" but the original draft only really shows depth on two projects (payment-chaser, meguru). This is the actual breadth data point — same pattern, same evening, zero code overlap, four different deploy targets (Postgres app / E2E suite / static Pages site / Cloudflare Worker).

Links: `https://github.com/kiefertaylorland/<repo>/commit/<hash>`

## 3. payment-chaser — additional items in-window not yet in the post

- `d3c6af3` (2026-07-01) — "fix: pin approveAndSend to the click-time step so a Send-now/cron race can't double-send." Another race/timing bug, same family as the three already cited (`d6ac9c4`, `445b480`, `9d2719f`) — could extend that cluster to 4, or treat separately since it's a slightly different mechanism (UI/cron race vs. reconcile/auth races).
- `fca77d4` (2026-07-07) — public `/demo` route with a seeded, read-only sample dashboard. Not a QA item per se, but shows continued shipping in the window if useful as context.
- `259f06b` / `22acd8d` (2026-06-29) — "production-scale sanitized QA seed (seed-qa.mjs)" + fix for per-currency outstanding total / exhausted-sequence preview / onboarding Stripe link. Bug-plus-test-fixture landed together.

## 4. Day-job stats — anonymize, do not name company/product/repo/coworkers

Repo: private (yours to redact — I'm deliberately not naming it here either, even in your own notes file, in case this note itself ever gets shared). Window: same 2026-06-27 → 2026-07-11.

- **63** total PRs merged across the team in the window.
- **17** of those 63 were yours — and all 17 were test/QA/CI infrastructure, zero feature PRs.
- A 4-part coverage push landed in batches: pure-logic unit tests, work/app hooks, shared components — each batch hit 100% for its own slice rather than chasing one global number. (Commits used conventional prefixes: `test(coverage): batch 1/2/3a`.)
- A written, risk-based QA test strategy doc landed the same week pgTAP + Dependabot got wired into CI.
- Mutation-testing gate (Stryker) went: scattered/ad hoc configs → consolidated into one job → weekly scheduled run with an enforced floor. Three separate commits, same short window.
- A race condition closed with an advisory lock — same bug family as the payment-chaser races, different guard mechanism (lock vs. fencing token). Worth an explicit callback if you want the "same bug class, different codebase" beat.
- E2E suite extended to a full approval-flow lifecycle (submit → approve/deny → terminal state) — I've generalized away the specific domain name (was PTO-approval-flow in the raw commit) since that plus other details could be identifying; your call how specific to get.
- A vitest pool change (default → `vmThreads`) cut unit-test runtime ~2.3x. Concrete, non-identifying number if you want one perf beat.
- One item I excluded entirely: an OWASP-based test plan for an internal AI/chatbot feature — the feature name in the commit is specific enough that I didn't want to even paraphrase it here without you deciding first.

**Redaction flags for you to sanity-check before writing:** the "17 of 63" ratio + the specific gate/tooling combo (Stryker + pgTAP + Dependabot + approval-flow E2E) might be recognizable to a teammate even fully anonymized. You know your team's tolerance for that better than I do.

## 5. Not investigated / possible additional angles if you want more

- Several other repos had activity in-window (bug-bolt, retro-alerts, resume, lifeos-work, japanese-agent) but nothing that read as a QA/testing story on a first pass — didn't dig deeper.
- Didn't pull `kai insights` (LifeOS memory-delta tool) data into any of this — it tracks internal memory/reviewer-run health, not code, so nothing there fit a "real commit or it didn't happen" post.

## 6. LifeOS telemetry — same 2026-06-27 → 2026-07-11 window

Source: local JSONL logs under `~/.claude/LIFEOS/MEMORY/OBSERVABILITY/`. All aggregate counts only — I did not read or quote any memory content, session transcripts, or prompt text. Project directory names that would reveal client/employer codenames are generalized below; this mirrors the redaction approach in section 4.

**Verification-gate telemetry (`success-claim-gate.jsonl`)** — this is the automated hook that checks whether a "done"/"fixed"/"verified" claim in an agent's message is backed by evidence, and blocks the claim if not:

- 322 stop-hook evaluations in the window.
- 277 had no completion claim to check (`no-claim`).
- 11 made a claim backed by real evidence (`pass`).
- **13 were blocked outright** — the agent tried to assert something was fixed/verified without evidence to back it.
- 16 `skip-recovery`, 5 `block-webui-no-interceptor` (edge cases, probably not worth using).
- Angle: this is a real, automatic instance of the exact failure mode the post's "What I'm not claiming" section already gestures at — an agent claiming success it can't back up. 13 caught-and-blocked claims in the same 2-week window is a concrete number, and it's about your own tooling, not a client's.

**Reviewer / memory-health telemetry (`kai insights --days 14`)** — already summarized in an earlier pass, repeating here for completeness:

- 35 reviewer runs: 32 succeeded, 3 failed. p50 latency 3871ms, p95 latency 29120ms.
- Health snapshot: 28 "ok" checks, 0 warn, 0 critical across the window.
- Memory growth: +33 entries in one memory file, +1 in another; 6 knowledge notes and 2 idea notes added; 10 proposals opened, all still pending.

**Tool-activity volume (`tool-activity.jsonl`)** — total tool invocations across all agent sessions, all projects:

- 7,114 tool calls total. Top ones: Bash 4,554, Read 1,200, Edit 508, Write 296, TaskUpdate 107, Agent (subagent spawns) 95, ToolSearch 67, TaskCreate 66, AskUserQuestion 65, ScheduleWakeup 49, DesignSync 36, ExitPlanMode 22, Skill 21, SendMessage 13, Monitor 6.
- Angle: could support a "breadth" claim about volume/pace of agentic work generally, separate from the QA-specific angle — probably a different post, or a single aside at most in this one.

**Session/cost telemetry (`session-costs.jsonl`)** — figures below are real; treat the cost figure as sensitive and decide for yourself whether it belongs in a public post at all:

- 1,058 distinct agent sessions in the window, ~21,172 total messages, ~12.9M output tokens, ~$3,274 in aggregate cost (across all projects, all models).
- Model mix: Sonnet 5 was the plurality (~10.1k messages), Opus 4.8 second (~7.8k), Haiku 4.5 (~1.7k), Fable 5 (~0.9k) — reflects effort-routing across tasks, not a deliberate split.
- Session counts by project, generalized: the personal projects already named in the post (payment-chaser, meguru, kieferland.dev) each had double-digit session counts; the day-job repo (section 4) had by far the highest count of any single project; a personal side-venture project (not client work) had a substantial share too; a couple of client/consulting-style directories showed up with smaller counts — I'm not naming those here since I can't be sure how public you want that association to be, even in your own notes.

**Privacy checklist before you use any of this:**

- Nothing above quotes memory content, prompt text, or session transcripts — only counts.
- I generalized every project-directory name that isn't already public in the blog post or your own site (payment-chaser, meguru, kieferland.dev, and "day job" are fine; everything else I left as a category, not a name).
- The cost figure ($3,274) is the one item here that's more "personal financial detail" than "telemetry" — worth a deliberate yes/no from you rather than a default include.

## 7. CMT Testing & QA Framework — the framework itself (Notion, not code)

Source: your "CMT Testing & QA Overview" page + 4 sub-pages. Product name and coworker names generalized to roles, same as section 4.

- **Core stance (pull-quote candidate):** "An unstated gap is the actual risk. A named, owned, triggered drop is a strategy."
- **Five steps:** Classify (high-risk vs. standard; HR/EOR always high-risk) → Measure (20 categories from real tool output; "0%, no tooling" is valid; never averaged across categories) → Score (Invest/Keep/Hold/Drop; every Hold/Drop gets a named owner + revisit trigger) → Gate (Advisory-PR → Required-PR only after zero flaky candidates + a 2-week zero-false-block trial; smoke always blocks) → Govern (quarterly re-score minimum; statuses move both directions).
- **Flaky-test rule:** flaky = different result across runs, no code change (vs. broken = fails every time). One auto-retry; flagged after failing-then-passing-on-retry twice in 7 days; quarantined ≤1 business day, fixed/retired ≤14 calendar days. A real intermittent product bug (e.g. a race) routes to defect triage, not flaky policy.
- **Exceptions:** named signer + expiry always, max 2 concurrent per suite, logged to a ledger (proposed: queryable DB; today: GitHub Issues `gate-exception` label).
- **Workflow:** Intake → Test Planning (no sign-off = audit isn't valid evidence) → Execution (flaky policy must be _operating_, not just adopted, before any blocking gate) → Exceptions → Sign-off (security escalation ≤2 business days on high-risk failures; quarterly record ≤5 business days).
- **Worked-example figures (anonymized):** ~91% unit baseline / 88% CI floor; mutation break-threshold 60 weekly; E2E covering 83% of high-risk modules; Perf/Load/Stress explicit Drops with "real traffic scale" as the trigger; deploys measured (not assumed) at ~250/month.
- **Status:** framework + both appendices still `PROPOSED — pending sign-off` (same doc as the leadership email drafted earlier this session).
- **Angle:** this is the policy behind section 4's anonymized day-job stats — section 4 is the framework in execution, this is the framework itself. No commit hash to link, though, which cuts against the post's own "everything links to a real commit" rule — your call whether it fits this post, a follow-up, or stays notes-only.
