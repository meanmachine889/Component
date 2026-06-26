import { KineticClock } from "@registry/clock-clock-24/clock-clock-24"

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
      <KineticClock mode="active" format="24h" size={300} bodyColor="#ffffff" handColor="#111111" />
    </div>
  )
}
