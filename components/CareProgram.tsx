'use client'

import { motion } from 'framer-motion'
import { Handshake, RefreshCcw, Lightbulb } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const PILLAR_ICONS = [Handshake, RefreshCcw, Lightbulb]

export default function CareProgram() {
  const t = useTranslations('CareProgram')
  const pillars = t.raw('pillars') as Array<{ title: string; body: string }>

  return (
    <section className="bg-ink py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left: copy */}
          <div className="lg:w-[42%] flex-shrink-0">
            <motion.div
              className="flex items-center gap-3 mb-5"
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
              className="font-syne font-bold text-3xl md:text-4xl lg:text-[42px] text-white leading-[1.35] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('heading')}
            </motion.h2>

            <motion.p
              className="font-syne text-gold/80 text-[16px] mb-6 font-medium"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              {t('tagline')}
            </motion.p>

            <motion.p
              className="font-dm text-white/50 text-[15px] leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.26 }}
            >
              {t('body1')}
            </motion.p>

            <motion.p
              className="font-dm text-white/35 text-[14px] leading-relaxed mt-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.34 }}
            >
              {t('body2')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Link
                href="/#contact"
                className="mt-10 inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-gold text-[13px] font-dm font-medium rounded-full hover:bg-gold/5 hover:border-gold/60 transition-all duration-200"
              >
                {t('cta')}
              </Link>
            </motion.div>
          </div>

          {/* Right: stacked cards */}
          <div className="flex-1 flex flex-col gap-4 relative">
            <div
              className="absolute -top-10 -left-10 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,202,102,0.05), transparent)' }}
            />

            {pillars.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx]
              const delay = 0.1 + idx * 0.12
              return (
                <motion.div
                  key={pillar.title}
                  className="rounded-2xl p-6 lg:p-7 flex items-start gap-5 group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.6,
                    delay,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    borderColor: 'rgba(255,202,102,0.22)',
                    background: 'rgba(255,202,102,0.03)',
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gold/15 transition-colors duration-200">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-syne font-semibold text-white text-[15px] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="font-dm text-white/45 text-[13px] leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
