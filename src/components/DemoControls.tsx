import type { CSSProperties, ReactNode } from "react"
import { mono } from "./styles"

// Shared demo scaffolding so every component's interactive demo reads the same:
// a centered stage, a wrapping control bar, and consistent segmented / swatch /
// select controls. Demos compose these instead of re-styling buttons inline.

export function DemoStage({
  children,
  controls,
  hint,
}: {
  children: ReactNode
  controls?: ReactNode
  hint?: ReactNode
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        width: "100%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {children}
      </div>
      {controls && (
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {controls}
        </div>
      )}
      {hint && (
        <p style={{ fontSize: 12, color: "var(--page-text-muted)", margin: 0 }}>{hint}</p>
      )}
    </div>
  )
}

const groupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  background: "var(--page-surface-2)",
  padding: 4,
  borderRadius: 14,
  border: "1px solid var(--page-border)",
}

export function SegmentedControl<T extends string | number>({
  value,
  options,
  onChange,
  label,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  label?: string
}) {
  return (
    <div style={groupStyle} role="group" aria-label={label}>
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            style={{
              padding: "8px 18px",
              borderRadius: 10,
              border: "none",
              background: active ? "var(--page-bg)" : "transparent",
              color: active ? "var(--page-text)" : "var(--page-text-muted)",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: active ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
              whiteSpace: "nowrap",
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

export function SwatchRow({
  value,
  options,
  onChange,
  label,
}: {
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  label?: string
}) {
  return (
    <div style={{ ...groupStyle, gap: 8 }} role="group" aria-label={label}>
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            aria-label={opt.label}
            aria-pressed={active}
            title={opt.label}
            style={{
              width: 26,
              height: 26,
              flexShrink: 0,
              display: "block",
              boxSizing: "border-box",
              borderRadius: 8,
              border: "2px solid var(--page-bg)",
              background: opt.value,
              cursor: "pointer",
              padding: 0,
              // Active state is an outer ring (box-shadow) so the box never
              // changes size or position — keeps the row perfectly aligned.
              boxShadow: active
                ? "0 0 0 2px var(--page-text)"
                : "0 0 0 1px var(--page-border)",
              transition: "box-shadow 0.15s ease",
            }}
          />
        )
      })}
    </div>
  )
}

export function Select<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  /** Empty string sentinel maps to the "default / none" option. */
  value: T | ""
  options: { value: T | ""; label: string }[]
  onChange: (value: T | "") => void
  label: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T | "")}
      style={{
        padding: "10px 16px",
        borderRadius: 14,
        border: "1px solid var(--page-border)",
        background: "var(--page-bg)",
        color: "var(--page-text)",
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        appearance: "none",
        ...mono,
      }}
      aria-label={label}
    >
      {options.map((opt) => (
        <option key={opt.label} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
