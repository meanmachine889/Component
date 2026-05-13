import { hrefFor } from "@/lib/useHashRoute"
import { NavLink } from "./NavLink"
import { MoonIcon, SunIcon } from "./icons"

export type NavLinkSpec = { label: string; href: string }

export function Nav({
  title,
  links,
  theme,
  onToggleTheme,
}: {
  title: string
  links: NavLinkSpec[]
  theme: "dark" | "light"
  onToggleTheme: () => void
}) {
  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 48px",
        flexWrap: "wrap",
        gap: "16px 24px",
        borderBottom: "1px solid var(--page-border)",
      }}
    >
      <a
        href={hrefFor(null)}
        style={{
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: "-0.5px",
          whiteSpace: "nowrap",
          color: "var(--page-text)",
          textDecoration: "none",
        }}
      >
        {title}
      </a>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px 24px",
          flexWrap: "wrap",
        }}
      >
        {links.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
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
  )
}
