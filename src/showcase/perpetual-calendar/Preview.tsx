import { PerpetualCalendar } from "@registry/perpetual-calendar/perpetual-calendar"

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
      <PerpetualCalendar size={260} />
    </div>
  )
}
