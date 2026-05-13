# Kinetic

A growing collection of drop-in React components — clocks, weather, and more on the way. Each one is themeable, dependency-light, and installs with a single shadcn command.

**[kinetic.yxsh.in](https://kinetic.yxsh.in)**

---

## Components

| Component | Description |
| --------- | ----------- |
| `clock-clock-24` | 24 analog clocks that choreograph their hands to spell the time. Wave, spiral, and scatter animations. |
| `led-clock` | Seven-segment LED alarm clock with blinking colon and a date / day-of-week side panel. |

---

## Installation

**Register the `@kinetic` namespace once** in your `components.json`:

```json
{
  "registries": {
    "@kinetic": "https://kinetic.yxsh.in/r/{name}.json"
  }
}
```

Then add any component by name:

```bash
npx shadcn@latest add @kinetic/clock-clock-24
npx shadcn@latest add @kinetic/led-clock
```

Or use the full URL directly (no setup required):

```bash
npx shadcn@latest add https://kinetic.yxsh.in/r/clock-clock-24.json
npx shadcn@latest add https://kinetic.yxsh.in/r/led-clock.json
```

> If you haven't initialized shadcn/ui yet, run `npx shadcn@latest init` first.

---

## Usage

### Clock Clock 24

```tsx
import { KineticClock } from "@/components/clock-clock-24"

export default function Page() {
  return (
    <KineticClock
      mode="active"            // "active" | "medium" | "quiet"
      format="24h"             // "24h" | "12h"
      size={700}               // outer width in px
      theme="light"            // "light" | "dark" | "auto"
      timeZone="America/New_York"
    />
  )
}
```

### LED Clock

```tsx
import { LedClock } from "@/components/led-clock"

export default function Page() {
  return (
    <LedClock
      size={600}               // outer width in px
      format="24h"             // "24h" | "12h"
      showDate={true}          // toggle the date / day panel
      timeZone="Asia/Tokyo"
    />
  )
}
```

---

## Props

### KineticClock

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `mode` | `"active" \| "medium" \| "quiet"` | `"active"` | **active** — Wave → Spiral → Scatter → Time. **medium** — Wave → Spiral → Time. **quiet** — time only. |
| `format` | `"12h" \| "24h"` | `"24h"` | Time format. |
| `size` | `number` | `700` | Outer width in pixels. |
| `theme` | `"light" \| "dark" \| "auto"` | `"auto"` | Forces a theme or inherits from a parent `.dark` class. |
| `timeZone` | `string` | `undefined` | IANA timezone (e.g. `"Asia/Tokyo"`). Omit for local time. |

### LedClock

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `size` | `number` | `600` | Outer width in pixels. Height derives from a 2.55:1 ratio. |
| `format` | `"12h" \| "24h"` | `"24h"` | Time format. |
| `showDate` | `boolean` | `true` | Show the month / date / day-of-week panel. |
| `timeZone` | `string` | `undefined` | IANA timezone. Omit for local time. |

---

## Theming (KineticClock)

Driven by CSS variables — override any of these in your globals:

| Variable | Description |
| -------- | ----------- |
| `--clock-panel` | Background of the clock grid panel |
| `--clock-face` | Background of each clock face |
| `--clock-face-edge` | Edge gradient of each clock face |
| `--clock-rim` | Border color of each clock |
| `--clock-hand` | Color of the clock hands |
| `--clock-dial-shadow` | Inset shadow on each dial |

---

## Development

```bash
npm install
npm run dev            # Start the demo site
npm run registry:build # Regenerate public/r/*.json from registry/
npm run build          # Full production build (runs registry:build first)
npm run lint           # Lint
```

Component sources live in `registry/<component-name>/`. The demo site imports directly from there — no duplicate files, no drift.

---
