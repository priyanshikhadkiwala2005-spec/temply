import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { Link2, Gift } from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import { Reveal, Stagger } from '../ui/Reveal'
import { item } from '../ui/motion'

function MiniCreate() {
  return (
    <div className="relative h-28 overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_85%_15%,rgba(253,230,138,0.4)_0%,transparent_50%),linear-gradient(135deg,#701a75_0%,#0ea5e9_35%,#06b6d4_70%,#f59e0b_100%)] p-3 shadow-md">
      <div className="absolute -right-4 -top-4 h-14 w-14 rounded-full bg-white/20 blur-sm" />
      <p className="font-serif text-lg font-semibold text-white drop-shadow-xs">Happy Diwali</p>
      <div className="mt-2 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 flex-1 rounded-full bg-white/50 shadow-xs" />
        ))}
      </div>
      <div className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 text-[10px] font-semibold text-plum shadow-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-amber-400" />
        Your Business
      </div>
    </div>
  )
}
function MiniEngage() {
  return (
    <div className="h-28 rounded-xl border border-mist bg-white p-3 shadow-xs">
      <div className="flex items-center gap-2">
        <span className="festive-animated-bg grid h-8 w-8 place-items-center rounded-lg font-serif text-sm font-bold text-white shadow-xs">
          B
        </span>
        <div>
          <p className="text-xs font-semibold text-plum">Sample Business</p>
          <p className="text-[10px] text-muted">Offer · Festival special</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-mist/70 px-2 py-2 text-[11px] font-semibold text-plum">
        <Link2 size={12} aria-hidden="true" /> Visit website
      </div>
    </div>
  )
}
function MiniReward() {
  return (
    <div className="h-28 rounded-xl border border-mist bg-white p-3 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-plum">
          <Gift size={14} className="festive-color-cycle" aria-hidden="true" /> Points
        </span>
        <span className="festive-animated-text font-serif text-xl font-bold">100</span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-mist/80">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '60%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="h-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 via-cyan-500 to-amber-400 shadow-[0_0_8px_rgba(99,102,241,0.45)]"
        />
      </div>
      <p className="mt-2 text-[10px] text-muted">Sample progress to next reward</p>
    </div>
  )
}

const STEPS = [
  { n: '01', title: 'Create', text: 'Explore festival templates and prepare promotional content.', Mini: MiniCreate },
  { n: '02', title: 'Engage', text: 'Present business promotions and encourage customer interaction.', Mini: MiniEngage },
  { n: '03', title: 'Reward', text: 'Showcase the rewards and referral experience.', Mini: MiniReward },
]

/* Mobile only: chhota sa diya jo timeline par step aate hi jal uthta hai */
function Diya({ on }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-[1.075rem] top-3 -translate-x-1/2 md:hidden"
    >
      <motion.span
        className="absolute left-1/2 top-[-0.2rem] h-12 w-12 -translate-x-1/2 rounded-full bg-amber-400/40 blur-md"
        initial={false}
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
      />
      <motion.svg
        width="16"
        height="22"
        viewBox="0 0 16 22"
        className="absolute left-1/2 top-[-1.15rem] -translate-x-1/2 overflow-visible"
        initial={false}
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0, y: on ? 0 : 6 }}
        transition={{ type: 'spring', stiffness: 380, damping: 16 }}
        style={{ originY: 1 }}
      >
        <g className="diya-flame">
          <path d="M8 1 C13 8 13 13 8 21 C3 13 3 8 8 1 Z" fill="url(#hiw-flame)" />
          <path d="M8 9 C10.5 12.5 10.5 15 8 19 C5.5 15 5.5 12.5 8 9 Z" fill="#fffbeb" />
        </g>
        <defs>
          <linearGradient id="hiw-flame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fef08a" />
            <stop offset="0.5" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </motion.svg>
    </span>
  )
}

const STEP_ACCENTS = [
  {
    dotBg: 'bg-gradient-to-br from-blue-600 to-sky-600',
    dotShadow: 'shadow-[0_0_0_2px_#0ea5e9,0_0_12px_rgba(14,165,233,0.65)]',
    delay: '0s',
  },
  {
    dotBg: 'bg-gradient-to-br from-sky-500 to-cyan-500',
    dotShadow: 'shadow-[0_0_0_2px_#22d3ee,0_0_12px_rgba(34,211,238,0.65)]',
    delay: '-2s',
  },
  {
    dotBg: 'bg-gradient-to-br from-cyan-500 to-amber-400',
    dotShadow: 'shadow-[0_0_0_2px_#f59e0b,0_0_12px_rgba(245,158,11,0.65)]',
    delay: '-4s',
  },
]

export default function HowItWorks() {
  const lineRef = useRef(null)
  const reduced = useReducedMotion()
  const [litCount, setLitCount] = useState(reduced ? STEPS.length : 0)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 72%', 'end 62%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0, 1])
  const headTop = useTransform(scrollYProgress, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = STEPS.filter((_, k) => v >= k / STEPS.length - 0.01 && v > 0.005).length
    setLitCount((c) => (reduced ? STEPS.length : Math.max(c, n)))
  })

  return (
    <section id="how-it-works" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="festive-animated-text mt-5 inline-block pb-1 pr-2 font-serif text-[clamp(1.85rem,3.4vw,3.15rem)] font-semibold leading-[1.15] tracking-tight lg:whitespace-nowrap">
              Three steps from idea to reward
            </h2>
          </Reveal>
        </div>

        <div ref={lineRef} className="relative mt-16">
          {/* desktop horizontal line: multi-color festive gradient */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[5.6rem] hidden h-[2.5px] origin-left rounded-full bg-gradient-to-r from-blue-600 via-sky-500 via-cyan-500 via-amber-400 to-amber-500 shadow-[0_0_12px_rgba(99,102,241,0.5)] md:block"
          />
          {/* mobile vertical line: scroll ke saath "bati" ki tarah jalti hai */}
          <div aria-hidden="true" className="absolute bottom-0 left-[1.05rem] top-4 w-[2px] bg-mist md:hidden" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-[calc(1.05rem-0.5px)] top-4 w-[2.5px] origin-top rounded-full bg-gradient-to-b from-blue-600 via-sky-500 via-cyan-500 to-amber-400 shadow-[0_0_10px_rgba(99,102,241,0.5)] md:hidden"
          />
          {/* jalti hui chingari (line ka head) */}
          {!reduced && (
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[1.05rem] top-4 md:hidden">
              <motion.span
                style={{ top: headTop }}
                className="absolute left-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fff_0_25%,#fde68a_45%,rgba(245,158,11,0)_72%)] shadow-[0_0_12px_5px_rgba(251,191,36,0.55)]"
              />
            </div>
          )}
          <Stagger className="grid gap-12 md:grid-cols-3 md:gap-8">
            {STEPS.map(({ n, title, text, Mini }, k) => (
              <motion.div key={n} variants={item} className="relative pl-12 md:pl-0">
                <Diya on={k < litCount} />
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-3 h-[2.15rem] w-[2.15rem] rounded-full border-4 border-white ${STEP_ACCENTS[k]?.dotBg} ${STEP_ACCENTS[k]?.dotShadow} md:top-[5.05rem] md:h-4 md:w-4 md:border-[3px] md:left-0`}
                />
                <p
                  className="festive-animated-text inline-block pb-1 pr-2 font-serif text-6xl font-semibold leading-none md:text-7xl md:pt-0"
                  style={{ animationDelay: STEP_ACCENTS[k]?.delay }}
                >
                  {n}
                </p>
                <h3 className="mt-5 font-serif text-2xl font-semibold text-plum md:mt-12">{title}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-muted">{text}</p>
                <div className="mt-6 max-w-xs" aria-hidden="true">
                  <Mini />
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
