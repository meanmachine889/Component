import type { ComponentType } from "react"
import type { PropDef } from "@/components/PropCard"

export type DemoContext = {
  windowWidth: number
  theme: "light" | "dark"
}

export type InstallInfo = {
  registryName: string
  namespace: string
  registryJsonUrl: string
  siteUrl: string
  componentFileUrl: string
  cssVars?: string
  npmInstall?: string
}

export type FontNote = {
  /** Plain-English explanation of the font dependency and why it might need manual install. */
  description: string
  /** Snippets the consumer can paste to load the font themselves (e.g. <link> tags, @import, next/font). */
  snippets: Array<{ label: string; code: string }>
}

export type ShowcaseEntry = {
  slug: string
  name: string
  tagline: string
  status: "ready" | "coming-soon"
  Demo: ComponentType<DemoContext>
  Preview: ComponentType<{ theme?: "light" | "dark" }>
  supportsTheme?: boolean
  install?: InstallInfo
  usageCode?: string
  usageLabel?: string
  componentName?: string
  props?: PropDef[]
  fontNote?: FontNote
}
