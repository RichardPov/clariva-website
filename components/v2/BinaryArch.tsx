'use client'

const NUM_COLS = 46
const NUM_ROWS = 24

// Deterministic binary columns — no randomness to avoid SSR/hydration mismatch
const COLS = Array.from({ length: NUM_COLS }, (_, c) =>
  Array.from({ length: NUM_ROWS }, (_, r) =>
    ((c * 31 + r * 17 + (c + r) * 7) % 3 === 0) ? '1' : '0'
  ).join('\n')
)

export default function BinaryArch({ variant = 'up' }: { variant?: 'up' | 'down' }) {
  return (
    <div
      className="relative w-full pointer-events-none select-none bg-ink"
      style={{ height: '210px', overflow: 'hidden' }}
      aria-hidden
    >
      <div className="absolute inset-0 flex">
        {COLS.map((col, i) => {
          const t = i / (NUM_COLS - 1) // 0..1
          // Parabolic arch: center tallest (up) or center lowest (down)
          const h = variant === 'up'
            ? (1 - 4 * Math.pow(t - 0.5, 2)) * 0.78 + 0.22
            : 4 * Math.pow(t - 0.5, 2) * 0.78 + 0.22

          // Columns near center are brighter (simulates 3D depth)
          const depth = 1 - Math.abs(t - 0.5) * 1.6
          const opacity = (0.045 + depth * 0.075).toFixed(3)

          return (
            <div
              key={i}
              className="flex-1 overflow-hidden"
              style={{
                height: `${h * 100}%`,
                alignSelf: variant === 'up' ? 'flex-end' : 'flex-start',
              }}
            >
              <pre
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: '10px',
                  lineHeight: '1.82',
                  fontFamily: 'monospace',
                  color: `rgba(255,202,102,${opacity})`,
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {col}
              </pre>
            </div>
          )
        })}
      </div>

      {/* Side fades */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, #0A0A0B 0%, transparent 12%, transparent 88%, #0A0A0B 100%)',
        }}
      />

      {/* Center atmospheric glow at the arch peak */}
      <div
        className="absolute inset-0"
        style={{
          background: variant === 'up'
            ? 'radial-gradient(ellipse 50% 55% at 50% 100%, rgba(255,202,102,0.09) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 50% 55% at 50% 0%, rgba(255,202,102,0.09) 0%, transparent 70%)',
        }}
      />

      {/* Thin gold line at apex edge */}
      <div
        className="absolute left-[10%] right-[10%]"
        style={{
          [variant === 'up' ? 'bottom' : 'top']: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255,202,102,0.18) 30%, rgba(255,202,102,0.18) 70%, transparent)',
        }}
      />
    </div>
  )
}
