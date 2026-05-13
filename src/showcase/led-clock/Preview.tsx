import { LedClock } from "@registry/led-clock/led-clock"

export function Preview() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <LedClock size={360} format="24h" />
    </div>
  )
}
