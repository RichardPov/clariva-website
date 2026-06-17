import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default async function DataProcessingPage() {
  const t = await getTranslations('DataProcessing')
  const storeItems = t.raw('storeItems') as string[]

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />

      <main className="pt-[120px] pb-28 px-5 lg:px-10 max-w-3xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-[1.5px] bg-gold" />
          <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-gold/70">
            {t('label')}
          </span>
        </div>

        <h1 className="font-syne font-bold text-4xl md:text-5xl text-white leading-[1.15] mb-4">
          {t('title')}
        </h1>
        <p className="font-syne text-gold/80 text-[17px] font-medium mb-12">
          {t('subtitle')}
        </p>

        <div className="space-y-6 font-dm text-white/60 text-[15px] leading-relaxed">
          <p>{t('intro')}</p>

          <p>
            {t('withdraw')}{' '}
            <a
              href="mailto:info@clariva.sk"
              className="text-gold/80 hover:text-gold transition-colors duration-200"
            >
              info@clariva.sk
            </a>
          </p>

          <div>
            <p className="mb-4">{t('storeIntro')}</p>
            <ul className="space-y-3 pl-0">
              {storeItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gold/50 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p>{t('temporary')}</p>
          <p>{t('sharing')}</p>
          <p>{t('clientResponsibility')}</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
