import { useRef } from 'react'

interface ClockFaceProps {
  hand1Angle: number
  hand2Angle: number
  size: number
  theme?: 'dark' | 'light'
}

function shortestRotation(from: number, to: number): number {
  let delta = ((to - from) % 360 + 360) % 360
  if (delta > 180) delta -= 360
  return from + delta
}

export default function ClockFace({ hand1Angle, hand2Angle, size, theme = 'dark' }: ClockFaceProps) {
  // Track accumulated rotation (unbounded) so CSS transitions always take the short path
  const acc1 = useRef<number>(hand1Angle)
  const acc2 = useRef<number>(hand2Angle)

  acc1.current = shortestRotation(acc1.current, hand1Angle)
  acc2.current = shortestRotation(acc2.current, hand2Angle)

  const r = size / 2
  const handWidth = size * 0.12 // Thicker hands like reference
  const handLen = r * 0.88

  const handStyle = (angle: number): React.CSSProperties => ({
    transformOrigin: `${r}px ${r}px`,
    transform: `rotate(${angle}deg)`,
    transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)', // Slower, smoother
  })

  const isLight = theme === 'light'
  const handColor = isLight ? '#222' : '#eee'
  const capColor = isLight ? '#111' : '#fff'
  
  // Unique IDs for gradients and filters
  const id = `cf-${size}-${Math.floor(Math.random() * 1000)}`

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Light mode inner shadow (recessed look) */}
        <filter id={`inset-shadow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="3" />
          <feOffset dx="2" dy="4" result="offsetblur" />
          <feFlood floodColor="rgba(0,0,0,0.2)" result="color" />
          <feComposite in2="offsetblur" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>

        <radialGradient id={`grad-dark-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>

        <linearGradient id={`hand-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stopColor={handColor} />
           <stop offset="100%" stopColor={handColor} />
        </linearGradient>
      </defs>

      {isLight ? (
        <>
          {/* Light Mode: Recessed Circle */}
          <circle 
            cx={r} cy={r} r={r} 
            fill="#f5f5f5" 
            filter={`url(#inset-shadow-${id})`}
          />
          {/* Subtle outer rim */}
          <circle 
            cx={r} cy={r} r={r} 
            fill="none" 
            stroke="rgba(255,255,255,0.8)" 
            strokeWidth="1" 
          />
        </>
      ) : (
        <>
          {/* Dark Mode: Sleek Deep Circle */}
          <circle cx={r} cy={r} r={r} fill={`url(#grad-dark-${id})`} />
          <circle cx={r} cy={r} r={r} fill="none" stroke="#222" strokeWidth="1" />
        </>
      )}

      {/* Hand 1 */}
      <g style={handStyle(acc1.current)}>
        <line
          x1={r} y1={r}
          x2={r} y2={r - handLen}
          stroke={handColor}
          strokeWidth={handWidth}
          strokeLinecap="butt" // Squared ends like reference
        />
      </g>

      {/* Hand 2 */}
      <g style={handStyle(acc2.current)}>
        <line
          x1={r} y1={r}
          x2={r} y2={r - handLen}
          stroke={handColor}
          strokeWidth={handWidth}
          strokeLinecap="butt"
        />
      </g>

      {/* Center cap - subtle */}
      <circle cx={r} cy={r} r={handWidth / 2} fill={handColor} />
    </svg>
  )
}

