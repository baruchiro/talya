# Hebrew Kids Learning App

Static Hebrew web app for young children: Aleph-Bet letters, colors, and stories. Tap an item to hear its name (or story) in Hebrew. Works on desktop browsers with optional touch.

## Run locally

### Dev server (watch + refresh)

Use a server that watches files and reloads the browser on change:

```bash
# Option 1: live-server (install once, then run)
npm install -g live-server
live-server --port=8765

# Option 2: npx (no install)
npx live-server --port=8765
```

Then open `http://127.0.0.1:8765`. Edit HTML, CSS, or JS and the page will reload automatically.

### Static server (no watch)

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Open the URL shown. Some browsers require a server for audio to work reliably.

## Adding your recordings

Place MP3 files in these folders:

| Folder | Naming | Example |
|--------|--------|---------|
| `audio/letters/` | `01.mp3` … `22.mp3` (one per letter א–ת in order) | `01.mp3` = א |
| `audio/colors/` | `{id}.mp3` (id from docs/content-schema) | `red.mp3`, `blue.mp3` |
| `audio/stories/` | Filename from docs/content-schema | `story-1.mp3`, `story-2.mp3` |

If a file is missing or fails to load, the app falls back to **Hebrew TTS** (browser’s Web Speech API, `he-IL`). Quality depends on the browser and OS.

See [docs/audio.md](docs/audio.md) and [docs/content-schema.md](docs/content-schema.md) for the full list and conventions.

## Hebrew TTS (desktop)

Chrome, Edge, and Safari support Hebrew TTS; voice quality varies. To test without recordings, leave the `audio/` folders empty and tap any letter, color, or story — the app will speak the letter/color name or story title via TTS.

## Icons

Navigation icons (home tiles and back button) are in `img/`. Prompts used to generate them are in [docs/icon-prompts.md](docs/icon-prompts.md). To replace an icon, regenerate with an image model using the prompt, then save as the same filename in `img/`.

## Deployment

The app deploys to **GitHub Pages** via **GitHub Actions** on push to `main`. One-time setup and how to deploy later: [docs/deployment.md](docs/deployment.md).

## Project docs

- [docs/content-schema.md](docs/content-schema.md) — letters, colors, stories (add new items here)
- [docs/icon-prompts.md](docs/icon-prompts.md) — prompts for generating navigation icons
- [docs/audio.md](docs/audio.md) — audio layout and TTS fallback
- [docs/theme.md](docs/theme.md) — playful theme and RTL
- [docs/how-we-build.md](docs/how-we-build.md) — structure and conventions
