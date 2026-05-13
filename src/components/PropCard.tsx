import { mono } from "./styles"

export type PropDef = {
  name: string
  type: string
  default: string
  description: string
  values?: { label: string; description: string }[]
}

export function PropCard({ prop }: { prop: PropDef }) {
  return (
    <div
      style={{
        border: "1px solid var(--page-border)",
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        background: "var(--page-surface)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <code style={{ ...mono, fontSize: 16, color: "var(--page-text)", fontWeight: 500 }}>
          {prop.name}
        </code>
        <code style={{ ...mono, fontSize: 12, color: "var(--page-text-muted)" }}>{prop.type}</code>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            color: "var(--page-text-subtle)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          default{" "}
          <code
            style={{
              ...mono,
              fontSize: 12,
              color: "var(--page-text-muted)",
              textTransform: "none",
              letterSpacing: 0,
              marginLeft: 6,
            }}
          >
            {prop.default}
          </code>
        </span>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--page-text-muted)", margin: 0 }}>
        {prop.description}
      </p>
      {prop.values && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {prop.values.map((v) => (
            <li
              key={v.label}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "baseline",
                padding: "8px 12px",
                borderRadius: 8,
                background: "var(--page-surface-2)",
                border: "1px solid var(--page-border)",
              }}
            >
              <code
                style={{
                  ...mono,
                  fontSize: 12,
                  color: "var(--page-text)",
                  flexShrink: 0,
                  minWidth: 80,
                }}
              >
                {v.label}
              </code>
              <span style={{ fontSize: 13, color: "var(--page-text-muted)", lineHeight: 1.5 }}>
                {v.description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
