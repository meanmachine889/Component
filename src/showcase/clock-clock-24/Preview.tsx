import { KineticClock } from "@registry/clock-clock-24/clock-clock-24"

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
      <KineticClock mode="active" format="24h" size={320} />
    </div>
  )
}
