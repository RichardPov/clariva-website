import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BinaryDecoration from '@/components/BinaryDecoration'
import { Link } from '@/i18n/navigation'

export default async function NotFound() {
  const t = await getTranslations('NotFound')

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col">
      <Navbar />

      <main className="relative flex-1 flex items-center justify-center overflow-hidden px-5">
        {/* Background grid + glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.10]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage:
              'radial-gradient(ellipse 60% 60% at 50% 45%, transparent 0%, black 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 60% at 50% 45%, transparent 0%, black 80%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,202,102,0.10) 0%, transparent 65%)',
          }}
        />
        <BinaryDecoration className="top-10 right-0 hidden lg:block" side="right" />
        <BinaryDecoration className="bottom-10 left-0 hidden lg:block" side="left" />

        <div className="relative z-10 text-center max-w-xl py-28">
          <p className="font-syne font-bold text-[120px] sm:text-[160px] leading-none text-gradient-gold glow-gold mb-2">
            404
          </p>
          <h1 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-4">
            {t('heading')}
          </h1>
          <p className="font-dm text-white/45 text-[15px] leading-relaxed max-w-md mx-auto mb-9">
            {t('body')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink text-[14px] font-dm font-semibold rounded-full hover:brightness-110 transition-all duration-200 hover:gap-3 hover:scale-[1.02]"
            >
              {t('home')}
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/open-positions"
              className="text-white/40 hover:text-white text-[14px] font-dm transition-colors duration-200"
            >
              {t('positions')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
