'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import BinaryDecoration from '@/components/BinaryDecoration'

export default function HowWeWork() {
  const t = useTranslations('HowWeWork')
  const steps = t.raw('steps') as Array<{ num: string; title: string; desc: string }>
  const guarantees = t.raw('guarantees') as string[]

  return (
    <section id="how-we-work" className="bg-ink py-24 lg:py-32 relative overflow-hidden">
      <BinaryDecoration className="top-6 right-0 hidden lg:block" />
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left: intro */}
          <div className="lg:w-[38%] flex-shrink-0">
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-6 h-[1.5px] bg-gold/60" />
              <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-gold/60">
                {t('label')}
              </span>
            </motion.div>

            <motion.h2
              className="font-syne font-bold text-3xl md:text-4xl lg:text-[42px] text-white leading-[1.35] mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('heading')}
            </motion.h2>

            <motion.p
              className="font-dm text-white/45 text-[15px] leading-relaxed mb-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('subtext')}
            </motion.p>

            {/* Guarantees */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="font-dm text-[11px] font-semibold tracking-[0.16em] uppercase text-white/25 mb-1">
                {t('guaranteesLabel')}
              </p>
              {guarantees.map((g) => (
                <div key={g} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-gold/60 flex-shrink-0" />
                  <span className="font-dm text-[13px] text-white/55">{g}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: timeline */}
          <div className="flex-1 relative">
            <motion.div
              className="absolute left-[19px] top-2 w-[1px] origin-top"
              style={{ background: 'linear-gradient(to bottom, rgba(255,202,102,0.5), rgba(255,202,102,0.08))' }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
            >
              <div style={{ height: `${steps.length * 100 - 20}px` }} />
            </motion.div>

            <div
              className="absolute left-[19px] top-2 w-[1px]"
              style={{ background: 'rgba(255,255,255,0.06)', height: `${steps.length * 100 - 20}px` }}
            />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex gap-7 pb-10 last:pb-0"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="flex-shrink-0 w-10 flex justify-center pt-[5px] relative z-10">
                  <div
                    className="w-[10px] h-[10px] rounded-full border border-gold/50"
                    style={{ background: 'rgba(255,202,102,0.12)', boxShadow: '0 0 8px rgba(255,202,102,0.2)' }}
                  />
                </div>

                <div className="flex-1 pb-2">
                  <span className="font-dm text-[10px] font-semibold tracking-[0.2em] text-gold/40 uppercase mb-1.5 block">
                    {step.num}
                  </span>
                  <h3 className="font-syne font-bold text-white text-[18px] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-dm text-white/45 text-[14px] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
