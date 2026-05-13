import type { CSSProperties } from "react"

export const mono: CSSProperties = {
  fontFamily: "'Geist Mono', 'Courier New', monospace",
}

export const codeInline: CSSProperties = {
  ...mono,
  fontSize: 12,
  padding: "2px 5px",
  borderRadius: 4,
  background: "var(--page-surface-2)",
  border: "1px solid var(--page-border)",
  color: "var(--page-text-muted)",
}
