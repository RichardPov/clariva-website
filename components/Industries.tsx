'use client'

import { motion } from 'framer-motion'
import { Car, Landmark, Zap, FlaskConical, Factory, Tv, Gamepad2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import BinaryDecoration from '@/components/BinaryDecoration'

const INDUSTRY_ICONS = [Car, Landmark, Zap, FlaskConical, Factory, Tv, Gamepad2]

function IndustryPill({
  label,
  Icon,
  delay,
}: {
  label: string
  Icon: React.ElementType
  delay: number
}) {
  return (
    <motion.div
      className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        background: 'rgba(255,202,102,0.06)',
        borderColor: 'rgba(255,202,102,0.25)',
        y: -3,
        transition: { duration: 0.2 },
      }}
    >
      <div className="w-8 h-8 rounded-lg bg-gold/[0.08] flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-gold/70 group-hover:text-gold transition-colors duration-200" />
      </div>
      <span className="font-dm text-white/60 text-[14px] font-medium group-hover:text-white/90 transition-colors duration-200">
        {label}
      </span>
    </motion.div>
  )
}

export default function Industries() {
  const t = useTranslations('Industries')
  const items = t.raw('items') as string[]
  const row1 = items.slice(0, 4)
  const row2 = items.slice(4)

  return (
    <section id="industries" className="bg-ink-2 border-t border-white/[0.04] py-24 lg:py-32 relative overflow-hidden">
      <BinaryDecoration className="top-6 right-0 hidden lg:block" side="right" />
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
        </div>

        {/* Row 1: 4 items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-3 lg:mb-4">
          {row1.map((label, i) => (
            <IndustryPill key={label} label={label} Icon={INDUSTRY_ICONS[i]} delay={i * 0.08} />
          ))}
        </div>

        {/* Row 2: 3 items */}
        <div className="grid grid-cols-2 md:flex md:justify-center gap-3 lg:gap-4">
          {row2.map((label, i) => (
            <IndustryPill
              key={label}
              label={label}
              Icon={INDUSTRY_ICONS[4 + i]}
              delay={0.32 + i * 0.08}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center font-dm text-white/25 text-[13px] mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {t('notePrefix')}{' '}
          <Link href="/#contact" className="text-gold/60 hover:text-gold transition-colors">
            {t('noteLink')}
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
