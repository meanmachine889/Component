import { useState } from "react"
import { hrefFor } from "@/lib/useHashRoute"
import type { ShowcaseEntry } from "@/showcase/types"

const SWATCHES: { key: "dark" | "light"; circleBg: string; border: string }[] = [
  { key: "dark",  circleBg: "#0a0a0a", border: "transparent" },
  { key: "light", circleBg: "#f5f5f3", border: "#d1d1ce" },
]

export function Card({ entry }: { entry: ShowcaseEntry }) {
  const { Preview, name, tagline, status, slug, supportsTheme } = entry
  const isComingSoon = status === "coming-soon"
  const [theme, setTheme] = useState<"dark" | "light">("light")

  return (
    <a
      href={hrefFor(slug)}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        background: "var(--page-surface)",
        borderRadius: 20,
        overflow: "hidden",
        transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <div
        style={{
          width: "100%",
          background: "var(--page-surface-2)",
          padding: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Preview theme={theme} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "var(--page-surface-2)",
          gap: 10,
          padding: "0px 32px 32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h3
            style={{
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: "-0.3px",
              color: "var(--page-text)",
              margin: 0,
              flex: 1,
            }}
          >
            {name}
          </h3>

          {supportsTheme && (
            <div
              style={{ display: "flex", gap: 6 }}
              onClick={(e) => e.preventDefault()}
            >
              {SWATCHES.map((swatch) => (
                <button
                  key={swatch.key}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setTheme(swatch.key)
                  }}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: swatch.circleBg,
                    border: `1.5px solid ${swatch.border}`,
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}

          {isComingSoon && (
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--page-text-subtle)",
                border: "1px solid var(--page-border)",
                padding: "2px 8px",
                borderRadius: 100,
              }}
            >
              Soon
            </span>
          )}
        </div>
        <p
          style={{
            fontSize: 14,
            color: "var(--page-text-muted)",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {tagline}
        </p>
      </div>
    </a>
  )
}
