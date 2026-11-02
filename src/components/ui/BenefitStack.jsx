import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { Sparkles, BadgeCheck, Coins } from 'lucide-react'

const WORDS = ['Happy Diwali', 'Happy Holi', 'Eid Mubarak', 'Merry Christmas']

function Typewriter() {
  const reduced = useReducedMotion()
  const [w, setW] = useState(0)
  const [n, setN] = useState(reduced ? WORDS[0].length : 0)

  useEffect(() => {
    if (reduced) return
    const word = WORDS[w]
    const t = setTimeout(
      () => (n < word.length ? setN(n + 1) : (setW((w + 1) % WORDS.length), setN(0))),
      n < word.length ? 110 : 1400,
    )
    return () => clearTimeout(t)
  }, [n, w, reduced])

  return (
    <div className="flex h-16 w-24 shrink-0 items-center rounded-xl bg-gradient-to-br from-plum via-brand to-lav p-2 shadow-inner">
      <p className="font-serif text-[13px] font-bold leading-tight">
        <span className="festive-bright-text inline-block">
          {WORDS[w].slice(0, n)}
        </span>
        <span className="ml-0.5 inline-block h-3.5 w-[1.5px] animate-pulse bg-amber-300 align-middle shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
      </p>
    </div>
  )
}

function Shimmer() {
  return (
    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-plum to-brand p-2.5 shadow-inner">
      <BadgeCheck size={14} className="festive-bright-cycle" aria-hidden="true" />
      <p className="mt-3 text-[10px] font-extrabold tracking-wider">
        <span className="festive-bright-text inline-block">MEMBER</span>
      </p>
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 -left-10 w-8 -skew-x-12 bg-white/30"
        animate={{ x: [0, 160] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
      />
    </div>
  )
}

function Counter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, 100, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView])
  return (
    <div ref={ref} className="h-16 w-24 shrink-0 rounded-xl bg-mist p-2.5 shadow-inner">
      <p className="font-serif text-2xl font-bold leading-none">
        <span className="festive-animated-text inline-block">{n}</span>
      </p>
      <p className="mt-0.5 text-[9px] font-medium text-muted">sample pts</p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white shadow-inner">
        <div
          className="festive-progress-flow h-full rounded-full transition-[width] duration-100 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
          style={{ width: `${n}%` }}
        />
      </div>
    </div>
  )
}

const CARDS = [
  { Icon: Sparkles, t: 'Festive posts', d: 'Templates in every festival mood', Visual: Typewriter },
  { Icon: BadgeCheck, t: 'Membership', d: 'One clear member profile', Visual: Shimmer },
  { Icon: Coins, t: 'Rewards', d: 'Points you can follow', Visual: Counter },

]

export default function BenefitStack() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] py-4" role="img" aria-label="Preview of festive posts, membership, and rewards features">
      <motion.div
        aria-hidden="true"
        className="absolute -inset-4 -z-0 rounded-[2.5rem] bg-gradient-to-br from-mist via-lav/30 to-mist"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative space-y-4 p-2">
        {CARDS.map(({ Icon, t, d, Visual }, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={i % 2 ? 'ml-6 sm:ml-12' : 'mr-6 sm:mr-12'}
          >
            <motion.div
              animate={{ y: [0, i % 2 ? 6 : -6, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-4 rounded-2xl border border-white bg-white p-3 pr-4 shadow-[0_25px_45px_-22px_rgba(84,36,95,0.55)]"
            >
              <Visual />
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 font-serif text-lg font-semibold text-plum">
                  <Icon size={16} className="festive-color-cycle" aria-hidden="true" /> {t}
                </p>
                <p className="mt-0.5 text-sm text-muted">{d}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
