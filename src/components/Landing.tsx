import { showcaseEntries } from "@/showcase"
import { Card } from "./Card"
import { GithubIcon, StarIcon } from "./icons"

export function Landing({
  title,
  description,
  githubUrl,
  peerlistEmbedUrl,
  peerlistHref,
}: {
  title: string
  description: string
  githubUrl: string
  peerlistEmbedUrl?: string
  peerlistHref?: string
}) {
  return (
    <main
      style={{
        width: "100%",
        padding: "64px 48px 96px",
        display: "flex",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 720,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 400,
            letterSpacing: "-2px",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 17,
            color: "var(--page-text-muted)",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {description}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Star on GitHub"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 48,
              background: "transparent",
              color: "var(--page-text)",
              border: "1px solid var(--page-border)",
              borderRadius: 12,
              textDecoration: "none",
              overflow: "hidden",
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)"
              e.currentTarget.style.borderColor = "var(--page-text-muted)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
              e.currentTarget.style.borderColor = "var(--page-border)"
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                background: "var(--page-surface-2)",
                borderRight: "1px solid var(--page-border)",
              }}
            >
              <GithubIcon size={20} />
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 16px",
                color: "#F5B800",
              }}
            >
              <StarIcon size={16} />
            </span>
          </a>

          {peerlistEmbedUrl && peerlistHref && (
            <a href={peerlistHref} target="_blank" rel="noreferrer" style={{ display: "inline-block", lineHeight: 0 }}>
              <img
                src={peerlistEmbedUrl}
                alt="On Peerlist"
                style={{ width: "auto", height: 48 }}
              />
            </a>
          )}
        </div>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: "-0.4px",
            margin: 0,
            color: "var(--page-text)",
          }}
        >
          Widgets
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: 28,
            width: "100%",
          }}
        >
          {showcaseEntries.map((entry) => (
            <Card key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>
    </main>
  )
}
