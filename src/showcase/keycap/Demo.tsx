import { useState } from "react"
import { Keycap } from "@registry/keycap/keycap"
import { DemoStage, SegmentedControl, SwatchRow } from "@/components/DemoControls"
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
    <DemoStage
      hint="Click, tap, or press Space"
      controls={
        <>
          <SwatchRow
            label="Color"
            value={color}
            onChange={setColor}
            options={COLORS}
          />
          <SegmentedControl
            label="Sound"
            value={muted ? "muted" : "on"}
            onChange={(v) => setMuted(v === "muted")}
            options={[
              { value: "on", label: "Sound on" },
              { value: "muted", label: "Muted" },
            ]}
          />
        </>
      }
    >
      <div style={{ padding: "24px 0 8px" }}>
        <Keycap
          size={size}
          color={color}
          muted={muted}
          faceColor={color === "#e8e2d3" ? "#2b2b2b" : "#ffffff"}
        />
      </div>
    </DemoStage>
  )
}
