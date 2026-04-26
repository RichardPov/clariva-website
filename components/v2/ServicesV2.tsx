'use client'

import { motion } from 'framer-motion'
import { Monitor, BarChart3, Settings2, Users, Rocket, Brain, FileText, ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const SERVICE_ICONS = {
  'application-development': Monitor,
  'data-and-ai': BarChart3,
  servicenow: Settings2,
  'team-extension': Users,
  'full-delivery-teams': Rocket,
  consulting: Brain,
  tenders: FileText,
} as const

type ServiceSlug = keyof typeof SERVICE_ICONS

const SERVICE_SLUGS: ServiceSlug[] = [
  'application-development',
  'data-and-ai',
  'servicenow',
  'team-extension',
  'full-delivery-teams',
  'consulting',
  'tenders',
]

// Wide/featured card — horizontal layout with large icon
function FeaturedCard({
  slug, title, description, delay,
}: {
  slug: string; title: string; description: string; delay: number
}) {
  const Icon = SERVICE_ICONS[slug as ServiceSlug] ?? Monitor
  return (
    <Link href={`/services/${slug}` as '/'} className="block h-full">
      <motion.div
        className="h-full rounded-3xl p-8 lg:p-9 flex flex-row items-center gap-8 group cursor-pointer relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.028)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{
          borderColor: 'rgba(255,202,102,0.35)',
          y: -6,
          transition: { duration: 0.2 },
        }}
      >
        {/* Inner glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(ellipse 90% 100% at 15% 50%, rgba(255,202,102,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Box shadow via pseudo — done with a sibling div */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: '0 28px 70px rgba(255,202,102,0.12), 0 0 0 1px rgba(255,202,102,0.18)' }}
        />

        {/* Icon */}
        <div
          className="flex-shrink-0 w-[88px] h-[88px] rounded-2xl flex items-center justify-center relative z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,202,102,0.14) 0%, rgba(171,111,0,0.07) 100%)',
            border: '1px solid rgba(255,202,102,0.25)',
            boxShadow: '0 0 36px rgba(255,202,102,0.12)',
          }}
        >
          <Icon size={38} style={{ color: 'rgba(255,202,102,0.82)', strokeWidth: 1.2 }} />
        </div>

        {/* Text */}
        <div className="relative z-10 flex-1">
          <h3 className="font-syne font-bold text-white text-[21px] mb-3 leading-tight">{title}</h3>
          <p className="font-dm text-white/50 text-[14px] leading-relaxed">{description}</p>
          <div className="mt-5 flex items-center gap-1.5 text-gold/0 group-hover:text-gold/60 transition-colors duration-300 text-[12px] font-dm font-medium">
            Learn more <ArrowUpRight size={13} />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// Regular card — centered icon + centered text
function ServiceCard({
  slug, title, description, delay,
}: {
  slug: string; title: string; description: string; delay: number
}) {
  const Icon = SERVICE_ICONS[slug as ServiceSlug] ?? Monitor
  return (
    <Link href={`/services/${slug}` as '/'} className="block h-full">
      <motion.div
        className="h-full rounded-3xl p-7 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden min-h-[220px]"
        style={{
          background: 'rgba(255,255,255,0.028)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{
          borderColor: 'rgba(255,202,102,0.35)',
          y: -6,
          transition: { duration: 0.2 },
        }}
      >
        {/* Hover top glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,202,102,0.09) 0%, transparent 70%)',
          }}
        />
        {/* Box shadow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: '0 28px 70px rgba(255,202,102,0.12), 0 0 0 1px rgba(255,202,102,0.18)' }}
        />

        {/* Icon */}
        <div className="mt-3 mb-6 relative z-10">
          <div
            className="w-[76px] h-[76px] rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,202,102,0.12) 0%, rgba(171,111,0,0.05) 100%)',
              border: '1px solid rgba(255,202,102,0.2)',
            }}
          >
            <Icon size={30} style={{ color: 'rgba(255,202,102,0.82)', strokeWidth: 1.25 }} />
          </div>
        </div>

        <h3 className="font-syne font-bold text-white text-[17px] mb-3 leading-tight relative z-10">
          {title}
        </h3>
        <p className="font-dm text-white/45 text-[13px] leading-relaxed flex-1 relative z-10">
          {description}
        </p>
        <ArrowUpRight
          size={15}
          className="mt-4 text-gold/0 group-hover:text-gold/55 transition-colors duration-300 relative z-10"
        />
      </motion.div>
    </Link>
  )
}

export default function ServicesV2() {
  const t = useTranslations('Services')

  const serviceCards = SERVICE_SLUGS.map((slug) => {
    const item = t.raw(`items.${slug}`) as { title: string; description: string; bullets: string[] }
    return { slug, ...item }
  })

  const notSure = t.raw('notSure') as { heading: string; body: string; button: string }

  return (
    <section id="services" className="bg-ink py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-6 h-[1.5px] bg-gold" />
            <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-gold/70">
              {t('label')}
            </span>
          </motion.div>
          <motion.h2
            className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-[1.35]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('heading')}
          </motion.h2>
          <motion.p
            className="font-dm text-white/45 text-[15px] max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('subtext')}
          </motion.p>
        </div>

        {/* Bento grid — 4 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-auto">

          {/* Row 1: Featured AppDev (2col) + DataAI + ServiceNow */}
          <div className="lg:col-span-2">
            <FeaturedCard {...serviceCards[0]} delay={0} />
          </div>
          <div className="lg:col-span-1">
            <ServiceCard {...serviceCards[1]} delay={0.08} />
          </div>
          <div className="lg:col-span-1">
            <ServiceCard {...serviceCards[2]} delay={0.16} />
          </div>

          {/* Row 2: TeamExt + FullDel + Featured Consulting (2col) */}
          <div className="lg:col-span-1">
            <ServiceCard {...serviceCards[3]} delay={0.22} />
          </div>
          <div className="lg:col-span-1">
            <ServiceCard {...serviceCards[4]} delay={0.28} />
          </div>
          <div className="lg:col-span-2">
            <FeaturedCard {...serviceCards[5]} delay={0.34} />
          </div>

          {/* Row 3: Tenders (2col) + Not Sure CTA (2col) */}
          <div className="lg:col-span-2">
            <ServiceCard {...serviceCards[6]} delay={0.4} />
          </div>

          <motion.div
            className="lg:col-span-2 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,202,102,0.13) 0%, rgba(171,111,0,0.09) 100%)',
              border: '1px solid rgba(255,202,102,0.24)',
            }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.46 }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, #FFCA66, transparent)',
                transform: 'translate(35%, -35%)',
              }}
            />
            <div className="relative z-10">
              <div className="font-syne font-bold text-2xl lg:text-[26px] text-white mb-3">
                {notSure.heading}
              </div>
              <p className="font-dm text-white/55 text-[14px] leading-relaxed">{notSure.body}</p>
            </div>
            <Link
              href="/#contact"
              className="mt-8 self-start inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink text-[13px] font-dm font-semibold rounded-full hover:brightness-110 transition-all duration-200 hover:scale-[1.02] relative z-10"
            >
              {notSure.button} <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
