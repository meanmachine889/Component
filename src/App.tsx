import { useEffect, useState } from "react"
import { Footer } from "./components/Footer"
import { Landing } from "./components/Landing"
import { Showcase } from "./components/Showcase"
import { GithubIcon, TwitterIcon } from "./components/icons"
import { useHashRoute } from "./lib/useHashRoute"
import { showcaseEntries } from "./showcase"

const GITHUB_URL = "https://github.com/meanmachine889/Component"
const X_URL = "https://x.com/furiyash"
const LINKEDIN_URL = "https://www.linkedin.com/in/yash-bharadwaj-47871b251/"
const PORTFOLIO_URL = "https://yxsh.in"

const BRAND = "Kinetic"
const LANDING_DESCRIPTION =
  "A growing collection of drop-in React components — clocks, weather, and more on the way. Each one is themeable, dependency-light, and installs with a single shadcn command."

export default function App() {
  const { slug } = useHashRoute()
  const [theme, ] = useState<"dark" | "light">("light")
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const activeEntry = slug ? showcaseEntries.find((e) => e.slug === slug) : null

  return (
    <div
      style={{
        background: "var(--page-bg)",
        color: "var(--page-text)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.3s ease",
      }}
    >
      {activeEntry ? (
        <Showcase entry={activeEntry} demoContext={{ windowWidth, theme }} />
      ) : (
        <Landing title={BRAND} description={LANDING_DESCRIPTION} />
      )}

      <Footer
        links={[
          { label: "GitHub", href: GITHUB_URL, icon: GithubIcon },
          { label: "Twitter", href: X_URL, icon: TwitterIcon },
          { label: "LinkedIn", href: LINKEDIN_URL },
          { label: "Portfolio", href: PORTFOLIO_URL },
        ]}
        authorName="Yash Bharadwaj"
        authorHref={X_URL}
      />
    </div>
  )
}
