'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Building2, Home } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Position } from '@/lib/db/schema'

function PlaceIcon({ place }: { place: string }) {
  if (place === 'Remote') return <Home size={13} className="text-gold/70" />
  if (place === 'Hybrid') return <MapPin size={13} className="text-gold/70" />
  return <Building2 size={13} className="text-gold/70" />
}

export default function PositionCard({
  position,
  highlight = false,
  delay = 0,
}: {
  position: Position
  highlight?: boolean
  delay?: number
}) {
  const t = useTranslations('Careers')
  const filled = position.filled
  const date = new Date(position.createdAt).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-syne font-bold text-white text-[19px] leading-snug">
          {position.title}
        </h3>
        {filled && (
          <span className="flex-shrink-0 rounded-full bg-white/10 text-white/50 text-[10px] font-dm font-semibold uppercase tracking-wider px-2.5 py-1">
            {t('filledBadge')}
          </span>
        )}
      </div>
      <p className="font-dm text-[12px] text-gold/55 mb-4">{date}</p>

      {position.summary && (
        <p className="font-dm text-white/45 text-[14px] leading-relaxed mb-5 line-clamp-3 flex-1">
          {position.summary}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
        <div className="flex items-center gap-4 text-[12px] text-white/45">
          {position.placeOfWork && (
            <span className="inline-flex items-center gap-1.5">
              <PlaceIcon place={position.placeOfWork} />
              {position.placeOfWork}
            </span>
          )}
          {position.city && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} className="text-gold/70" />
              {position.city}
            </span>
          )}
        </div>
      </div>

      {filled ? (
        <div className="mt-5 inline-flex items-center gap-2 text-[13px] font-dm font-semibold text-white/35">
          {t('positionFilled')}
        </div>
      ) : (
        <div className="mt-5 inline-flex items-center gap-2 text-[13px] font-dm font-semibold text-gold group-hover:gap-3 transition-all duration-200">
          {t('viewDetail')}
          <ArrowRight size={14} />
        </div>
      )}
    </>
  )

  const baseStyle = highlight
    ? {
        background: 'rgba(255,202,102,0.06)',
        border: '1px solid rgba(255,202,102,0.28)',
      }
    : {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {filled ? (
        <div
          className="flex h-full flex-col rounded-2xl p-6 opacity-50 grayscale cursor-not-allowed select-none"
          style={baseStyle}
          aria-disabled
        >
          {inner}
        </div>
      ) : (
        <Link
          href={`/open-positions/${position.slug}`}
          className="group flex h-full flex-col rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5"
          style={baseStyle}
        >
          {inner}
        </Link>
      )}
    </motion.div>
  )
}
