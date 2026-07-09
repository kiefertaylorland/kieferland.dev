export const POSTS = [
  {
    id: "agentic-qa-breadth",
    href: "/writing/agentic-qa-breadth/",
    date: "2026-07-08",
    title: "What agentic QA looks like when you check the commit log",
    excerpt:
      "Real commits from my own projects, not a claim about what agents can do.",
    read: "4 min",
    tags: ["qa", "agents"],
  },
];

export function formatPostDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
