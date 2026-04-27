const ROWS = [
  '1 0 1 1 0 0 1 0 1 1 0 1 0 0 1 1 0 1 0 0 1 0 1 1 0 1',
  '0 1 0 0 1 1 0 1 0 0 1 0 1 1 0 0 1 0 1 1 0 1 0 0 1 0',
  '1 1 0 1 0 0 1 1 0 1 0 0 1 1 0 1 0 1 0 0 1 1 0 1 0 0',
  '0 0 1 0 1 1 0 0 1 0 1 1 0 0 1 0 1 0 1 1 0 0 1 0 1 1',
  '1 0 0 1 0 1 1 0 0 1 1 0 1 0 0 1 0 1 0 0 1 0 1 1 0 1',
  '0 1 1 0 1 0 0 1 1 0 0 1 0 1 1 0 1 0 1 1 0 1 0 0 1 0',
  '1 0 1 0 0 1 1 0 1 1 0 0 1 0 1 1 0 1 0 1 1 0 0 1 0 1',
  '0 1 0 1 1 0 0 1 0 0 1 1 0 1 0 0 1 0 1 0 0 1 1 0 1 0',
  '1 1 0 0 1 0 1 1 0 1 0 1 1 0 0 1 0 0 1 1 0 1 0 1 0 0',
  '0 0 1 1 0 1 0 0 1 0 1 0 0 1 1 0 1 1 0 0 1 0 1 0 1 1',
  '1 0 0 1 1 0 1 0 0 1 0 0 1 0 1 1 0 1 0 0 1 1 0 1 0 1',
  '0 1 1 0 0 1 0 1 1 0 1 1 0 1 0 0 1 0 1 1 0 0 1 0 1 0',
  '1 0 1 1 0 0 1 0 1 0 0 1 0 1 1 0 1 0 0 1 1 0 1 0 0 1',
  '0 1 0 0 1 1 0 1 0 1 1 0 1 0 0 1 0 1 1 0 0 1 0 1 1 0',
  '1 1 0 1 0 1 0 0 1 1 0 1 0 0 1 0 1 1 0 1 0 0 1 1 0 1',
  '0 0 1 0 1 0 1 1 0 0 1 0 1 1 0 1 0 0 1 0 1 1 0 0 1 0',
]

export default function BinaryDecoration({
  className = '',
  side = 'right',
}: {
  className?: string
  side?: 'left' | 'right'
}) {
  // Mask center: right-side decoration fades inward from the right edge,
  // left-side fades inward from the left edge.
  const maskCenter = side === 'right' ? '62% 45%' : '38% 45%'

  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      aria-hidden
      style={{
        maskImage: `radial-gradient(ellipse 90% 90% at ${maskCenter}, black 0%, transparent 72%)`,
        WebkitMaskImage: `radial-gradient(ellipse 90% 90% at ${maskCenter}, black 0%, transparent 72%)`,
      }}
    >
      <pre
        className="font-mono"
        style={{
          fontSize: '12px',
          lineHeight: '2.1',
          letterSpacing: '0.18em',
          color: 'rgba(255, 202, 102, 0.38)',
        }}
      >
        {ROWS.join('\n')}
      </pre>
    </div>
  )
}
