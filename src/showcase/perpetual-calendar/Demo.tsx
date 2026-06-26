import { useState } from "react"
import { PerpetualCalendar } from "@registry/perpetual-calendar/perpetual-calendar"
import { DemoStage, SwatchRow, Select } from "@/components/DemoControls"
import type { DemoContext } from "../types"

const PALETTES: { label: string; color: string; textColor: string; ringColor: string }[] = [
  { label: "Terracotta", color: "#d2412a", textColor: "#f7ede6", ringColor: "#f4ead9" },
  { label: "Cobalt",     color: "#2f5fd0", textColor: "#eaf0fb", ringColor: "#e8eefb" },
  { label: "Forest",     color: "#2f7d4f", textColor: "#eef7f0", ringColor: "#eaf6ee" },
  { label: "Graphite",   color: "#33363b", textColor: "#e6e8ec", ringColor: "#e6e8ec" },
  { label: "Mustard",    color: "#d9a521", textColor: "#3a2c07", ringColor: "#4a3a10" },
]

const TIMEZONE_OPTIONS: { value: string | ""; label: string }[] = [
  { label: "Local",    value: "" },
  { label: "New York", value: "America/New_York" },
  { label: "London",   value: "Europe/London" },
  { label: "Kolkata",  value: "Asia/Kolkata" },
  { label: "Tokyo",    value: "Asia/Tokyo" },
  { label: "Sydney",   value: "Australia/Sydney" },
]

export function Demo({ windowWidth }: DemoContext) {
  const [color, setColor] = useState(PALETTES[0].color)
  const [timeZone, setTimeZone] = useState<string>("")

  const palette = PALETTES.find((p) => p.color === color) ?? PALETTES[0]
  const boardSize = Math.min(windowWidth - 96, 460)

  return (
    <DemoStage
      controls={
        <>
          <SwatchRow
            label="Palette"
            value={color}
            onChange={setColor}
            options={PALETTES.map((p) => ({ value: p.color, label: p.label }))}
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
      <PerpetualCalendar
        size={boardSize}
        color={palette.color}
        textColor={palette.textColor}
        ringColor={palette.ringColor}
        timeZone={timeZone || undefined}
      />
    </DemoStage>
  )
}
