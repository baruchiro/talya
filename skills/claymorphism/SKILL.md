---
name: claymorphism
description: Apply the High-Fidelity Claymorphism design system to the app. Use when restyling components, updating the visual theme, or adding new UI elements that must match the clay aesthetic.
---

# High-Fidelity Claymorphism — Design Skill

## When to use

- Restyling existing components to match the clay aesthetic
- Adding new interactive elements (buttons, cards, tiles)
- Updating the color palette, shadows, or border radii
- Adding or modifying animations and hover effects

## Design philosophy — Digital Clay

Elements simulate **premium matte-silicone** objects lit from top-left. Every surface either **bulges out** (buttons, tiles → `shadow-clay-button`) or is **pressed in** (inputs, active states → `shadow-clay-pressed`). Nothing is flat.

## Design tokens (CSS custom properties in `css/style.css`)

```css
/* Colours */
--color-bg: #F4F1FA;                /* canvas — never pure white */
--color-surface: rgba(255,255,255,0.7); /* glass-clay card surface */
--color-accent: #7C3AED;            /* primary violet */
--color-accent-soft: #A78BFA;       /* lighter violet for gradients */
--color-accent-alt: #DB2777;        /* hot-pink secondary */
--color-accent-blue: #0EA5E9;       /* sky blue */
--color-accent-green: #10B981;      /* emerald */
--color-text: #332F3A;              /* soft charcoal — never pure black */
--color-text-muted: #635F69;        /* minimum muted value — never lighter */

/* Shadows (4-layer stacks) */
--shadow-clay-card:    16px 16px 32px rgba(160,150,180,.20),
                      -10px -10px 24px rgba(255,255,255,.90),
                       inset 6px 6px 12px rgba(139,92,246,.03),
                       inset -6px -6px 12px rgba(255,255,255,1);

--shadow-clay-button:  12px 12px 24px rgba(139,92,246,.30),
                      -8px -8px 16px rgba(255,255,255,.40),
                       inset 4px 4px 8px rgba(255,255,255,.40),
                       inset -4px -4px 8px rgba(0,0,0,.10);

--shadow-clay-pressed: inset 10px 10px 20px #d9d4e3,
                       inset -10px -10px 20px #ffffff;

--shadow-clay-deep:    30px 30px 60px #cdc6d9,
                      -30px -30px 60px #ffffff,
                       inset 10px 10px 20px rgba(139,92,246,.05),
                       inset -10px -10px 20px rgba(255,255,255,.80);

/* Radii (super-rounded — never use rounded-md/sm equivalents) */
--radius-xl: 3rem;     /* 48px — hero containers */
--radius:    2rem;     /* 32px — standard cards */
--radius-md: 1.5rem;   /* 24px — medium elements */
--radius-sm: 1.25rem;  /* 20px — buttons, inputs */
```

## Fonts

Load via `<link>` in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
```

- **Headings / labels / numbers**: `"Nunito"` (700–900)
- **Body text**: `"DM Sans"` (400–500)
- **Hebrew text**: `"Heebo"` — always keep as the last fallback for RTL text

## Shadow usage guide

| Element | Shadow variable |
|---|---|
| Floating card / tile | `var(--shadow-clay-card)` |
| Button (default) | `var(--shadow-clay-button)` |
| Input / recessed | `var(--shadow-clay-pressed)` |
| Active/pressed state | `var(--shadow-clay-pressed)` |
| Large background containers | `var(--shadow-clay-deep)` |

## Animated background blobs

Add inside `<body>` **before** `<main>`:

```html
<div class="clay-blobs" aria-hidden="true">
  <div class="clay-blob clay-blob--violet"></div>
  <div class="clay-blob clay-blob--pink"></div>
  <div class="clay-blob clay-blob--blue"></div>
</div>
```

CSS blobs are `position:fixed`, `border-radius:50%`, `blur(80px)`, accent color at 10% opacity, animated with `clay-float` keyframes (8–12 s).

## Interactive state rules

| State | Transform | Shadow |
|---|---|---|
| Hover (card/tile) | `translateY(-8px)` | enhance card shadow |
| Hover (button) | `translateY(-4px)` | enhance button shadow |
| Active/pressed | `scale(0.92)` | `var(--shadow-clay-pressed)` |

## RTL compatibility

- Keep `dir="rtl"` and `lang="he"` on `<html>`
- Use `start`/`end` logical properties where possible, or test both directions
- Shadows are symmetric (no directional bias) so they look correct in RTL

## Tap targets

Minimum **72 px** height and width (`--tap-min`). All interactive elements must meet this rule — it is independent of the clay aesthetic.

## Dos and Don'ts

- **DO** use 4-layer shadow stacks (card, button, or pressed) on every interactive surface
- **DO** use `rounded-[32px]` (2rem) minimum for standard elements; `rounded-[48px]` (3rem) for large containers
- **DO** add `hover:-translateY` lift + enhanced shadow on all interactive elements
- **DO** include animated blobs on the canvas background
- **DON'T** use flat backgrounds — always include blobs or a subtle gradient
- **DON'T** lighten muted text below `#635F69`
- **DON'T** use `border-radius` smaller than 20px (1.25rem) anywhere
- **DON'T** remove the `prefers-reduced-motion` media query that disables animations
