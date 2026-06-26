import type { PropDef } from "@/components/PropCard"
import type { ShowcaseEntry } from "../types"
import { Demo } from "./Demo"
import { Preview } from "./Preview"

const SITE_URL = "https://kinetic.yxsh.in"
const GITHUB_URL = "https://github.com/meanmachine889/Component"
const NAMESPACE = "@kinetic"
const REGISTRY_NAME = "perpetual-calendar"

const USAGE_CODE = `import { PerpetualCalendar } from "@/components/perpetual-calendar"

export function Page() {
  return (
    <PerpetualCalendar
      size={460}              // outer width in px
      color="#d2412a"         // board + button base color
      textColor="#f7ede6"     // embossed label color
      ringColor="#f4ead9"     // active-marker ring color
      timeZone="Asia/Kolkata" // any IANA name; omit for viewer's local time
      className="shadow-2xl"  // optional: add your own elevation
    />
  )
}`

const PROPS: PropDef[] = [
  {
    name: "size",
    type: "number",
    default: "460",
    description:
      "Outer width in pixels. Every dimension — button size, padding, ring thickness, corner radius — derives from this on a unit grid, so the board scales as one piece.",
  },
  {
    name: "color",
    type: "string",
    default: `"#d2412a"`,
    description:
      "Base color of the board and the raised buttons. Highlights, rim shadows, and the recessed valleys around each cap are all shaded from this one value.",
  },
  {
    name: "textColor",
    type: "string",
    default: `"#f7ede6"`,
    description: "Color of the embossed month / weekday labels and date numbers.",
  },
  {
    name: "ringColor",
    type: "string",
    default: `"#f4ead9"`,
    description:
      "Color of the raised selection ring that marks the current month, weekday, and date.",
  },
  {
    name: "timeZone",
    type: "string",
    default: "undefined",
    description:
      'IANA timezone name (e.g. "America/New_York", "Asia/Tokyo"). When omitted, the viewer\'s local time is used. Invalid names silently fall back to local. The board re-renders at midnight to advance the marked date.',
  },
  {
    name: "date",
    type: "Date",
    default: "undefined",
    description:
      "Pin the displayed date instead of tracking the current day. When set, the live midnight timer is disabled. Useful for screenshots or fixed displays.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    description:
      "Class applied to the board root. The board ships with no outer drop shadow — add your own elevation here (e.g. `shadow-2xl`). The intrinsic emboss/depth shadows are always kept.",
  },
  {
    name: "style",
    type: "CSSProperties",
    default: "undefined",
    description:
      "Inline styles merged onto the board root. A `boxShadow` you pass is appended to the board's own inset depth (it won't clobber the emboss).",
  },
]

export const perpetualCalendar: ShowcaseEntry = {
  slug: "perpetual-calendar",
  name: "Perpetual Calendar",
  tagline:
    "A tactile perpetual calendar board — embossed month, weekday, and date buttons with raised rings marking today. Recolorable, dependency-free.",
  status: "ready",
  Demo,
  Preview,
  componentName: "PerpetualCalendar",
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
