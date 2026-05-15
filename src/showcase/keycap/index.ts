import type { PropDef } from "@/components/PropCard"
import type { ShowcaseEntry } from "../types"
import { Demo } from "./Demo"
import { Preview } from "./Preview"

const SITE_URL = "https://kinetic.yxsh.in"
const GITHUB_URL = "https://github.com/meanmachine889/Component"
const NAMESPACE = "@kinetic"
const REGISTRY_NAME = "keycap"

const USAGE_CODE = `import { Keycap } from "@/components/keycap"

export function Page() {
  return (
    <Keycap
      size={280}          // outer width / height in px
      color="#ef6a1f"     // top-face color
      faceColor="#ffffff" // pixel face color
    />
  )
}`

const PROPS: PropDef[] = [
  {
    name: "size",
    type: "number",
    default: "280",
    description: "Outer width and height in pixels. The press depth scales with this value.",
  },
  {
    name: "color",
    type: "string",
    default: `"#ef6a1f"`,
    description:
      "Top-face color of the keycap. The skirt, shading, and highlights are derived from this hex automatically.",
  },
  {
    name: "faceColor",
    type: "string",
    default: `"#ffffff"`,
    description: "Color of the pixel face on top of the keycap.",
  },
  {
    name: "muted",
    type: "boolean",
    default: "false",
    description:
      "When true, the synthesized click sound is disabled. The keycap still animates and randomizes its expression.",
  },
]

export const keycap: ShowcaseEntry = {
  slug: "keycap",
  name: "Keycap",
  tagline:
    "A tactile, mechanical-feel keycap. Press it for a satisfying thock — the face randomizes on every press.",
  status: "ready",
  Demo,
  Preview,
  componentName: "Keycap",
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
