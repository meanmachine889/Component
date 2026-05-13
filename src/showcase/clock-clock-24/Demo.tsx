import { useState } from "react"
import { KineticClock } from "@registry/clock-clock-24/clock-clock-24"
import { mono } from "@/components/styles"
import type { DemoContext } from "../types"

const TIMEZONE_OPTIONS: { label: string; value: string | undefined }[] = [
  { label: "Local", value: undefined },
  { label: "New York", value: "America/New_York" },
  { label: "London", value: "Europe/London" },
  { label: "Berlin", value: "Europe/Berlin" },
  { label: "Kolkata", value: "Asia/Kolkata" },
  { label: "Tokyo", value: "Asia/Tokyo" },
  { label: "Sydney", value: "Australia/Sydney" },
]

export function Demo({ windowWidth }: DemoContext) {
  const [mode, setMode] = useState<"active" | "medium" | "quiet">("active")
  const [format, setFormat] = useState<"12h" | "24h">("24h")
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined)

  const clockSize = Math.min(windowWidth - 64, 700)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        width: "100%",
      }}
    >
      <div style={{ transform: windowWidth < 600 ? "scale(0.8)" : "scale(0.9)", transformOrigin: "center" }}>
        <KineticClock mode={mode} format={format} size={clockSize} timeZone={timeZone} />
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            background: "var(--page-surface-2)",
            padding: 4,
            borderRadius: 14,
            border: "1px solid var(--page-border)",
          }}
        >
          {(["active", "medium", "quiet"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "8px 18px",
                borderRadius: 10,
                border: "none",
                background: mode === m ? "var(--page-bg)" : "transparent",
                color: mode === m ? "var(--page-text)" : "var(--page-text-muted)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: mode === m ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
              }}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

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

        <select
          value={timeZone ?? ""}
          onChange={(e) => setTimeZone(e.target.value === "" ? undefined : e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: 14,
            border: "1px solid var(--page-border)",
            background: "var(--page-bg)",
            color: "var(--page-text)",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            appearance: "none",
            ...mono,
          }}
          aria-label="Timezone"
        >
          {TIMEZONE_OPTIONS.map((tz) => (
            <option key={tz.label} value={tz.value ?? ""}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
