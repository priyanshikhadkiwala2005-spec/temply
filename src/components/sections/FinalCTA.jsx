import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react'
import { Reveal } from '../ui/Reveal'

const celebrate = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Brand blue, sky and white palette
  const colors = ['#0a2a8f', '#1f5ae6', '#6aa8ff', '#dbe9ff', '#ffffff']
  confetti({ particleCount: 95, spread: 80, origin: { x: 0.3, y: 0.6 }, colors })
  confetti({ particleCount: 95, spread: 80, origin: { x: 0.7, y: 0.6 }, colors })
}

/* ------------------------------------------------------------------ */
/*  FESTIVAL POSTER DECK                                              */
/*  Posters  public/poster/  folder se aa rahe hain.                  */
/*  Naya poster add karna ho to us folder me image rakho aur neeche   */
/*  list me ek line add kar do (kam se kam 3 posters rakhna).         */
/* ------------------------------------------------------------------ */
const POSTERS = [
  { id: 'diwali', src: '/poster/Diwali.webp', alt: 'Happy Diwali festival poster' },
  { id: 'holi', src: '/poster/Holi.webp', alt: 'Happy Holi festival poster' },
  { id: 'rakhi', src: '/poster/Raksha%20Bandhan.webp', alt: 'Happy Rakhi festival poster' },
  { id: 'eid', src: '/poster/Eid.webp', alt: 'Eid Mubarak festival poster' },
  { id: 'navratri', src: '/poster/Navratri.webp', alt: 'Happy Navratri festival poster' },
]

function PosterFace({ p, priority }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[20px]"
      style={{ background: 'linear-gradient(160deg,#1f5ae6 0%,#0a2a8f 55%,#0a1f6b 100%)' }}
    >
      <img
        src={p.src}
        alt={p.alt}
        draggable={false}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
        className="absolute inset-0 h-full w-full select-none object-cover"
      />
      {/* Soft inner edge so every poster sits cleanly on the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/25"
      />
    </div>
  )
}

// Auto-rotating 3D festival poster deck (replaces the old rangoli sphere)
function FestivalPosterDeck() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = POSTERS.length

  // Smooth mouse tilt spring (same behaviour as before)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 })

  const handlePointerMove = (e) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x * 24)
    mouseY.set(-y * 24)
  }

  const handlePointerLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setPaused(false)
  }

  // Automatic rotation: next poster every 3.2s, pauses while hovering
  useEffect(() => {
    if (reduced || paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % n), 3200)
    return () => clearInterval(id)
  }, [reduced, paused, n])

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      className="relative mx-auto flex h-[380px] w-full max-w-[460px] items-center justify-center select-none sm:h-[420px]"
      style={{ perspective: 1100 }}
    >
      {/* 3D Tilted Wrapper */}
      <motion.div
        style={{
          rotateY: springX,
          rotateX: springY,
          transformStyle: 'preserve-3d',
        }}
        className="relative flex h-full w-full items-center justify-center"
      >
        {/* Luminous aura behind the deck (Pure White & Lavender) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-56 w-56 rounded-full bg-gradient-to-br from-white/30 via-lav/40 to-transparent blur-3xl animate-pulse"
        />

        {/* Soft stage ring under the posters */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[58px] h-10 w-[300px] rounded-[50%] border border-white/25 bg-white/10 blur-[1px] sm:bottom-[70px]"
          style={{ transform: 'rotateX(70deg)' }}
        />

        {/* POSTER CAROUSEL */}
        {POSTERS.map((p, i) => {
          let d = (i - active + n) % n
          if (d > n / 2) d -= n
          const abs = Math.abs(d)
          const isActive = d === 0

          return (
            <motion.button
              key={p.id}
              type="button"
              aria-label={`Show ${p.alt}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => setActive(i)}
              initial={false}
              animate={{
                x: d * (abs === 2 ? 82 : 112),
                z: -abs * 70,
                scale: 1 - abs * 0.15,
                rotateY: -d * 34,
                opacity: abs === 0 ? 1 : abs === 1 ? 0.88 : abs === 2 ? 0.45 : 0,
              }}
              transition={{ type: 'spring', stiffness: 85, damping: 17, mass: 0.9 }}
              className="absolute h-[262px] w-[182px] cursor-pointer rounded-[20px] border border-white/60 bg-white/10 p-0 outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-[290px] sm:w-[204px]"
              style={{
                zIndex: 10 - abs,
                pointerEvents: abs > 2 ? 'none' : 'auto',
                transformStyle: 'preserve-3d',
                boxShadow: isActive
                  ? '0 34px 60px -18px rgba(25,6,32,0.65), 0 0 40px rgba(238,221,245,0.35)'
                  : '0 20px 40px -18px rgba(25,6,32,0.55)',
              }}
            >
              <motion.div
                className="relative h-full w-full overflow-hidden rounded-[20px]"
                animate={isActive && !reduced ? { y: [0, -7, 0] } : { y: 0 }}
                transition={
                  isActive && !reduced
                    ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.4 }
                }
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  draggable="false"
                  loading="eager"
                  className="h-full w-full rounded-[20px] object-cover"
                />

                {/* Light sweep across the front poster */}
                {isActive && !reduced && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    initial={{ x: '0%' }}
                    animate={{ x: '320%' }}
                    transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.5 }}
                  />
                )}
              </motion.div>
            </motion.button>
          )
        })}

        {/* Deck indicator: template counter + dots */}
        <div className="absolute bottom-0 left-1 z-20 flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur-md sm:left-2">
          <span className="text-[10px] font-semibold text-white">
            Template {String(active + 1).padStart(2, '0')}/{String(n).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1">
            {POSTERS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to ${p.alt}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function FinalCTA() {
  return (
    <section className="bg-pale px-5 pb-20 max-md:pt-16 md:px-8 lg:pb-28">
      {/* Container: Vibrant Festive Gradient with Soft Light Orange & Warm Glow */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[radial-gradient(ellipse_at_92%_8%,rgba(251,191,36,0.40)_0%,transparent_42%),radial-gradient(ellipse_at_6%_6%,rgba(168,85,247,0.48)_0%,transparent_46%),radial-gradient(ellipse_at_70%_55%,rgba(236,72,153,0.32)_0%,transparent_44%),radial-gradient(ellipse_at_96%_100%,rgba(52,211,153,0.50)_0%,transparent_46%),radial-gradient(ellipse_at_12%_95%,rgba(34,211,238,0.48)_0%,transparent_50%),linear-gradient(135deg,#1e1b6e_0%,#1d3fb8_28%,#2563eb_54%,#0ea5e9_82%,#5eead4_100%)] p-1 shadow-[0_30px_70px_-20px_rgba(29,78,216,0.45)]">
        {/* Subtle Ambient Grain & Festive Colorful Glow Flares */}
        <div aria-hidden="true" className="grain absolute inset-0 opacity-25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-amber-300/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 top-0 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl"
        />

        <div className="relative grid items-center gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-14 lg:py-18">
          {/* LEFT COLUMN: CRISP VALUE PROPOSITION & ACTIONS */}
          <div className="relative z-10 max-w-xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
                <Sparkles size={12} className="text-mist" />
                <span>FREE SIGN-UP · 100 POINTS INSTANT BONUS</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="festive-shimmer-text mt-4 inline-block pb-1 pr-2 font-serif text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                One Platform.{' '}
                <span className="underline decoration-white/40 underline-offset-8">
                  Complete Growth.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-4 text-base leading-relaxed text-mist/95 sm:text-lg">
                Create festival posts, showcase your business catalogue, and activate a transparent{' '}
                <strong className="font-semibold text-white">30% + 5% two-level referral engine</strong>{' '}
                — all from one single verified account.
              </p>
            </Reveal>

            {/* SRS Key Pillars Checklist */}
            <Reveal delay={0.2}>
              <ul className="mt-6 space-y-2.5">
                {[
                  'Instant 100 Welcome Points credited on free registration (SRS 9.1)',
                  '365-Day business membership validity with verified status (SRS 7.1)',
                  'Two-level referral network: 30% direct & 5% indirect payouts (SRS 8.1)',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-plum shadow-sm">
                      <Check size={12} strokeWidth={2.8} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Pure White High-Contrast CTA Buttons */}
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={celebrate}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-white px-7 py-3.5 text-sm sm:text-base font-bold text-plum shadow-[0_20px_40px_-10px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.03] hover:bg-mist active:scale-95"
                >
                  <Sparkles size={18} className="text-brand transition-transform group-hover:rotate-12" />
                  <span>Claim Your Free 100 Points</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#showcase"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50"
                >
                  Explore Showcase
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: AUTO-ROTATING 3D FESTIVAL POSTER DECK (PURE PURPLE & WHITE) */}
          <div className="relative mx-auto flex w-full items-center justify-center">
            <FestivalPosterDeck />
          </div>
        </div>
      </div>
    </section>
  )
}
