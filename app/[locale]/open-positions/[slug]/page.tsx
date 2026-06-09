import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import {
  Building2,
  MapPin,
  Euro,
  Clock,
  UserRound,
  Pencil,
  CalendarDays,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BinaryDecoration from '@/components/BinaryDecoration'
import SectionRender, { sectionHasContent } from '@/components/careers/SectionRender'
import CvDialog from '@/components/careers/CvDialog'
import { Link } from '@/i18n/navigation'
import { getPositionBySlug } from '@/lib/db/positions'
import type { Section } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function PositionDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const t = await getTranslations('Careers')

  const position = await getPositionBySlug(params.slug).catch(() => undefined)
  if (!position || position.status !== 'published') notFound()

  const date = new Date(position.createdAt).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const bodySections: Array<{ label: string; section: Section }> = [
    { label: t('responsibilities'), section: position.responsibilities },
    { label: t('requirements'), section: position.requirements },
    { label: t('languageRequirements'), section: position.languageRequirements },
    { label: t('benefits'), section: position.benefits },
  ].filter((s) => sectionHasContent(s.section))

  const meta = [
    { icon: Building2, label: t('meta.workLocation'), value: position.placeOfWork },
    { icon: MapPin, label: t('meta.city'), value: position.city },
    { icon: Euro, label: t('meta.reward'), value: position.reward },
    { icon: Clock, label: t('meta.allocationDuration'), value: position.allocationDuration },
    { icon: UserRound, label: t('meta.seniority'), value: position.seniority },
    { icon: Pencil, label: t('meta.collaborationType'), value: position.typeOfCooperation },
    { icon: CalendarDays, label: t('meta.startDate'), value: position.startDate },
  ].filter((m) => m.value)

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <BinaryDecoration className="top-[90px] right-0 hidden lg:block" side="right" />
        <section className="pt-[130px] pb-16 px-5 lg:px-10 max-w-5xl mx-auto relative z-10 text-center">
          <Link
            href="/open-positions"
            className="font-dm text-[13px] text-white/40 hover:text-white transition-colors"
          >
            ← {t('backToList')}
          </Link>
          <h1 className="font-syne font-bold text-4xl md:text-5xl text-white leading-[1.12] mt-6 mb-5">
            {position.title}
          </h1>
          {position.summary && (
            <p className="font-dm text-white/55 text-[16px] leading-relaxed max-w-[620px] mx-auto">
              {position.summary}
            </p>
          )}
          <p className="font-dm text-white/30 text-[13px] mt-6">
            {t('datePosted')}: {date}
          </p>
        </section>
      </div>

      {/* Body + sidebar */}
      <section className="pb-28 px-5 lg:px-10 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Body */}
          <div className="flex-1 space-y-10 order-2 lg:order-1">
            {bodySections.map(({ label, section }) => (
              <div key={label}>
                <h2 className="font-syne font-bold text-white text-[22px] mb-5">
                  {label}
                </h2>
                <SectionRender section={section} />
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[320px] flex-shrink-0 order-1 lg:order-2">
            <div
              className="rounded-2xl p-7 lg:sticky lg:top-24"
              style={{
                background: 'rgba(255,202,102,0.05)',
                border: '1px solid rgba(255,202,102,0.16)',
              }}
            >
              <div className="space-y-5 mb-7">
                {meta.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-gold/80" />
                    </div>
                    <div>
                      <p className="font-dm text-[11px] font-semibold tracking-[0.12em] uppercase text-white/35">
                        {label}
                      </p>
                      <p className="font-dm text-white/80 text-[14px] mt-0.5">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {position.filled ? (
                <div className="rounded-full bg-white/10 text-white/50 text-[13px] font-dm font-semibold text-center py-3.5 px-6">
                  {t('positionFilled')}
                </div>
              ) : (
                <CvDialog
                  positionId={position.id}
                  positionTitle={position.title}
                />
              )}
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  )
}
