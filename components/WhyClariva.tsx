'use client'

import { motion } from 'framer-motion'
import { UserCheck, Handshake, Users, Scaling, HeartHandshake, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

const PILLAR_ICONS = [UserCheck, Handshake, Users, Scaling, HeartHandshake, ShieldCheck]

export default function WhyClariva() {
  const t = useTranslations('WhyClariva')
  const body = (t.raw('body') as string).split('\n\n').filter(Boolean)
  const pillars = t.raw('pillars') as Array<{ title: string; body: string }>

  return (
    <section id="why-clariva" className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
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
            className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.2] mb-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('heading')}
          </motion.h2>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            {body.map((p, i) => (
              <p key={i} className="font-dm text-ink/55 text-[15px] leading-relaxed">
                {p}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map(({ title, body }, i) => {
            const Icon = PILLAR_ICONS[i] ?? UserCheck
            return (
              <motion.div
                key={title}
                className="p-6 rounded-2xl border border-ink/8 bg-white shadow-sm hover:shadow-md hover:border-gold-dark/20 transition-all duration-250"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-gold-dark" />
                </div>
                <h3 className="font-syne font-semibold text-ink text-[15px] mb-2">{title}</h3>
                <p className="font-dm text-ink/50 text-[13px] leading-relaxed">{body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
