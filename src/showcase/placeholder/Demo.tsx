export function Demo() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 560,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 16,
        padding: "80px 32px",
        border: "1px dashed var(--page-border)",
        borderRadius: 16,
        background: "var(--page-surface)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--page-text-subtle)",
        }}
      >
        Coming soon
      </div>
      <h3
        style={{
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: "-0.5px",
          color: "var(--page-text)",
          margin: 0,
        }}
      >
        Next component in the works
      </h3>
      <p
        style={{
          fontSize: 15,
          color: "var(--page-text-muted)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Kinetic is a collection of motion-first React components. New entries
        drop in here as they're ready — designed to slot into any shadcn-style
        project with a single command.
      </p>
    </div>
  )
}
