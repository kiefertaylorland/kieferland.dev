# TODOS

## Content

### Fix About page RSS date

**What:** Add `date:` (or `hiddenInRss: true`) front matter to `content/about.md`.

**Why:** About has no `date`, so it appears in `/rss.xml` with an invalid year-0001 pubDate (RFC 822 violation; feed validators flag it, strict readers mis-sort or drop it) and emits `datePublished: 0001-01-01` in its JSON-LD. The same defect was found and fixed on the new services/contact pages in v0.1.0.0; About is the last page carrying it.

**Context:** PaperMod's `rss.xml` includes all regular pages unless `Params.hiddenInRss` is true. `hiddenInRss: true` keeps the feed writing-only (matches how services/contact were fixed); a real `date:` also fixes the JSON-LD. One-line change, verify with `hugo build` + grep for `0001` in `public/rss.xml`.

**Effort:** S
**Priority:** P2
**Depends on:** None

## Infrastructure

### Internal-link validation for the services funnel

**What:** Guard internal links (home → /services/ → /contact/) against silent 404s — either Hugo `relref` shortcodes in content, or an internal-only link-check step in `.github/workflows/deploy.yml`.

**Why:** All links were manually verified in v0.1.0.0, but nothing enforces them going forward; a future slug rename would deploy silent 404s in the hire-me funnel.

**Context:** Deliberately deferred at ship time (small site, five internal links). If adding a CI checker (lychee/htmltest), scope it to internal links only — external checks are flaky (LinkedIn blocks bots) and would block deploys on false positives. `relref` can't cover the hugo.yaml homepage/menu links.

**Effort:** S
**Priority:** P3
**Depends on:** None

## Tooling

### Upgrade Codex CLI

**What:** Upgrade the Codex CLI (`npm i -g @openai/codex`) or pin a supported model in its config.

**Why:** Codex v0.142.5 fails every call — the configured `gpt-5.6-terra` model returns 400 "requires a newer version of Codex" — so /ship and /review lose their cross-model adversarial pass.

**Context:** Observed during the v0.1.0.0 ship; the adversarial review ran Claude-only. Machine-level fix, not repo-specific, but tracked here since it degrades this repo's review coverage.

**Effort:** S
**Priority:** P3
**Depends on:** None

## Completed
