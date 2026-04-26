'use client'

import { motion } from 'framer-motion'
import { Monitor, BarChart3, Settings2, Users, Rocket, Brain, FileText, ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import BinaryDecoration from '@/components/BinaryDecoration'

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

function ServiceCard({
  slug,
  title,
  description,
  bullets,
  delay,
}: {
  slug: string
  title: string
  description: string
  bullets: string[]
  delay: number
}) {
  const Icon = SERVICE_ICONS[slug as ServiceSlug] ?? Monitor
  return (
    <Link href={`/services/${slug}` as '/'} className="block h-full">
      <motion.div
        className="card-dark-hover rounded-2xl p-6 flex flex-col group cursor-pointer h-full"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
            <Icon size={18} className="text-gold" />
          </div>
          <ArrowUpRight
            size={16}
            className="text-white/20 group-hover:text-gold/60 transition-colors duration-300 mt-1"
          />
        </div>
        <h3 className="font-syne font-semibold text-white text-[16px] mb-3 leading-tight">
          {title}
        </h3>
        <p className="font-dm text-white/50 text-[13px] leading-relaxed mb-4 flex-1">
          {description}
        </p>
        {bullets.length > 0 && (
          <ul className="space-y-1.5 mt-auto">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-[12px] font-dm text-white/35">
                <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </Link>
  )
}

export default function Services() {
  const t = useTranslations('Services')

  const serviceCards = SERVICE_SLUGS.map((slug) => {
    const item = t.raw(`items.${slug}`) as {
      title: string
      description: string
      bullets: string[]
    }
    return { slug, ...item }
  })

  const notSure = t.raw('notSure') as {
    heading: string
    body: string
    button: string
  }

  return (
    <section id="services" className="bg-ink py-24 lg:py-32 relative overflow-hidden">
      <BinaryDecoration className="top-4 right-0 hidden lg:block" />
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="mb-14">
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

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          <div className="lg:col-span-2 lg:row-span-1">
            <ServiceCard {...serviceCards[0]} delay={0} />
          </div>
          <div className="lg:col-span-1">
            <ServiceCard {...serviceCards[1]} delay={0.08} />
          </div>
          <div className="lg:col-span-1">
            <ServiceCard {...serviceCards[2]} delay={0.16} />
          </div>

          <div className="lg:col-span-1">
            <ServiceCard {...serviceCards[3]} delay={0.22} />
          </div>
          <div className="lg:col-span-1">
            <ServiceCard {...serviceCards[4]} delay={0.28} />
          </div>
          <div className="lg:col-span-2">
            <ServiceCard {...serviceCards[5]} delay={0.34} />
          </div>

          <div className="lg:col-span-2">
            <ServiceCard {...serviceCards[6]} delay={0.4} />
          </div>
          <motion.div
            className="lg:col-span-2 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,202,102,0.12) 0%, rgba(171,111,0,0.08) 100%)',
              border: '1px solid rgba(255,202,102,0.2)',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.46 }}
          >
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #FFCA66, transparent)', transform: 'translate(30%, -30%)' }}
            />
            <div>
              <div className="font-syne font-bold text-2xl text-white mb-3">
                {notSure.heading}
              </div>
              <p className="font-dm text-white/55 text-[14px] leading-relaxed">
                {notSure.body}
              </p>
            </div>
            <Link
              href="/#contact"
              className="mt-8 self-start inline-flex items-center gap-2 px-6 py-3 bg-gold text-ink text-[13px] font-dm font-semibold rounded-full hover:brightness-110 transition-all duration-200 hover:scale-[1.02]"
            >
              {notSure.button} <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
