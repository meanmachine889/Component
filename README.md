# Kinetic Clock

A minimalist animated grid of analog clocks that spells the current time. Cycles through wave, spiral, and scatter phases. Built as a [shadcn/ui](https://ui.shadcn.com) registry component.

Inspired by the iconic ClockClock 24.

## Installation

You can pull the component directly from the registry into your project:

```bash
npx shadcn@latest add https://kinetic-clock.yxsh.in/r/clock-clock-24.json
```

This will:
1. Drop `clock-clock-24.tsx` into your `components/` directory.
2. Install `clsx` and `tailwind-merge` if they aren't already present.
3. Add the required CSS variables to your `globals.css` (or equivalent).

If you haven't initialized shadcn/ui yet:
```bash
npx shadcn@latest init
```

## Usage

Import and drop the component anywhere in your React application.

```tsx
import { KineticClock } from "@/components/clock-clock-24"

export default function Page() {
  return (
    <KineticClock 
      mode="active" 
      format="24h" 
      size={700} 
    />
  )
}
```

## Props

The component accepts all standard `HTMLDivElement` attributes, plus the following:

| Prop     | Type                                | Default    | Description                                                                 |
| -------- | ----------------------------------- | ---------- | --------------------------------------------------------------------------- |
| `mode`   | `"active" \| "medium" \| "quiet"`   | `"active"` | Animation intensity. `active` cycles all phases. `quiet` only shows time. |
| `format` | `"12h" \| "24h"`                    | `"24h"`    | Time format displayed by the clock grid.                                    |
| `size`   | `number`                            | `700`      | Outer width in pixels. Height derives automatically from the grid layout.   |
| `theme`  | `"light" \| "dark" \| "auto"`       | `"auto"`   | Forces a specific theme or inherits from the parent's `.dark` class.        |

## Theming

Theming is driven by CSS variables. The component adapts to your project's light and dark modes automatically.

| Variable            | Description                              |
| ------------------- | ---------------------------------------- |
| `--clock-panel`     | Background of the entire clock grid      |
| `--clock-face`      | Background of individual clock faces     |
| `--clock-rim`       | Border color of each clock               |
| `--clock-hand`      | Color of the clock hands                 |
| `--clock-shadow`    | Shadow applied to the panel container    |

## Development

```bash
npm install
npm run dev          # Start the demo app
npm run registry:build   # Regenerate the registry JSON
npm run build        # Build for production
```

## License

MIT
