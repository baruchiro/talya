# Theme (playful, kid-friendly)

Target: 3-year-old, desktop browser with touch. Keep new screens consistent with these rules.

## Tap targets

- Minimum size: **72px** height and width for interactive elements (letters, color swatches, story cards).
- Use padding and spacing so taps are easy and mistakes are forgiving.

## Palette

Use CSS custom properties so the palette is one place to edit.

- **Primary (accent)**: bright but soft (e.g. `#6c5ce7` or similar).
- **Background**: light, warm (e.g. `#fff5f0` or soft white).
- **Surfaces**: cards/tiles with soft shadow and rounded corners.
- **Text**: high contrast on background (dark gray or black on light).
- **Colors section**: use the hex values from content-schema for swatches; ensure border or shadow so white/light swatches are visible.

Avoid harsh contrast or flashing; keep it friendly and calm.

## RTL and Hebrew

- Root: `dir="rtl"` and `lang="he"` on `<html>`.
- Layout: flex/grid with logical RTL flow (margins, padding, alignment work correctly in RTL).
- Font: clear Hebrew font, e.g. Heebo, Frank Ruhl Libre, or system Hebrew. Load via link or @import; set in `body` or `:root`.

## Typography

- **Headings**: large, rounded or friendly weight (e.g. 1.5rem–2rem).
- **Body/labels**: readable size (e.g. 1rem minimum); avoid tiny text.

## Shapes and motion

- **Rounded corners**: e.g. `border-radius: 1rem` (or similar) on cards and buttons.
- **Shadows**: soft box-shadow for depth, not harsh.
- **Motion**: optional short feedback on tap (e.g. scale or glow); no long or distracting animations.

## Section home tiles

The three home tiles (אותיות, צבעים, סיפורים) should be large, visually distinct (icon or color), and clearly tappable. Same tap-target and rounded/shadow rules as above.

Each tile uses `aspect-ratio: 1 / 1` (square) and `flex: 1 1 200px` so they fill the full width and stay proportional at any screen size. The icon scales with the tile via `clamp(4rem, 10vw, 10rem)`.

## Full-screen layout rules

The app fills the full viewport width at any size — no `max-width` cap on the container or on grids/lists. Height stretching follows this rule:

- **Stretch to fill height** only for screens with many items (e.g. letters grid, colors grid). Use `flex: 1` + `grid-auto-rows: 1fr` + `align-content: stretch`.
- **Do not stretch height** for screens with few items (home tiles, stories list). Let content determine its natural height to avoid oversized, empty-looking elements.
