import { useEffect, useState } from "react"

function readSlug(): string | null {
  if (typeof window === "undefined") return null
  const hash = window.location.hash.replace(/^#\/?/, "").trim()
  return hash === "" ? null : hash
}

export function useHashRoute(): {
  slug: string | null
  navigate: (slug: string | null) => void
} {
  const [slug, setSlug] = useState<string | null>(() => readSlug())

  useEffect(() => {
    const onChange = () => setSlug(readSlug())
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])

  const navigate = (next: string | null) => {
    if (next === null) {
      if (window.location.hash !== "") {
        history.pushState(null, "", window.location.pathname + window.location.search)
        setSlug(null)
      }
    } else {
      window.location.hash = `/${next}`
    }
  }

  return { slug, navigate }
}

export function hrefFor(slug: string | null): string {
  return slug === null ? "#/" : `#/${slug}`
}
