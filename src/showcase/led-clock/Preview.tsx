import { LedClock } from "@registry/led-clock/led-clock"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Preview(_props: { theme?: "light" | "dark" }) {
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
