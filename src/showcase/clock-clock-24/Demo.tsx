import { useState } from "react"
import { KineticClock } from "@registry/clock-clock-24/clock-clock-24"
import { DemoStage, SegmentedControl, SwatchRow, Select } from "@/components/DemoControls"
import type { DemoContext } from "../types"

// Each preset pairs a body color with a contrasting hand color.
const PALETTES: { label: string; body: string; hand: string }[] = [
  { label: "Paper",    body: "#ffffff", hand: "#111111" },
  { label: "Charcoal", body: "#1d1d1f", hand: "#f2f2f2" },
  { label: "Cherry",   body: "#e23b4a", hand: "#fff4f0" },
  { label: "Cobalt",   body: "#2f5fd0", hand: "#eaf0fb" },
  { label: "Mint",     body: "#3ec9a1", hand: "#08312a" },
  { label: "Mustard",  body: "#d9a521", hand: "#2a2003" },
]

const TIMEZONE_OPTIONS: { value: string | ""; label: string }[] = [
  { label: "Local", value: "" },
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
  const [body, setBody] = useState(PALETTES[0].body)
  const [timeZone, setTimeZone] = useState<string>("")

  const palette = PALETTES.find((p) => p.body === body) ?? PALETTES[0]
  const clockSize = Math.min(windowWidth - 96, 700)

  return (
    <DemoStage
      controls={
        <>
          <SegmentedControl
            label="Mode"
            value={mode}
            onChange={setMode}
            options={[
              { value: "active", label: "Active" },
              { value: "medium", label: "Medium" },
              { value: "quiet", label: "Quiet" },
            ]}
          />
          <SegmentedControl
            label="Format"
            value={format}
            onChange={setFormat}
            options={[
              { value: "24h", label: "24h" },
              { value: "12h", label: "12h" },
            ]}
          />
          <SwatchRow
            label="Palette"
            value={body}
            onChange={setBody}
            options={PALETTES.map((p) => ({ value: p.body, label: p.label }))}
          />
          <Select
            label="Timezone"
            value={timeZone}
            onChange={setTimeZone}
            options={TIMEZONE_OPTIONS}
          />
        </>
      }
    >
      <div style={{ transform: windowWidth < 600 ? "scale(0.8)" : "scale(0.9)", transformOrigin: "center" }}>
        <KineticClock
          mode={mode}
          format={format}
          size={clockSize}
          timeZone={timeZone || undefined}
          bodyColor={palette.body}
          handColor={palette.hand}
        />
      </div>
    </DemoStage>
  )
}
