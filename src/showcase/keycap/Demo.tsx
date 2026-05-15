import { useState } from "react"
import { Keycap } from "@registry/keycap/keycap"
import type { DemoContext } from "../types"

const COLORS: { label: string; value: string }[] = [
  { label: "Orange", value: "#ef6a1f" },
  { label: "Cherry", value: "#e23b4a" },
  { label: "Mint",   value: "#3ec9a1" },
  { label: "Sky",    value: "#3b82f6" },
  { label: "Grape",  value: "#8b5cf6" },
  { label: "Bone",   value: "#e8e2d3" },
]

export function Demo({ windowWidth }: DemoContext) {
  const [color, setColor] = useState(COLORS[0].value)
  const [muted, setMuted] = useState(false)
  const size = Math.min(Math.max(windowWidth - 96, 220), 320)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
        width: "100%",
      }}
    >
      <div style={{ padding: "24px 0 8px" }}>
        <Keycap size={size} color={color} muted={muted} faceColor={color === "#e8e2d3" ? "#2b2b2b" : "#ffffff"} />
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            background: "var(--page-surface-2)",
            padding: 6,
            borderRadius: 14,
            border: "1px solid var(--page-border)",
          }}
        >
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              aria-label={c.label}
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: color === c.value ? "2px solid var(--page-text)" : "2px solid transparent",
                background: c.value,
                cursor: "pointer",
                padding: 0,
                transition: "transform 0.15s ease",
                transform: color === c.value ? "scale(1.08)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            background: "var(--page-surface-2)",
            padding: 4,
            borderRadius: 14,
            border: "1px solid var(--page-border)",
          }}
        >
          {([false, true] as const).map((val) => (
            <button
              key={String(val)}
              onClick={() => setMuted(val)}
              style={{
                padding: "8px 18px",
                borderRadius: 10,
                border: "none",
                background: muted === val ? "var(--page-bg)" : "transparent",
                color: muted === val ? "var(--page-text)" : "var(--page-text-muted)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: muted === val ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
              }}
            >
              {val ? "Muted" : "Sound on"}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 12, color: "var(--page-text-muted)", margin: 0 }}>
        Click, tap, or press Space
      </p>
    </div>
  )
}
