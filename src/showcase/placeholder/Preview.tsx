export function Preview() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 8,
        color: "var(--page-text-subtle)",
        background:
          "repeating-linear-gradient(45deg, transparent 0 8px, var(--page-surface-2) 8px 16px)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Coming soon
      </div>
    </div>
  )
}
