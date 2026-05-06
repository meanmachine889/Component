import { useEffect, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { KineticClock } from "@/components/clock-clock-24"

const SITE_URL = "https://kinetic-clock.yxsh.in"
const REGISTRY_URL = `${SITE_URL}/r/clock-clock-24.json`

const GITHUB_URL = "https://github.com/meanmachine889/Component"
const COMPONENT_FILE_URL = `${GITHUB_URL}/blob/main/registry/clock-clock-24/clock-clock-24.tsx`

// ── Code snippets ──────────────────────────────────────────────────────────────

const CLI_INIT = `npx shadcn@latest init`

const CLI_ADD = `npx shadcn@latest add ${REGISTRY_URL}`

const CSS_VARS = `:root {
  --clock-panel:      oklch(0.920 0 0);
  --clock-face:       oklch(0.960 0 0);
  --clock-face-edge:  oklch(0.860 0 0);
  --clock-rim:        oklch(0.790 0 0);
  --clock-hand:       oklch(0.110 0 0);
  --clock-dial-shadow: inset 0 3px 8px rgba(0,0,0,0.08),
                       inset 0 1px 3px rgba(0,0,0,0.10),
                       inset 0 -2px 5px rgba(255,255,255,0.12);
  --clock-shadow:     0 1px 4px rgba(0,0,0,0.08),
                      0 6px 24px rgba(0,0,0,0.10);
}

.dark {
  --clock-panel:      oklch(15.907% 0.00002 271.152);
  --clock-face:       oklch(0.138 0 0);
  --clock-face-edge:  oklch(0.090 0 0);
  --clock-rim:        oklch(0.220 0 0);
  --clock-hand:       oklch(0.970 0 0);
  --clock-dial-shadow: inset 0 3px 8px rgba(0,0,0,0.48),
                       inset 0 1px 3px rgba(0,0,0,0.55),
                       inset 0 -2px 5px rgba(255,255,255,0.04);
  --clock-shadow:     0 2px 10px rgba(0,0,0,0.45),
                      0 10px 36px rgba(0,0,0,0.40);
}`

const NPM_INSTALL = `npm install clsx tailwind-merge`

const USAGE_CODE = `import { KineticClock } from "@/components/clock-clock-24"

export function Page() {
  return (
    <KineticClock
      mode="active"   // "active" | "medium" | "quiet"
      format="24h"    // "24h" | "12h"
      size={600}      // width in px
    />
  )
}`

// ── Shared style tokens ────────────────────────────────────────────────────────

const mono: CSSProperties = {
  fontFamily: "'Geist Mono', 'Courier New', monospace",
}

const codeInline: CSSProperties = {
  ...mono,
  fontSize: 12,
  padding: "1px 5px",
  borderRadius: 3,
  background: "var(--page-code-bg)",
  border: "1px solid var(--page-border)",
  color: "var(--page-code-text)",
}

const thStyle: CSSProperties = {
  padding: "10px 16px",
  textAlign: "left",
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--page-text-subtle)",
  borderRight: "1px solid var(--page-border)",
  whiteSpace: "nowrap",
}

const tdStyle: CSSProperties = {
  padding: "12px 16px",
  verticalAlign: "top",
  borderRight: "1px solid var(--page-border)",
  lineHeight: 1.5,
  fontSize: 13,
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 9px",
        background: "transparent",
        border: "1px solid var(--page-border)",
        borderRadius: 4,
        color: "var(--page-text-subtle)",
        fontFamily: "'Poppins', sans-serif",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "-0.1px",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ label, code }: { label?: string; code: string }) {
  return (
    <div
      style={{
        background: "var(--page-code-bg)",
        border: "1px solid var(--page-border)",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      {label && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 14px",
            borderBottom: "1px solid var(--page-border)",
          }}
        >
          <span style={{ ...mono, fontSize: 12, color: "var(--page-text-subtle)" }}>
            {label}
          </span>
          <CopyButton text={code} />
        </div>
      )}
      <div style={{ position: "relative" }}>
        {!label && (
          <div style={{ position: "absolute", top: 10, right: 12 }}>
            <CopyButton text={code} />
          </div>
        )}
        <pre
          style={{
            ...mono,
            margin: 0,
            padding: label ? "14px 16px" : "14px 60px 14px 16px",
            fontSize: 13,
            lineHeight: 1.65,
            color: "var(--page-code-text)",
            overflowX: "auto",
            whiteSpace: "pre",
          }}
        >
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "var(--page-surface-2)",
            border: "1px solid var(--page-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--page-text-subtle)",
            flexShrink: 0,
          }}
        >
          {number}
        </div>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.13px",
            color: "var(--page-text)",
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ paddingLeft: 32, display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </div>
    </div>
  )
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function CopyIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

// ── Types ──────────────────────────────────────────────────────────────────────

type Mode = "active" | "medium" | "quiet"
type Format = "12h" | "24h"
type InstallTab = "cli" | "manual"

// ── App ────────────────────────────────────────────────────────────────────────

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("light")
  const [mode, setMode] = useState<Mode>("active")
  const [format, setFormat] = useState<Format>("24h")
  const [installTab, setInstallTab] = useState<InstallTab>("cli")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const bodyText: CSSProperties = {
    fontSize: 14,
    lineHeight: 1.6,
    letterSpacing: "-0.13px",
    color: "var(--page-text-muted)",
    margin: 0,
  }

  const navBtn: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 6,
    border: "1px solid var(--page-border)",
    background: "transparent",
    color: "var(--page-text-muted)",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "-0.1px",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
  }

  return (
    <div
      style={{
        background: "var(--page-bg)",
        color: "var(--page-text)",
        minHeight: "100vh",
        fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 52,
          background: "var(--page-bg)",
          borderBottom: "1px solid var(--page-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "-0.13px",
              color: "var(--page-text)",
            }}
          >
            Kinetic Clock
          </span>
          <span
            style={{
              fontSize: 11,
              padding: "1px 7px",
              borderRadius: 4,
              background: "var(--page-surface-2)",
              color: "var(--page-text-subtle)",
              border: "1px solid var(--page-border)",
              fontWeight: 500,
              letterSpacing: "-0.05px",
            }}
          >
            shadcn/ui
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={navBtn}>
            <GithubIcon />
            GitHub
          </a>
          <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} style={navBtn}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px 80px", textAlign: "center", background: theme === "dark" ? "var(--page-surface-2)" : undefined }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 28,
            padding: "3px 12px",
            borderRadius: 9999,
            border: "1px solid var(--page-border)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "-0.05px",
            color: "var(--page-text-subtle)",
          }}
        >
          Open Source · shadcn/ui registry
        </div>

        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 600,
            letterSpacing: "-0.22px",
            lineHeight: 1.08,
            color: "var(--page-text)",
            margin: "0 0 12px",
          }}
        >
          Kinetic Clock
        </h1>

        <p
          style={{
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: "-0.05px",
            color: "var(--page-text-subtle)",
            margin: "0 0 20px",
          }}
        >
          Inspired from ClockClock 24.
        </p>

        <p
          style={{
            ...bodyText,
            fontSize: 16,
            maxWidth: 480,
            margin: "0 auto 40px",
            color: "var(--page-text-muted)",
          }}
        >
          An animated grid of analog clocks that spells the current time. Cycles
          through wave, spiral, and scatter phases. Drops into any shadcn project.
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 60, fontSize: 13, color: "var(--page-text-subtle)" }}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--page-text-subtle)", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--page-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--page-text-subtle)")}
          >
            ★ star on github
          </a>
          <span style={{ color: "var(--page-border)" }}>·</span>
          <span>
            made by{" "}
            <a
              href="https://x.com/furiyash"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--page-text-subtle)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--page-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--page-text-subtle)")}
            >
              yash
            </a>
          </span>
        </div>

        {/* Live demo */}
        <div style={{ overflowX: "auto", paddingBottom: 4 }}>
          <div style={{ display: "inline-block" }}>
            <KineticClock mode={mode} format={format} size={700} />
          </div>
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 24,
            flexWrap: "wrap",
          }}
        >
          {/* Mode group */}
          <div
            style={{
              display: "flex",
              border: "1px solid var(--page-border)",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            {(["active", "medium", "quiet"] as Mode[]).map((m, i) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: "8px 16px",
                  background: mode === m ? "var(--page-text)" : "transparent",
                  color: mode === m ? "var(--page-bg)" : "var(--page-text-muted)",
                  border: "none",
                  borderRight: i < 2 ? "1px solid var(--page-border)" : "none",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Format toggle */}
          <button
            onClick={() => setFormat((f) => (f === "24h" ? "12h" : "24h"))}
            style={{
              padding: "8px 16px",
              background: "transparent",
              border: "1px solid var(--page-border)",
              borderRadius: 6,
              color: "var(--page-text-muted)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            {format}
          </button>
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--page-border)" }} />

      {/* ── Installation ───────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--page-text-subtle)",
              marginBottom: 8,
            }}
          >
            Getting Started
          </p>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "-0.22px",
              color: "var(--page-text)",
              margin: "0 0 8px",
            }}
          >
            Installation
          </h2>
          <p style={{ ...bodyText, marginBottom: 36 }}>
            Pull the component directly from the registry, or copy it manually into your project.
          </p>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              border: "1px solid var(--page-border)",
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 36,
              width: "fit-content",
            }}
          >
            {(["cli", "manual"] as InstallTab[]).map((tab, i) => (
              <button
                key={tab}
                onClick={() => setInstallTab(tab)}
                style={{
                  padding: "8px 20px",
                  background: installTab === tab ? "var(--page-surface-2)" : "transparent",
                  color:
                    installTab === tab ? "var(--page-text)" : "var(--page-text-subtle)",
                  border: "none",
                  borderRight: i === 0 ? "1px solid var(--page-border)" : "none",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "-0.1px",
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {tab === "cli" ? "shadcn CLI" : "Manual"}
              </button>
            ))}
          </div>

          {/* CLI tab */}
          {installTab === "cli" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <Step number={1} title="Prerequisites">
                <p style={bodyText}>
                  Your project needs React, Tailwind CSS v4, and a{" "}
                  <code style={codeInline}>components.json</code> for the shadcn CLI.
                </p>
                <CodeBlock label="Initialize shadcn (if needed)" code={CLI_INIT} />
              </Step>

              <Step number={2} title="Add the component">
                <p style={bodyText}>Install directly from the registry:</p>
                <CodeBlock label="Add component" code={CLI_ADD} />
                <p style={{ ...bodyText, fontSize: 12, color: "var(--page-text-subtle)" }}>
                  This installs the component file and adds the required CSS variables to your project automatically.
                </p>
              </Step>

              <Step number={3} title="Done">
                <p style={bodyText}>
                  Import and use <code style={codeInline}>KineticClock</code> anywhere in your app.
                  The component reads <code style={codeInline}>--clock-*</code> CSS variables, so it
                  adapts to light/dark automatically.
                </p>
              </Step>
            </div>
          )}

          {/* Manual tab */}
          {installTab === "manual" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <Step number={1} title="Copy the component file">
                <p style={bodyText}>
                  Copy <code style={codeInline}>clock-clock-24.tsx</code> into your{" "}
                  <code style={codeInline}>components/ui/</code> directory.
                </p>
                <a
                  href={COMPONENT_FILE_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    borderRadius: 6,
                    border: "1px solid var(--page-border)",
                    color: "var(--page-text-muted)",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  <GithubIcon />
                  View on GitHub
                  <ExternalIcon />
                </a>
              </Step>

              <Step number={2} title="Install dependencies">
                <CodeBlock label="Install" code={NPM_INSTALL} />
              </Step>

              <Step number={3} title="Add CSS variables">
                <p style={{ ...bodyText, marginBottom: 4 }}>
                  Add these to your global stylesheet (e.g.{" "}
                  <code style={codeInline}>app/globals.css</code>):
                </p>
                <CodeBlock label="globals.css" code={CSS_VARS} />
              </Step>
            </div>
          )}
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--page-border)" }} />

      {/* ── Usage ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--page-text-subtle)",
              marginBottom: 8,
            }}
          >
            Example
          </p>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "-0.22px",
              color: "var(--page-text)",
              margin: "0 0 8px",
            }}
          >
            Usage
          </h2>
          <p style={{ ...bodyText, marginBottom: 28 }}>
            Import and drop anywhere. The component reads{" "}
            <code style={codeInline}>--clock-*</code> CSS variables so it adapts to
            your theme automatically.
          </p>
          <CodeBlock label="page.tsx" code={USAGE_CODE} />
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--page-border)" }} />

      {/* ── Props ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--page-text-subtle)",
              marginBottom: 8,
            }}
          >
            Reference
          </p>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "-0.22px",
              color: "var(--page-text)",
              margin: "0 0 32px",
            }}
          >
            Props
          </h2>
          <div
            style={{
              border: "1px solid var(--page-border)",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <thead>
                <tr style={{ background: "var(--page-surface)" }}>
                  <th style={thStyle}>Prop</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Default</th>
                  <th style={{ ...thStyle, borderRight: "none" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {/* mode — one prop cell spanning 3 sub-rows */}
                <tr style={{ borderTop: "1px solid var(--page-border)" }}>
                  <td style={tdStyle} rowSpan={3}>
                    <code style={codeInline}>mode</code>
                  </td>
                  <td style={tdStyle}>
                    <code style={{ ...codeInline, fontSize: 11 }}>"active"</code>
                  </td>
                  <td style={tdStyle} rowSpan={3}>
                    <code style={codeInline}>"active"</code>
                  </td>
                  <td style={{ ...tdStyle, borderRight: "none", color: "var(--page-text-muted)" }}>
                    wave → spiral → scatter → time
                  </td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--page-border)" }}>
                  <td style={tdStyle}>
                    <code style={{ ...codeInline, fontSize: 11 }}>"medium"</code>
                  </td>
                  <td style={{ ...tdStyle, borderRight: "none", color: "var(--page-text-muted)" }}>
                    wave → spiral → time
                  </td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--page-border)" }}>
                  <td style={tdStyle}>
                    <code style={{ ...codeInline, fontSize: 11 }}>"quiet"</code>
                  </td>
                  <td style={{ ...tdStyle, borderRight: "none", color: "var(--page-text-muted)" }}>
                    time only
                  </td>
                </tr>
                {[
                  {
                    prop: "format",
                    type: '"12h" | "24h"',
                    def: '"24h"',
                    desc: "Time format displayed by the clock grid.",
                  },
                  {
                    prop: "size",
                    type: "number",
                    def: "700",
                    desc: "Outer width in pixels. Height derives from the 8-column × 3-row layout.",
                  },
                  {
                    prop: "className",
                    type: "string",
                    def: "—",
                    desc: "Additional class names forwarded to the root div.",
                  },
                  {
                    prop: "style",
                    type: "CSSProperties",
                    def: "—",
                    desc: "Inline styles merged into the root div.",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.prop}
                    style={{
                      borderTop: "1px solid var(--page-border)",
                      background: i % 2 === 0 ? "var(--page-surface)" : "transparent",
                    }}
                  >
                    <td style={tdStyle}>
                      <code style={codeInline}>{row.prop}</code>
                    </td>
                    <td style={tdStyle}>
                      <code style={{ ...codeInline, fontSize: 11 }}>{row.type}</code>
                    </td>
                    <td style={tdStyle}>
                      <code style={codeInline}>{row.def}</code>
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        borderRight: "none",
                        color: "var(--page-text-muted)",
                      }}
                    >
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div style={{ borderTop: "1px solid var(--page-border)" }} />

      {/* ── CSS Variables reference ─────────────────────────────────────────── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--page-text-subtle)",
              marginBottom: 8,
            }}
          >
            Theming
          </p>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "-0.22px",
              color: "var(--page-text)",
              margin: "0 0 8px",
            }}
          >
            CSS Variables
          </h2>
          <p style={{ ...bodyText, marginBottom: 28 }}>
            The component is fully themeable via CSS custom properties. Override any variable
            to match your design system.
          </p>
          <div
            style={{
              border: "1px solid var(--page-border)",
              borderRadius: 6,
              overflow: "hidden",
              marginBottom: 24,
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <thead>
                <tr style={{ background: "var(--page-surface)" }}>
                  <th style={thStyle}>Variable</th>
                  <th style={thStyle}>Light</th>
                  <th style={{ ...thStyle, borderRight: "none" }}>Dark</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["--clock-panel", "oklch(0.920 0 0)", "oklch(0.082 0 0)"],
                  ["--clock-face", "oklch(0.960 0 0)", "oklch(0.138 0 0)"],
                  ["--clock-face-edge", "oklch(0.860 0 0)", "oklch(0.090 0 0)"],
                  ["--clock-rim", "oklch(0.790 0 0)", "oklch(0.220 0 0)"],
                  ["--clock-hand", "oklch(0.110 0 0)", "oklch(0.970 0 0)"],
                  ["--clock-dial-shadow", "subtle inset (light)", "stronger inset (dark)"],
                  ["--clock-shadow", "subtle light shadow", "subtle dark shadow"],
                ].map(([name, light, dark], i) => (
                  <tr
                    key={name}
                    style={{
                      borderTop: "1px solid var(--page-border)",
                      background: i % 2 !== 0 ? "var(--page-surface)" : "transparent",
                    }}
                  >
                    <td style={tdStyle}>
                      <code style={{ ...codeInline, fontSize: 11 }}>{name}</code>
                    </td>
                    <td style={{ ...tdStyle, color: "var(--page-text-muted)", fontSize: 12 }}>
                      {light}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        borderRight: "none",
                        color: "var(--page-text-muted)",
                        fontSize: 12,
                      }}
                    >
                      {dark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CodeBlock label="globals.css" code={CSS_VARS} />
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--page-border)" }}>
        <footer
          style={{
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 960,
            margin: "0 auto",
            fontSize: 13,
            color: "var(--page-text-subtle)",
            letterSpacing: "-0.1px",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>Kinetic Clock · inspired by ClockClock 24</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {[
              { label: "twitter", href: "https://x.com/furiyash" },
              { label: "github", href: "https://github.com/meanmachine889" },
              { label: "linkedin", href: "https://linkedin.com/in/yash-bharadwaj-47871b251" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "var(--page-text-subtle)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--page-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--page-text-subtle)")}
              >
                {label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
