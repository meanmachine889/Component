import { useState, useEffect, useCallback, useRef } from 'react'
import { DIGIT_ANGLES } from './DigitDisplay'
import ClockFace from './ClockFace'

export interface ClockClock24Props {
  mode?: 'active' | 'medium' | 'quiet'
  use24Hour?: boolean
  size?: number
  className?: string
  theme?: 'dark' | 'light'
}

// 4 digits × 6 clocks each = 24 clocks total
// Each digit is a 2×3 grid: [TL, TR, ML, MR, BL, BR]

type AllAngles = [number, number][][] // [digitIndex][clockIndex]

function getTimeDigits(use24Hour: boolean): number[] {
  const now = new Date()
  let h = now.getHours()
  const m = now.getMinutes()
  if (!use24Hour) h = h % 12 || 12
  const hh = String(h).padStart(2, '0')
  const mm = String(m).padStart(2, '0')
  return [+hh[0], +hh[1], +mm[0], +mm[1]]
}

function digitsToAngles(digits: number[]): AllAngles {
  return digits.map(d => DIGIT_ANGLES[d] ?? DIGIT_ANGLES[0])
}

// ── Choreography helpers ──────────────────────────────────────────────────────

// Grid positions for each of the 4 digit columns × 6 clocks:
// digit column 0-3, clock within digit 0-5 (TL,TR,ML,MR,BL,BR)
function digitClockToGrid(digitIdx: number, clockIdx: number): { col: number; row: number } {
  // Each digit occupies 2 columns in a 8-col grid (4 digits × 2 cols)
  const col = digitIdx * 2 + (clockIdx % 2)     // 0-7
  const row = Math.floor(clockIdx / 2)           // 0-2
  return { col, row }
}

function waveAngles(t: number): AllAngles {
  // Sine wave ripples left→right
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
  const cx = 3.5 // center col (0-7)
  const cy = 1   // center row (0-2)
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
  // deterministic pseudo-random from seed
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

// ── Main component ────────────────────────────────────────────────────────────

type Phase = 'time' | 'wave' | 'spiral' | 'scatter'

const ACTIVE_CYCLE: Phase[] = ['wave', 'spiral', 'scatter', 'time']
const MEDIUM_CYCLE: Phase[] = ['wave', 'spiral', 'time']

export default function ClockClock24({
  mode = 'active',
  use24Hour = true,
  size = 700,
  className,
  theme = 'dark',
}: ClockClock24Props) {
  const digits = getTimeDigits(use24Hour)
  const timeAngles = digitsToAngles(digits)

  const [allAngles, setAllAngles] = useState<AllAngles>(timeAngles)
  const phaseRef = useRef<Phase>('time')
  const phaseStartRef = useRef<number>(Date.now())
  const scatterSeedRef = useRef<number>(1)
  const rafRef = useRef<number>(0)

  // Layout math
  const gap = size * 0.022
  const clockSize = (size - gap * 7) / 8  // 4 digits × 2 clocks, 7 gaps between
  const paddingH = gap * 2
  const paddingV = gap * 2

  const tick = useCallback(() => {
    if (mode === 'quiet') {
      const d = getTimeDigits(use24Hour)
      setAllAngles(digitsToAngles(d))
      return
    }

    const now = Date.now()
    const elapsed = (now - phaseStartRef.current) / 1000
    const cycle = mode === 'active' ? ACTIVE_CYCLE : MEDIUM_CYCLE

    const phaseDurations: Record<Phase, number> = {
      time: 3,
      wave: mode === 'active' ? 8 : 12,
      spiral: mode === 'active' ? 8 : 12,
      scatter: 8,
    }

    const duration = phaseDurations[phaseRef.current]

    if (elapsed >= duration) {
      // Advance phase
      const currentIdx = cycle.indexOf(phaseRef.current)
      const nextPhase = cycle[(currentIdx + 1) % cycle.length]
      phaseRef.current = nextPhase
      phaseStartRef.current = now
      if (nextPhase === 'scatter') scatterSeedRef.current = Math.random() * 1000
    }

    const t = elapsed
    const phase = phaseRef.current

    if (phase === 'time') {
      const d = getTimeDigits(use24Hour)
      setAllAngles(digitsToAngles(d))
    } else if (phase === 'wave') {
      setAllAngles(waveAngles(t))
    } else if (phase === 'spiral') {
      setAllAngles(spiralAngles(t))
    } else if (phase === 'scatter') {
      setAllAngles(scatterAngles(scatterSeedRef.current + Math.floor(t / 1.5)))
    }
  }, [mode, use24Hour])

  useEffect(() => {
    if (mode === 'quiet') {
      tick()
      const interval = setInterval(tick, 5000)
      return () => clearInterval(interval)
    }

    let running = true
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
  }, [mode, tick])

  return (
    <div
      className={className}
      style={{
        display: 'inline-block',
        background: 'var(--panel-bg)',
        borderRadius: size * 0.025,
        padding: `${paddingV}px ${paddingH}px`,
        boxShadow: theme === 'dark' 
          ? '0 20px 60px rgba(0,0,0,0.8)' 
          : '0 20px 60px rgba(0,0,0,0.1)',
        transition: 'all 0.5s ease',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(4, ${clockSize * 2 + gap}px)`,
          gap: `${gap * 1.5}px`,
        }}
      >
        {allAngles.map((digitAngles, di) => (
          <div
            key={di}
            style={{
              display: 'grid',
              gridTemplateColumns: `${clockSize}px ${clockSize}px`,
              gridTemplateRows: `${clockSize}px ${clockSize}px ${clockSize}px`,
              gap: `${gap}px`,
            }}
          >
            {digitAngles.map(([h1, h2], ci) => (
              <ClockFace key={ci} hand1Angle={h1} hand2Angle={h2} size={clockSize} theme={theme} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

