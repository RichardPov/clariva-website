'use client'

import { motion } from 'framer-motion'
import { Mail, CheckCircle2, Monitor, BarChart3, Settings2, Users, Rocket, Brain, FileText } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Service } from '@/lib/services-data'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BinaryDecoration from '@/components/BinaryDecoration'

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'application-development': Monitor,
  'data-and-ai': BarChart3,
  servicenow: Settings2,
  'team-extension': Users,
  'full-delivery-teams': Rocket,
  consulting: Brain,
  tenders: FileText,
}

export default function ServicePage({ service }: { service: Service }) {
  const tPage = useTranslations('ServicePage')
  const tServices = useTranslations('ServicePages')
  const serviceData = tServices.raw(service.slug) as {
    title: string
    tagline: string
    description: string
    usps: Array<{ title: string; description: string }>
  }

  const SlugIcon = SERVICE_ICONS[service.slug] ?? Monitor

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <BinaryDecoration className="top-[90px] right-0 hidden lg:block" side="right" />
      <section className="pt-[120px] pb-20 px-5 lg:px-10 max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">

          {/* Text */}
          <div className="flex-1">
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-6 h-[1.5px] bg-gold" />
              <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-gold/70">
                {tPage('serviceLabel')}
              </span>
            </motion.div>

            <motion.h1
              className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              {serviceData.title}
            </motion.h1>

            <motion.p
              className="font-syne text-gold/80 text-[17px] font-medium mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              {serviceData.tagline}
            </motion.p>

            <motion.p
              className="font-dm text-white/55 text-[16px] leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              {serviceData.description}
            </motion.p>
          </div>

          {/* Icon box — desktop only */}
          <motion.div
            className="hidden lg:flex flex-shrink-0 items-center justify-center w-[210px] h-[210px] rounded-[28px] relative overflow-hidden mt-6"
            style={{
              background: 'linear-gradient(135deg, rgba(255,202,102,0.09) 0%, rgba(171,111,0,0.04) 100%)',
              border: '1px solid rgba(255,202,102,0.18)',
            }}
            initial={{ opacity: 0, x: 28, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.175, 0.885, 0.32, 1.1] }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(255,202,102,0.14) 0%, transparent 65%)',
              }}
            />
            <SlugIcon
              size={82}
              className="relative z-10"
              style={{ color: 'rgba(255,202,102,0.72)', strokeWidth: 1.25 }}
            />
          </motion.div>
        </div>
      </section>
      </div>

      {/* USP cards */}
      <section className="pb-24 px-5 lg:px-10 max-w-5xl mx-auto">
        <motion.div
          className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-6 h-[1.5px] bg-white/20" />
          <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-white/30">
            {tPage('whyClarivaLabel')}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {serviceData.usps.map((usp, i) => (
            <motion.div
              key={usp.title}
              className="rounded-2xl p-6 lg:p-7 flex flex-col gap-4 group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{
                borderColor: 'rgba(255,202,102,0.22)',
                background: 'rgba(255,202,102,0.03)',
                transition: { duration: 0.2 },
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={15} className="text-gold" />
              </div>
              <h3 className="font-syne font-semibold text-white text-[15px] leading-snug">
                {usp.title}
              </h3>
              <p className="font-dm text-white/45 text-[13px] leading-relaxed">
                {usp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact person */}
      <section className="pb-28 px-5 lg:px-10 max-w-5xl mx-auto">
        <div
          className="rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,202,102,0.08) 0%, rgba(171,111,0,0.05) 100%)',
            border: '1px solid rgba(255,202,102,0.15)',
          }}
        >
          <div>
            <p className="font-dm text-[12px] font-semibold tracking-[0.16em] uppercase text-gold/60 mb-3">
              {tPage('contactPersonLabel')}
            </p>
            <p className="font-syne font-bold text-white text-[22px] mb-1">{service.contact.name}</p>
            <p className="font-dm text-white/45 text-[14px]">{service.contact.role}</p>
          </div>
          <a
            href={`mailto:${service.contact.email}`}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gold text-ink text-[13px] font-dm font-semibold rounded-full hover:brightness-110 transition-all duration-200 hover:scale-[1.02] flex-shrink-0"
          >
            <Mail size={14} />
            {service.contact.email}
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 px-5 lg:px-10 max-w-5xl mx-auto border-t border-white/5 pt-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-syne font-semibold text-white text-[18px] mb-1">
              {tPage('readyHeading')}
            </p>
            <p className="font-dm text-white/40 text-[14px]">
              {tPage('readyBody')}
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-gold/35 text-gold text-[13px] font-dm font-medium rounded-full hover:bg-gold/5 hover:border-gold/60 transition-all duration-200 flex-shrink-0"
          >
            {tPage('readyCta')}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
