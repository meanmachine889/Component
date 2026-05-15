"use client"

import { useEffect, useState } from "react"

export type LedClockProps = {
  /** Outer width in pixels. */
  size?: number
  /** Time format. */
  format?: "12h" | "24h"
  /** Whether to render the date / day-of-week side panel. */
  showDate?: boolean
  /** IANA timezone name (e.g. "America/New_York"). Omit for viewer's local time. */
  timeZone?: string
}

function getZonedDate(timeZone?: string): Date {
  if (!timeZone) return new Date()
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      weekday: "short",
    }).formatToParts(new Date())
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0"
    const date = new Date()
    date.setFullYear(parseInt(get("year")), parseInt(get("month")) - 1, parseInt(get("day")))
    date.setHours(parseInt(get("hour")) % 24, parseInt(get("minute")), parseInt(get("second")), 0)
    // store day index via weekday name
    const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
    ;(date as Date & { _zonedDay?: number })._zonedDay = dayMap[get("weekday")] ?? date.getDay()
    return date
  } catch {
    return new Date()
  }
}

const ACTIVE = "#bcd9f5"
const DIM = "rgba(188, 217, 245, 0.11)"
const PANEL_BG = "#000000"
const FRAME_BG = "#f4efe5"
const FRAME_BORDER = "#dcd5c6"
const LABEL_COLOR = "#cdd6e3"
const DIVIDER = "rgba(188, 217, 245, 0.18)"

type Segment = "a" | "b" | "c" | "d" | "e" | "f" | "g"

const SEGMENT_POINTS: Record<Segment, string> = {
  a: "10,2 50,2 54,6 50,10 10,10 6,6",
  b: "50,14 54,10 58,14 58,42 54,46 50,42",
  c: "50,58 54,54 58,58 58,86 54,90 50,86",
  d: "10,90 50,90 54,94 50,98 10,98 6,94",
  e: "2,58 6,54 10,58 10,86 6,90 2,86",
  f: "2,14 6,10 10,14 10,42 6,46 2,42",
  g: "10,46 50,46 54,50 50,54 10,54 6,50",
}

const ALL_SEGMENTS: Segment[] = ["a", "b", "c", "d", "e", "f", "g"]

// 7-segment glyph table. Letters use the standard alarm-clock conventions
// (some end up looking like lowercase, which is how real LED clocks display them).
const SEGMENT_MAP: Record<string, Segment[]> = {
  "0": ["a", "b", "c", "d", "e", "f"],
  "1": ["b", "c"],
  "2": ["a", "b", "d", "e", "g"],
  "3": ["a", "b", "c", "d", "g"],
  "4": ["b", "c", "f", "g"],
  "5": ["a", "c", "d", "f", "g"],
  "6": ["a", "c", "d", "e", "f", "g"],
  "7": ["a", "b", "c"],
  "8": ["a", "b", "c", "d", "e", "f", "g"],
  "9": ["a", "b", "c", "d", "f", "g"],
  A: ["a", "b", "c", "e", "f", "g"],
  D: ["b", "c", "d", "e", "g"],
  E: ["a", "d", "e", "f", "g"],
  F: ["a", "e", "f", "g"],
  H: ["b", "c", "e", "f", "g"],
  I: ["b", "c"],
  M: ["a", "b", "c", "e", "f"],
  N: ["c", "e", "g"],
  O: ["a", "b", "c", "d", "e", "f"],
  R: ["e", "g"],
  S: ["a", "c", "d", "f", "g"],
  T: ["d", "e", "f", "g"],
  U: ["b", "c", "d", "e", "f"],
  W: ["b", "c", "d", "e", "f"],
  " ": [],
  "-": ["g"],
}

function Digit({ char, height }: { char: string; height: number }) {
  const active = new Set<Segment>(SEGMENT_MAP[char.toUpperCase()] ?? [])
  const width = height * 0.6
  return (
    <svg viewBox="0 0 60 100" width={width} height={height} style={{ display: "block" }}>
      {ALL_SEGMENTS.map((s) => (
        <polygon
          key={s}
          points={SEGMENT_POINTS[s]}
          fill={active.has(s) ? ACTIVE : DIM}
        />
      ))}
    </svg>
  )
}

function Colon({ on, height }: { on: boolean; height: number }) {
  const dotR = Math.max(2, height * 0.045)
  const width = dotR * 3
  return (
    <svg
      viewBox="0 0 12 100"
      width={width}
      height={height}
      style={{ display: "block" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="6" cy="36" r="4.5" fill={on ? ACTIVE : DIM} />
      <circle cx="6" cy="64" r="4.5" fill={on ? ACTIVE : DIM} />
    </svg>
  )
}

function DigitGroup({ text, height, gap }: { text: string; height: number; gap: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap }}>
      {text.split("").map((c, i) => (
        <Digit key={i} char={c} height={height} />
      ))}
    </div>
  )
}

// Inject the Orbitron Google Font on first mount so the component works
// drop-in without requiring the consumer to add the stylesheet themselves.
// Deduped across instances; safe to call multiple times. Silently no-ops on
// SSR (no document) and tolerates blocked requests (CSP, offline) by falling
// back to the component's system-ui font stack.
const ORBITRON_HREF =
  "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"

function useOrbitronFont() {
  useEffect(() => {
    if (typeof document === "undefined") return
    if (document.querySelector(`link[data-led-clock-font="orbitron"]`)) return

    const preconnect1 = document.createElement("link")
    preconnect1.rel = "preconnect"
    preconnect1.href = "https://fonts.googleapis.com"
    preconnect1.setAttribute("data-led-clock-font", "orbitron")

    const preconnect2 = document.createElement("link")
    preconnect2.rel = "preconnect"
    preconnect2.href = "https://fonts.gstatic.com"
    preconnect2.crossOrigin = "anonymous"
    preconnect2.setAttribute("data-led-clock-font", "orbitron")

    const stylesheet = document.createElement("link")
    stylesheet.rel = "stylesheet"
    stylesheet.href = ORBITRON_HREF
    stylesheet.setAttribute("data-led-clock-font", "orbitron")

    document.head.appendChild(preconnect1)
    document.head.appendChild(preconnect2)
    document.head.appendChild(stylesheet)
    // Intentionally no cleanup: other LedClock instances on the page may rely
    // on the font, and removing/re-adding causes a flash on remount.
  }, [])
}

export function LedClock({ size = 600, format = "24h", showDate = true, timeZone }: LedClockProps) {
  useOrbitronFont()

  const [now, setNow] = useState(() => getZonedDate(timeZone))
  const [colonOn, setColonOn] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setNow(getZonedDate(timeZone))
      setColonOn((c) => !c)
    }, 500)
    return () => clearInterval(id)
  }, [timeZone])

  const hours24 = now.getHours()
  const hours = format === "12h" ? ((hours24 + 11) % 12) + 1 : hours24
  const hh = String(hours).padStart(2, "0")
  const mm = String(now.getMinutes()).padStart(2, "0")
  const month = now.getMonth() + 1
  const date = now.getDate()
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const zonedDay = (now as Date & { _zonedDay?: number })._zonedDay ?? now.getDay()
  const dayName = dayNames[zonedDay]

  const aspectRatio = 2.55
  const height = size / aspectRatio
  const framePad = size * 0.028
  const innerPad = size * 0.026
  const mainDigitH = height * 0.58

  // ── Side-panel sizing budget ────────────────────────────────────────────
  // The side panel sits inside the inner black panel; its content area is
  // bounded both horizontally (a fraction of the inner panel width) and
  // vertically (the full inner panel height, minus the divider between the
  // month/date section and the day section).
  const contentW = Math.max(0, size - 2 * framePad - 2 * innerPad)
  const contentH = Math.max(0, height - 2 * framePad - 2 * innerPad)
  const sidePanelInnerW = Math.max(0, contentW * 0.36 - 2 * innerPad * 0.6)
  // Divider between the two sections: 1px line + symmetric labelSize-based
  // vertical margin. labelSize is recomputed below so we use a provisional
  // value here; the divider's contribution is ~labelSize total + 1px.
  // We solve via the width-based cap first, then re-derive sectionH.

  // Horizontal cap for the label: "MONTH | DATE" + separators + letterspacing.
  const labelSizeFromWidth = sidePanelInnerW / 8.2
  // Proportional cap based on the clock height.
  const labelSizeFromHeight = height * 0.055
  const labelSize = Math.min(labelSizeFromHeight, labelSizeFromWidth)

  // Each section gets roughly (sidePanelH - dividerTotal) / 2.
  // dividerTotal = 1px line + 2 * (labelSize * 0.4) margin = 1 + 0.8 * labelSize
  // (margin coefficient lowered from 0.5 to 0.4 to give content more room.)
  const dividerMargin = labelSize * 0.4
  const dividerTotal = 1 + 2 * dividerMargin
  const sectionH = Math.max(0, (contentH - dividerTotal) / 2)

  // Each section's content stack: label line-box + intra-section gap + digit line-box.
  // With explicit lineHeight: 1 on all side-panel text (set inline below) the
  // rendered heights are ~labelSize and ~sideDigitH, but Orbitron's intrinsic
  // metrics still let glyphs extend a few percent past the em-box, so we keep
  // a small safety factor (1.1) on the digit line.
  const sectionGap = labelSize * 0.5
  const sideDigitFromSection = Math.max(0, (sectionH - labelSize - sectionGap) / 1.1)

  // Date digits ("12/31") also need to fit inside sidePanelInnerW.
  const sideDigitFromWidth = sidePanelInnerW / 3.4
  const sideDigitFromHeight = height * 0.16
  const sideDigitH = Math.min(sideDigitFromHeight, sideDigitFromWidth, sideDigitFromSection)

  return (
    <div
      style={{
        width: size,
        height,
        background: FRAME_BG,
        border: `1px solid ${FRAME_BORDER}`,
        borderRadius: size * 0.035,
        padding: framePad,
        boxSizing: "border-box",
        boxShadow:
          "0 10px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
        fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: PANEL_BG,
          borderRadius: size * 0.022,
          padding: innerPad,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "stretch",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.7)",
          overflow: "hidden",
        }}
      >
        {/* Main time */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: size * 0.01,
          }}
        >
          <DigitGroup text={hh} height={mainDigitH} gap={size * 0.012} />
          <Colon on={colonOn} height={mainDigitH} />
          <DigitGroup text={mm} height={mainDigitH} gap={size * 0.012} />
        </div>

        {showDate && (
          <>
            <div
              style={{
                width: 1,
                alignSelf: "stretch",
                background: DIVIDER,
                margin: `${innerPad * 0.4}px ${innerPad}px`,
              }}
            />

            <div
              style={{
                width: "36%",
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                padding: `0 ${innerPad * 0.6}px`,
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {/* Month / Date */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: sectionGap,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: labelSize * 0.7,
                    color: LABEL_COLOR,
                    fontSize: labelSize,
                    letterSpacing: labelSize * 0.04,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                  }}
                >
                  <span>MONTH</span>
                  <div style={{ width: 1, height: labelSize * 0.9, background: DIVIDER }} />
                  <span>DATE</span>
                </div>
                <div
                  style={{
                    fontFamily: "'Orbitron', system-ui, sans-serif",
                    color: ACTIVE,
                    fontSize: sideDigitH,
                    fontWeight: 700,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "baseline",
                  }}
                >
                  <span>{month}</span>
                  <span
                    style={{
                      fontWeight: 400,
                      margin: `0 ${sideDigitH * 0.08}px`,
                      opacity: 0.85,
                    }}
                  >
                    /
                  </span>
                  <span>{date}</span>
                </div>
              </div>

              <div
                style={{
                  height: 1,
                  background: DIVIDER,
                  margin: `${dividerMargin}px 0`,
                  flexShrink: 0,
                }}
              />

              {/* Day */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: sectionGap,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    color: LABEL_COLOR,
                    fontSize: labelSize,
                    letterSpacing: labelSize * 0.05,
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  DAY
                </div>
                <span
                  style={{
                    fontFamily: "'Orbitron', system-ui, sans-serif",
                    color: ACTIVE,
                    fontSize: sideDigitH,
                    fontWeight: 700,
                    letterSpacing: sideDigitH * 0.05,
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {dayName}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
