import { MoonIcon, SunIcon } from "./icons"

const PUCK_SHADOW =
  "inset 0 1px 0 0 color-mix(in srgb, var(--page-text) 18%, transparent), " +
  "inset 0 -1px 1px 0 color-mix(in srgb, var(--page-bg) 40%, transparent), " +
  "0 2px 4px 0 color-mix(in srgb, var(--page-bg) 50%, transparent)"

const OPTIONS: { theme: "light" | "dark"; Icon: typeof SunIcon }[] = [
  { theme: "light", Icon: SunIcon },
  { theme: "dark", Icon: MoonIcon },
]

export function FloatingThemeToggle({
  theme,
  onChange,
}: {
  theme: "light" | "dark"
  onChange: (theme: "light" | "dark") => void
}) {
  const size = 30 // puck / icon-button diameter
  const pad = 4

  return (
    <div
      role="group"
      aria-label="Theme"
      style={{
        position: "fixed",
        top: 20,
        right: "clamp(20px, 5vw, 48px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: pad,
        borderRadius: 999,
        background: "var(--page-surface-2)",
        border: "1px solid var(--page-border)",
      }}
    >
      {/* Sliding puck — animates under the active icon. */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: pad,
          left: pad,
          width: size,
          height: size,
          borderRadius: 999,
          background: "color-mix(in srgb, var(--page-text) 14%, var(--page-surface-2))",
          boxShadow: PUCK_SHADOW,
          transform: `translateX(${theme === "dark" ? size + 2 : 0}px)`,
          transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {OPTIONS.map(({ theme: t, Icon }) => {
        const active = t === theme
        return (
          <button
            key={t}
            type="button"
            aria-label={`${t} theme`}
            aria-pressed={active}
            onClick={() => onChange(t)}
            style={{
              position: "relative",
              zIndex: 1,
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              background: "transparent",
              borderRadius: 999,
              cursor: "pointer",
              color: active ? "var(--page-text)" : "var(--page-text-subtle)",
              transition: "color 0.2s ease",
            }}
          >
            <Icon />
          </button>
        )
      })}
    </div>
  )
}
