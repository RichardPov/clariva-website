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
const SZ  = 240   // viewBox size
const CX  = 120   // chip centre X
const CY2 = 120   // chip centre Y (CY2 to avoid collision with connector CY)
const CH2  = 22   // chamfer amount on outer polygon

// Outer octagon-like polygon
const POLY = `${CH2},0 ${SZ-CH2},0 ${SZ},${CH2} ${SZ},${SZ-CH2} ${SZ-CH2},${SZ} ${CH2},${SZ} 0,${SZ-CH2} 0,${CH2}`

// Inner concentric rounded-rect frames [inset, rx, strokeWidth, opacity]
const FRAMES: [number, number, number, number][] = [
  [13,  28, 1,   0.24],
  [26,  22, 1,   0.36],
  [39,  17, 1.5, 0.54],
  [53,  12, 1.5, 0.74],
  [66,  7,  2,   0.95],
]

// Corner L-bracket coords [path string]
const BL = 15  // bracket offset from edge
const BK = 14  // bracket leg length
const BRACKETS = [
  `M ${BL+BK},${BL} H ${BL} V ${BL+BK}`,
  `M ${SZ-BL-BK},${BL} H ${SZ-BL} V ${BL+BK}`,
  `M ${BL},${SZ-BL-BK} V ${SZ-BL} H ${BL+BK}`,
  `M ${SZ-BL},${SZ-BL-BK} V ${SZ-BL} H ${SZ-BL-BK}`,
]

// Pin stub Y-positions (fraction of SZ) — aligned to top/bottom card rows
const PINS = [0.30, 0.43, 0.57, 0.70]

function CircuitChip({ size = 240 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* CSS outer glow blob */}
      <div className="absolute pointer-events-none" style={{
        inset: -55,
        background: 'radial-gradient(circle, rgba(255,202,102,0.16) 0%, rgba(255,202,102,0.04) 46%, transparent 70%)',
        filter: 'blur(24px)',
      }} />

      <svg width={size} height={size} viewBox={`0 0 ${SZ} ${SZ}`} overflow="visible">
        <defs>
          {/* Clip to chip outer shape for scan line */}
          <clipPath id="chipClip">
            <polygon points={POLY} />
          </clipPath>

          {/* Scan-line gradient (vertical, object bounding box) */}
          <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,202,102,0)" />
            <stop offset="45%"  stopColor="rgba(255,202,102,0.15)" />
            <stop offset="50%"  stopColor="rgba(255,202,102,0.32)" />
            <stop offset="55%"  stopColor="rgba(255,202,102,0.15)" />
            <stop offset="100%" stopColor="rgba(255,202,102,0)" />
          </linearGradient>

          {/* Centre core glow */}
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(255,202,102,0.35)" />
            <stop offset="100%" stopColor="rgba(255,202,102,0)" />
          </radialGradient>
        </defs>

        {/* Dark inner fill */}
        <polygon points={POLY} fill="rgba(6,6,7,0.72)" />

        {/* Outer chamfered border */}
        <polygon points={POLY} fill="none" stroke="rgba(255,202,102,0.20)" strokeWidth="1" />

        {/* Static inner frames (frames 0–2) */}
        {FRAMES.slice(0, 3).map(([r, rx, sw, op], i) => (
          <rect key={i}
            x={r} y={r} width={SZ-r*2} height={SZ-r*2}
            rx={rx} fill="none"
            stroke={`rgba(255,202,102,${op})`} strokeWidth={sw}
          />
        ))}

        {/* Corner L-brackets */}
        {BRACKETS.map((d, i) => (
          <path key={i} d={d}
            stroke="rgba(255,202,102,0.72)" strokeWidth="1.5"
            fill="none" strokeLinecap="square"
          />
        ))}

        {/* Internal dashed axis traces */}
        <line x1={FRAMES[1][0]} y1={CY2} x2={FRAMES[3][0]} y2={CY2}
          stroke="rgba(255,202,102,0.18)" strokeWidth="1" strokeDasharray="3 5" />
        <line x1={SZ-FRAMES[1][0]} y1={CY2} x2={SZ-FRAMES[3][0]} y2={CY2}
          stroke="rgba(255,202,102,0.18)" strokeWidth="1" strokeDasharray="3 5" />
        <line x1={CX} y1={FRAMES[1][0]} x2={CX} y2={FRAMES[3][0]}
          stroke="rgba(255,202,102,0.18)" strokeWidth="1" strokeDasharray="3 5" />
        <line x1={CX} y1={SZ-FRAMES[1][0]} x2={CX} y2={SZ-FRAMES[3][0]}
          stroke="rgba(255,202,102,0.18)" strokeWidth="1" strokeDasharray="3 5" />

        {/* Axis junction dots */}
        {[
          [FRAMES[1][0], CY2], [SZ-FRAMES[1][0], CY2],
          [CX, FRAMES[1][0]], [CX, SZ-FRAMES[1][0]],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(255,202,102,0.38)" />
        ))}

        {/* Quadrant micro-circuit patterns (each corner between frame 1 & frame 3) */}
        {/* TL */}
        <path d="M 44,46 H 60 V 60" stroke="rgba(255,202,102,0.16)" strokeWidth="1" fill="none" strokeLinecap="square"/>
        <circle cx="60" cy="60" r="2" fill="rgba(255,202,102,0.26)"/>
        <path d="M 44,65 H 54" stroke="rgba(255,202,102,0.11)" strokeWidth="1" fill="none"/>
        <circle cx="54" cy="65" r="1.5" fill="rgba(255,202,102,0.20)"/>
        {/* TR */}
        <path d={`M ${SZ-44},46 H ${SZ-60} V 60`} stroke="rgba(255,202,102,0.16)" strokeWidth="1" fill="none" strokeLinecap="square"/>
        <circle cx={SZ-60} cy="60" r="2" fill="rgba(255,202,102,0.26)"/>
        <path d={`M ${SZ-44},65 H ${SZ-54}`} stroke="rgba(255,202,102,0.11)" strokeWidth="1" fill="none"/>
        <circle cx={SZ-54} cy="65" r="1.5" fill="rgba(255,202,102,0.20)"/>
        {/* BL */}
        <path d={`M 44,${SZ-46} H 60 V ${SZ-60}`} stroke="rgba(255,202,102,0.16)" strokeWidth="1" fill="none" strokeLinecap="square"/>
        <circle cx="60" cy={SZ-60} r="2" fill="rgba(255,202,102,0.26)"/>
        <path d={`M 44,${SZ-65} H 54`} stroke="rgba(255,202,102,0.11)" strokeWidth="1" fill="none"/>
        {/* BR */}
        <path d={`M ${SZ-44},${SZ-46} H ${SZ-60} V ${SZ-60}`} stroke="rgba(255,202,102,0.16)" strokeWidth="1" fill="none" strokeLinecap="square"/>
        <circle cx={SZ-60} cy={SZ-60} r="2" fill="rgba(255,202,102,0.26)"/>

        {/* Dot matrix detail in quadrants */}
        {[78, 88, 98].flatMap(x =>
          [50, 58, 66].map(y => <circle key={`${x}${y}`} cx={x} cy={y} r="1" fill="rgba(255,202,102,0.11)"/>)
        )}
        {[SZ-78, SZ-88, SZ-98].flatMap(x =>
          [50, 58, 66].map(y => <circle key={`r${x}${y}`} cx={x} cy={y} r="1" fill="rgba(255,202,102,0.11)"/>)
        )}

        {/* Centre target ring + crosshair */}
        <circle cx={CX} cy={CY2} r="26" fill="url(#coreGrad)"/>
        <circle cx={CX} cy={CY2} r="26" fill="none"
          stroke="rgba(255,202,102,0.22)" strokeWidth="1" strokeDasharray="4 7"/>
        <line x1={CX-22} y1={CY2} x2={CX-8} y2={CY2} stroke="rgba(255,202,102,0.50)" strokeWidth="1"/>
        <line x1={CX+8}  y1={CY2} x2={CX+22} y2={CY2} stroke="rgba(255,202,102,0.50)" strokeWidth="1"/>
        <line x1={CX} y1={CY2-22} x2={CX} y2={CY2-8}  stroke="rgba(255,202,102,0.50)" strokeWidth="1"/>
        <line x1={CX} y1={CY2+8}  x2={CX} y2={CY2+22} stroke="rgba(255,202,102,0.50)" strokeWidth="1"/>

        {/* PCB pin stubs — left & right */}
        {PINS.map((yf, i) => (
          <g key={`pin${i}`}>
            <line x1="0"  y1={yf*SZ} x2="12"    y2={yf*SZ} stroke={`rgba(255,202,102,${0.28+i*0.05})`} strokeWidth="1.5"/>
            <circle cx="-6" cy={yf*SZ} r="3.5" fill={`rgba(255,202,102,${0.5+i*0.05})`}/>
            <line x1={SZ} y1={yf*SZ} x2={SZ-12} y2={yf*SZ} stroke={`rgba(255,202,102,${0.28+i*0.05})`} strokeWidth="1.5"/>
            <circle cx={SZ+6} cy={yf*SZ} r="3.5" fill={`rgba(255,202,102,${0.5+i*0.05})`}/>
          </g>
        ))}

        {/* ─── Animated layers ────────────────────────────── */}

        {/* Frame 3 (second-innermost) — opacity pulse, delayed */}
        <motion.rect
          x={FRAMES[3][0]} y={FRAMES[3][0]}
          width={SZ-FRAMES[3][0]*2} height={SZ-FRAMES[3][0]*2}
          rx={FRAMES[3][1]} fill="none"
          stroke={`rgba(255,202,102,${FRAMES[3][3]})`} strokeWidth={FRAMES[3][2]}
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.55 }}
        />

        {/* Frame 4 innermost — stronger pulse */}
        <motion.rect
          x={FRAMES[4][0]} y={FRAMES[4][0]}
          width={SZ-FRAMES[4][0]*2} height={SZ-FRAMES[4][0]*2}
          rx={FRAMES[4][1]} fill="none"
          stroke="rgba(255,202,102,0.95)" strokeWidth="2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Innermost soft glow ring (blurred stroke behind frame 4) */}
        <motion.rect
          x={FRAMES[4][0]-3} y={FRAMES[4][0]-3}
          width={SZ-FRAMES[4][0]*2+6} height={SZ-FRAMES[4][0]*2+6}
          rx={FRAMES[4][1]+3} fill="none"
          stroke="rgba(255,202,102,0.4)" strokeWidth="10"
          style={{ filter: 'blur(7px)' }}
          animate={{ opacity: [0.2, 0.85, 0.2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Scan line (clipped to chip shape) */}
        <g clipPath="url(#chipClip)">
          <motion.rect
            x="0" y="0" width={SZ} height={26}
            fill="url(#scanGrad)"
            animate={{ y: [-26, SZ + 26] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', repeatDelay: 1.8 }}
          />
        </g>

        {/* Centre core dot — pulse in place */}
        <motion.circle cx={CX} cy={CY2} r="4" fill="rgba(255,224,140,0.95)"
          animate={{ r: [4, 8, 4], opacity: [0.95, 0.45, 0.95] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
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
