# ClockClock 24

An animated 24-clock grid that spells out the current time. Cycles through wave, spiral, scatter, and time-display phases. Auto-follows the consumer's light/dark theme via CSS variables.

Distributed as a [shadcn/ui](https://ui.shadcn.com) registry component.

## Install

In any project that has shadcn/ui set up:

```bash
npx shadcn@latest add https://kinetic-clock.yxsh.in/r/clock-clock-24.json
```

This drops `clock-clock-24.tsx` into your `components/` directory and installs `clsx` and `tailwind-merge` if missing.

If you don't have shadcn/ui yet, initialize it first:

```bash
npx shadcn@latest init
```

## Usage

```tsx
import { ClockClock24 } from "@/components/clock-clock-24"

export default function Page() {
  return <ClockClock24 />
}
```

## Props

| Prop     | Type                                | Default    | Description                                                                 |
| -------- | ----------------------------------- | ---------- | --------------------------------------------------------------------------- |
| `mode`   | `"active" \| "medium" \| "quiet"`   | `"active"` | Choreography intensity. `active` cycles wave → spiral → scatter → time. `medium` skips scatter. `quiet` is static. |
| `format` | `"12h" \| "24h"`                    | `"24h"`    | Time format.                                                                |
| `size`   | `number`                            | `700`      | Outer width in pixels. Height derives from layout.                          |

The component also accepts standard `HTMLAttributes<HTMLDivElement>` (`className`, `style`, etc.).

## Theming

Theming is driven by CSS custom properties. The install adds these to your `globals.css` automatically:

| Variable            | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `--clock-panel`     | Outer panel background                   |
| `--clock-face`      | Clock face center                        |
| `--clock-face-edge` | Clock face outer edge (subtle vignette)  |
| `--clock-rim`       | Hairline border around each clock        |
| `--clock-hand`      | Clock hand color                         |
| `--clock-shadow`    | Outer shadow on the panel                |

Override any of these in your `:root` and `.dark` blocks to customize the look.

## Local development

```bash
npm install
npm run dev          # demo app at localhost:5173
npm run registry:build   # regenerate public/r/clock-clock-24.json
npm run build        # type-check + Vite build (outputs to dist/)
```

The component source lives in two places that must stay identical:

- `src/components/clock-clock-24.tsx` — used by the demo app
- `registry/clock-clock-24/clock-clock-24.tsx` — the file the registry distributes

After editing the component, run `npm run registry:build` to regenerate `public/r/clock-clock-24.json`, then `npm run build` and deploy `dist/` so the published JSON stays in sync.

## License

MIT
