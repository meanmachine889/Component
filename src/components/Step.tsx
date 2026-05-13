import type { ReactNode } from "react"

export function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: ReactNode
}) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "var(--page-surface-2)",
          border: "1px solid var(--page-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          color: "var(--page-text-muted)",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {number}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        <h3 style={{ fontSize: 16, fontWeight: 400, color: "var(--page-text)" }}>{title}</h3>
        {children}
      </div>
    </div>
  )
}
