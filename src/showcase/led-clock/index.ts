import type { PropDef } from "@/components/PropCard"
import type { ShowcaseEntry } from "../types"
import { Demo } from "./Demo"
import { Preview } from "./Preview"

const SITE_URL = "https://kinetic.yxsh.in"
const GITHUB_URL = "https://github.com/meanmachine889/Component"
const NAMESPACE = "@kinetic"
const REGISTRY_NAME = "led-clock"

const USAGE_CODE = `import { LedClock } from "@/components/led-clock"

export function Page() {
  return (
    <LedClock
      size={600}         // outer width in px
      format="24h"       // "24h" | "12h"
      showDate={true}    // toggle the side date / day panel
    />
  )
}`

const PROPS: PropDef[] = [
  {
    name: "size",
    type: "number",
    default: "600",
    description:
      "Outer width in pixels. Height is derived from a fixed 2.55:1 aspect ratio to match the bezel proportions.",
  },
  {
    name: "format",
    type: `"12h" | "24h"`,
    default: `"24h"`,
    description: "Time format displayed in the main HH:MM area.",
  },
  {
    name: "showDate",
    type: "boolean",
    default: "true",
    description:
      "When true, renders the right-hand panel showing month / date on top and day of week below.",
  },
]

export const ledClock: ShowcaseEntry = {
  slug: "led-clock",
  name: "LED Clock",
  tagline:
    "A digital LED-style alarm clock with seven-segment HH:MM, a blinking colon, and a side panel for month, date, and day of week.",
  status: "ready",
  Demo,
  Preview,
  componentName: "LedClock",
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
    npmInstall: "",
  },
}
