import { useState } from "react"
import { CheckIcon, CopyIcon } from "./icons"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        background: "var(--page-surface-2)",
        border: "1px solid var(--page-border)",
        borderRadius: 100,
        color: "var(--page-text-muted)",
        fontSize: 12,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--page-border)"
        e.currentTarget.style.color = "var(--page-text)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--page-surface-2)"
        e.currentTarget.style.color = "var(--page-text-muted)"
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}
