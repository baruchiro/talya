# Theme (High-Fidelity Claymorphism — kid-friendly)

Target: 3-year-old, desktop browser with touch. Keep new screens consistent with these rules.

> **Design system**: see [`skills/claymorphism/SKILL.md`](../skills/claymorphism/SKILL.md) for the full token reference, shadow stacks, and animation specs.

## Tap targets

- Minimum size: **72px** height and width for interactive elements (letters, color swatches, story cards).
- Use padding and spacing so taps are easy and mistakes are forgiving.

## Palette

Use CSS custom properties so the palette is one place to edit.

- **Primary (accent)**: `#7C3AED` (vivid violet).
- **Accent soft**: `#A78BFA` (lighter violet — used in gradients).
- **Accent alt**: `#DB2777` (hot pink — for tiles / secondary emphasis).
- **Background canvas**: `#F4F1FA` (very pale cool lavender-white — never pure white).
- **Surfaces**: glass-clay cards `rgba(255,255,255,0.7)` with `backdrop-filter: blur(12px)` and 4-layer clay shadow.
- **Text**: `#332F3A` (soft charcoal — never pure black).
- **Muted text**: `#635F69` (minimum value — never lighter for accessibility).
- **Colors section**: use the hex values from content-schema for swatches; clay button shadow gives depth to all colors including white.

## Animated background blobs

Three `position:fixed` circles with accent colors at 10% opacity and `filter: blur(80px)` drift slowly via `clay-float` keyframes. This ambient lighting shows through glass-clay surfaces. Always include them — never use a flat background.

## RTL and Hebrew

- Root: `dir="rtl"` and `lang="he"` on `<html>`.
- Layout: flex/grid with logical RTL flow (margins, padding, alignment work correctly in RTL).
- Font: clear Hebrew font — **Heebo** — as the last fallback for RTL text. Headings use **Nunito** (rounded weight, clay-friendly), body text uses **DM Sans**.

## Typography

- **Headings / section titles**: Nunito 800–900 weight (`var(--font-heading)`), large size, tight letter spacing.
- **Hebrew letters / story titles**: Heebo (`var(--font-hebrew)`), 600–700 weight.
- **Body**: DM Sans (`var(--font-body)`), 400–500 weight.

## Shapes and motion

- **Rounded corners**: super-rounded everywhere — minimum `1.25rem` (20px). Standard cards `2rem` (32px). Large containers / home tiles `3rem` (48px). Never use `border-radius` below 1.25rem.
- **Shadows**: 4-layer clay shadow stacks — `--shadow-clay-card`, `--shadow-clay-button`, `--shadow-clay-pressed`. See `skills/claymorphism/SKILL.md` for values.
- **Motion**: hover lifts element upward (`translateY(-6px)` to `-8px`) and enhances shadow. Active/pressed compresses (`scale(0.92)`) with inset shadow. All animations respect `prefers-reduced-motion`.

## Section home tiles

The three home tiles (אותיות, צבעים, סיפורים) use bold gradient backgrounds (violet, hot-pink, sky-blue), `border-radius: var(--radius-xl)` (3rem), `shadow-clay-button`, and hover-lift + active-squish interactions. No text labels — icon only.

Each tile uses `aspect-ratio: 1 / 1` (square), `flex: 1 1 200px`, and `max-width: 300px` so they stay nicely proportioned at any screen size without growing too large. The tile container is centered with `max-width: 960px; margin: 0 auto` so on very wide screens the three tiles stay in a tight, attractive group. Tile icons use `object-fit: cover; aspect-ratio: 1; border-radius: 50%` to crop the image to a circular app-icon style, hiding any white background in the source file.

## Full-screen layout rules

The app fills the full viewport width at any size — no `max-width` cap on `.app` itself. Sections follow these rules by category:

- **Grids with many items** (letters, colors): use `auto-fill` columns + `aspect-ratio: 1` on each cell so items are always square and fill the width. Do **not** use `flex: 1` / `grid-auto-rows: 1fr` on these grids — with only 2 rows of cells that would stretch them to ~50% viewport height each, which looks bad.
- **Lists/tiles with few items** (home tiles, stories): do **not** stretch to fill height; let content size itself naturally. Use `max-width` + `margin: 0 auto` on the container (home: 960px, stories: 760px) so they stay centered and readable rather than spanning the full wide screen.
- **Never** add `flex: 1` to a container that has only a handful of children (< ~10), as it creates oversized, empty-looking elements.
