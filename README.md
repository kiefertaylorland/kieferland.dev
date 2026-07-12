# kieferland.dev

Personal site and blog — notes on making AI-built software verifiable.

Built with [Astro](https://astro.build). Posts are plain markdown files in `src/content/writing/`.

## Develop

```sh
npm install
npm run dev      # local dev server at localhost:4321
npm run build    # static build to dist/
```

## Publish a post

Drop a `.md` file in `src/content/writing/` with frontmatter:

```yaml
---
title: "Post title"
date: 2026-07-11
description: "One-line excerpt shown on the home page."
tags: ["qa", "testing"]
---
```

Push to `master` — GitHub Actions builds and deploys to GitHub Pages.
