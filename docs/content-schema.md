# Content schema

Canonical list of letters, colors, and stories. Add new items here; app code mirrors this in JS.

## Letters (Hebrew Aleph-Bet)

22 base letters. Optional final forms (ך, ם, ן, ף, ץ) can be added later as separate buttons.

| Letter | Audio filename (optional) |
|--------|---------------------------|
| א | aleph.mp3 or 01.mp3 |
| ב | bet.mp3 or 02.mp3 |
| ג | gimel.mp3 or 03.mp3 |
| ד | dalet.mp3 or 04.mp3 |
| ה | he.mp3 or 05.mp3 |
| ו | vav.mp3 or 06.mp3 |
| ז | zayin.mp3 or 07.mp3 |
| ח | het.mp3 or 08.mp3 |
| ט | tet.mp3 or 09.mp3 |
| י | yod.mp3 or 10.mp3 |
| כ | kaf.mp3 or 11.mp3 |
| ל | lamed.mp3 or 12.mp3 |
| מ | mem.mp3 or 13.mp3 |
| נ | nun.mp3 or 14.mp3 |
| ס | samekh.mp3 or 15.mp3 |
| ע | ayin.mp3 or 16.mp3 |
| פ | pe.mp3 or 17.mp3 |
| צ | tsadi.mp3 or 18.mp3 |
| ק | qof.mp3 or 19.mp3 |
| ר | resh.mp3 or 20.mp3 |
| ש | shin.mp3 or 21.mp3 |
| ת | tav.mp3 or 22.mp3 |

Letter order for grid: א, ב, ג, ד, ה, ו, ז, ח, ט, י, כ, ל, מ, נ, ס, ע, פ, צ, ק, ר, ש, ת.

TTS fallback uses the letter itself (e.g. "א") or a name map (e.g. "א" → "אלף") if implemented.

## Colors

| id | Hebrew name | hex |
|----|-------------|-----|
| red | אדום | #e74c3c |
| blue | כחול | #3498db |
| yellow | צהוב | #f1c40f |
| green | ירוק | #2ecc71 |
| orange | כתום | #e67e22 |
| purple | סגול | #9b59b6 |
| pink | ורוד | #fd79a8 |
| brown | חום | #795548 |
| black | שחור | #2c3e50 |
| white | לבן | #ecf0f1 |

Audio filename: `audio/colors/{id}.mp3` (e.g. red.mp3, blue.mp3).

## Stories

| id | title (Hebrew) | audioFile |
|----|----------------|-----------|
| 1 | סיפור ראשון | story-1.mp3 |
| 2 | סיפור שני | story-2.mp3 |
| 3 | סיפור שלישי | story-3.mp3 |

Add rows for each story. Audio path: `audio/stories/{audioFile}`. TTS fallback in v1 speaks the title only.
