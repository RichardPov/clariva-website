'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('About')
  const pillars = t.raw('pillars') as Array<{ title: string; body: string }>

  return (
    <section className="bg-ink py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Left: label */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 lg:pt-3">
              <div className="w-8 h-[2px] bg-gold/50" />
              <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-white/30">
                {t('label')}
              </span>
            </div>
          </motion.div>

          {/* Right: statement */}
          <div className="flex-1">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="font-syne font-semibold text-2xl md:text-3xl lg:text-[36px] text-white leading-[1.6]">
                {t('headlinePre')}{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFCA66, #AB6F00)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    paddingBottom: '0.12em',
                  }}
                >
                  {t('headlineGold')}
                </span>
              </p>
            </motion.div>

            <motion.p
              className="font-dm text-[16px] text-white/50 leading-relaxed max-w-[600px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.22 }}
            >
              {t('body')}
            </motion.p>

            {/* Pillars */}
            <motion.div
              className="mt-12 pt-12 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {pillars.map((item) => (
                <div key={item.title}>
                  <div className="font-syne font-semibold text-white text-[15px] mb-2">
                    {item.title}
                  </div>
                  <div className="font-dm text-white/45 text-[13px] leading-relaxed">
                    {item.body}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
