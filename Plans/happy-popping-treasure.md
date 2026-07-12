# Redesign kieferland.dev with "The Verification Layer" design system

## Context

The blog's current visual system (`static/css/style.css`) is a bespoke "Kiefer Land / 検証" design — Inter + JetBrains Mono, warm neutral scale, dark-mode-default with a toggle, a hanko-stamp accent, and pass/fail/warn "test gate" colors. It shares the exact thesis and brand concept ("As agents write more code, the bottleneck becomes trust", 検証/verification, a vermillion seal accent) with a newly imported Claude Design project, **"The Verification Layer — Design System"** (`cab09c1d-ea60-45f9-a66f-59c9a486268c`), whose `ui_kits/notes-site/index.html` is a fully worked-out interactive mockup of an essay-publication site built on that concept.

The goal: port the imported design system's tokens, type, and component patterns onto the real Hugo site, replacing the current bespoke CSS — while keeping the existing content model (Home / Writing list+post / About) rather than adopting the mockup's fictional publication features.

Decisions locked in with the user:
- **Drop dark mode entirely.** The imported system is flat/printed/light-only by spec; remove the toggle, the moon/sun icons, and all `[data-theme="dark"]` overrides.
- **Use the curated illustration assets** (`hero-serpent-ink.jpg` for the homepage hero, `wave-pattern.jpg` as an accent band) rather than staying imagery-free. **Superseded during implementation:** both files turned out to be watermarked Shutterstock stock-photo previews (visible "shutterstock" tiling) and were truncated by the design-sync API's 256KB read cap — unusable for a production site. Decision: drop imagery entirely; text/icon-only, same as today, just restyled.
- **Skip the mockup's Subscribe band and Proof-ledger table** — those are fictional demo content for the essay-publication concept. Only port the visual system (colors, type, cards, tabs, badges) onto the existing Home / Writing / About / Post pages.

Two pieces of unrelated mid-flight work are sitting in the working tree (a gutted draft post `content/writing/agentic-qa-breadth.md` + its untracked research notes file, and whitespace-only edits to `content/_index.md`/`layouts/index.html`) — leave these untouched; build the redesign on top of them without reverting or finishing that draft.

## Source of truth: imported design system

Pulled via the `DesignSync` MCP tool from project `cab09c1d-ea60-45f9-a66f-59c9a486268c`:

- **Tokens** (`tokens/colors.css`, `typography.css`, `spacing.css`, `borders.css`, `fonts.css`, `base.css`): ink `#141311` on paper `#faf9f6`/`#f1efe8`, one vermillion accent `#c73e3a` (+ green `#2e7d4f` for "verified"), Geist Sans/Geist Mono (+ Silkscreen as the flagged pixel-display substitute), strict 4px spacing scale, 6px radius for chrome / 64px for category tabs / 100px for pills, 1px hairlines only, **no shadows, no gradients**, 120ms ease-out color/border transitions only.
- **Component reference** (`components/{button,badge,card,tabs,forms,table}/*.jsx`): exact style rules for Button (default/secondary/ghost, pill option), Badge (neutral/verified/draft/tier, optional dot), Card (hairline border, hover → ink border, no shadow), Tabs (pill group, active = ink border + page-color fill).
- **Working mockup** (`ui_kits/notes-site/{index.html,HomeScreen.jsx,NoteScreen.jsx,shared.jsx}`): concrete layout patterns — sticky header with wordmark + nav + verified badge, hero (mono eyebrow → big serif-weight headline with one vermillion word → lede → pill CTAs → bordered hero image), a 2-column card grid for the notes index with per-card eyebrow+badge+title+dek, a note/post page with mono eyebrow (id/date), badge, title, dek, hairline-bounded meta row, prose body.
- Full readme/brand rationale confirms "no logo — plain type wordmark", sentence case everywhere, em dash for empty values, Lucide-style 1.5px icons only where unavoidable.

## Implementation

### 1. Assets
Fetch `hero-serpent-ink.jpg` and `wave-pattern.jpg` from the design project (`DesignSync get_file`, base64) and save to `static/img/` (new dir). Reference them with `relURL`/plain paths from templates.

### 2. `static/css/style.css` — full token + component rewrite
Replace the `:root` token block wholesale with the imported system's values (ink/paper/hairline/vermillion/green semantics, Geist font stack + Google Fonts import incl. Silkscreen, 4px spacing scale, 6px/64px/100px radii, no shadow tokens beyond `none`). Delete the `:root[data-theme="dark"]` block and all dark-mode-only rules. Drop the unused `warn`/`fail` gate tokens (grep confirms they're never referenced outside token definitions).

Rewrite each existing component class to the new visual language, **keeping the existing class names** (since `content/about.md` hardcodes raw HTML using them via `unsafe = true` Goldmark rendering — do not touch that content file):
- `.site-header`/`.site-header-inner`/`.brand`/`.site-nav`: sticky, flat paper background (no blur/translucency), hairline bottom border, sentence-case nav links, vermillion hover per system rules.
- `.stamp`/`.stamp-lg`: flatten to a single 1.5px vermillion border, drop the `box-shadow: inset` (system: no shadows) — reads as "one red seal" per the brand doc, keep as Kiefer's own mark (distinct from the mockup's "no logo" rule, which is about the fictional publication).
- `.hero`/`.page-title`/`.hero-lede`: adopt the mockup's Hero pattern — mono eyebrow, big Geist 600 headline (keep current copy, style the word "trust" in vermillion), lede paragraph, hero image slot (bordered, 6px radius, using `hero-serpent-ink.jpg`) on Home only.
- `.btn`/CTA links: restyle to the Button component's default/secondary/ghost variants at pill radius, matching `Button.jsx`'s exact colors/hover states.
- `.tag-filter`/`.tag-btn`: restyle as the Tabs component (64px radius pill group, active = ink border + page background).
- `.writing-list`/`.writing-row`: convert from a row list to the NotesIndex 2-column Card grid (hairline border, 6px radius, no shadow, hover → ink border), each card getting a mono eyebrow (date) + optional Badge (draft posts get a `draft` badge from frontmatter; published posts get no badge or a `verified` dot per taste) + title + excerpt.
- `.post`/`.post-meta`/`.post-body`: restyle per NoteScreen — mono eyebrow (date · reading time), Geist Sans body at 15px/1.6, mono for code.
- `.callout`/`.callout-pass`: restyle as a flat hairline-bordered panel (drop the colored left-border-as-status-indicator treatment in favor of the system's flat card look; keep the green accent for the "pass" semantic since it maps directly to `--status-verified`).
- `.metric-row`/`.metric-value`/`.metric-label`: keep structure, restyle numerals in Geist Mono (optionally Silkscreen for the large figures, matching the system's "pixel display for numerals" rule), labels as mono eyebrows.
- `.about-hero`/`.about-role`/`.about-lede`/`.about-links`/`.section-title`/`.timeline*`: restyle with the same tokens (no structural change, since this markup lives in `content/about.md`).
- Optional accent band: use `wave-pattern.jpg` as a bounded, framed band (never full-page) somewhere restrained — e.g. behind the About timeline section header or as a footer band — per the system's imagery rules (1px ink border, bounded, not wallpaper).

### 3. `layouts/_default/baseof.html`
Remove the inline `data-theme`/`localStorage` boot script entirely (no dark mode). Keep the rest of the shell as-is.

### 4. `layouts/partials/header.html`
Remove the `#theme-toggle` button and its moon/sun SVGs. Restyle nav per the Tabs/link rules above. Optionally add a small `Badge dot variant="verified"` next to the brand, matching the mockup header (nice fit for this site's own verification theme).

### 5. `layouts/partials/footer.html`
Restyle text as mono eyebrows per system tokens; no structural change.

### 6. `layouts/index.html`
Rework markup to the Hero pattern (eyebrow, headline w/ vermillion word, lede, pill CTA buttons, hero image), keep the metrics row and "Working principle" callout underneath, restyled per §2. Reconcile with the existing uncommitted whitespace-only edits already in the working tree.

### 7. `layouts/_default/list.html`
Writing branch (`.Section == "writing"`): swap the row list for the Card grid + Tabs category filter described above (map existing `tags` frontmatter to filter categories, same client-side JS approach as today — just against new markup/classes). Non-writing branch: keep the simple row layout, just restyled with new tokens (no card/tab treatment needed since no other list section exists today).

### 8. `layouts/_default/single.html`
Writing branch: adopt the Note screen header/meta pattern (mono eyebrow with date · reading time, optional draft badge, title, description as dek) above `.post-body`. Generic branch (About) needs no markup change — it's restyled entirely through CSS.

### 9. `static/js/site.js`
Delete the theme-toggle click handler block entirely. Keep the tag-filter logic, updating selectors/classes if the new Tabs markup differs from the current `.tag-btn` structure.

## Verification
- Run `hugo server -D` locally and use the `browse` skill (headless browser, per project convention — never `mcp__claude-in-chrome__*`) to actually load and screenshot: Home, `/writing/` (card grid + category filter interaction), a single post, and `/about/`.
- Confirm: no dark mode remnants (no toggle button, no `data-theme` attr, fonts/colors correct in all four views), hero image loads, category tabs actually filter cards, badges render correctly for draft vs. non-draft posts, spacing follows the 4px scale visually, no shadows/gradients anywhere, mobile viewport doesn't break the 2-column card grid or hero layout.
- Check `hugo` build has no errors/warnings (`hugo --logLevel warn` or equivalent) before considering this done.
