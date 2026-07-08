export const PROJECTS = {
  "playwright-framework": {
    title: "Playwright Framework",
    kanji: "検",
    tagline: "Enterprise-grade E2E test automation for e-commerce apps.",
    summary:
      "A Page Object Model framework in TypeScript with custom fixtures, covering 116+ tests across UI, API, and security scenarios for SauceDemo and Practice Software Testing. Global auth setup eliminates repeated login overhead, and CI runs a fast smoke suite on every push with a full cross-browser pass on demand.",
    year: "2026",
    role: "Design + build",
    stack: ["TypeScript", "Playwright", "GitHub Actions"],
    repoUrl: "https://github.com/kiefertaylorland/playwright-framework",
    ciFilename: ".github/workflows/ci.yml",
    ciSnippet: `jobs:
  lint-typecheck:
    steps:
      - run: npm run lint
      - run: npm run typecheck

  api-tests:
    steps:
      - run: npx playwright test --project=api --retries=2

  e2e-smoke:
    steps:
      - run: npx playwright test --project=chromium --grep @smoke

  cross-browser:            # workflow_dispatch only, non-gating
    if: github.event_name == 'workflow_dispatch'
    continue-on-error: true`,
    gates: [
      {
        name: "Test suite",
        status: "pass",
        value: "116+ tests",
        detail: "UI, API, and security scenarios",
      },
      {
        name: "Cross-browser",
        status: "pass",
        value: "3 engines",
        detail: "Chromium, Firefox, WebKit",
      },
      {
        name: "CI reporting",
        status: "pass",
        value: "Allure",
        detail: "traces, screenshots, and video on failure",
      },
      {
        name: "Human sign-off",
        status: "pending",
        detail: "awaiting reviewer — you",
      },
    ],
  },
  "test-agent": {
    title: "Test Agent",
    kanji: "証",
    tagline: "Plan. Approve. Ship. — QA automation with a human-approval gate.",
    summary:
      "Test Agent generates a step-by-step test plan from a PR, ticket, or feature description, then stops. You review the plan and approve or reject each step. Only approved steps run — no test executes without a human sign-off first.",
    year: "2026",
    role: "Design + build",
    stack: ["Python", "PostgreSQL", "Docker"],
    repoUrl: "https://github.com/kiefertaylorland/test_agent",
    ciFilename: ".github/workflows/ci.yml",
    ciSnippet: `jobs:
  ci:
    steps:
      - run: uv sync --locked --extra dev
      - run: uv run make lint
      - run: uv run make typecheck
      - run: uv run make test`,
    gates: [
      {
        name: "Approval gate",
        status: "pass",
        value: "plan → approve → execute",
        detail: "no step runs before human sign-off",
      },
      {
        name: "Lint + typecheck",
        status: "pass",
        value: "ruff + mypy strict",
        detail: "gates every push to main",
      },
      {
        name: "Human sign-off",
        status: "pending",
        detail: "awaiting reviewer — you",
      },
    ],
  },
};
