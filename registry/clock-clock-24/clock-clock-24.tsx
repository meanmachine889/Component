"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Color helpers ──────────────────────────────────────────────────────────
// Derive the panel / face / edge / rim from a single body color. Lightens or
// darkens a hex by `amt` (-1..1). Used only when `bodyColor` is supplied.

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

/** Perceptual luminance test — true when a color is dark enough to need stronger inset shadows. */
function isDarkColor(hex: string): boolean {
  const c = hex.replace("#", "")
  const full = c.length === 3 ? c.split("").map((x) => x + x).join("") : c
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  // Rec. 601 luma, 0..255.
  return 0.299 * r + 0.587 * g + 0.114 * b < 128
}

// ─── Digit definitions ────────────────────────────────────────────────────────
// Each digit is rendered by a 2×3 grid of clocks. Positions: TL, TR, ML, MR, BL, BR.
// Values are [hand1, hand2] angles in degrees.

const DIGIT_ANGLES: Record<number, [number, number][]> = {
  0: [[90, 180], [270, 180], [0, 180], [0, 180], [90, 0], [270, 0]],
  1: [[225, 225], [180, 180], [225, 225], [180, 0], [225, 225], [0, 0]],
  2: [[90, 90], [270, 180], [90, 180], [270, 0], [90, 0], [270, 270]],
  3: [[90, 90], [270, 180], [90, 90], [270, 0], [90, 90], [270, 0]],
  4: [[180, 180], [180, 180], [90, 0], [0, 180], [225, 225], [0, 0]],
  5: [[90, 180], [270, 270], [90, 0], [270, 180], [90, 90], [270, 0]],
  6: [[90, 180], [270, 270], [0, 180], [270, 180], [90, 0], [270, 0]],
  7: [[90, 90], [270, 180], [225, 225], [0, 180], [225, 225], [0, 0]],
  8: [[90, 180], [270, 180], [90, 0], [270, 0], [90, 0], [270, 0]],
  9: [[90, 180], [270, 180], [90, 0], [0, 180], [90, 90], [270, 0]],
}

type AllAngles = [number, number][][] // [digitIndex][clockIndex]

// ─── Clock face (single small clock) ──────────────────────────────────────────

interface ClockFaceProps {
  hand1Angle: number
  hand2Angle: number
  size: number
}

function shortestRotation(from: number, to: number): number {
  let delta = (((to - from) % 360) + 360) % 360
  if (delta > 180) delta -= 360
  return from + delta
}

function ClockFace({ hand1Angle, hand2Angle, size }: ClockFaceProps) {
  // Unique ID for SVG defs — useId avoids the Math.random() re-render bug.
  const uid = React.useId().replace(/:/g, "")

  // Track accumulated rotation so CSS transitions always take the short path.
  // Documented React pattern: store previous prop alongside derived state and
  // adjust during render — React bails out the redundant render after the
  // setState matches.
  const [acc1, setAcc1] = React.useState<number>(hand1Angle)
  const [prevHand1, setPrevHand1] = React.useState<number>(hand1Angle)
  if (hand1Angle !== prevHand1) {
    setPrevHand1(hand1Angle)
    setAcc1((prev) => shortestRotation(prev, hand1Angle))
  }

  const [acc2, setAcc2] = React.useState<number>(hand2Angle)
  const [prevHand2, setPrevHand2] = React.useState<number>(hand2Angle)
  if (hand2Angle !== prevHand2) {
    setPrevHand2(hand2Angle)
    setAcc2((prev) => shortestRotation(prev, hand2Angle))
  }

  const r = size / 2
  const handWidth = size * 0.10
  const handLen = r * 0.82

  const handStyle = (angle: number): React.CSSProperties => ({
    transformOrigin: `${r}px ${r}px`,
    transform: `rotate(${angle}deg)`,
    transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
  })

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        border: "1px solid var(--clock-rim)",
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`face-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="65%" style={{ stopColor: "var(--clock-face)" }} />
            <stop offset="100%" style={{ stopColor: "var(--clock-face-edge)" }} />
          </radialGradient>
        </defs>

        <circle cx={r} cy={r} r={r} fill={`url(#face-${uid})`} />

        <g style={handStyle(acc1)}>
          <line
            x1={r} y1={r} x2={r} y2={r - handLen}
            stroke="var(--clock-hand)"
            strokeWidth={handWidth}
            strokeLinecap="butt"
          />
        </g>

        <g style={handStyle(acc2)}>
          <line
            x1={r} y1={r} x2={r} y2={r - handLen}
            stroke="var(--clock-hand)"
            strokeWidth={handWidth}
            strokeLinecap="butt"
          />
        </g>

        <circle cx={r} cy={r} r={handWidth * 0.5} style={{ fill: "var(--clock-hand)" }} />
      </svg>

      {/* Inset shadow overlay — creates the recessed 3D pocket look */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          boxShadow: "var(--clock-dial-shadow)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}

// ─── Time + choreography ──────────────────────────────────────────────────────

function getZonedHM(timeZone?: string): { h: number; m: number } {
  const now = new Date()
  if (!timeZone) return { h: now.getHours(), m: now.getMinutes() }
  // Intl path — throws on invalid IANA names; fall back to local time.
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }).formatToParts(now)
    const h = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10)
    const m = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10)
    return { h: h % 24, m }
  } catch {
    return { h: now.getHours(), m: now.getMinutes() }
  }
}

function getTimeDigits(format: "12h" | "24h", timeZone?: string): number[] {
  const { h: rawH, m } = getZonedHM(timeZone)
  const h = format === "12h" ? (rawH % 12 || 12) : rawH
  const hh = String(h).padStart(2, "0")
  const mm = String(m).padStart(2, "0")
  return [+hh[0], +hh[1], +mm[0], +mm[1]]
}

function digitsToAngles(digits: number[]): AllAngles {
  return digits.map((d) => DIGIT_ANGLES[d] ?? DIGIT_ANGLES[0])
}

function digitClockToGrid(digitIdx: number, clockIdx: number): { col: number; row: number } {
  const col = digitIdx * 2 + (clockIdx % 2)
  const row = Math.floor(clockIdx / 2)
  return { col, row }
}

function waveAngles(t: number): AllAngles {
  return Array.from({ length: 4 }, (_, di) =>
    Array.from({ length: 6 }, (_, ci): [number, number] => {
      const { col } = digitClockToGrid(di, ci)
      const phase = (col / 7) * Math.PI * 2
      const angle = Math.sin(t * 2 - phase) * 180
      return [angle, angle + 90]
    })
  )
}

function spiralAngles(t: number): AllAngles {
  const cx = 3.5
  const cy = 1
  return Array.from({ length: 4 }, (_, di) =>
    Array.from({ length: 6 }, (_, ci): [number, number] => {
      const { col, row } = digitClockToGrid(di, ci)
      const dx = col - cx
      const dy = row - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const baseAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
      const spin = t * 120 + dist * 30
      return [baseAngle + spin, baseAngle + spin + 180]
    })
  )
}

function scatterAngles(seed: number): AllAngles {
  const rand = (n: number) => {
    const x = Math.sin(seed * 9301 + n * 49297 + 233720) * 43758.5453
    return (x - Math.floor(x)) * 360
  }
  return Array.from({ length: 4 }, (_, di) =>
    Array.from({ length: 6 }, (_, ci): [number, number] => {
      const idx = di * 6 + ci
      return [rand(idx * 2), rand(idx * 2 + 1)]
    })
  )
}

type Phase = "time" | "wave" | "spiral" | "scatter"

const ACTIVE_CYCLE: Phase[] = ["wave", "spiral", "scatter", "time"]
const MEDIUM_CYCLE: Phase[] = ["wave", "spiral", "time"]

// ─── Public component ─────────────────────────────────────────────────────────

export interface KineticClockProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Choreography intensity.
   * - `active`: full cycle of wave → spiral → scatter → time
   * - `medium`: gentler cycle (wave → spiral → time)
   * - `quiet`: only displays the time, no animation
   * @default "active"
   */
  mode?: "active" | "medium" | "quiet"
  /**
   * Time format.
   * @default "24h"
   */
  format?: "12h" | "24h"
  /**
   * Outer width in pixels. Height derives from layout.
   * @default 700
   */
  size?: number
  /**
   * IANA timezone name (e.g. `"America/New_York"`, `"Asia/Tokyo"`).
   * When omitted, the viewer's local time is used.
   */
  timeZone?: string
  /**
   * Color of the clock body — the panel, faces, rims, and inner dial shadows
   * are all derived from this single color. Any CSS hex color.
   * @default "#ffffff"
   */
  bodyColor?: string
  /**
   * Color of the clock hands. Any CSS color.
   * @default "#111111"
   */
  handColor?: string
}

export function KineticClock({
  mode = "active",
  format = "24h",
  size = 700,
  timeZone,
  bodyColor = "#ffffff",
  handColor = "#111111",
  className,
  style,
  ...rest
}: KineticClockProps) {
  const initialDigits = React.useMemo(
    () => getTimeDigits(format, timeZone),
    [format, timeZone]
  )
  const [allAngles, setAllAngles] = React.useState<AllAngles>(() =>
    digitsToAngles(initialDigits)
  )

  const phaseRef = React.useRef<Phase>("time")
  // Initialized to 0 / -1 sentinels; the effect below sets real values on
  // mount. useRef cannot call impure functions like Date.now() inline.
  const phaseStartRef = React.useRef<number>(0)
  const scatterSeedRef = React.useRef<number>(1)
  const rafRef = React.useRef<number>(0)
  const lastMinuteRef = React.useRef<number>(-1)

  // Layout math: 4 digit columns × 2 clocks each = 8 columns + 7 inter-clock gaps.
  const gap = size * 0.022
  const clockSize = (size - gap * 7) / 8
  const paddingH = gap * 2
  const paddingV = gap * 2

  // Fully self-contained colors: every --clock-* var is derived from bodyColor
  // and handColor and written inline, so the clock never depends on a parent
  // `.dark`/`.light` class. The inner dial shadow strengthens for darker bodies
  // (where soft shadows would vanish) and stays subtle for light bodies.
  const dark = isDarkColor(bodyColor)
  const shadowA = dark ? 0.5 : 0.09 // inset dark-shadow alpha
  const colorVars = {
    "--clock-panel": shade(bodyColor, -0.04),
    "--clock-face": bodyColor,
    "--clock-face-edge": shade(bodyColor, -0.05),
    "--clock-rim": shade(bodyColor, -0.12),
    "--clock-hand": handColor,
    "--clock-dial-shadow": `inset 0 3px 8px rgba(0,0,0,${shadowA}), inset 0 1px 3px rgba(0,0,0,${shadowA + 0.02}), inset 0 -2px 5px rgba(255,255,255,${dark ? 0.04 : 0.12})`,
  } as React.CSSProperties

  React.useEffect(() => {
    const tick = () => {
      if (mode === "quiet") {
        const minute = getZonedHM(timeZone).m
        if (minute !== lastMinuteRef.current) {
          lastMinuteRef.current = minute
          setAllAngles(digitsToAngles(getTimeDigits(format, timeZone)))
        }
        return
      }

      const now = Date.now()
      const currentMinute = getZonedHM(timeZone).m
      // If the minute changed mid-animation, break out to the time phase so
      // the new minute is reflected immediately.
      if (
        currentMinute !== lastMinuteRef.current &&
        phaseRef.current !== "time"
      ) {
        phaseRef.current = "time"
        phaseStartRef.current = now
      }

      const elapsed = (now - phaseStartRef.current) / 1000
      const cycle = mode === "active" ? ACTIVE_CYCLE : MEDIUM_CYCLE

      const phaseDurations: Record<Phase, number> = {
        time: 3,
        wave: mode === "active" ? 8 : 12,
        spiral: mode === "active" ? 8 : 12,
        scatter: 8,
      }

      const duration = phaseDurations[phaseRef.current]
      if (elapsed >= duration) {
        const currentIdx = cycle.indexOf(phaseRef.current)
        const nextPhase = cycle[(currentIdx + 1) % cycle.length]
        phaseRef.current = nextPhase
        phaseStartRef.current = now
        if (nextPhase === "scatter") scatterSeedRef.current = Math.random() * 1000
      }

      const t = (Date.now() - phaseStartRef.current) / 1000
      const phase = phaseRef.current

      if (phase === "time") {
        lastMinuteRef.current = currentMinute
        setAllAngles(digitsToAngles(getTimeDigits(format, timeZone)))
      } else if (phase === "wave") {
        setAllAngles(waveAngles(t))
      } else if (phase === "spiral") {
        setAllAngles(spiralAngles(t))
      } else if (phase === "scatter") {
        setAllAngles(scatterAngles(scatterSeedRef.current + Math.floor(t / 1.5)))
      }
    }

    if (mode === "quiet") {
      lastMinuteRef.current = getZonedHM(timeZone).m
      setAllAngles(digitsToAngles(getTimeDigits(format, timeZone)))
      const interval = setInterval(tick, 1000)
      return () => clearInterval(interval)
    }

    let running = true
    // Restart cycle when mode flips so the new cycle starts cleanly.
    phaseRef.current = "time"
    phaseStartRef.current = Date.now()
    lastMinuteRef.current = getZonedHM(timeZone).m

    const loop = () => {
      if (!running) return
      tick()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [mode, format, timeZone])

  return (
    <div
      className={cn("inline-block", className)}
      style={{
        ...colorVars,
        background: "var(--clock-panel)",
        borderRadius: 0,
        // Subtle border derived from the body color for a clean boundary when
        // no drop shadow is applied. Add your own elevation via `className`
        // (e.g. `shadow-xl`) or `style`.
        border: `1px solid ${shade(bodyColor, dark ? 0.12 : -0.08)}`,
        padding: `${paddingV}px ${paddingH}px`,
        transition: "background 0.4s ease",
        ...style,
      }}
      role="img"
      aria-label={`Clock display, ${format} format, ${mode} mode${timeZone ? `, ${timeZone}` : ""}`}
      {...rest}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(4, ${clockSize * 2 + gap}px)`,
          gap: `${gap * 1.5}px`,
        }}
      >
        {allAngles.map((digitAngles, di) => (
          <div
            key={di}
            style={{
              display: "grid",
              gridTemplateColumns: `${clockSize}px ${clockSize}px`,
              gridTemplateRows: `${clockSize}px ${clockSize}px ${clockSize}px`,
              gap: `${gap}px`,
            }}
          >
            {digitAngles.map(([h1, h2], ci) => (
              <ClockFace key={ci} hand1Angle={h1} hand2Angle={h2} size={clockSize} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default KineticClock
