---
name: hebrew-kids-app
description: This skill should be used when adding or changing features in the Hebrew kids learning app (new letter, color, or story; new screen; theme tweaks; audio behavior). It documents how the app is built and where content and conventions live.
---

# Hebrew Kids Learning App — Project Skill

## Purpose

To extend or modify the static Hebrew kids app (Aleph-Bet, Colors, Stories) consistently: use the same content source, audio conventions, and theme rules.

## When to use

- Adding a new letter, color, or story
- Changing layout or sections
- Adjusting theme (palette, tap targets, fonts)
- Changing audio behavior or TTS fallback

## Reference docs (in repo)

Load as needed; paths relative to repo root.

- **Content**: [docs/content-schema.md](docs/content-schema.md) — canonical letters, colors, stories. Add new items there first; then mirror in JS data in `main.js`.
- **Audio**: [docs/audio.md](docs/audio.md) — folder layout, naming, TTS fallback.
- **Theme**: [docs/theme.md](docs/theme.md) — tap targets, palette, RTL, fonts.
- **Structure**: [docs/how-we-build.md](docs/how-we-build.md) — single-page sections, section IDs, audio layer usage, where data lives.

## Steps to add content

### Add a letter

1. Add the letter to the letters table in `docs/content-schema.md` (letter + audio filename).
2. Add the same entry to the letters array in `js/main.js` (or the data source that drives the Aleph-Bet grid).
3. Optionally add `audio/letters/{filename}.mp3`; if missing, TTS will speak the letter.

### Add a color

1. Add a row to the colors table in `docs/content-schema.md` (id, Hebrew name, hex).
2. Add the same to the colors array in `js/main.js`.
3. Optionally add `audio/colors/{id}.mp3`.

### Add a story

1. Add a row to the stories table in `docs/content-schema.md` (id, title, audioFile).
2. Add the same to the stories array in `js/main.js`.
3. Optionally add `audio/stories/{audioFile}`.

## Conventions

- Keep RTL and `lang="he"` on the root.
- Use `playAudio({ url, text })` for all playable items; TTS fallback uses `text` when `url` is missing or fails.
- New screens or tiles: follow tap target (min 72px) and theme tokens in `docs/theme.md`.
