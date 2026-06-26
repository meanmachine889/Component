import { useState } from "react"
import { LedClock } from "@registry/led-clock/led-clock"
import { DemoStage, SegmentedControl, Select } from "@/components/DemoControls"
import type { DemoContext } from "../types"

const TIMEZONE_OPTIONS: { value: string | ""; label: string }[] = [
  { label: "Local",    value: "" },
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
  const [timeZone, setTimeZone] = useState<string>("")

  const clockSize = Math.min(windowWidth - 96, 760)

  return (
    <DemoStage
      controls={
        <>
          <SegmentedControl
            label="Format"
            value={format}
            onChange={setFormat}
            options={[
              { value: "24h", label: "24h" },
              { value: "12h", label: "12h" },
            ]}
          />
          <SegmentedControl
            label="Date panel"
            value={showDate ? "on" : "off"}
            onChange={(v) => setShowDate(v === "on")}
            options={[
              { value: "on", label: "Date" },
              { value: "off", label: "No Date" },
            ]}
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
        <LedClock size={clockSize} format={format} showDate={showDate} timeZone={timeZone || undefined} />
      </div>
    </DemoStage>
  )
}
