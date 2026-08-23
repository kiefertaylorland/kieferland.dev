# kieferland.dev

Personal site built with Hugo and the PaperMod theme (git submodule at `themes/PaperMod`).
Config lives in `hugo.yaml` (not hugo.toml). Content in `content/`, posts under
`content/writing/` with permalinks `/writing/<filename>/` (`:contentbasename` —
filename-derived, so a `slug:` front-matter key is ignored). Deploys via GitHub Actions
(`.github/workflows/deploy.yml`) on push to `master` only, pinned to Hugo extended
0.164.0. Build locally with `hugo build` after `git submodule update --init`.

Local overrides shadow the theme: `layouts/_partials/home_info.html` (renders the
homepage intro, including the markdown "Work with me →" link), `assets/css/extended/tables.css`
(custom CSS), and `static/` (CNAME, favicons).

Standalone pages (`content/about.md`, `content/services.md`, `content/contact.md`)
render at `/about/`, `/services/`, `/contact/`. Standalone-page front matter: always
set a real `date` (a missing date emits an invalid year-0001 pubDate in `/rss.xml`
and JSON-LD), and set `hiddenInRss: true` to keep the feed writing-only. The main
nav is Writing / Services / About; `/contact/` is intentionally nav-less and reached
from the Services page. Release notes live in `CHANGELOG.md`, planned work in
`TODOS.md`, and the current version in `VERSION`.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
