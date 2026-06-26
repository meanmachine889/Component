import { LedClock } from "@registry/led-clock/led-clock"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Preview(_props: { theme?: "light" | "dark" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <LedClock size={320} format="24h" />
    </div>
  )
}
