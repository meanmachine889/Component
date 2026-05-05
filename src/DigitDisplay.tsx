import ClockFace from './ClockFace'

// [hand1, hand2] angles in degrees for each digit
// Positions: TL, TR, ML, MR, BL, BR
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


interface DigitDisplayProps {
  digit: number
  clockSize: number
  // Override angles for choreography
  angles?: [number, number][]
}

export default function DigitDisplay({ digit, clockSize, angles }: DigitDisplayProps) {
  const baseAngles = DIGIT_ANGLES[digit] ?? DIGIT_ANGLES[0]
  const resolvedAngles = angles ?? baseAngles

  const gap = clockSize * 0.12

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `${clockSize}px ${clockSize}px`,
        gridTemplateRows: `${clockSize}px ${clockSize}px ${clockSize}px`,
        gap: `${gap}px`,
      }}
    >
      {resolvedAngles.map(([h1, h2], i) => (
        <ClockFace key={i} hand1Angle={h1} hand2Angle={h2} size={clockSize} />
      ))}
    </div>
  )
}

export { DIGIT_ANGLES }
