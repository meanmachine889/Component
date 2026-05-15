"use client"

import { useCallback, useRef, useState } from "react"

export type KeycapProps = {
  /** Outer width/height in pixels. */
  size?: number
  /** Top-face color of the keycap. */
  color?: string
  /** Pixel face color. */
  faceColor?: string
  /** Disable the synthesized click sound. */
  muted?: boolean
}

type Face = string[]

// 13 cols × 11 rows pixel grids. "X" = pixel on.
const FACES: Face[] = [
  // 0 — Dead (X X eyes + frown). Matches the keycap in the brief.
  [
    ".............",
    ".X...X.X...X.",
    "..X.X...X.X..",
    "...X.....X...",
    "..X.X...X.X..",
    ".X...X.X...X.",
    ".............",
    ".X.........X.",
    "..XX.....XX..",
    "....XXXXX....",
    ".............",
  ],
  // 1 — Happy (^ ^ eyes + smile).
  [
    ".............",
    ".............",
    "..XX.....XX..",
    ".X..X...X..X.",
    "X....X.X....X",
    ".............",
    "....XXXXX....",
    "..XX.....XX..",
    ".X.........X.",
    ".............",
    ".............",
  ],
  // 2 — Surprised (O O eyes + open O mouth).
  [
    ".............",
    "..XX.....XX..",
    ".X..X...X..X.",
    ".X..X...X..X.",
    "..XX.....XX..",
    ".............",
    ".............",
    "....XXXXX....",
    "...X.....X...",
    "...X.....X...",
    "....XXXXX....",
  ],
  // 3 — Angry (\ /, gritted teeth).
  [
    ".............",
    "X...X...X...X",
    ".X.X.....X.X.",
    "..X.......X..",
    ".............",
    ".............",
    "..XXXXXXXXX..",
    "..X.X.X.X.X..",
    "..XXXXXXXXX..",
    ".............",
    ".............",
  ],
  // 4 — Wink (— • + smirk).
  [
    ".............",
    ".............",
    ".XXXXX...XX..",
    "........X..X.",
    "........X..X.",
    ".........XX..",
    ".............",
    "...XXXXX.....",
    "..X..........",
    ".X...........",
    ".............",
  ],
  // 5 — Confused (o O + crooked).
  [
    ".............",
    "..XX.....XX..",
    ".X..X...X..X.",
    ".X..X...X..X.",
    "..XX.....XX..",
    ".............",
    ".............",
    ".....XXXXX...",
    "....X........",
    "...X.........",
    "..XXX........",
  ],
  // 6 — Sleepy (— — + small mouth).
  [
    ".............",
    ".............",
    ".............",
    ".XXXX...XXXX.",
    ".............",
    ".............",
    ".............",
    "....XXXXX....",
    ".............",
    ".............",
    ".............",
  ],
  // 7 — Stoked (> < + huge grin).
  [
    ".............",
    "X..X.....X..X",
    ".XX.......XX.",
    ".XX.......XX.",
    "X..X.....X..X",
    ".............",
    "..XXXXXXXXX..",
    "..X.......X..",
    "..XXXXXXXXX..",
    ".............",
    ".............",
  ],
]

function shade(hex: string, amt: number): string {
  const c = hex.replace("#", "")
  const full = c.length === 3 ? c.split("").map((x) => x + x).join("") : c
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  const adj = (v: number) =>
    amt >= 0 ? Math.round(v + (255 - v) * amt) : Math.round(v * (1 + amt))
  const toHex = (v: number) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")
  return `#${toHex(adj(r))}${toHex(adj(g))}${toHex(adj(b))}`
}

function playThock(ctxRef: { current: AudioContext | null }) {
  try {
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctxRef.current = new AC()
    }
    const ctx = ctxRef.current
    if (!ctx) return
    if (ctx.state === "suspended") void ctx.resume()
    const now = ctx.currentTime

    // Master compressor for punch
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -18
    comp.ratio.value = 4
    comp.attack.value = 0.002
    comp.release.value = 0.12
    comp.connect(ctx.destination)

    // Low "thock" body — deep sine with quick pitch drop
    const bodyOsc = ctx.createOscillator()
    const bodyGain = ctx.createGain()
    bodyOsc.type = "sine"
    const base = 95 + Math.random() * 25
    bodyOsc.frequency.setValueAtTime(base * 2.4, now)
    bodyOsc.frequency.exponentialRampToValueAtTime(base, now + 0.07)
    bodyGain.gain.setValueAtTime(0.0001, now)
    bodyGain.gain.exponentialRampToValueAtTime(0.5, now + 0.004)
    bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)
    bodyOsc.connect(bodyGain).connect(comp)
    bodyOsc.start(now)
    bodyOsc.stop(now + 0.32)

    // Sub layer for weight
    const subOsc = ctx.createOscillator()
    const subGain = ctx.createGain()
    subOsc.type = "sine"
    subOsc.frequency.setValueAtTime(base * 0.5, now)
    subGain.gain.setValueAtTime(0.0001, now)
    subGain.gain.exponentialRampToValueAtTime(0.35, now + 0.006)
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
    subOsc.connect(subGain).connect(comp)
    subOsc.start(now)
    subOsc.stop(now + 0.22)

    // Wooden mid-body resonance
    const woodOsc = ctx.createOscillator()
    const woodGain = ctx.createGain()
    woodOsc.type = "triangle"
    woodOsc.frequency.setValueAtTime(420 + Math.random() * 40, now)
    woodOsc.frequency.exponentialRampToValueAtTime(280, now + 0.05)
    woodGain.gain.setValueAtTime(0.0001, now)
    woodGain.gain.exponentialRampToValueAtTime(0.18, now + 0.003)
    woodGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
    woodOsc.connect(woodGain).connect(comp)
    woodOsc.start(now)
    woodOsc.stop(now + 0.12)

    // Tactile click transient — short filtered noise
    const bufSize = Math.floor(ctx.sampleRate * 0.025)
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 2)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buf
    const bp = ctx.createBiquadFilter()
    bp.type = "bandpass"
    bp.frequency.value = 2200
    bp.Q.value = 0.9
    const nGain = ctx.createGain()
    nGain.gain.setValueAtTime(0.28, now)
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
    noise.connect(bp).connect(nGain).connect(comp)
    noise.start(now)
  } catch {
    // audio context can fail on some browsers/permissions — silent
  }
}

function PixelFace({ grid, color, width }: { grid: Face; color: string; width: number }) {
  const cols = grid[0].length
  const rows = grid.length
  const height = (width * rows) / cols
  const pixel = width / cols
  const off = Math.max(1, pixel * 0.1)
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${cols} ${rows}`}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        shapeRendering: "crispEdges",
        pointerEvents: "none",
        filter: [
          `drop-shadow(-${off}px -${off}px 0 rgba(0,0,0,0.10))`,
          `drop-shadow(${off}px ${off}px 0 rgba(255,255,255,0.45))`,
        ].join(" "),
      }}
    >
      {grid.map((row, y) =>
        [...row].map((ch, x) =>
          ch === "X" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={color} />
          ) : null,
        ),
      )}
    </svg>
  )
}

export function Keycap({
  size = 280,
  color = "#ef6a1f",
  faceColor = "#ffffff",
  muted = false,
}: KeycapProps) {
  const [pressed, setPressed] = useState(false)
  const [faceIdx, setFaceIdx] = useState(0)
  const audioRef = useRef<AudioContext | null>(null)
  const pressedAtRef = useRef<number>(0)
  const releaseTimerRef = useRef<number | null>(null)

  const depth = Math.max(7, Math.round(size * 0.05))
  const radius = Math.round(size * 0.18)

  const mid = color
  const innerLight = shade(color, 0.14)
  const innerDark = shade(color, -0.08)

  const MIN_HOLD_MS = 110

  const press = useCallback(() => {
    if (releaseTimerRef.current !== null) {
      window.clearTimeout(releaseTimerRef.current)
      releaseTimerRef.current = null
    }
    setPressed(true)
    pressedAtRef.current = performance.now()
    setFaceIdx((prev) => {
      if (FACES.length <= 1) return prev
      let next = prev
      while (next === prev) next = Math.floor(Math.random() * FACES.length)
      return next
    })
    if (!muted) playThock(audioRef)
  }, [muted])

  const release = useCallback(() => {
    const elapsed = performance.now() - pressedAtRef.current
    const wait = Math.max(0, MIN_HOLD_MS - elapsed)
    if (releaseTimerRef.current !== null) window.clearTimeout(releaseTimerRef.current)
    releaseTimerRef.current = window.setTimeout(() => {
      setPressed(false)
      releaseTimerRef.current = null
    }, wait)
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === " " || e.key === "Enter") && !pressed) {
      e.preventDefault()
      press()
    }
  }
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      release()
    }
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Ambient ground shadow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: size * 0.05,
          right: size * 0.05,
          bottom: -size * 0.04,
          height: size * 0.12,
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.32), rgba(0,0,0,0) 70%)",
          filter: `blur(${pressed ? size * 0.012 : size * 0.022}px)`,
          opacity: pressed ? 0.5 : 0.85,
          transition: "all 180ms cubic-bezier(.34,1.56,.64,1)",
          pointerEvents: "none",
        }}
      />

      {/* Keycap top face — the only surface. */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={pressed}
        aria-label="Keycap"
        onMouseDown={press}
        onMouseUp={release}
        onMouseLeave={() => pressed && release()}
        onTouchStart={(e) => {
          e.preventDefault()
          press()
        }}
        onTouchEnd={(e) => {
          e.preventDefault()
          release()
        }}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background: `radial-gradient(120% 90% at 35% 25%, ${innerLight} 0%, ${mid} 55%, ${innerDark} 100%)`,
          boxShadow: pressed
            ? `inset 0 2px 5px rgba(0,0,0,0.28),
               inset 0 -1px 2px rgba(0,0,0,0.12),
               0 1px 1px rgba(0,0,0,0.12)`
            : `inset 0 1px 0 rgba(255,255,255,0.32),
               inset 0 -3px 8px rgba(0,0,0,0.15),
               0 ${depth}px ${Math.round(depth * 2.2)}px rgba(0,0,0,0.28),
               0 1px 0 ${shade(color, -0.22)}`,
          transform: pressed
            ? `translateY(${depth}px) scale(0.975)`
            : "translateY(0) scale(1)",
          transition: pressed
            ? "transform 85ms cubic-bezier(.22,.61,.36,1), box-shadow 85ms ease-out"
            : "transform 280ms cubic-bezier(.34,1.55,.5,1), box-shadow 200ms ease-out",
          cursor: "pointer",
          touchAction: "none",
          outline: "none",
          overflow: "hidden",
        }}
      >
        {/* soft diffuse top highlight */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(80% 55% at 50% -5%, rgba(255,255,255,0.22), rgba(255,255,255,0) 65%)",
            pointerEvents: "none",
          }}
        />

        <PixelFace grid={FACES[faceIdx]} color={faceColor} width={size * 0.66} />
      </div>
    </div>
  )
}
