# How we build this app

Short guide to structure and conventions so new work stays consistent.

## Single-page structure

- One `index.html` with `dir="rtl"` and `lang="he"`.
- Three sections, only one visible at a time:
  - `#section-home` — home with three tiles
  - `#section-aleph-bet` — letter grid
  - `#section-colors` — color grid
  - `#section-stories` — story list
- Section switching: JS hides all sections and shows the one selected (e.g. by tile or "חזרה" back button). No route or hash required for v1.

## Audio layer

- `js/audio.js` exposes `playAudio(options)` where `options` has:
  - `url` (optional): path to MP3
  - `text`: Hebrew string for TTS when url is missing or play fails
- Flow: try `url` first; on error or no url, use `speechSynthesis` with `lang: 'he-IL'` and `text`.
- Optionally cancel previous playback when starting a new one (so rapid taps don’t queue).

## Where content data lives

- **Authority**: `docs/content-schema.md` is the canonical list of letters, colors, and stories.
- **In the app**: Data is mirrored in JS (e.g. in `main.js` or a small `data.js`) as arrays/objects so the app can render the grids and resolve audio paths. Path resolution:
  - Letters: `audio/letters/{filename}.mp3` — filename from schema or derived from letter (e.g. by index).
  - Colors: `audio/colors/{id}.mp3`
  - Stories: `audio/stories/{audioFile}` from schema.
- When adding content: update content-schema first, then update the JS data to match (or later, generate JS from schema if we add a build step).

## Section IDs and hooks

- Home: `#section-home`
- Aleph-Bet: `#section-aleph-bet`; container for letter grid (e.g. `#aleph-bet-grid`).
- Colors: `#section-colors`; container for color grid (e.g. `#colors-grid`).
- Stories: `#section-stories`; container for story list (e.g. `#stories-list`).
- Each section has a "חזרה" (back) control that shows `#section-home`.

## Files

- `index.html` — shell and section markup
- `css/style.css` — all styles (RTL, theme, layout)
- `js/main.js` — section switching, grid/list rendering, click handlers that call `playAudio`
- `js/audio.js` — `playAudio` only
- `audio/letters/`, `audio/colors/`, `audio/stories/` — optional; if missing, TTS is used

## Decisions (for reference)

- Single-page to avoid reload and to share one audio helper and one TTS fallback path.
- TTS fallback for stories in v1 speaks only the title when the recording is missing; full-story TTS is out of scope for v1.
