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
]

export default function BinaryDecoration({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      aria-hidden
      style={{
        maskImage:
          'radial-gradient(ellipse 85% 85% at 55% 45%, black 0%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 85% 85% at 55% 45%, black 0%, transparent 75%)',
      }}
    >
      <pre
        className="font-mono"
        style={{
          fontSize: '12px',
          lineHeight: '2.1',
          letterSpacing: '0.18em',
          color: 'rgba(255, 202, 102, 0.055)',
        }}
      >
        {ROWS.join('\n')}
      </pre>
    </div>
  )
}
