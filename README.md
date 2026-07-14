# kieferland.dev

Personal site and blog — notes on making AI-built software verifiable.

Built with [Hugo](https://gohugo.io) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme. Posts are plain markdown files in `content/writing/`.

## Publish a post

Drop a `.md` file in `content/writing/` with frontmatter:

```yaml
---
title: "Post title"
date: 2026-07-11
description: "One-line excerpt shown on the home page."
tags: ["qa", "testing"]
---
```

Push to `master` — GitHub Actions builds and deploys to GitHub Pages.

## Develop

```sh
git clone --recurse-submodules https://github.com/kiefertaylorland/kieferland.dev.git
hugo server    # local dev server at localhost:1313
hugo --minify  # static build to public/
```

To update the theme: `git submodule update --remote themes/PaperMod`.
