import type { PropDef } from "@/components/PropCard"
import type { ShowcaseEntry } from "../types"
import { Demo } from "./Demo"
import { Preview } from "./Preview"

const SITE_URL = "https://kinetic.yxsh.in"
const GITHUB_URL = "https://github.com/meanmachine889/Component"
const NAMESPACE = "@kinetic"
const REGISTRY_NAME = "clock-clock-24"

const USAGE_CODE = `import { KineticClock } from "@/components/clock-clock-24"

export function Page() {
  return (
    <KineticClock
      mode="active"            // "active" | "medium" | "quiet"
      format="24h"             // "24h" | "12h"
      size={600}               // width in px
      bodyColor="#ffffff"      // clock body (panel + faces + shadows derived)
      handColor="#111111"      // clock hands
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
    name: "bodyColor",
    type: "string",
    default: `"#ffffff"`,
    description:
      "Color of the clock body. The panel, faces, rims, and inner dial shadows are all derived from this single value. The shadow depth adapts automatically for dark vs. light bodies. Any CSS hex color.",
  },
  {
    name: "handColor",
    type: "string",
    default: `"#111111"`,
    description: "Color of the clock hands. Any CSS color.",
  },
  {
    name: "timeZone",
    type: "string",
    default: "undefined",
    description:
      'IANA timezone name (e.g. "America/New_York", "Asia/Tokyo"). When omitted, the viewer\'s local time is used. Invalid names silently fall back to local.',
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description:
      "Class applied to the panel root. The panel ships with no drop shadow — add your own elevation here (e.g. `shadow-xl`). Also accepts any standard div props.",
  },
]

export const clockClock24: ShowcaseEntry = {
  slug: "clock-clock-24",
  name: "Clock Clock 24",
  tagline:
    "A grid of 24 analog clocks that choreograph their hands to spell the current time. Inspired by ClockClock 24.",
  status: "ready",
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
    cssVars: "",
    npmInstall: `npm install clsx tailwind-merge`,
  },
}
