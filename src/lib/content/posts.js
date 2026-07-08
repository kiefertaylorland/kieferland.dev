export const POSTS = [
  {
    id: "eval-first",
    title: "Eval-first development",
    date: "2026-06-14",
    read: "9 min",
    tags: ["evals", "process"],
    excerpt:
      "Before you let an agent write the code, write the test that says what 'correct' means. The eval is the spec — everything downstream is just trying to pass it.",
  },
  {
    id: "gates-not-reviews",
    title: "Gates, not reviews",
    date: "2026-05-02",
    read: "6 min",
    tags: ["ci", "process"],
    excerpt:
      "A review is a human reading diffs and hoping. A gate is a machine refusing to merge until the evidence exists. Trade hope for a checklist that runs.",
  },
  {
    id: "audit-trail",
    title: "The audit trail is the product",
    date: "2026-03-21",
    read: "11 min",
    tags: ["observability", "trust"],
    excerpt:
      "When one person signs off on work from many agents, the only thing that scales is provenance. Record every action so the signature means something.",
  },
  {
    id: "flaky-gates",
    title: "On flaky gates",
    date: "2026-01-09",
    read: "5 min",
    tags: ["evals", "ci"],
    excerpt:
      "A gate that fails at random is worse than no gate — it teaches people to ignore red. Quarantine flakes, measure them, and never let them block a human.",
  },
];

export function formatPostDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
