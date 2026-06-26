# Kinetic — Design Style Reference

A minimal, editorial component library site. Linear-inspired dark mode, soft paper-tone light mode. Inline styles + CSS variables, no design system framework on top of Tailwind. Type-forward, low-chrome, generous spacing.

---

## Design Principles

- **Type-forward**: large headlines (`clamp(40px, 6vw, 64px)`) with tight tracking (`-2px`), body text in a comfortable 14–17px. Headings are never bold — `font-weight: 400–500` only.
- **Low chrome**: no gradients, no drop shadows on page chrome, no decorative borders. Surfaces differ by ~3–5% lightness, never by hue.
- **Pill geometry**: install snippets, badges, tabs, and buttons all use full `border-radius: 100px`. Cards use `border-radius: 20px`. Code blocks use `8px`.
- **One accent only**: an electric yellow-green (`#e4f222`). Used sparingly — never for body links, never inside the clock components themselves.
- **Theme via CSS variables**: a single `.dark` class on `<html>` swaps every token. Components read `var(--page-*)` and `var(--clock-*)` only.
- **Motion is restrained**: `transform: translateY(-2px)` on card hover, `0.2s ease` transitions. No spring, no scale, no parallax.

---

## Color Tokens

Two parallel palettes: `--page-*` for the marketing/docs chrome, `--clock-*` for the showcased components. They're independent so a dark clock can sit on a light page.

### Light Mode (`:root`)

```css
/* Page chrome — warm near-white, soft borders */
--page-bg:           #ffffff;
--page-surface:      #f8f9fa;   /* subtle elevation */
--page-surface-2:    #f0f1f3;   /* card body, code chip */
--page-border:       #e5e5e6;
--page-text:         #0f1011;   /* near-black, not pure */
--page-text-muted:   #62666d;   /* secondary copy */
--page-text-subtle:  #8a8f98;   /* meta, captions */
--page-accent:       #e4f222;   /* lime-yellow */
--page-accent-fg:    #0f1011;
--page-code-bg:      #f0f1f3;
--page-code-text:    #23252a;

/* Showcased component surfaces (oklch for perceptual evenness) */
--clock-panel:       oklch(0.965 0 0);
--clock-face:        oklch(1.000 0 0);
--clock-face-edge:   oklch(0.965 0 0);
--clock-rim:         oklch(0.905 0 0);
--clock-hand:        oklch(0.130 0 0);
--clock-dial-shadow: inset 0 3px 8px rgba(0,0,0,.08),
                     inset 0 1px 3px rgba(0,0,0,.10),
                     inset 0 -2px 5px rgba(255,255,255,.12);
--clock-shadow:      0 1px 2px rgba(0,0,0,.04),
                     0 8px 24px rgba(0,0,0,.06);
```

### Dark Mode (`.dark`)

```css
/* Page chrome — Linear-inspired neutral, not pitch black */
--page-bg:           #121212;
--page-surface:      #0f1011;
--page-surface-2:    #161718;   /* card body */
--page-border:       #23252a;
--page-text:         #f7f8f8;
--page-text-muted:   #8a8f98;
--page-text-subtle:  #62666d;
--page-accent:       #e4f222;   /* same accent, both modes */
--page-accent-fg:    #08090a;
--page-code-bg:      #161718;
--page-code-text:    #d0d6e0;

/* Showcased components — deep neutral, never #000 */
--clock-panel:       oklch(0.125 0 0);
--clock-face:        oklch(0.185 0 0);
--clock-face-edge:   oklch(0.160 0 0);
--clock-rim:         oklch(0.245 0 0);
--clock-hand:        oklch(0.930 0 0);
--clock-dial-shadow: inset 0 3px 8px rgba(0,0,0,.48),
                     inset 0 1px 3px rgba(0,0,0,.55),
                     inset 0 -2px 5px rgba(255,255,255,.04);
--clock-shadow:      0 1px 2px rgba(0,0,0,.35),
                     0 8px 24px rgba(0,0,0,.50);
```

**Notes**
- All neutrals are pure greys — chroma `0` in oklch. Tone is in the lightness only.
- Dark mode keeps the same yellow accent; only the foreground swaps.
- Inner shadow on dialed surfaces gets dramatically stronger in dark mode (0.48 vs 0.08 alpha) to keep edges legible.

---

## Typography

```css
body  { font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 400; }
h1–h6 { font-weight: 500; margin: 0; }
code  { font-family: 'Geist Mono', 'Courier New', monospace; }
```

### Scale (used inline, not as classes)

| Role            | Size                          | Weight | Tracking  |
| --------------- | ----------------------------- | ------ | --------- |
| Hero            | `clamp(40px, 6vw, 64px)`      | 400    | `-2px`    |
| Section H2      | `26px`                        | 400    | `-0.5px`  |
| Component name  | `22px`                        | 400    | `-0.4px`  |
| Card title      | `20px`                        | 500    | `-0.3px`  |
| Body            | `15–17px`                     | 400    | normal    |
| Card copy       | `14px`                        | 400    | normal    |
| Code            | `12–13px`                     | 400    | normal    |
| Meta / badge    | `10–11px` UPPERCASE           | 400    | `0.08em`  |

Line-height: `1.05` for hero, `1.55–1.65` for body and code.

---

## Layout

- **Page padding**: `clamp(32px, 6vw, 64px) clamp(20px, 5vw, 48px) clamp(48px, 8vw, 96px)`
- **Content max-width**: `720px` for landing copy, `900px` for showcase pages, `820px` for prose sections inside.
- **Section gap**: `48–64px` between major sections, `24–32px` between subsections, `16px` inside groups.
- **Grid**: `repeat(auto-fill, minmax(min(400px, 100%), 1fr))` with `28px` gap.
- **Footer**: `1px` top border, `32px` vertical padding, links left / signature right.

Everything flexes with `clamp()`; no media-query breakpoints in the page chrome.

---

## Components & Patterns

### Card
```
background: var(--page-surface-2)
border-radius: 20px
padding: 32px
hover: translateY(-2px), 0.2s ease
```
No border, no shadow — relies on surface contrast alone.

### Inline code chip (single-line install)
```
border-radius: 100px (pill)
padding: 4px 4px 4px 16px
background: var(--page-code-bg)
border: 1px solid var(--page-border)
font: 13px Geist Mono
```
Copy button sits inside the pill on the right.

### Multi-line code block
```
border-radius: 8px
border: 1px solid var(--page-border)
header row: 8px 14px, 1px bottom border, label + copy button
body: 16px padding, 13px / 1.65 mono
```

### Tab buttons (CLI / Manual)
```
border-radius: 100px
padding: 8px 20px
border: 1px solid var(--page-border)
active:   background var(--page-text), color var(--page-bg)
inactive: transparent, color var(--page-text-muted)
```

### Status / "Soon" badge
```
border-radius: 100px
padding: 2px 8px
border: 1px solid var(--page-border)
font: 10–11px uppercase, letter-spacing 0.08em
color: var(--page-text-subtle)
```

### Theme swatches (per-card)
Two 16px circles: solid `#0a0a0a` (dark) and `#f5f5f3` with `#d1d1ce` border (light). Click swaps the preview only, not the whole page.

---

## Interaction

- **Hover**: `translateY(-2px)` on cards; color shift on links from `--page-text-muted` to `--page-text`. No underline by default.
- **Transitions**: `0.2s ease` on transform / color / border; `0.3s ease` on body background when theming.
- **No focus rings styled** — browser default kept.
- **Cursor**: pointer on clickable surfaces, inherit elsewhere.

---

## Voice

- Section headers are nouns: "Installation", "Usage", "Reference", "Components", "Font".
- Body copy is short and declarative, no exclamations. Example: *"Add the component to your project using the shadcn CLI or manually."*
- Inline `<code>` is used liberally for filenames and identifiers, styled as a pill chip with `--page-surface-2` background.

---

## Quick clone recipe

1. Set up CSS variables exactly as above on `:root` and `.dark`.
2. Toggle dark mode by adding/removing the `.dark` class on `<html>`.
3. Use `'Poppins'` for UI, `'Geist Mono'` for code.
4. Style with inline `style={{}}` reading `var(--page-*)` — no Tailwind utility classes for color, spacing values come from `clamp()`.
5. Round generously: 20px cards, 8px code blocks, 100px pills.
6. One accent (`#e4f222`) used only at decision points — never decoratively.
7. Restrict motion to `translateY(-2px)` and 0.2s color/border fades.
