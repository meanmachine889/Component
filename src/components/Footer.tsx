import { NavLink } from "./NavLink"
import type { IconComponent } from "./icons"

export type FooterLinkSpec = { label: string; href: string; icon?: IconComponent }

export function Footer({
  links,
  authorName,
  authorHref,
}: {
  links: FooterLinkSpec[]
  authorName: string
  authorHref: string
}) {
  return (
    <footer
      style={{
        width: "100%",
        borderTop: "1px solid var(--page-border)",
        padding: "32px clamp(20px, 5vw, 48px)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        marginTop: "auto",
      }}
    >
      <div style={{ display: "flex", gap: "16px 24px", flexWrap: "wrap" }}>
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} icon={link.icon}>
            {link.label}
          </NavLink>
        ))}
      </div>

      <p style={{ fontSize: 13, color: "var(--page-text-subtle)", fontWeight: 400, margin: 0 }}>
        Made by{" "}
        <a
          href={authorHref}
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--page-text-muted)", textDecoration: "none" }}
        >
          {authorName}
        </a>
      </p>
    </footer>
  )
}
