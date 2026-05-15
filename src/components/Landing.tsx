import { showcaseEntries } from "@/showcase"
import { Card } from "./Card"
import { CodeBlock } from "./CodeBlock"

export function Landing({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <main
      style={{
        width: "100%",
        padding: "clamp(32px, 6vw, 64px) clamp(20px, 5vw, 48px) clamp(48px, 8vw, 96px)",
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
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: "-0.2px",
            margin: 0,
            color: "var(--page-text-muted)",
          }}
        >
          Install any component
        </h2>
        <CodeBlock code="npx shadcn@latest add @kinetic/<component-name>" />
      </section>

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
          Components
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(400px, 100%), 1fr))",
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
