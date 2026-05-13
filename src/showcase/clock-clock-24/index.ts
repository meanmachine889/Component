import type { PropDef } from "@/components/PropCard"
import type { ShowcaseEntry } from "../types"
import { Demo } from "./Demo"
import { Preview } from "./Preview"

const SITE_URL = "https://kinetic-clock.yxsh.in"
const GITHUB_URL = "https://github.com/meanmachine889/Component"
const NAMESPACE = "@kinetic"
const REGISTRY_NAME = "clock-clock-24"

const CSS_VARS = `:root {
  --clock-panel:      oklch(0.965 0 0);
  --clock-face:       oklch(1.000 0 0);
  --clock-face-edge:  oklch(0.965 0 0);
  --clock-rim:        oklch(0.905 0 0);
  --clock-hand:       oklch(0.130 0 0);
  --clock-dial-shadow: inset 0 3px 8px rgba(0,0,0,0.08),
                       inset 0 1px 3px rgba(0,0,0,0.10),
                       inset 0 -2px 5px rgba(255,255,255,0.12);
  --clock-shadow:     0 1px 2px rgba(0,0,0,0.04),
                      0 8px 24px rgba(0,0,0,0.06);
}

.dark {
  --clock-panel:      oklch(0.125 0 0);
  --clock-face:       oklch(0.185 0 0);
  --clock-face-edge:  oklch(0.160 0 0);
  --clock-rim:        oklch(0.245 0 0);
  --clock-hand:       oklch(0.930 0 0);
  --clock-dial-shadow: inset 0 3px 8px rgba(0,0,0,0.48),
                       inset 0 1px 3px rgba(0,0,0,0.55),
                       inset 0 -2px 5px rgba(255,255,255,0.04);
  --clock-shadow:     0 1px 2px rgba(0,0,0,0.35),
                      0 8px 24px rgba(0,0,0,0.50);
}`

const USAGE_CODE = `import { KineticClock } from "@/components/clock-clock-24"

export function Page() {
  return (
    <KineticClock
      mode="active"            // "active" | "medium" | "quiet"
      format="24h"             // "24h" | "12h"
      size={600}               // width in px
      theme="auto"             // "light" | "dark" | "auto"
      timeZone="Asia/Kolkata"  // any IANA name; omit for viewer's local time
    />
  )
}`

const PROPS: PropDef[] = [
  {
    name: "mode",
    type: `"active" | "medium" | "quiet"`,
    default: `"active"`,
    description:
      "Choreography intensity. Controls which animation phases the clocks cycle through between time displays.",
    values: [
      { label: `"active"`, description: "Wave → Spiral → Scatter → Time. Full motion cycle." },
      { label: `"medium"`, description: "Wave → Spiral → Time. Skips the scatter phase." },
      { label: `"quiet"`, description: "Always shows the time. No animation phases." },
    ],
  },
  {
    name: "format",
    type: `"12h" | "24h"`,
    default: `"24h"`,
    description: "Time format displayed by the clock grid.",
  },
  {
    name: "size",
    type: "number",
    default: "700",
    description:
      "Outer width in pixels. Each individual clock face is sized off this; height derives from the layout.",
  },
  {
    name: "theme",
    type: `"light" | "dark" | "auto"`,
    default: `"auto"`,
    description:
      'Color palette. "auto" inherits from a parent\'s `.dark` class, so it follows your existing theme switcher.',
  },
  {
    name: "timeZone",
    type: "string",
    default: "undefined",
    description:
      'IANA timezone name (e.g. "America/New_York", "Asia/Tokyo"). When omitted, the viewer\'s local time is used. Invalid names silently fall back to local.',
  },
]

export const clockClock24: ShowcaseEntry = {
  slug: "clock-clock-24",
  name: "Clock Clock 24",
  tagline:
    "A grid of 24 analog clocks that choreograph their hands to spell the current time. Inspired by ClockClock 24.",
  status: "ready",
  supportsTheme: true,
  Demo,
  Preview,
  componentName: "KineticClock",
  usageCode: USAGE_CODE,
  usageLabel: "page.tsx",
  props: PROPS,
  install: {
    registryName: REGISTRY_NAME,
    namespace: NAMESPACE,
    registryJsonUrl: `${SITE_URL}/r/${REGISTRY_NAME}.json`,
    siteUrl: SITE_URL,
    componentFileUrl: `${GITHUB_URL}/blob/main/registry/${REGISTRY_NAME}/${REGISTRY_NAME}.tsx`,
    cssVars: CSS_VARS,
    npmInstall: `npm install clsx tailwind-merge`,
  },
}
