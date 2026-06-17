'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import PositionCard from '@/components/careers/PositionCard'
import BinaryDecoration from '@/components/BinaryDecoration'
import type { Position } from '@/lib/db/schema'

export default function Positions() {
  const t = useTranslations('Positions')
  const [rows, setRows] = useState<Position[] | null>(null)

  useEffect(() => {
    fetch('/api/positions?limit=3', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : []))
      .then(setRows)
      .catch(() => setRows([]))
  }, [])

  // Render nothing until we know there's at least one position.
  if (!rows || rows.length === 0) return null

  return (
    <section
      id="open-positions"
      className="bg-ink-2 border-t border-white/[0.04] py-24 lg:py-32 relative overflow-hidden"
    >
      <BinaryDecoration className="top-6 left-0 hidden lg:block" side="left" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-6 h-[1.5px] bg-gold" />
            <span className="font-dm text-[12px] font-semibold tracking-[0.18em] uppercase text-gold/70">
              {t('label')}
            </span>
            <div className="w-6 h-[1.5px] bg-gold" />
          </motion.div>
          <motion.h2
            className="font-syne font-bold text-3xl md:text-4xl lg:text-[44px] text-white leading-[1.35]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('heading')}
          </motion.h2>
          <motion.p
            className="font-dm text-white/45 text-[15px] leading-relaxed max-w-[560px] mx-auto mt-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            {t('subtext')}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rows.map((p, i) => (
            <PositionCard
              key={p.id}
              position={p}
              highlight={i === 1}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-12 pt-10 border-t border-white/[0.05]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-dm text-white/45 text-[14px] text-center sm:text-left max-w-md">
            {t('ctaNote')}
          </p>
          <Link
            href="/open-positions"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink text-[14px] font-dm font-semibold rounded-full hover:brightness-110 transition-all duration-200 hover:gap-3 hover:scale-[1.02] flex-shrink-0"
          >
            {t('viewAll')}
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
