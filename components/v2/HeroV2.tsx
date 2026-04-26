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
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

// Concentric chip frame definitions (innermost last = most visible)
const CHIP_LAYERS = [
  { inset: 0,  rx: 34, opacity: 0.22, sw: 1   },
  { inset: 15, rx: 26, opacity: 0.35, sw: 1   },
  { inset: 29, rx: 20, opacity: 0.52, sw: 1.5 },
  { inset: 43, rx: 14, opacity: 0.70, sw: 1.5 },
  { inset: 57, rx: 9,  opacity: 0.95, sw: 2   },
]

// PCB pin stub Y positions as a fraction of chip size
const PIN_YS = [0.30, 0.43, 0.57, 0.70]

function CircuitChip({ size = 210 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="relative">
      {/* Atmospheric outer glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: -40,
          background: 'radial-gradient(circle, rgba(255,202,102,0.16) 0%, rgba(255,202,102,0.04) 50%, transparent 70%)',
          filter: 'blur(22px)',
        }}
      />

      {/* Concentric chip frames */}
      {CHIP_LAYERS.map((l, i) => {
        const isInner = i === CHIP_LAYERS.length - 1
        const isSecond = i === CHIP_LAYERS.length - 2
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              inset: l.inset,
              borderRadius: l.rx,
              border: `${l.sw}px solid rgba(255,202,102,${l.opacity})`,
            }}
            animate={
              isInner
                ? {
                    boxShadow: [
                      '0 0 16px rgba(255,202,102,0.2), inset 0 0 18px rgba(255,202,102,0.05)',
                      '0 0 40px rgba(255,202,102,0.52), inset 0 0 40px rgba(255,202,102,0.14)',
                      '0 0 16px rgba(255,202,102,0.2), inset 0 0 18px rgba(255,202,102,0.05)',
                    ],
                  }
                : isSecond
                ? {
                    boxShadow: [
                      '0 0 0px rgba(255,202,102,0)',
                      '0 0 14px rgba(255,202,102,0.18)',
                      '0 0 0px rgba(255,202,102,0)',
                    ],
                  }
                : undefined
            }
            transition={
              isInner || isSecond
                ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: isSecond ? 0.5 : 0 }
                : undefined
            }
          />
        )
      })}

      {/* Left PCB pin stubs */}
      {PIN_YS.map((yf, i) => (
        <div key={`lp${i}`}>
          <div
            className="absolute"
            style={{
              left: 0, top: yf * size - 0.5,
              width: 22, height: 1,
              marginLeft: -22,
              background: `rgba(255,202,102,${0.28 + i * 0.05})`,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              left: 0, top: yf * size - 3,
              width: 6, height: 6,
              marginLeft: -29,
              background: `rgba(255,202,102,${0.45 + i * 0.06})`,
              boxShadow: '0 0 6px rgba(255,202,102,0.45)',
            }}
          />
        </div>
      ))}

      {/* Right PCB pin stubs */}
      {PIN_YS.map((yf, i) => (
        <div key={`rp${i}`}>
          <div
            className="absolute"
            style={{
              right: 0, top: yf * size - 0.5,
              width: 22, height: 1,
              marginRight: -22,
              background: `rgba(255,202,102,${0.28 + i * 0.05})`,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              right: 0, top: yf * size - 3,
              width: 6, height: 6,
              marginRight: -29,
              background: `rgba(255,202,102,${0.45 + i * 0.06})`,
              boxShadow: '0 0 6px rgba(255,202,102,0.45)',
            }}
          />
        </div>
      ))}

      {/* Center bright core dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="rounded-full"
          style={{ width: 10, height: 10, background: '#FFF8E7' }}
          animate={{
            boxShadow: [
              '0 0 14px rgba(255,202,102,0.8), 0 0 5px rgba(255,255,255,0.85)',
              '0 0 28px rgba(255,202,102,1),   0 0 10px rgba(255,255,255,1)',
              '0 0 14px rgba(255,202,102,0.8), 0 0 5px rgba(255,255,255,0.85)',
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

// ── Circuit connector SVG (L-shaped PCB trace, chip→card) ──────────────────
const CW = 92   // SVG width
const CH = 32   // SVG height
const CY = 16   // center Y (endpoints sit here)
const BY = 5    // raised bridge Y
const BX1 = 20  // left bend X
const BX2 = 72  // right bend X
// Approximate path length: (CW-BX2) + (CY-BY) + (BX2-BX1) + (CY-BY) + BX1
const PATH_LEN = (CW - BX2) + (CY - BY) + (BX2 - BX1) + (CY - BY) + BX1 // = 20+11+52+11+20 = 114
const DASH = 18

// Left connector: chip is on RIGHT side (x=CW), card is on LEFT (x=0)
const LEFT_D  = `M ${CW},${CY} H ${BX2} V ${BY} H ${BX1} V ${CY} H 0`
const LEFT_DOTS = [{ cx: BX2, cy: CY }, { cx: BX2, cy: BY }, { cx: BX1, cy: BY }, { cx: BX1, cy: CY }]

// Right connector: chip is on LEFT side (x=0), card is on RIGHT (x=CW)
const RIGHT_D  = `M 0,${CY} H ${BX1} V ${BY} H ${BX2} V ${CY} H ${CW}`
const RIGHT_DOTS = [{ cx: BX1, cy: CY }, { cx: BX1, cy: BY }, { cx: BX2, cy: BY }, { cx: BX2, cy: CY }]

function CircuitConnector({ side, delay }: { side: 'left' | 'right'; delay: number }) {
  const pathD = side === 'left' ? LEFT_D : RIGHT_D
  const dots  = side === 'left' ? LEFT_DOTS : RIGHT_DOTS
  const chipDot = side === 'left' ? { cx: CW, cy: CY } : { cx: 0, cy: CY }

  return (
    <motion.div
      style={{ flexShrink: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay }}
    >
      <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} overflow="visible">
        {/* Dim base trace */}
        <path
          d={pathD}
          stroke="rgba(255,202,102,0.16)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* Corner junction dots */}
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.cx} cy={d.cy} r="2.5"
            fill="rgba(255,202,102,0.38)"
            style={{ filter: 'drop-shadow(0 0 3px rgba(255,202,102,0.5))' }}
          />
        ))}

        {/* Chip-side endpoint (larger glow dot) */}
        <circle
          cx={chipDot.cx} cy={chipDot.cy} r="3.5"
          fill="rgba(255,202,102,0.55)"
          style={{ filter: 'drop-shadow(0 0 5px rgba(255,202,102,0.65))' }}
        />

        {/* Animated pulse — travels from chip side to card side */}
        <motion.path
          d={pathD}
          stroke="rgba(255,202,102,0.92)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${DASH} 400`}
          animate={{ strokeDashoffset: [0, -(PATH_LEN + DASH)] }}
          transition={{
            duration: 1.65,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.9,
            delay: delay + 0.45,
          }}
        />
      </svg>
    </motion.div>
  )
}

function MiniCard({ icon: Icon, title, desc, href, delay }: {
  icon: React.ElementType; title: string; desc: string; href: string; delay: number
}) {
  return (
    <MotionLink
      href={href as '/'}
      className="block w-[248px] rounded-xl p-4 group"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        background: 'rgba(255,202,102,0.07)',
        borderColor: 'rgba(255,202,102,0.3)',
        scale: 1.03,
        transition: { duration: 0.18 },
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
  )
}

export default function HeroV2() {
  const t = useTranslations('Hero')

  const miniServices = CARD_META.map(({ icon, key, href }) => ({
    icon,
    title: t(`cards.${key}.title`),
    desc:  t(`cards.${key}.desc`),
    href,
  }))

  return (
    <section
      className="relative min-h-screen bg-ink overflow-hidden flex flex-col justify-center"
      style={{ paddingTop: '76px' }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 50% at 50% 115%, rgba(255,202,102,0.07) 0%, transparent 65%)',
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Text block */}
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
            gold: (chunks) => <span className="text-gradient-gold">{chunks}</span>,
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
            {t('cta')} <ArrowRight size={15} />
          </Link>
          <Link
            href="/#services"
            className="text-white/40 hover:text-white text-[14px] font-dm transition-colors duration-200"
          >
            {t('ctaSecondary')}
          </Link>
        </motion.div>
      </motion.div>

      {/* Desktop visual */}
      <div className="hidden lg:flex flex-shrink-0 items-center justify-center pb-8 pt-6">
        {/* Left cards */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center">
            <MiniCard {...miniServices[0]} delay={0.95} />
            <CircuitConnector side="left" delay={1.35} />
          </div>
          <div className="flex items-center">
            <MiniCard {...miniServices[2]} delay={1.05} />
            <CircuitConnector side="left" delay={1.55} />
          </div>
        </div>

        {/* Central circuit chip */}
        <div className="relative flex items-center justify-center flex-shrink-0 mx-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CircuitChip size={210} />
            </motion.div>
          </motion.div>
        </div>

        {/* Right cards */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center">
            <CircuitConnector side="right" delay={1.35} />
            <MiniCard {...miniServices[1]} delay={0.95} />
          </div>
          <div className="flex items-center">
            <CircuitConnector side="right" delay={1.55} />
            <MiniCard {...miniServices[3]} delay={1.05} />
          </div>
        </div>
      </div>

      {/* Mobile: chip only */}
      <div className="lg:hidden flex-shrink-0 flex items-center justify-center pb-14 pt-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.175, 0.885, 0.32, 1.1] }}
        >
          <CircuitChip size={170} />
        </motion.div>
      </div>
    </section>
  )
}
