// Fallback 404 for paths outside the locale tree (no i18n context here).
export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-ink text-white flex items-center justify-center px-5">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,202,102,0.10) 0%, transparent 65%)',
        }}
      />
      <div className="relative z-10 text-center">
        <p className="font-syne font-bold text-[120px] sm:text-[160px] leading-none text-gradient-gold glow-gold mb-2">
          404
        </p>
        <h1 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">
          This page took a wrong turn.
        </h1>
        <p className="font-dm text-white/45 text-[15px] leading-relaxed max-w-md mx-auto mb-9">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or never
          existed.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink text-[14px] font-dm font-semibold rounded-full hover:brightness-110 transition-all duration-200"
        >
          Back to homepage
        </a>
      </div>
    </div>
  )
}
