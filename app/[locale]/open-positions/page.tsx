import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BinaryDecoration from '@/components/BinaryDecoration'
import PositionsExplorer from '@/components/careers/PositionsExplorer'

export default async function OpenPositionsPage() {
  const t = await getTranslations('Careers')

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <BinaryDecoration className="top-[90px] right-0 hidden lg:block" side="right" />
        <section className="pt-[130px] pb-12 px-5 lg:px-10 max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-6 h-[1.5px] bg-gold" />
            <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-gold/70">
              {t('label')}
            </span>
            <div className="w-6 h-[1.5px] bg-gold" />
          </div>
          <h1 className="font-syne font-bold text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.1] mb-5">
            {t('heading')}
          </h1>
          <p className="font-dm text-white/45 text-[16px] leading-relaxed max-w-[600px] mx-auto">
            {t('subtext')}
          </p>
        </section>
      </div>

      {/* Explorer (fetches positions client-side so listings stay fresh) */}
      <section className="pb-28 px-5 lg:px-10 max-w-7xl mx-auto">
        <PositionsExplorer />
      </section>

      <Footer />
    </div>
  )
}
