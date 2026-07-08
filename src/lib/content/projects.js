export const PROJECTS = {
  gatekeeper: {
    title: "Gatekeeper",
    kanji: "検",
    tagline: "A merge-gate that will not let unverified work through.",
    summary:
      "Gatekeeper runs the full eval suite on every pull request, diffs findings against the last green build, and blocks the merge until a human signs the audit entry. Agents can open a hundred PRs a day; exactly one careful person has to sign each one — and only when the evidence is already green.",
    year: "2026",
    role: "Design + build",
    stack: ["TypeScript", "GitHub Actions", "SQLite", "React"],
    gates: [
      {
        name: "Eval suite",
        status: "pass",
        value: "98.2%",
        detail: "1,204 cases · 0 regressions vs. last green",
      },
      {
        name: "Type check",
        status: "pass",
        value: "clean",
        detail: "strict, no new anys",
      },
      {
        name: "Contract tests",
        status: "pass",
        value: "312 / 312",
        detail: "provider + consumer",
      },
      {
        name: "Flake watch",
        status: "warn",
        value: "1 quarantined",
        detail: "does not block merge",
      },
      {
        name: "Human sign-off",
        status: "pending",
        detail: "awaiting reviewer — you",
      },
    ],
  },
  trace: {
    title: "Trace",
    kanji: "証",
    tagline: "The audit trail as a first-class product.",
    summary:
      "Trace records every agent action, prompt, and diff and links it to the gate that let it through. When something ships, you can replay exactly how it got there — the provenance that makes one signature trustworthy across many agents.",
    year: "2025",
    role: "Design + build",
    stack: ["React", "ClickHouse", "OpenTelemetry"],
    gates: [
      {
        name: "Ingest lag",
        status: "pass",
        value: "< 400ms",
        detail: "p99, 1.2M events/day",
      },
      {
        name: "Replay parity",
        status: "pass",
        value: "100%",
        detail: "byte-exact reconstruction",
      },
      {
        name: "Schema drift",
        status: "warn",
        value: "2 fields",
        detail: "backfill scheduled",
      },
    ],
  },
};
