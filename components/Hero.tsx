'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Monitor, BarChart3, Settings2, Rocket } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const MotionLink = motion(Link)

const CARD_META = [
  { icon: Monitor, key: 'appDev', href: '/services/application-development' },
  { icon: BarChart3, key: 'dataAi', href: '/services/data-and-ai' },
  { icon: Settings2, key: 'serviceNow', href: '/services/servicenow' },
  { icon: Rocket, key: 'fullDelivery', href: '/services/full-delivery-teams' },
] as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const OUTER_RINGS = [
  { wf: 0.90, hf: 0.27, angle: 0,   speed: 14, opacity: 0.38 },
  { wf: 0.90, hf: 0.27, angle: 36,  speed: 19, opacity: 0.30 },
  { wf: 0.90, hf: 0.27, angle: 72,  speed: 11, opacity: 0.38 },
  { wf: 0.90, hf: 0.27, angle: 108, speed: 23, opacity: 0.26 },
  { wf: 0.90, hf: 0.27, angle: 144, speed: 16, opacity: 0.34 },
]
const INNER_RINGS = [
  { wf: 0.55, hf: 0.19, angle: 20, speed: 8,  opacity: 0.60 },
  { wf: 0.55, hf: 0.19, angle: 80, speed: 13, opacity: 0.50 },
  { wf: 0.46, hf: 0.15, angle: 50, speed: 6,  opacity: 0.65 },
]

function EnergyOrb({ size = 220 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
      <div
        className="absolute pointer-events-none"
        style={{
          width: size * 1.6,
          height: size * 1.6,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,202,102,0.16) 0%, rgba(255,202,102,0.05) 42%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />
      {OUTER_RINGS.map((r, i) => {
        const w = size * r.wf
        const h = size * r.hf
        return (
          <motion.div
            key={`o${i}`}
            className="absolute"
            style={{
              width: w, height: h,
              top: '50%', left: '50%',
              marginTop: -h / 2, marginLeft: -w / 2,
              borderRadius: '50%',
              border: `1px solid rgba(255,202,102,${r.opacity})`,
            }}
            initial={{ rotate: r.angle }}
            animate={{ rotate: r.angle + 360 }}
            transition={{ duration: r.speed, repeat: Infinity, ease: 'linear' }}
          />
        )
      })}
      {INNER_RINGS.map((r, i) => {
        const w = size * r.wf
        const h = size * r.hf
        return (
          <motion.div
            key={`in${i}`}
            className="absolute"
            style={{
              width: w, height: h,
              top: '50%', left: '50%',
              marginTop: -h / 2, marginLeft: -w / 2,
              borderRadius: '50%',
              border: `1px solid rgba(255,202,102,${r.opacity})`,
            }}
            initial={{ rotate: r.angle }}
            animate={{ rotate: r.angle + 360 }}
            transition={{ duration: r.speed, repeat: Infinity, ease: 'linear' }}
          />
        )
      })}
      <div
        className="absolute"
        style={{
          width: size * 0.32, height: size * 0.32,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,202,102,0.8) 0%, rgba(255,202,102,0.2) 52%, transparent 80%)',
          filter: 'blur(10px)',
        }}
      />
      <div
        className="absolute"
        style={{
          width: 7, height: 7,
          borderRadius: '50%',
          background: '#FFF8E7',
          boxShadow: '0 0 16px rgba(255,202,102,1), 0 0 6px rgba(255,255,255,0.85)',
        }}
      />
    </div>
  )
}

// Connector dimensions
const LINE_W = 72  // px, w-[72px]
const PULSE_W = 30 // px

function LeftConnector({ delay }: { delay: number }) {
  // Pulse travels from orb (right side) → card (left side)
  return (
    <motion.div
      className="flex-shrink-0 relative overflow-hidden"
      style={{ width: LINE_W, height: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Base dim line */}
      <div className="absolute inset-0" style={{ background: 'rgba(255,202,102,0.18)' }} />
      {/* Pulse: leading edge is LEFT (toward card), travels right→left */}
      <motion.div
        className="absolute top-0 h-full"
        style={{
          left: 0,
          width: PULSE_W,
          background: 'linear-gradient(to right, rgba(255,202,102,0.95), rgba(255,202,102,0.45), transparent)',
        }}
        animate={{ x: [LINE_W, -PULSE_W] }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 0.9,
          delay: delay + 0.4,
        }}
      />
    </motion.div>
  )
}

function RightConnector({ delay }: { delay: number }) {
  // Pulse travels from orb (left side) → card (right side)
  return (
    <motion.div
      className="flex-shrink-0 relative overflow-hidden"
      style={{ width: LINE_W, height: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Base dim line */}
      <div className="absolute inset-0" style={{ background: 'rgba(255,202,102,0.18)' }} />
      {/* Pulse: leading edge is RIGHT (toward card), travels left→right */}
      <motion.div
        className="absolute top-0 h-full"
        style={{
          left: 0,
          width: PULSE_W,
          background: 'linear-gradient(to left, rgba(255,202,102,0.95), rgba(255,202,102,0.45), transparent)',
        }}
        animate={{ x: [-PULSE_W, LINE_W] }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 0.9,
          delay: delay + 0.4,
        }}
      />
    </motion.div>
  )
}

function MiniCard({
  icon: Icon,
  title,
  desc,
  href,
  delay,
}: {
  icon: React.ElementType
  title: string
  desc: string
  href: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <MotionLink
        href={href as '/'}
        className="block w-[248px] rounded-xl p-4 group"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
        }}
        transition={{ duration: 0.18 }}
        whileHover={{
          background: 'rgba(255,202,102,0.07)',
          borderColor: 'rgba(255,202,102,0.3)',
          scale: 1.03,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-gold/10 flex items-center justify-center flex-shrink-0">
            <Icon size={12} className="text-gold/75 group-hover:text-gold transition-colors duration-200" />
          </div>
          <span className="font-syne font-semibold text-white/75 text-[12px] group-hover:text-white transition-colors duration-200 leading-tight">
            {title}
          </span>
        </div>
        <p className="text-white/30 text-[11px] font-dm leading-snug line-clamp-1">{desc}</p>
      </MotionLink>
    </motion.div>
  )
}

export default function Hero() {
  const t = useTranslations('Hero')

  const miniServices = CARD_META.map(({ icon, key, href }) => ({
    icon,
    title: t(`cards.${key}.title`),
    desc: t(`cards.${key}.desc`),
    href,
  }))

  return (
    <section
      className="relative min-h-screen bg-ink overflow-hidden flex flex-col justify-center"
      style={{ paddingTop: '76px' }}
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 50% at 50% 115%, rgba(255,202,102,0.07) 0%, transparent 65%)',
        }}
      />
      {/* Grid — bright on edges, fades in centre */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.09]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 72% 70% at 50% 42%, transparent 0%, rgba(0,0,0,0.25) 55%, black 82%)',
          WebkitMaskImage: 'radial-gradient(ellipse 72% 70% at 50% 42%, transparent 0%, rgba(0,0,0,0.25) 55%, black 82%)',
        }}
      />

      {/* TEXT BLOCK */}
      <motion.div
        className="flex-shrink-0 flex flex-col items-center justify-center text-center px-5 pb-2"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUp}
          className="font-syne font-bold text-[36px] sm:text-[46px] lg:text-[56px] text-white leading-[1.1] tracking-tight mb-5 max-w-3xl"
        >
          {t.rich('heading', {
            gold: (chunks) => (
              <span className="text-gradient-gold">{chunks}</span>
            ),
          })}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-white/45 font-dm text-[15px] leading-relaxed max-w-[480px] mb-8"
        >
          {t('subtext')}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink text-[14px] font-dm font-semibold rounded-full hover:brightness-110 transition-all duration-200 hover:gap-3 hover:scale-[1.02]"
          >
            {t('cta')}
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/#services"
            className="text-white/40 hover:text-white text-[14px] font-dm transition-colors duration-200"
          >
            {t('ctaSecondary')}
          </Link>
        </motion.div>
      </motion.div>

      {/* DESKTOP VISUAL: [left cards] — [orb] — [right cards] */}
      <div className="hidden lg:flex flex-shrink-0 items-center justify-center pb-8 pt-6">
        {/* Left column */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center">
            <MiniCard {...miniServices[0]} delay={0.95} />
            <LeftConnector delay={1.35} />
          </div>
          <div className="flex items-center">
            <MiniCard {...miniServices[2]} delay={1.05} />
            <LeftConnector delay={1.55} />
          </div>
        </div>

        {/* Central orb */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-gold/10 pointer-events-none"
              style={{ width: 260, height: 260, top: '50%', left: '50%', marginTop: -130, marginLeft: -130 }}
              animate={{ scale: [1, 2.0], opacity: [0.2, 0] }}
              transition={{ duration: 3.2, delay: i * 1.05, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
          >
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <EnergyOrb size={220} />
            </motion.div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center">
            <RightConnector delay={1.35} />
            <MiniCard {...miniServices[1]} delay={0.95} />
          </div>
          <div className="flex items-center">
            <RightConnector delay={1.55} />
            <MiniCard {...miniServices[3]} delay={1.05} />
          </div>
        </div>
      </div>

      {/* MOBILE: orb only */}
      <div className="lg:hidden flex-shrink-0 flex items-center justify-center pb-14 pt-6">
        <div className="relative flex items-center justify-center">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-gold/12 pointer-events-none"
              style={{ width: 210, height: 210, top: '50%', left: '50%', marginTop: -105, marginLeft: -105 }}
              animate={{ scale: [1, 1.9], opacity: [0.2, 0] }}
              transition={{ duration: 2.6, delay: i * 1.0, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.175, 0.885, 0.32, 1.1] }}
          >
            <EnergyOrb size={180} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
