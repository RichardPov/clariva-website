'use client'

import { motion } from 'framer-motion'
import { Gauge, Layers, Workflow, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import BinaryDecoration from '@/components/BinaryDecoration'

const OUTCOME_ICONS = [Gauge, Layers, Workflow, ShieldCheck, Sparkles]

export default function RealImpact() {
  const t = useTranslations('RealImpact')
  const outcomes = t.raw('outcomes') as Array<{ title: string; body: string }>
  const cases = t.raw('cases') as Array<{ title: string; body: string }>

  return (
    <section className="bg-ink py-24 lg:py-32 relative overflow-hidden">
      <BinaryDecoration className="top-6 right-0 hidden lg:block" side="right" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-14">
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
            className="font-syne font-bold text-3xl md:text-4xl lg:text-[44px] text-white leading-[1.2] mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('heading')}
          </motion.h2>
          <motion.p
            className="font-dm text-white/45 text-[15px] leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            {t('intro')}
          </motion.p>
        </div>

        {/* Outcomes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {outcomes.map((o, i) => {
            const Icon = OUTCOME_ICONS[i] ?? Gauge
            return (
              <motion.div
                key={o.title}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-gold/80" />
                </div>
                <h3 className="font-syne font-semibold text-white text-[16px] mb-2">{o.title}</h3>
                <p className="font-dm text-white/45 text-[13px] leading-relaxed">{o.body}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Case studies */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-6 h-[1.5px] bg-white/20" />
          <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-white/30">
            {t('caseLabel')}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              className="rounded-2xl p-7 group"
              style={{
                background: 'linear-gradient(135deg, rgba(255,202,102,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,202,102,0.12)',
              }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-syne font-bold text-white text-[18px] leading-snug">
                  {c.title}
                </h3>
                <ArrowUpRight
                  size={18}
                  className="text-gold/50 flex-shrink-0 group-hover:text-gold transition-colors"
                />
              </div>
              <p className="font-dm text-white/45 text-[14px] leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
