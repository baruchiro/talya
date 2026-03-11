# Audio

## Folder layout

```
audio/
  letters/   # One file per letter (see content-schema for letter list)
  colors/    # One file per color id (red.mp3, blue.mp3, …)
  stories/   # One file per story (story-1.mp3, story-2.mp3, …)
```

## Naming convention

- **Letters**: `audio/letters/{filename}.mp3`. Filename can be letter name (aleph, bet, …) or index (01, 02, …). App maps letter character to path (e.g. via content-schema or JS data).
- **Colors**: `audio/colors/{id}.mp3` where `id` is the color id from content-schema (e.g. red, blue).
- **Stories**: `audio/stories/{audioFile}` where `audioFile` comes from content-schema (e.g. story-1.mp3).

Format: MP3 preferred; browser support is broad.

## TTS fallback

When a recording is missing or `Audio.play()` fails (e.g. 404, load error), the app uses the Web Speech API:

- `SpeechSynthesisUtterance` with `lang: 'he-IL'`
- Text: the Hebrew string for that item (letter, color name, or story title)
- Stories in v1: only the title is spoken on fallback; full-story TTS is out of scope

Browsers vary in Hebrew TTS quality; pre-recorded files give consistent results.

## Adding new recordings

1. Add the item to `docs/content-schema.md` (new letter/color/story row).
2. Record and export as MP3.
3. Save under the correct folder with the filename used by the app (see content-schema and how-we-build for how JS resolves paths).
4. No code change needed if the app reads content from a single data source derived from content-schema.
