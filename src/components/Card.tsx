import { hrefFor } from "@/lib/useHashRoute"
import type { ShowcaseEntry } from "@/showcase/types"

export function Card({ entry, theme }: { entry: ShowcaseEntry; theme: "light" | "dark" }) {
  const { Preview, name, slug } = entry

  return (
    <a
      href={hrefFor(slug)}
      aria-label={name}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        color: "inherit",
        background: "var(--page-surface-2)",
        borderRadius: 20,
        overflow: "hidden",
        padding: 32,
        height: "100%",
        minHeight: 320,
        boxSizing: "border-box",
        transition: "transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      <Preview theme={theme} />
    </a>
  )
}
