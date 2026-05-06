import { useEffect, useState } from "react"
import { ClockClock24 } from "@/components/clock-clock-24"
import { cn } from "@/lib/utils"

type Mode = "active" | "medium" | "quiet"
type Format = "12h" | "24h"
type Theme = "dark" | "light"

const MODES: Mode[] = ["active", "medium", "quiet"]

function App() {
  const [mode, setMode] = useState<Mode>("active")
  const [format, setFormat] = useState<Format>("24h")
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 bg-background text-foreground transition-colors">
      <ClockClock24 mode={mode} format={format} size={800} />

      <div className="flex items-center gap-4 rounded-xl border border-border bg-card/40 p-4 backdrop-blur">
        <div className="flex overflow-hidden rounded-lg border border-border">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "border-r border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors last:border-r-0",
                mode === m
                  ? "bg-foreground text-background"
                  : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          onClick={() => setFormat((f) => (f === "24h" ? "12h" : "24h"))}
          className="min-w-[70px] rounded-lg border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {format}
        </button>

        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="min-w-[80px] rounded-lg border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  )
}

export default App
