'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function FAQ() {
  const t = useTranslations('FAQ')
  const items = t.raw('items') as Array<{ q: string; a: string }>
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-cream py-24 lg:py-32 border-t border-ink/[0.06]">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-6 h-[1.5px] bg-gold-dark" />
            <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-ink/40">
              {t('label')}
            </span>
            <div className="w-6 h-[1.5px] bg-gold-dark" />
          </motion.div>
          <motion.h2
            className="font-syne font-bold text-3xl md:text-4xl lg:text-[44px] text-ink mb-3 leading-[1.35]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('heading')}
          </motion.h2>
          <motion.p
            className="font-dm text-ink/45 text-[15px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('subtext')}
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {items.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-ink/10 bg-white overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-ink/[0.02] transition-colors duration-150"
              >
                <span className="font-syne font-semibold text-ink text-[15px] leading-snug">
                  {faq.q}
                </span>
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{
                    background: open === i
                      ? 'linear-gradient(135deg, #FFCA66, #AB6F00)'
                      : 'rgba(0,0,0,0.05)',
                  }}
                >
                  {open === i ? (
                    <Minus size={13} className="text-ink" />
                  ) : (
                    <Plus size={13} className="text-ink/50" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 font-dm text-ink/55 text-[14px] leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
