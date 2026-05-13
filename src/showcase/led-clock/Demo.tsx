import { useState } from "react"
import { LedClock } from "@registry/led-clock/led-clock"
import { mono } from "@/components/styles"
import type { DemoContext } from "../types"

const TIMEZONE_OPTIONS: { label: string; value: string | undefined }[] = [
  { label: "Local",    value: undefined },
  { label: "New York", value: "America/New_York" },
  { label: "London",   value: "Europe/London" },
  { label: "Berlin",   value: "Europe/Berlin" },
  { label: "Kolkata",  value: "Asia/Kolkata" },
  { label: "Tokyo",    value: "Asia/Tokyo" },
  { label: "Sydney",   value: "Australia/Sydney" },
]

export function Demo({ windowWidth }: DemoContext) {
  const [format, setFormat] = useState<"12h" | "24h">("24h")
  const [showDate, setShowDate] = useState(true)
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined)

  const clockSize = Math.min(windowWidth - 96, 760)

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
        <LedClock size={clockSize} format={format} showDate={showDate} timeZone={timeZone} />
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
          {(["24h", "12h"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              style={{
                padding: "8px 18px",
                borderRadius: 10,
                border: "none",
                background: format === f ? "var(--page-bg)" : "transparent",
                color: format === f ? "var(--page-text)" : "var(--page-text-muted)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: format === f ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
              }}
            >
              {f}
            </button>
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
          {([true, false] as const).map((val) => (
            <button
              key={String(val)}
              onClick={() => setShowDate(val)}
              style={{
                padding: "8px 18px",
                borderRadius: 10,
                border: "none",
                background: showDate === val ? "var(--page-bg)" : "transparent",
                color: showDate === val ? "var(--page-text)" : "var(--page-text-muted)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: showDate === val ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
              }}
            >
              {val ? "Date" : "No Date"}
            </button>
          ))}
        </div>

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
