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
  fontNote: {
    description:
      "The side panel (month / date / day) renders in Orbitron from Google Fonts. The component auto-injects the stylesheet at runtime, so most projects need no setup. If your environment blocks runtime CDN requests (strict CSP, offline-first, privacy-strict) or you prefer to control font loading yourself (e.g. Next.js next/font, self-hosting), add the font manually using one of the snippets below. The component detects a pre-existing link tag tagged with data-led-clock-font=\"orbitron\" and skips its own injection — no duplicate requests.",
    snippets: [
      {
        label: "index.html (Vite, CRA, plain HTML)",
        code: `<link rel="preconnect" href="https://fonts.googleapis.com" data-led-clock-font="orbitron" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin data-led-clock-font="orbitron" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"
  data-led-clock-font="orbitron"
/>`,
      },
      {
        label: "globals.css (CSS @import)",
        code: `@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");`,
      },
      {
        label: "app/layout.tsx (Next.js next/font)",
        code: `import { Orbitron } from "next/font/google"

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={orbitron.className}>
      <head>
        {/* Sentinel: tells LedClock to skip its runtime Google Fonts injection */}
        <link rel="preload" as="font" data-led-clock-font="orbitron" />
      </head>
      <body>{children}</body>
    </html>
  )
}`,
      },
    ],
  },
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
