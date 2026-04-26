'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

function Counter({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const t = useTranslations('Stats')
  const items = t.raw('items') as Array<{ value: number; suffix: string; label: string }>

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Atmospheric gold glow behind the whole section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,202,102,0.055) 0%, transparent 70%)',
        }}
      />
      {/* Top & bottom dividers */}
      <div className="absolute inset-x-0 top-0 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(255,202,102,0.12), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(255,202,102,0.12), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
        <motion.p
          className="text-center font-dm text-[11px] font-semibold tracking-[0.22em] uppercase text-gold/50 mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('label')}
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div
                className="font-syne font-bold text-[52px] lg:text-[64px] leading-none mb-3"
                style={{
                  background: 'linear-gradient(135deg, #FFCA66 0%, #AB6F00 60%, #FFCA66 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  paddingBottom: '0.1em',
                }}
              >
                <Counter target={item.value} suffix={item.suffix} />
              </div>
              <div className="w-8 h-[1px] bg-gold/25 mb-3" />
              <p className="font-dm text-white/45 text-[13px] leading-snug max-w-[120px]">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
