import { useState } from "react"
import type React from "react"
import { CodeBlock } from "./CodeBlock"
import { PropCard } from "./PropCard"
import { Step } from "./Step"
import { ExternalIcon, GithubIcon } from "./icons"
import { codeInline } from "./styles"
import { hrefFor } from "@/lib/useHashRoute"
import type { DemoContext, ShowcaseEntry } from "@/showcase/types"

export function Showcase({ entry, demoContext }: { entry: ShowcaseEntry; demoContext: DemoContext }) {
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli")
  const { Demo, install, usageCode, usageLabel, props, componentName } = entry

  const cliAdd = install ? `npx shadcn@latest add ${install.namespace}/${install.registryName}` : null
  const cliAddUrl = install ? `npx shadcn@latest add ${install.registryJsonUrl}` : null
  const cliInit = `npx shadcn@latest init`
  const registriesSnippet = install
    ? `{
  "registries": {
    "${install.namespace}": "${install.siteUrl}/r/{name}.json"
  }
}`
    : null

  return (
    <main
      style={{
        width: "100%",
        padding: "clamp(20px, 4vw, 32px) clamp(20px, 5vw, 48px) clamp(48px, 8vw, 96px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 64,
      }}
    >
      {/* ── Content column ────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 64, width: "100%", maxWidth: 900 }}>

        {/* ── Back link ───────────────────────────────────────────────────── */}
        <a
          href={hrefFor(null)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--page-text-muted)",
            textDecoration: "none",
            fontSize: 13,
            width: "fit-content",
          }}
        >
          ← All components
        </a>
        {/* <header style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                fontWeight: 400,
                letterSpacing: "-1.2px",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              {name}
            </h1>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: status === "ready" ? "var(--page-text-muted)" : "var(--page-text-subtle)",
                border: "1px solid var(--page-border)",
                padding: "2px 8px",
                borderRadius: 100,
                background: status === "ready" ? "var(--page-surface-2)" : "transparent",
              }}
            >
              {status === "ready" ? "Ready" : "Soon"}
            </span>
          </div>
          <p
            style={{
              fontSize: 16,
              color: "var(--page-text-muted)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {tagline}
          </p>
        </header> */}

        {/* ── Demo ─────────────────────────────────────────────────────────── */}
        <section
          style={{
            width: "100%",
            display: "flex",
            padding: "32px 0",
          }}
        >
          <Demo {...demoContext} />
        </section>

        {install && cliAdd && cliAddUrl && registriesSnippet && (
          <section style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 820 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2 style={{ fontSize: 26, fontWeight: 400, letterSpacing: "-0.5px", margin: 0 }}>
                Installation
              </h2>
              <p style={{ color: "var(--page-text-muted)", fontSize: 15, margin: 0 }}>
                Add the component to your project using the shadcn CLI or manually.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {(["cli", "manual"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setInstallTab(tab)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 100,
                    border: "1px solid var(--page-border)",
                    background: installTab === tab ? "var(--page-text)" : "transparent",
                    color: installTab === tab ? "var(--page-bg)" : "var(--page-text-muted)",
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {tab === "cli" ? "CLI" : "Manual"}
                </button>
              ))}
            </div>

            {installTab === "cli" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <Step number={1} title="Initialize shadcn">
                  <p style={{ color: "var(--page-text-muted)", fontSize: 14 }}>
                    Skip if your project already has shadcn/ui set up.
                  </p>
                  <CodeBlock code={cliInit} />
                </Step>
                <Step number={2} title={`Register the ${install.namespace} namespace`}>
                  <p style={{ color: "var(--page-text-muted)", fontSize: 14 }}>
                    Add this once to your project's <code style={codeInline}>components.json</code>. After this you can install any{" "}
                    <code style={codeInline}>{install.namespace}</code> component by name.
                  </p>
                  <CodeBlock label="components.json" code={registriesSnippet} />
                </Step>
                <Step number={3} title="Add the component">
                  <CodeBlock code={cliAdd} />
                  <p style={{ color: "var(--page-text-subtle)", fontSize: 12, margin: 0 }}>
                    Prefer not to register the namespace? Use the full URL form:
                  </p>
                  <CodeBlock code={cliAddUrl} />
                </Step>
              </div>
            ) : (
              (() => {
                const steps: { title: string; body: React.ReactNode }[] = []
                steps.push({
                  title: "Copy the component",
                  body: (
                    <>
                      <p style={{ color: "var(--page-text-muted)", fontSize: 14 }}>
                        Download the component file and place it in your{" "}
                        <code style={codeInline}>components/ui</code> folder.
                      </p>
                      <a
                        href={install.componentFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 20px",
                          borderRadius: 10,
                          border: "1px solid var(--page-border)",
                          color: "var(--page-text-muted)",
                          textDecoration: "none",
                          fontSize: 13,
                          width: "fit-content",
                        }}
                      >
                        <GithubIcon size={16} />
                        View File on GitHub
                        <ExternalIcon />
                      </a>
                    </>
                  ),
                })
                if (install.npmInstall) {
                  steps.push({
                    title: "Install dependencies",
                    body: <CodeBlock code={install.npmInstall} />,
                  })
                }
                if (install.cssVars) {
                  steps.push({
                    title: "Add CSS variables",
                    body: <CodeBlock label="globals.css" code={install.cssVars} />,
                  })
                }
                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: 32}}>
                    {steps.map((step, i) => (
                      <Step key={i} number={i + 1} title={step.title}>
                        {step.body}
                      </Step>
                    ))}
                  </div>
                )
              })()
            )}
          </section>
        )}

        {usageCode && (
          <section style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 820 }}>
            <h2 style={{ fontSize: 26, fontWeight: 400, letterSpacing: "-0.5px", margin: 0 }}>Usage</h2>
            <p style={{ color: "var(--page-text-muted)", fontSize: 15, margin: 0 }}>
              Import and use the component in your React application.
            </p>
            <CodeBlock label={usageLabel ?? "page.tsx"} code={usageCode} />
          </section>
        )}

        {props && props.length > 0 && (
          <section style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 820 }}>
            <h2 style={{ fontSize: 26, fontWeight: 400, letterSpacing: "-0.5px", margin: 0 }}>Reference</h2>
            <p style={{ color: "var(--page-text-muted)", fontSize: 15, margin: 0 }}>
              All props on the{" "}
              <code style={codeInline}>{componentName ?? entry.name}</code> component. Every prop is
              optional — the defaults match the demo above.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {props.map((p) => (
                <PropCard key={p.name} prop={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
