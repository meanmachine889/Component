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

export type ShowcaseEntry = {
  slug: string
  name: string
  tagline: string
  status: "ready" | "coming-soon"
  Demo: ComponentType<DemoContext>
  Preview: ComponentType
  install?: InstallInfo
  usageCode?: string
  usageLabel?: string
  componentName?: string
  props?: PropDef[]
}
