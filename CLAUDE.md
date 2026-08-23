# kieferland.dev

Personal site built with Hugo and the PaperMod theme (git submodule at `themes/PaperMod`).
Config lives in `hugo.yaml` (not hugo.toml). Content in `content/`, posts under
`content/writing/` with permalinks `/writing/<slug>/`. Deploys via GitHub Actions
(`.github/workflows/deploy.yml`). Build locally with `hugo build` after
`git submodule update --init`.

Standalone pages (`content/about.md`, `content/services.md`, `content/contact.md`)
render at `/about/`, `/services/`, `/contact/`; pages that should stay out of
`/rss.xml` set `hiddenInRss: true` in front matter. Release notes live in
`CHANGELOG.md`, planned work in `TODOS.md`, and the current version in `VERSION`.

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
