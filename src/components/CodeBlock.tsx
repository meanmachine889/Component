import { CopyButton } from "./CopyButton"
import { mono } from "./styles"

export function CodeBlock({ label, code }: { label?: string; code: string }) {
  const isSingleLine = !code.trim().includes("\n")

  if (isSingleLine && !label) {
    return (
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "4px 4px 4px 16px",
            background: "var(--page-code-bg)",
            border: "1px solid var(--page-border)",
            borderRadius: 100,
            fontSize: 13,
            color: "var(--page-code-text)",
            width: "fit-content",
            ...mono,
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>{code}</span>
          <CopyButton text={code} />
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        background: "var(--page-code-bg)",
        border: "1px solid var(--page-border)",
        borderRadius: 8,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          borderBottom: "1px solid var(--page-border)",
          minHeight: 40,
        }}
      >
        <span style={{ ...mono, fontSize: 12, color: "var(--page-text-subtle)" }}>
          {label || ""}
        </span>
        <CopyButton text={code} />
      </div>
      <pre
        style={{
          ...mono,
          margin: 0,
          padding: "16px",
          fontSize: 13,
          lineHeight: 1.65,
          color: "var(--page-code-text)",
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
