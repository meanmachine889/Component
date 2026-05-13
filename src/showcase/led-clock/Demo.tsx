import { useState } from "react"
import { LedClock } from "@registry/led-clock/led-clock"
import type { DemoContext } from "../types"

export function Demo({ windowWidth }: DemoContext) {
  const [format, setFormat] = useState<"12h" | "24h">("24h")
  const [showDate, setShowDate] = useState(true)

  const clockSize = Math.min(windowWidth - 96, 760)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 32,
        width: "100%",
      }}
    >
      <LedClock size={clockSize} format={format} showDate={showDate} />

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={() => setFormat((f) => (f === "24h" ? "12h" : "24h"))}
          style={{
            padding: "10px 20px",
            borderRadius: 14,
            border: "1px solid var(--page-border)",
            background: "var(--page-bg)",
            color: "var(--page-text)",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {format}
        </button>

        <button
          onClick={() => setShowDate((s) => !s)}
          style={{
            padding: "10px 20px",
            borderRadius: 14,
            border: "1px solid var(--page-border)",
            background: showDate ? "var(--page-text)" : "var(--page-bg)",
            color: showDate ? "var(--page-bg)" : "var(--page-text)",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {showDate ? "Date: On" : "Date: Off"}
        </button>
      </div>
    </div>
  )
}
