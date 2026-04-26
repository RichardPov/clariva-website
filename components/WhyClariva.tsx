'use client'

import { motion } from 'framer-motion'
import { Eye, Lock, Globe, TrendingUp, HeartHandshake } from 'lucide-react'
import { useTranslations } from 'next-intl'

const PILLAR_ICONS = [Eye, Lock, Globe, TrendingUp, HeartHandshake]

export default function WhyClariva() {
  const t = useTranslations('WhyClariva')
  const painPoints = t.raw('painPoints') as string[]
  const pillars = t.raw('pillars') as Array<{ title: string; body: string }>

  return (
    <section id="why-clariva" className="bg-cream py-24 lg:py-32">
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
            <div className="w-6 h-[1.5px] bg-gold-dark" />
            <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-ink/40">
              {t('label')}
            </span>
          </motion.div>
          <motion.h2
            className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.35]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('heading')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: pain points */}
          <div>
            <motion.p
              className="font-dm text-ink/50 text-[15px] mb-6 italic"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {t('intro')}
            </motion.p>

            <div className="space-y-4 mb-10">
              {painPoints.map((point, i) => (
                <motion.div
                  key={point}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                >
                  <div
                    className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #FFCA66, #AB6F00)' }}
                  >
                    <span className="text-ink text-[9px] font-bold">✓</span>
                  </div>
                  <p className="font-syne font-semibold text-ink text-[17px] leading-snug">{point}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="font-syne font-bold text-[20px] text-ink leading-tight pl-9 border-l-2 border-gold-dark"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {t('quoteLine1')}
              <br />
              <span className="text-gradient-gold">{t('quoteLine2')}</span>
            </motion.p>
          </div>

          {/* Right: value pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map(({ title, body }, i) => {
              const Icon = PILLAR_ICONS[i]
              return (
                <motion.div
                  key={title}
                  className={`p-5 rounded-2xl border border-ink/8 bg-white shadow-sm hover:shadow-md hover:border-gold-dark/20 transition-all duration-250 ${
                    i === 4 ? 'sm:col-span-2' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-gold-dark" />
                  </div>
                  <h3 className="font-syne font-semibold text-ink text-[14px] mb-1.5">{title}</h3>
                  <p className="font-dm text-ink/50 text-[13px] leading-relaxed">{body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
