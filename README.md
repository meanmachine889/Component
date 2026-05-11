# Kinetic Clock

A grid of 24 analog clocks that choreograph their hands to spell the current time. Three motion intensities, 12h/24h, any IANA timezone, light/dark theme. Drop it into any React app with a single shadcn command.

Inspired by ClockClock 24. · [Demo](https://kinetic-clock.yxsh.in)

---

## Installation

**Register the `@kinetic` namespace once** in your `components.json`:

```json
{
  "registries": {
    "@kinetic": "https://kinetic-clock.yxsh.in/r/{name}.json"
  }
}
```

Then add the component:

```bash
npx shadcn@latest add @kinetic/clock-clock-24
```

Or use the full URL directly (no setup required):

```bash
npx shadcn@latest add https://kinetic-clock.yxsh.in/r/clock-clock-24.json
```

> If you haven't initialized shadcn/ui yet, run `npx shadcn@latest init` first.

---

## Usage

```tsx
import { KineticClock } from "@/components/clock-clock-24"

export default function Page() {
  return (
    <KineticClock
      mode="active"
      format="24h"
      size={700}
      theme="auto"
      timeZone="America/New_York"
    />
  )
}
```

---

## Props

| Prop       | Type                              | Default     | Description |
| ---------- | --------------------------------- | ----------- | ----------- |
| `mode`     | `"active" \| "medium" \| "quiet"` | `"active"`  | **active** — Wave → Spiral → Scatter → Time. **medium** — Wave → Spiral → Time. **quiet** — time only, no animations. |
| `format`   | `"12h" \| "24h"`                  | `"24h"`     | Time format displayed by the clock grid. |
| `size`     | `number`                          | `700`       | Outer width in pixels. Height derives from the grid layout. |
| `theme`    | `"light" \| "dark" \| "auto"`     | `"auto"`    | Forces a theme or inherits from a parent's `.dark` class. |
| `timeZone` | `string`                          | `undefined` | Any IANA timezone name (e.g. `"Asia/Tokyo"`). Omit to use the viewer's local time. |

---

## Theming

Driven by CSS variables — override any of these in your globals:

| Variable              | Description                          |
| --------------------- | ------------------------------------ |
| `--clock-panel`       | Background of the clock grid panel   |
| `--clock-face`        | Background of each clock face        |
| `--clock-face-edge`   | Edge gradient of each clock face     |
| `--clock-rim`         | Border color of each clock           |
| `--clock-hand`        | Color of the clock hands             |
| `--clock-dial-shadow` | Inset shadow on each dial            |
| `--clock-shadow`      | Drop shadow on the panel             |

---

## Development

```bash
npm install
npm run dev            # Start the demo site
npm run registry:build # Regenerate public/r/*.json from registry/
npm run build          # Full production build (runs registry:build first)
npm run lint           # Lint
```

The component source lives in `registry/clock-clock-24/clock-clock-24.tsx`. The demo site imports directly from there — no duplicate file, no drift.

---

## License

MIT
