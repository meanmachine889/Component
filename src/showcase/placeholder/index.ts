import type { ShowcaseEntry } from "../types"
import { Demo } from "./Demo"
import { Preview } from "./Preview"

export const placeholder: ShowcaseEntry = {
  slug: "next",
  name: "Next",
  tagline: "Placeholder slot for the next widget.",
  status: "coming-soon",
  Demo,
  Preview,
}
