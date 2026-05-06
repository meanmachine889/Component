"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

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
  8: [[90, 180], [270, 180], [90, 0], [270, 180], [90, 0], [270, 0]],
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
  // Track accumulated rotation so CSS transitions always take the short path.
  const acc1 = React.useRef<number>(hand1Angle)
  const acc2 = React.useRef<number>(hand2Angle)
  acc1.current = shortestRotation(acc1.current, hand1Angle)
  acc2.current = shortestRotation(acc2.current, hand2Angle)

  const r = size / 2
  const handWidth = size * 0.12
  const handLen = r * 0.88

  const handStyle = (angle: number): React.CSSProperties => ({
    transformOrigin: `${r}px ${r}px`,
    transform: `rotate(${angle}deg)`,
    transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <circle
        cx={r}
        cy={r}
        r={r}
        style={{ fill: "var(--clock-face)" }}
      />
      <circle
        cx={r}
        cy={r}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth={1}
      />

      <g style={handStyle(acc1.current)}>
        <line
          x1={r}
          y1={r}
          x2={r}
          y2={r - handLen}
          stroke="var(--clock-hand)"
          strokeWidth={handWidth}
          strokeLinecap="butt"
        />
      </g>

      <g style={handStyle(acc2.current)}>
        <line
          x1={r}
          y1={r}
          x2={r}
          y2={r - handLen}
          stroke="var(--clock-hand)"
          strokeWidth={handWidth}
          strokeLinecap="butt"
        />
      </g>

      <circle cx={r} cy={r} r={handWidth / 2} style={{ fill: "var(--clock-hand)" }} />
    </svg>
  )
}

// ─── Time + choreography ──────────────────────────────────────────────────────

function getTimeDigits(format: "12h" | "24h", now: Date = new Date()): number[] {
  let h = now.getHours()
  const m = now.getMinutes()
  if (format === "12h") h = h % 12 || 12
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

export interface ClockClock24Props extends React.HTMLAttributes<HTMLDivElement> {
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
}

export function ClockClock24({
  mode = "active",
  format = "24h",
  size = 700,
  className,
  style,
  ...rest
}: ClockClock24Props) {
  const initialDigits = React.useMemo(() => getTimeDigits(format), [format])
  const [allAngles, setAllAngles] = React.useState<AllAngles>(() =>
    digitsToAngles(initialDigits)
  )

  const phaseRef = React.useRef<Phase>("time")
  const phaseStartRef = React.useRef<number>(Date.now())
  const scatterSeedRef = React.useRef<number>(1)
  const rafRef = React.useRef<number>(0)

  // Layout math: 4 digit columns × 2 clocks each = 8 columns + 7 inter-clock gaps.
  const gap = size * 0.022
  const clockSize = (size - gap * 7) / 8
  const paddingH = gap * 2
  const paddingV = gap * 2

  React.useEffect(() => {
    const tick = () => {
      if (mode === "quiet") {
        setAllAngles(digitsToAngles(getTimeDigits(format)))
        return
      }

      const now = Date.now()
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
        setAllAngles(digitsToAngles(getTimeDigits(format)))
      } else if (phase === "wave") {
        setAllAngles(waveAngles(t))
      } else if (phase === "spiral") {
        setAllAngles(spiralAngles(t))
      } else if (phase === "scatter") {
        setAllAngles(scatterAngles(scatterSeedRef.current + Math.floor(t / 1.5)))
      }
    }

    if (mode === "quiet") {
      tick()
      const interval = setInterval(tick, 5000)
      return () => clearInterval(interval)
    }

    let running = true
    // Restart cycle when mode flips so the new cycle starts cleanly.
    phaseRef.current = "time"
    phaseStartRef.current = Date.now()

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
  }, [mode, format])

  return (
    <div
      className={cn("inline-block", className)}
      style={{
        background: "var(--clock-panel)",
        borderRadius: size * 0.025,
        padding: `${paddingV}px ${paddingH}px`,
        boxShadow: "var(--clock-shadow)",
        transition: "background 0.5s ease, box-shadow 0.5s ease",
        ...style,
      }}
      role="img"
      aria-label={`Clock display, ${format} format, ${mode} mode`}
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

export default ClockClock24
