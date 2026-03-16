# Copilot Instructions

## Project overview

Static Hebrew kids learning app for a 3-year-old named Talya. Three activities: Aleph-Bet (Hebrew letters), Colors, and Stories. Tap any item to hear its name (or story title) spoken in Hebrew. No backend, no build step — pure HTML, CSS, and vanilla JS served as static files. A `package.json` exists only for Playwright dev tooling.

**Navigation is symbol-only** (icon images, no text labels) because the target user cannot read yet.

## Tech stack and tooling

- **No build system**: No webpack or Babel. Edit HTML/CSS/JS files directly.
- **Dev dependencies**: `@playwright/test` (browser testing). Install with `npm install` and set up browsers once with `npx playwright install chromium`.
- **Local dev server**: `npx live-server --port=8765` (auto-reload on file change). Open `http://127.0.0.1:8765`.
- **Automated tests**: Playwright (`npm test`). Tests live in `tests/app.spec.js` and cover all four sections plus navigation.
- **Deployment**: GitHub Actions on push to `main` → GitHub Pages. Workflow: `.github/workflows/deploy.yml`. See `docs/deployment.md` for one-time setup.

## Feature development workflow

Follow this flow for every feature or content change:

1. **Install dependencies** (first time or after pulling):
   ```bash
   npm install
   npx playwright install chromium
   ```

2. **Start the local dev server**:
   ```bash
   npx live-server --port=8765
   ```

3. **Make your changes** to `index.html`, `css/style.css`, `js/main.js`, etc.

4. **Run the Playwright tests** to verify nothing is broken:
   ```bash
   npm test
   ```

5. **Take screenshots of any UI changes** using Playwright (the tests already capture them to `test-results/screenshots/`). Attach relevant screenshots to your PR so reviewers can see the visual impact.

6. **Use `report_progress`** to commit and push your changes to the PR branch. Deployment to GitHub Pages happens automatically once the PR is merged to `main` — the agent does not push directly to `main`.

## File map

```
index.html          Single-page shell; four sections, only one visible at a time
css/style.css       All styles: RTL, theme tokens (CSS custom properties), layout
js/main.js          Data arrays, section switching, grid/list rendering, click handlers
js/audio.js         playAudio({ url, text }) — MP3 play with Hebrew TTS fallback
audio/letters/      Optional MP3 files per letter (01.mp3–22.mp3 or aleph.mp3, …)
audio/colors/       Optional MP3 files per color id (red.mp3, blue.mp3, …)
audio/stories/      Optional MP3 files per story (story-1.mp3, …)
img/                Navigation icons (PNG): icon-letters.png, icon-colors.png,
                    icon-stories.png, icon-back.png
tests/app.spec.js   Playwright tests; cover all sections and navigation
playwright.config.js  Playwright config; starts live-server automatically
package.json        Dev dependency: @playwright/test only (no build tooling)
docs/content-schema.md  Canonical list of letters, colors, and stories (source of truth)
docs/audio.md       Audio folder layout, naming conventions, TTS fallback details
docs/theme.md       Palette (CSS vars), tap targets (min 72 px), RTL/Hebrew rules
docs/how-we-build.md    Structure, section IDs, where data lives, decisions
docs/icon-prompts.md    AI image prompts used to generate each icon in img/
docs/deployment.md  GitHub Pages setup, deploy steps, git workflow
skills/deploy-github-actions/SKILL.md   Skill: deploy/workflow changes
skills/hebrew-kids-app/SKILL.md         Skill: adding content or features
```

## Single-page structure

`index.html` contains four `<section>` elements; CSS hides all and shows the one with class `section--active`. JS switches sections by toggling that class.

| Section ID          | Content                      |
|---------------------|------------------------------|
| `section-home`      | Three navigation tiles       |
| `section-aleph-bet` | Letter grid (`#aleph-bet-grid`) |
| `section-colors`    | Color swatch grid (`#colors-grid`) |
| `section-stories`   | Story list (`#stories-list`) |

Navigation tiles and back buttons are `<a>` elements with `data-section="<target>"`. JS binds click handlers to `[data-section]` via `bindNav()`.

## Audio

`js/audio.js` exposes `window.playAudio({ url, text })`:
1. Stops any current playback (Audio + speechSynthesis).
2. If `url` is given, plays the MP3. On error or load failure, falls back to TTS.
3. TTS uses `SpeechSynthesisUtterance` with `lang: 'he-IL'` and the Hebrew `text` string.

When audio files are missing the app still works via TTS — absence of MP3 files is not an error.

## Content data

**Authority**: `docs/content-schema.md` is the canonical source for letters, colors, and stories.  
**In code**: Data is mirrored as JS arrays at the top of `js/main.js` (`LETTERS`, `COLORS`, `STORIES`).

When adding or changing content, **update `docs/content-schema.md` first**, then mirror the change in `js/main.js`.

## Theme and style conventions

CSS custom properties are defined in `:root` in `css/style.css`:
- `--color-accent: #6c5ce7` (purple)
- `--color-bg: #fff5f0` (warm light)
- `--tap-min: 72px` (minimum interactive element size)
- `--radius: 1rem` (rounded corners)
- `--font-hebrew: "Heebo", sans-serif`

Root `<html>` has `dir="rtl"` and `lang="he"`. All layout uses RTL-aware flex/grid.

New interactive elements must meet the 72 px minimum tap target. Use existing CSS class patterns (`.letter-btn`, `.color-btn`, `.story-btn`) as a template.

## Icons

Icons in `img/` are PNG images generated from AI prompts. Prompts are in `docs/icon-prompts.md`. To replace an icon: regenerate from the prompt with an image model and save as the same filename in `img/`. The tile/back controls are `<a>` elements containing only the `<img>` — no button wrapper.

## Adding content (quick reference)

### Add a letter
1. Add row to letters table in `docs/content-schema.md`.
2. Add the letter to `LETTERS` array in `js/main.js`.
3. Optionally drop `audio/letters/{filename}.mp3`; TTS fallback works without it.

### Add a color
1. Add row (id, Hebrew name, hex) to colors table in `docs/content-schema.md`.
2. Add object `{ id, hebrew, hex }` to `COLORS` array in `js/main.js`.
3. Optionally drop `audio/colors/{id}.mp3`.

### Add a story
1. Add row (id, title, audioFile) to stories table in `docs/content-schema.md`.
2. Add object `{ id, title, audioFile }` to `STORIES` array in `js/main.js`.
3. Optionally drop `audio/stories/{audioFile}`.

## Deployment

Push to `main` triggers automatic deploy to GitHub Pages via `.github/workflows/deploy.yml`. The workflow copies `index.html` and directories `css`, `js`, `img`, `audio`, `docs` into `_site/` and uploads as a Pages artifact. No build command is needed. See `docs/deployment.md` for one-time repo setup.

## Common mistakes to avoid

- **Do not add a build system** (webpack, Babel, etc.) — the app is intentionally zero-build; `package.json` is only for Playwright dev tooling.
- **Do not add text labels** to navigation tiles or back buttons — the user cannot read.
- **Keep `dir="rtl"` and `lang="he"` on `<html>`** — required for correct RTL layout and Hebrew TTS.
- **Mirror content changes in both `docs/content-schema.md` and `js/main.js`** — they must stay in sync.
- **Always use `playAudio({ url, text })`** for audio — never call the Web Speech API directly from `main.js`.
- **Tap targets must be at least 72 px** — use `--tap-min` custom property.
- **Always include screenshots of UI changes in the PR** — take them from `test-results/screenshots/` after running `npm test`.
