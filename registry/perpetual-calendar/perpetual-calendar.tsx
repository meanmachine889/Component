"use client"

import { useEffect, useState, type CSSProperties } from "react"

export type PerpetualCalendarProps = {
  /** Outer width in pixels. Height derives from the board's aspect ratio. */
  size?: number
  /** Board / button base color. The raised highlights and recessed shadows are derived from it. */
  color?: string
  /** Embossed label + number color. */
  textColor?: string
  /** Color of the selection ring that marks the active month / day / date. */
  ringColor?: string
  /** IANA timezone name (e.g. "America/New_York"). Omit for the viewer's local time. */
  timeZone?: string
  /**
   * Pin the displayed date instead of tracking "now". Accepts a Date.
   * When omitted the calendar follows the current date and updates at midnight.
   */
  date?: Date
  /** Class applied to the board root. Use it to add your own drop shadow, e.g. `shadow-2xl`. */
  className?: string
  /** Inline styles merged onto the board root. */
  style?: CSSProperties
}

const MONTHS = [
  "JAN", "FEB", "MAR", "APR",
  "MAY", "JUN", "JUL", "AUG",
  "SEP", "OCT", "NOV", "DEC",
] as const

// Monday-first, matching the reference board (MON…SUN down the left column).
const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const

function shade(hex: string, amt: number): string {
  const c = hex.replace("#", "")
  const full = c.length === 3 ? c.split("").map((x) => x + x).join("") : c
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  const adj = (v: number) =>
    amt >= 0 ? Math.round(v + (255 - v) * amt) : Math.round(v * (1 + amt))
  const toHex = (v: number) =>
    Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")
  return `#${toHex(adj(r))}${toHex(adj(g))}${toHex(adj(b))}`
}

/** Extract month (0-11), date (1-31) and Monday-first weekday (0-6) for a zone. */
function getZonedParts(timeZone?: string): { month: number; date: number; day: number } {
  const now = new Date()
  if (!timeZone) {
    return { month: now.getMonth(), date: now.getDate(), day: (now.getDay() + 6) % 7 }
  }
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    }).formatToParts(now)
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
    const month = parseInt(get("month"), 10) - 1
    const date = parseInt(get("day"), 10)
    const dayMap: Record<string, number> = {
      Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
    }
    const day = dayMap[get("weekday")] ?? (now.getDay() + 6) % 7
    return { month, date, day }
  } catch {
    return { month: now.getMonth(), date: now.getDate(), day: (now.getDay() + 6) % 7 }
  }
}

/** Milliseconds until the next local midnight, for the daily re-render timer. */
function msUntilMidnight(): number {
  const now = new Date()
  const next = new Date(now)
  next.setHours(24, 0, 0, 0)
  return next.getTime() - now.getTime()
}

// ─── Embossed button ──────────────────────────────────────────────────────────

type ButtonShape = "pill" | "round"

function CalButton({
  label,
  shape,
  active,
  unit,
  color,
  textColor,
  ringColor,
}: {
  label: string
  shape: ButtonShape
  active: boolean
  /** Geometry unit (px). Controls font size, padding, ring thickness. */
  unit: number
  color: string
  textColor: string
  ringColor: string
}) {
  const top = shade(color, 0.09) // catches the top light
  const bottom = shade(color, -0.1) // falls into shadow

  const radius = shape === "pill" ? unit * 1.4 : "50%"
  const fontSize =
    shape === "pill" ? unit * 0.62 : unit * 0.66

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: shape === "round" ? unit * 2.55 : "100%",
        height: unit * 2.55,
        borderRadius: radius,
        // Raised cap: light gradient from top, soft drop = gentle depth.
        background: `linear-gradient(155deg, ${top} 0%, ${color} 45%, ${bottom} 100%)`,
        boxShadow: [
          // subtle hairline rim so each cap is just barely outlined
          `inset 0 0 0 ${Math.max(1, unit * 0.05)}px ${shade(color, -0.14)}`,
          // soft contact shadow under the cap (sits in the valley)
          `0 ${unit * 0.2}px ${unit * 0.4}px rgba(0,0,0,0.14)`,
          // gentle bottom-edge rim — blurred, not a hard line
          `0 ${unit * 0.05}px ${unit * 0.05}px ${shade(color, -0.16)}`,
          // inner top highlight (rounded glossy lip)
          `inset 0 ${unit * 0.1}px ${unit * 0.14}px ${shade(top, 0.16)}`,
          // inner bottom core shadow
          `inset 0 ${-unit * 0.1}px ${unit * 0.16}px ${shade(bottom, -0.1)}`,
        ].join(", "),
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 700,
          letterSpacing: shape === "pill" ? "0.04em" : "0",
          lineHeight: 1,
          color: textColor,
          // Embossed text: light bottom edge + soft top shade = raised glyphs.
          textShadow: `0 ${unit * 0.035}px ${unit * 0.02}px ${shade(color, 0.22)}, 0 ${-unit * 0.025}px ${unit * 0.02}px rgba(0,0,0,0.22)`,
          userSelect: "none",
          fontFamily: "'Poppins', system-ui, -apple-system, sans-serif",
        }}
      >
        {label}
      </span>

      {active && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: shape === "round" ? -unit * 0.34 : -unit * 0.4,
            borderRadius: shape === "pill" ? unit * 1.8 : "50%",
            border: `${unit * 0.32}px solid ${ringColor}`,
            // The ring is itself a raised plastic loop resting in a shallow groove.
            boxShadow: [
              // soft drop so the loop floats above the cap
              `0 ${unit * 0.12}px ${unit * 0.22}px rgba(0,0,0,0.22)`,
              // thin shaded groove around the ring's outer edge = separation from cap
              `0 0 0 ${Math.max(1, unit * 0.05)}px ${shade(color, -0.18)}`,
              // glossy plastic top/bottom on the loop itself
              `inset 0 ${unit * 0.1}px ${unit * 0.1}px ${shade(ringColor, 0.35)}`,
              `inset 0 ${-unit * 0.1}px ${unit * 0.1}px ${shade(ringColor, -0.18)}`,
            ].join(", "),
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  )
}

// ─── Board ──────────────────────────────────────────────────────────────────

export function PerpetualCalendar({
  size = 460,
  color = "#d2412a",
  textColor = "#f7ede6",
  ringColor = "#f4ead9",
  timeZone,
  date,
  className,
  style,
}: PerpetualCalendarProps) {
  // `tick` is bumped once per midnight so the live date recomputes; it is unused
  // when a `date` is pinned. State only advances from the async timer below,
  // never synchronously in the effect.
  const [, setTick] = useState(0)

  useEffect(() => {
    if (date) return
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      timer = setTimeout(() => {
        setTick((n) => n + 1)
        schedule()
      }, msUntilMidnight() + 1000)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [date])

  // Derived during render: a pinned date wins, otherwise read the current zone.
  const parts = date
    ? { month: date.getMonth(), date: date.getDate(), day: (date.getDay() + 6) % 7 }
    : getZonedParts(timeZone)

  // Geometry: the board is laid out on a unit grid so everything scales with size.
  const unit = size / 28
  const boardPad = unit * 2
  const gap = unit * 0.9
  const boardColor = shade(color, 0.02)

  const sectionGap = unit * 1.6

  // The board's own inset depth is intrinsic and always kept. Any boxShadow the
  // caller passes via `style` is appended (so it can add outer elevation without
  // clobbering the emboss); other style props spread normally.
  const { boxShadow: extraShadow, ...restStyle } = style ?? {}
  const innerShadow = [
    `inset 0 ${unit * 0.2}px ${unit * 0.3}px ${shade(boardColor, 0.18)}`,
    `inset 0 ${-unit * 0.3}px ${unit * 0.4}px rgba(0,0,0,0.22)`,
  ].join(", ")

  return (
    <div
      role="img"
      aria-label={`Perpetual calendar showing ${MONTHS[parts.month]} ${parts.date}, ${DAYS[parts.day]}`}
      className={className}
      style={{
        width: size,
        padding: boardPad,
        borderRadius: unit * 1.2,
        background: `linear-gradient(165deg, ${shade(boardColor, 0.06)} 0%, ${boardColor} 38%, ${shade(boardColor, -0.12)} 100%)`,
        // Subtle border for a clean boundary when no drop shadow is applied.
        border: `1px solid ${shade(boardColor, -0.16)}`,
        boxShadow: extraShadow ? `${innerShadow}, ${extraShadow}` : innerShadow,
        display: "flex",
        flexDirection: "column",
        gap: sectionGap,
        boxSizing: "border-box",
        ...restStyle,
      }}
    >
      {/* Months — 4 columns × 3 rows */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap,
        }}
      >
        {MONTHS.map((m, i) => (
          <CalButton
            key={m}
            label={m}
            shape="pill"
            active={i === parts.month}
            unit={unit}
            color={color}
            textColor={textColor}
            ringColor={ringColor}
          />
        ))}
      </div>

      {/* Days + dates — left weekday column, then a 5-wide grid of 1..31 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.35fr repeat(5, 1fr)",
          gap,
          alignItems: "center",
        }}
      >
        {DAYS.map((d, rowIdx) => {
          // Each weekday row owns 5 date cells: 1-5, 6-10, … 26-30, then 31 alone.
          const rowDates = Array.from({ length: 5 }, (_, c) => rowIdx * 5 + c + 1).filter(
            (n) => n <= 31,
          )
          return (
            <div key={d} style={{ display: "contents" }}>
              <CalButton
                label={d}
                shape="pill"
                active={rowIdx === parts.day}
                unit={unit}
                color={color}
                textColor={textColor}
                ringColor={ringColor}
              />
              {Array.from({ length: 5 }, (_, c) => {
                const n = rowDates[c]
                if (n === undefined) return <div key={c} aria-hidden="true" />
                return (
                  <div key={c} style={{ display: "flex", justifyContent: "center" }}>
                    <CalButton
                      label={String(n)}
                      shape="round"
                      active={n === parts.date}
                      unit={unit}
                      color={color}
                      textColor={textColor}
                      ringColor={ringColor}
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PerpetualCalendar
