import { Keycap } from "@registry/keycap/keycap"

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
      <Keycap size={180} muted />
    </div>
  )
}
