import type { ReactNode } from "react"
import type { IconComponent } from "./icons"

export function NavLink({
  href,
  children,
  icon: Icon,
}: {
  href: string
  children: ReactNode
  icon?: IconComponent
}) {
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
