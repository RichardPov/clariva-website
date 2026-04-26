'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Monitor, BarChart3, Settings2, Rocket } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const MotionLink = motion(Link)

const CARD_META = [
  { icon: Monitor,  key: 'appDev',       href: '/services/application-development' },
  { icon: BarChart3, key: 'dataAi',      href: '/services/data-and-ai'             },
  { icon: Settings2, key: 'serviceNow',  href: '/services/servicenow'              },
  { icon: Rocket,   key: 'fullDelivery', href: '/services/full-delivery-teams'     },
] as const

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

// ─── Circuit Chip ─────────────────────────────────────────────────────────────
const SZ  = 240
const CX  = 120
const CY2 = 120
const CH2 = 20

const POLY = `${CH2},0 ${SZ-CH2},0 ${SZ},${CH2} ${SZ},${SZ-CH2} ${SZ-CH2},${SZ} ${CH2},${SZ} 0,${SZ-CH2} 0,${CH2}`

// Package frame inset + die inset
const PKG = 18
const DIE = 50

// Pin pad Y positions (absolute)
const PIN_YS = [68, 96, 144, 172] as const
// Where traces exit the die boundary
const CONN_YS = [73, 96, 144, 167] as const
// Bend X for outer (jogged) traces
const BX = 30

// Trace paths: die edge → chip edge
const L_TRACES = [
  `M ${DIE},${CONN_YS[0]} H ${BX} V ${PIN_YS[0]} H 0`,
  `M ${DIE},${CONN_YS[1]} H 0`,
  `M ${DIE},${CONN_YS[2]} H 0`,
  `M ${DIE},${CONN_YS[3]} H ${BX} V ${PIN_YS[3]} H 0`,
] as const

const R_TRACES = [
  `M ${SZ-DIE},${CONN_YS[0]} H ${SZ-BX} V ${PIN_YS[0]} H ${SZ}`,
  `M ${SZ-DIE},${CONN_YS[1]} H ${SZ}`,
  `M ${SZ-DIE},${CONN_YS[2]} H ${SZ}`,
  `M ${SZ-DIE},${CONN_YS[3]} H ${SZ-BX} V ${PIN_YS[3]} H ${SZ}`,
] as const

// Trace lengths for dash animation
// Outer: (DIE-BX) + |CONN-PIN| + BX = 20 + 5 + 30 = 55
// Inner: DIE = 50
const T_LENS = [55, 50, 50, 55] as const
const T_DASH = 13

// Corner L-brackets at package corners
const BK_OFF = PKG, BK_LEN = 12
const BRACKETS = [
  `M ${BK_OFF+BK_LEN},${BK_OFF} H ${BK_OFF} V ${BK_OFF+BK_LEN}`,
  `M ${SZ-BK_OFF-BK_LEN},${BK_OFF} H ${SZ-BK_OFF} V ${BK_OFF+BK_LEN}`,
  `M ${BK_OFF},${SZ-BK_OFF-BK_LEN} V ${SZ-BK_OFF} H ${BK_OFF+BK_LEN}`,
  `M ${SZ-BK_OFF},${SZ-BK_OFF-BK_LEN} V ${SZ-BK_OFF} H ${SZ-BK_OFF-BK_LEN}`,
] as const

// Die grid lines (pre-generated)
function makeGrid() {
  const G0 = DIE + 6, G1 = SZ - DIE - 6, GS = 16
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let v = G0 + GS; v < G1; v += GS) {
    lines.push({ x1: v, y1: G0, x2: v, y2: G1 })
    lines.push({ x1: G0, y1: v, x2: G1, y2: v })
  }
  return lines
}
const GRID_LINES = makeGrid()

function CircuitChip({ size = 240 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* CSS outer glow */}
      <div className="absolute pointer-events-none" style={{
        inset: -50,
        background: 'radial-gradient(circle, rgba(255,202,102,0.15) 0%, rgba(255,202,102,0.04) 45%, transparent 70%)',
        filter: 'blur(20px)',
      }}/>

      <svg width={size} height={size} viewBox={`0 0 ${SZ} ${SZ}`} overflow="visible">
        <defs>
          <clipPath id="chipClip">
            <polygon points={POLY}/>
          </clipPath>
          <clipPath id="dieClip">
            <rect x={DIE} y={DIE} width={SZ-DIE*2} height={SZ-DIE*2} rx="3"/>
          </clipPath>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,202,102,0)"/>
            <stop offset="40%"  stopColor="rgba(255,202,102,0.20)"/>
            <stop offset="50%"  stopColor="rgba(255,202,102,0.42)"/>
            <stop offset="60%"  stopColor="rgba(255,202,102,0.20)"/>
            <stop offset="100%" stopColor="rgba(255,202,102,0)"/>
          </linearGradient>
        </defs>

        {/* Chip body */}
        <polygon points={POLY} fill="rgba(6,6,7,0.84)"/>
        <polygon points={POLY} fill="none" stroke="rgba(255,202,102,0.32)" strokeWidth="1.5"/>

        {/* Package inner frame */}
        <rect x={PKG} y={PKG} width={SZ-PKG*2} height={SZ-PKG*2}
          rx="4" fill="none" stroke="rgba(255,202,102,0.16)" strokeWidth="1"/>

        {/* Corner L-brackets */}
        {BRACKETS.map((d, i) => (
          <path key={i} d={d} fill="none"
            stroke="rgba(255,202,102,0.75)" strokeWidth="1.5" strokeLinecap="square"/>
        ))}

        {/* Static PCB trace paths */}
        {[...L_TRACES, ...R_TRACES].map((d, i) => (
          <path key={`tr${i}`} d={d} fill="none"
            stroke="rgba(255,202,102,0.20)" strokeWidth="1"
            strokeLinecap="square" strokeLinejoin="miter"/>
        ))}

        {/* Via dots at trace junctions */}
        {([
          [DIE, CONN_YS[0]], [BX, PIN_YS[0]],
          [DIE, CONN_YS[1]],
          [DIE, CONN_YS[2]],
          [DIE, CONN_YS[3]], [BX, PIN_YS[3]],
          [SZ-DIE, CONN_YS[0]], [SZ-BX, PIN_YS[0]],
          [SZ-DIE, CONN_YS[1]],
          [SZ-DIE, CONN_YS[2]],
          [SZ-DIE, CONN_YS[3]], [SZ-BX, PIN_YS[3]],
        ] as [number, number][]).map(([cx, cy], i) => (
          <circle key={`via${i}`} cx={cx} cy={cy} r="2.5" fill="rgba(255,202,102,0.52)"/>
        ))}

        {/* Pin stubs (overflow outside viewBox) */}
        {PIN_YS.map((y, i) => (
          <g key={`pin${i}`}>
            <line x1="0" y1={y} x2="8" y2={y} stroke="rgba(255,202,102,0.38)" strokeWidth="2"/>
            <circle cx="-5" cy={y} r="4" fill="rgba(255,202,102,0.62)"/>
            <line x1={SZ} y1={y} x2={SZ-8} y2={y} stroke="rgba(255,202,102,0.38)" strokeWidth="2"/>
            <circle cx={SZ+5} cy={y} r="4" fill="rgba(255,202,102,0.62)"/>
          </g>
        ))}

        {/* Die interior grid */}
        <g clipPath="url(#dieClip)">
          {GRID_LINES.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="rgba(255,202,102,0.09)" strokeWidth="0.5"/>
          ))}
        </g>

        {/* Die boundary — animated pulse */}
        <motion.rect x={DIE} y={DIE} width={SZ-DIE*2} height={SZ-DIE*2}
          rx="3" fill="none"
          stroke="rgba(255,202,102,0.62)" strokeWidth="1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Core box */}
        <rect x={88} y={88} width={64} height={64}
          rx="2" fill="rgba(255,202,102,0.035)" stroke="rgba(255,202,102,0.40)" strokeWidth="1"/>

        {/* Core: 4 functional sub-blocks */}
        {([
          [93, 93], [127, 93], [93, 127], [127, 127],
        ] as [number, number][]).map(([x, y], i) => (
          <rect key={`blk${i}`} x={x} y={y} width={20} height={20} rx="1"
            fill="rgba(255,202,102,0.05)" stroke="rgba(255,202,102,0.24)" strokeWidth="0.75"/>
        ))}

        {/* Core interconnect bus */}
        <line x1={113} y1={CY2} x2={127} y2={CY2} stroke="rgba(255,202,102,0.35)" strokeWidth="1"/>
        <line x1={CX} y1={113} x2={CX} y2={127} stroke="rgba(255,202,102,0.35)" strokeWidth="1"/>

        {/* Core centre ring */}
        <circle cx={CX} cy={CY2} r="6" fill="none"
          stroke="rgba(255,202,102,0.32)" strokeWidth="1" strokeDasharray="3 5"/>

        {/* Animated trace pulses (die → pins) */}
        {L_TRACES.map((d, i) => (
          <motion.path key={`lp${i}`} d={d} fill="none"
            stroke="rgba(255,202,102,0.92)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={`${T_DASH} 400`}
            animate={{ strokeDashoffset: [0, -(T_LENS[i] + T_DASH)] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4, delay: i * 0.38 }}
          />
        ))}
        {R_TRACES.map((d, i) => (
          <motion.path key={`rp${i}`} d={d} fill="none"
            stroke="rgba(255,202,102,0.92)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={`${T_DASH} 400`}
            animate={{ strokeDashoffset: [0, -(T_LENS[i] + T_DASH)] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4, delay: i * 0.38 + 0.65 }}
          />
        ))}

        {/* Scan line */}
        <g clipPath="url(#chipClip)">
          <motion.rect x="0" y="0" width={SZ} height={22}
            fill="url(#scanGrad)"
            animate={{ y: [-22, SZ + 22] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: 'linear', repeatDelay: 2.2 }}
          />
        </g>

        {/* Core centre dot */}
        <motion.circle cx={CX} cy={CY2} r="4" fill="rgba(255,224,140,0.95)"
          animate={{ r: [4, 7.5, 4], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
      </svg>
    </div>
  )
}

// ─── Circuit Connectors ───────────────────────────────────────────────────────
const CW  = 92   // SVG width
const CH  = 32   // SVG height
const CY  = 16   // endpoint Y (centre of SVG)
const BY  = 5    // bridge apex Y
const BX1 = 20   // left bend X
const BX2 = 72   // right bend X
// Path length: (CW-BX2)+(CY-BY)+(BX2-BX1)+(CY-BY)+BX1 = 20+11+52+11+20 = 114
const PLEN = (CW-BX2)+(CY-BY)+(BX2-BX1)+(CY-BY)+BX1
const DASH = 18

const LEFT_D  = `M ${CW},${CY} H ${BX2} V ${BY} H ${BX1} V ${CY} H 0`
const RIGHT_D = `M 0,${CY} H ${BX1} V ${BY} H ${BX2} V ${CY} H ${CW}`
const LEFT_DOTS  = [[BX2,CY],[BX2,BY],[BX1,BY],[BX1,CY]] as [number,number][]
const RIGHT_DOTS = [[BX1,CY],[BX1,BY],[BX2,BY],[BX2,CY]] as [number,number][]

function CircuitConnector({ side, delay }: { side: 'left' | 'right'; delay: number }) {
  const pathD    = side === 'left' ? LEFT_D      : RIGHT_D
  const dots     = side === 'left' ? LEFT_DOTS   : RIGHT_DOTS
  const chipDot  = side === 'left' ? [CW, CY]    : [0, CY]

  return (
    <motion.div style={{ flexShrink: 0 }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay }}
    >
      <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} overflow="visible">
        <path d={pathD} stroke="rgba(255,202,102,0.16)" strokeWidth="1.5"
          fill="none" strokeLinecap="square" strokeLinejoin="miter"/>

        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="rgba(255,202,102,0.38)"
            style={{ filter: 'drop-shadow(0 0 3px rgba(255,202,102,0.5))' }}/>
        ))}

        <circle cx={chipDot[0]} cy={chipDot[1]} r="3.5" fill="rgba(255,202,102,0.55)"
          style={{ filter: 'drop-shadow(0 0 5px rgba(255,202,102,0.65))' }}/>

        <motion.path d={pathD}
          stroke="rgba(255,202,102,0.92)" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={`${DASH} 400`}
          animate={{ strokeDashoffset: [0, -(PLEN + DASH)] }}
          transition={{ duration: 1.65, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.9, delay: delay + 0.45 }}
        />
      </svg>
    </motion.div>
  )
}

// ─── Mini service card ────────────────────────────────────────────────────────
function MiniCard({ icon: Icon, title, desc, href, delay }: {
  icon: React.ElementType; title: string; desc: string; href: string; delay: number
}) {
  return (
    <MotionLink href={href as '/'} className="block w-[248px] rounded-xl p-4 group"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ background: 'rgba(255,202,102,0.07)', borderColor: 'rgba(255,202,102,0.3)', scale: 1.03, transition: { duration: 0.18 } }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-md bg-gold/10 flex items-center justify-center flex-shrink-0">
          <Icon size={12} className="text-gold/75 group-hover:text-gold transition-colors duration-200"/>
        </div>
        <span className="font-syne font-semibold text-white/75 text-[12px] group-hover:text-white transition-colors duration-200 leading-tight">
          {title}
        </span>
      </div>
      <p className="text-white/30 text-[11px] font-dm leading-snug line-clamp-1">{desc}</p>
    </MotionLink>
  )
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function HeroV2() {
  const t = useTranslations('Hero')
  const miniServices = CARD_META.map(({ icon, key, href }) => ({
    icon, title: t(`cards.${key}.title`), desc: t(`cards.${key}.desc`), href,
  }))

  return (
    <section
      className="relative min-h-screen bg-ink overflow-hidden flex flex-col justify-center"
      style={{ paddingTop: '76px' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 90% 50% at 50% 115%, rgba(255,202,102,0.07) 0%, transparent 65%)',
      }}/>
      <div className="absolute inset-0 pointer-events-none opacity-[0.045]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}/>

      {/* Text */}
      <motion.div className="flex-shrink-0 flex flex-col items-center text-center px-5 pb-2"
        variants={stagger} initial="hidden" animate="visible"
      >
        <motion.h1 variants={fadeUp}
          className="font-syne font-bold text-[36px] sm:text-[46px] lg:text-[56px] text-white leading-[1.1] tracking-tight mb-5 max-w-3xl"
        >
          {t.rich('heading', { gold: (c) => <span className="text-gradient-gold">{c}</span> })}
        </motion.h1>
        <motion.p variants={fadeUp}
          className="text-white/45 font-dm text-[15px] leading-relaxed max-w-[480px] mb-8"
        >
          {t('subtext')}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-ink text-[14px] font-dm font-semibold rounded-full hover:brightness-110 transition-all duration-200 hover:gap-3 hover:scale-[1.02]"
          >
            {t('cta')} <ArrowRight size={15}/>
          </Link>
          <Link href="/#services" className="text-white/40 hover:text-white text-[14px] font-dm transition-colors duration-200">
            {t('ctaSecondary')}
          </Link>
        </motion.div>
      </motion.div>

      {/* Desktop: [cards] — [chip] — [cards] */}
      <div className="hidden lg:flex flex-shrink-0 items-center justify-center pb-8 pt-6">
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center">
            <MiniCard {...miniServices[0]} delay={0.95}/>
            <CircuitConnector side="left" delay={1.35}/>
          </div>
          <div className="flex items-center">
            <MiniCard {...miniServices[2]} delay={1.05}/>
            <CircuitConnector side="left" delay={1.55}/>
          </div>
        </div>

        <motion.div className="relative flex-shrink-0 mx-2"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
        >
          <CircuitChip size={240}/>
        </motion.div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center">
            <CircuitConnector side="right" delay={1.35}/>
            <MiniCard {...miniServices[1]} delay={0.95}/>
          </div>
          <div className="flex items-center">
            <CircuitConnector side="right" delay={1.55}/>
            <MiniCard {...miniServices[3]} delay={1.05}/>
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
          <CircuitChip size={180}/>
        </motion.div>
      </div>
    </section>
  )
}
