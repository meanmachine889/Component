import { useEffect, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { KineticClock } from "@/components/clock-clock-24"

const SITE_URL = "https://kinetic-clock.yxsh.in"
const REGISTRY_URL = `${SITE_URL}/r/clock-clock-24.json`
const GITHUB_URL = "https://github.com/meanmachine889/Component"
const X_URL = "https://x.com/furiyash"
const LINKEDIN_URL = "https://www.linkedin.com/in/yash-bharadwaj-47871b251/"
const PORTFOLIO_URL = "https://yxsh.in"
const COMPONENT_FILE_URL = `${GITHUB_URL}/blob/main/registry/clock-clock-24/clock-clock-24.tsx`

// ── Shared Constants ─────────────────────────────────────────────────────────

const CLI_INIT = `npx shadcn@latest init`
const CLI_ADD = `npx shadcn@latest add ${REGISTRY_URL}`
const NPM_INSTALL = `npm install clsx tailwind-merge`

const CSS_VARS = `:root {
  --clock-panel:      oklch(0.965 0 0);
  --clock-face:       oklch(1.000 0 0);
  --clock-face-edge:  oklch(0.965 0 0);
  --clock-rim:        oklch(0.905 0 0);
  --clock-hand:       oklch(0.130 0 0);
  --clock-dial-shadow: inset 0 3px 8px rgba(0,0,0,0.08),
                       inset 0 1px 3px rgba(0,0,0,0.10),
                       inset 0 -2px 5px rgba(255,255,255,0.12);
  --clock-shadow:     0 1px 2px rgba(0,0,0,0.04),
                      0 8px 24px rgba(0,0,0,0.06);
}

.dark {
  --clock-panel:      oklch(0.125 0 0);
  --clock-face:       oklch(0.185 0 0);
  --clock-face-edge:  oklch(0.160 0 0);
  --clock-rim:        oklch(0.245 0 0);
  --clock-hand:       oklch(0.930 0 0);
  --clock-dial-shadow: inset 0 3px 8px rgba(0,0,0,0.48),
                       inset 0 1px 3px rgba(0,0,0,0.55),
                       inset 0 -2px 5px rgba(255,255,255,0.04);
  --clock-shadow:     0 1px 2px rgba(0,0,0,0.35),
                      0 8px 24px rgba(0,0,0,0.50);
}`

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

// ── Shared Styles ────────────────────────────────────────────────────────────

const mono: CSSProperties = {
  fontFamily: "'Geist Mono', 'Courier New', monospace",
}

const codeInline: CSSProperties = {
  ...mono,
  fontSize: 12,
  padding: "2px 5px",
  borderRadius: 4,
  background: "var(--page-surface-2)",
  border: "1px solid var(--page-border)",
  color: "var(--page-text-muted)",
}

const thStyle: CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: 400,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--page-text-subtle)",
  borderRight: "1px solid var(--page-border)",
}

const tdStyle: CSSProperties = {
  padding: "14px 16px",
  verticalAlign: "top",
  borderRight: "1px solid var(--page-border)",
  lineHeight: 1.5,
  fontSize: 13,
  color: "var(--page-text-muted)",
}

// ── Components ─────────────────────────────────────────────────────────────

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
        gap: 6,
        padding: "6px 12px",
        background: "var(--page-surface-2)",
        border: "1px solid var(--page-border)",
        borderRadius: 100,
        color: "var(--page-text-muted)",
        fontSize: 12,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--page-border)"
        e.currentTarget.style.color = "var(--page-text)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--page-surface-2)"
        e.currentTarget.style.color = "var(--page-text-muted)"
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function NavLink({ href, children, icon: Icon }: { href: string; children: ReactNode; icon?: any }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: "var(--page-text-muted)",
        textDecoration: "none",
        fontSize: 13,
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--page-text)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--page-text-muted)")}
    >
      {Icon && <Icon size={14} />}
      {children}
    </a>
  )
}

function CodeBlock({ label, code }: { label?: string; code: string }) {
  const isSingleLine = !code.trim().includes("\n")

  if (isSingleLine && !label) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "4px 4px 4px 16px",
          background: "var(--page-code-bg)",
          border: "1px solid var(--page-border)",
          borderRadius: 100,
          fontSize: 13,
          color: "var(--page-code-text)",
          width: "fit-content",
          ...mono,
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>{code}</span>
        <CopyButton text={code} />
      </div>
    )
  }

  return (
    <div
      style={{
        background: "var(--page-code-bg)",
        border: "1px solid var(--page-border)",
        borderRadius: 8,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          borderBottom: "1px solid var(--page-border)",
          minHeight: 40,
        }}
      >
        <span style={{ ...mono, fontSize: 12, color: "var(--page-text-subtle)" }}>
          {label || ""}
        </span>
        <CopyButton text={code} />
      </div>
      <pre
        style={{
          ...mono,
          margin: 0,
          padding: "16px",
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
  )
}

function Step({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "var(--page-surface-2)",
          border: "1px solid var(--page-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          color: "var(--page-text-muted)",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {number}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <h3 style={{ fontSize: 16, fontWeight: 400, color: "var(--page-text)" }}>{title}</h3>
        {children}
      </div>
    </div>
  )
}

// ── Icons ──────────────────────────────────────────────────────────────────────

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const ExternalIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
)

// ── Main App ───────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("light")
  const [mode, setMode] = useState<"active" | "medium" | "quiet">("active")
  const [format, setFormat] = useState<"12h" | "24h">("24h")
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const clockSize = Math.min(windowWidth - 64, 700)

  return (
    <div
      style={{
        background: "var(--page-bg)",
        color: "var(--page-text)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "background 0.3s ease",
      }}
    >
      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <nav
        style={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 32px",
          flexWrap: "wrap",
          gap: "16px 24px",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.5px", whiteSpace: "nowrap" }}>
          Kinetic Clock
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px 24px", flexWrap: "wrap", justifyContent: "center" }}>
          <NavLink href={GITHUB_URL}>Codebase</NavLink>
          <NavLink href={X_URL}>Twitter</NavLink>
          <NavLink href={LINKEDIN_URL}>LinkedIn</NavLink>
          <NavLink href={PORTFOLIO_URL}>Portfolio</NavLink>
          <button
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--page-text-muted)",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--page-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--page-text-muted)")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          width: "100%",
          maxWidth: 800,
          textAlign: "center",
          padding: "80px 32px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 72px)",
            fontWeight: 400,
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          Kinetic Clock
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "var(--page-text-muted)",
            maxWidth: 500,
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          A minimalist animated grid of analog clocks that spells the time. Inspired by ClockClock 24.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            marginTop: 12,
          }}
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              background: "var(--page-text)",
              color: "var(--page-bg)",
              borderRadius: 100,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <GithubIcon size={18} />
            Star on GitHub
          </a>

          <CodeBlock label="Add component" code={CLI_ADD} />
        </div>
      </section>

      {/* ── Demo ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 32px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            width: "100%",
          }}
        >
          <div style={{ transform: windowWidth < 600 ? "scale(0.8)" : "scale(0.9)", transformOrigin: "center" }}>
            <KineticClock mode={mode} format={format} size={clockSize} />
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <div
              style={{
                display: "flex",
                background: "var(--page-surface-2)",
                padding: 4,
                borderRadius: 14,
                border: "1px solid var(--page-border)",
              }}
            >
              {(["active", "medium", "quiet"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 10,
                    border: "none",
                    background: mode === m ? "var(--page-bg)" : "transparent",
                    color: mode === m ? "var(--page-text)" : "var(--page-text-muted)",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: mode === m ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                  }}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>

            <button
              onClick={() => setFormat((f) => (f === "24h" ? "12h" : "24h"))}
              style={{
                padding: "10px 20px",
                borderRadius: 14,
                border: "1px solid var(--page-border)",
                background: "var(--page-bg)",
                color: "var(--page-text)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {format}
            </button>
          </div>
        </div>
      </section>

      {/* ── Content Sections ────────────────────────────────────────────────── */}
      <main style={{ width: "100%", maxWidth: 800, padding: "0 32px 80px", display: "flex", flexDirection: "column", gap: 80 }}>

        {/* Installation */}
        <section>
          <h2 style={{ fontSize: 28, fontWeight: 400, marginBottom: 12, letterSpacing: "-0.5px" }}>Installation</h2>
          <p style={{ color: "var(--page-text-muted)", fontSize: 16, marginBottom: 32 }}>
            Add the component to your project using the shadcn CLI or manually.
          </p>

          <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
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
                  Ensure your project is set up with Tailwind CSS and shadcn/ui.
                </p>
                <CodeBlock code={CLI_INIT} />
              </Step>
              <Step number={2} title="Add the component">
                <CodeBlock code={CLI_ADD} />
              </Step>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <Step number={1} title="Copy the component">
                <p style={{ color: "var(--page-text-muted)", fontSize: 14 }}>
                  Download the component file and place it in your <code style={codeInline}>components/ui</code> folder.
                </p>
                <a
                  href={COMPONENT_FILE_URL}
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
              </Step>
              <Step number={2} title="Install dependencies">
                <CodeBlock code={NPM_INSTALL} />
              </Step>
              <Step number={3} title="Add CSS variables">
                <CodeBlock label="globals.css" code={CSS_VARS} />
              </Step>
            </div>
          )}
        </section>

        {/* Usage */}
        <section>
          <h2 style={{ fontSize: 28, fontWeight: 400, marginBottom: 12, letterSpacing: "-0.5px" }}>Usage</h2>
          <p style={{ color: "var(--page-text-muted)", fontSize: 16, marginBottom: 32 }}>
            Import and use the component in your React application.
          </p>
          <CodeBlock label="page.tsx" code={USAGE_CODE} />
        </section>

        {/* Reference */}
        <section>
          <h2 style={{ fontSize: 28, fontWeight: 400, marginBottom: 12, letterSpacing: "-0.5px" }}>Reference</h2>
          <p style={{ color: "var(--page-text-muted)", fontSize: 16, marginBottom: 32 }}>
            Properties available for the <code style={codeInline}>KineticClock</code> component.
          </p>
          <div style={{ overflowX: "auto", border: "1px solid var(--page-border)", borderRadius: 16 }}>
            <table style={{ width: "100%", minWidth: 600, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--page-surface)" }}>
                  <th style={thStyle}>Prop</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Default</th>
                  <th style={{ ...thStyle, borderRight: "none" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid var(--page-border)" }}>
                  <td style={tdStyle} rowSpan={3}><code style={codeInline}>mode</code></td>
                  <td style={tdStyle}><code style={codeInline}>"active"</code></td>
                  <td style={tdStyle} rowSpan={3}><code style={codeInline}>"active"</code></td>
                  <td style={{ ...tdStyle, borderRight: "none" }}>Wave → Spiral → Scatter → Time</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--page-border)" }}>
                  <td style={tdStyle}><code style={codeInline}>"medium"</code></td>
                  <td style={{ ...tdStyle, borderRight: "none" }}>Wave → Spiral → Time</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--page-border)" }}>
                  <td style={tdStyle}><code style={codeInline}>"quiet"</code></td>
                  <td style={{ ...tdStyle, borderRight: "none" }}>Time only</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--page-border)" }}>
                  <td style={tdStyle}><code style={codeInline}>format</code></td>
                  <td style={tdStyle}><code style={codeInline}>"12h" | "24h"</code></td>
                  <td style={tdStyle}><code style={codeInline}>"24h"</code></td>
                  <td style={{ ...tdStyle, borderRight: "none" }}>Time format displayed by the clock grid.</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--page-border)" }}>
                  <td style={tdStyle}><code style={codeInline}>size</code></td>
                  <td style={tdStyle}><code style={codeInline}>number</code></td>
                  <td style={tdStyle}><code style={codeInline}>700</code></td>
                  <td style={{ ...tdStyle, borderRight: "none" }}>Outer width in pixels. Height derives from layout.</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--page-border)" }}>
                  <td style={tdStyle}><code style={codeInline}>theme</code></td>
                  <td style={tdStyle}><code style={codeInline}>"light" | "dark" | "auto"</code></td>
                  <td style={tdStyle}><code style={codeInline}>"auto"</code></td>
                  <td style={{ ...tdStyle, borderRight: "none" }}>Forces a specific theme or inherits from parent's .dark class.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        style={{
          width: "100%",
          maxWidth: 1200,
          borderTop: "1px solid var(--page-border)",
          padding: "60px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          marginTop: "auto",
        }}
      >
        <div style={{ display: "flex", gap: "16px 32px", flexWrap: "wrap", justifyContent: "center" }}>
          <NavLink href={GITHUB_URL} icon={GithubIcon}>GitHub</NavLink>
          <NavLink href={X_URL} icon={TwitterIcon}>Twitter</NavLink>
          <NavLink href={LINKEDIN_URL}>LinkedIn</NavLink>
          <NavLink href={PORTFOLIO_URL}>Portfolio</NavLink>
        </div>

        <p style={{ fontSize: 13, color: "var(--page-text-subtle)", fontWeight: 400 }}>
          Made by <a href={X_URL} target="_blank" rel="noreferrer" style={{ color: "var(--page-text-muted)", textDecoration: "none" }}>Yash Bharadwaj</a>
        </p>
      </footer>
    </div>
  )
}
