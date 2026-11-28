import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  FESTIVAL STAGE  ("poster deck")                                   */
/*  Real posters ka swipeable stack:                                  */
/*  - Upar wala poster drag / swipe karo -> peeche chala jaata hai    */
/*  - Auto-advance bhi chalta hai; manual karne par timer restart     */
/*  - Har poster par "aapka business" strip (logo + naam + number)    */
/*    -> product ka asli kaam dikhata hai                             */
/*  - Peeche ka glow + bada ghost-text festival ke saath badalta hai  */
/*  Naya poster: public/poster/ me webp daalo, FESTIVALS me add karo. */
/* ------------------------------------------------------------------ */

const FESTIVALS = [
  { id: 'diwali', name: 'Happy Diwali', chip: 'Diwali', tag: 'Festival of Lights', src: '/poster/Diwali-reel.webp', glow: '#f59e0b', biz: 'Sharma Sweets', initial: 'S' },
  { id: 'navratri', name: 'Happy Navratri', chip: 'Navratri', tag: 'Nine Sacred Nights', src: '/poster/Navratri-reel.webp', glow: '#b45309', biz: 'Kalyan Gems', initial: 'K' },
  { id: 'rakhi', name: 'Happy Raksha Bandhan', chip: 'Raksha Bandhan', tag: 'Thread of Love', src: '/poster/Raksha-Bandhan-reel.webp', glow: '#4f46e5', biz: 'Anand Gifts', initial: 'A' },
  { id: 'christmas', name: 'Merry Christmas', chip: 'Christmas', tag: 'Season of Joy', src: '/poster/Christmas.webp', glow: '#65a30d', biz: 'Starlight Café', initial: 'S' },
  { id: 'onam', name: 'Happy Onam', chip: 'Onam', tag: 'Harvest of Kerala', src: '/poster/Onam.webp', glow: '#818cf8', biz: 'Kerala Mart', initial: 'K' },
  { id: 'pongal', name: 'Happy Pongal', chip: 'Pongal', tag: 'Harvest Thanksgiving', src: '/poster/Pongal.webp', glow: '#fbbf24', biz: 'Murugan Silk', initial: 'M' },
  { id: 'holi', name: 'Happy Holi', chip: 'Holi', tag: 'Festival of Colours', src: '/poster/Holi.webp', glow: '#60a5fa', biz: 'Apex Studio', initial: 'A' },
  { id: 'eid', name: 'Eid Mubarak', chip: 'Eid', tag: 'Blessings & Prosperity', src: '/poster/Eid-reel.webp', glow: '#d97706', biz: 'Al-Madina', initial: 'M' },
]

const N = FESTIVALS.length
const AUTOPLAY_MS = 3800

/* Stack slot (0 = top) -> resting pose */
const SLOT = [
  { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
  { x: 26, y: 12, scale: 0.94, rotate: 5, opacity: 1 },
  { x: -26, y: 22, scale: 0.88, rotate: -5, opacity: 1 },
  { x: 14, y: 32, scale: 0.82, rotate: 9, opacity: 0.9 },
]

function Poster({ item, slot, dir, dragX, onTap, near }) {
  const top = slot === 0
  const gone = slot === N - 1 // abhi-abhi hata hua poster: side me ud kar gayab
  // sirf dikhne wale (aur agla / pichhla) poster pehle se load karo
  const preload = near && (slot < 4 || gone)
  const pose = gone
    ? { x: dir * 340, y: -10, scale: 0.96, rotate: dir * 16, opacity: 0 }
    : (SLOT[slot] ?? { ...SLOT[3], scale: 0.76, opacity: 0 })

  // Drag ke saath top poster tilt hota hai (sirf top par use hota hai)
  const dragRotate = useTransform(dragX, [-220, 0, 220], [-10, 0, 10])

  return (
    <motion.div
      style={{ x: top ? dragX : 0, rotate: top ? dragRotate : 0, zIndex: 20 - slot }}
      className="absolute inset-0"
    >
      <motion.button
        type="button"
        onClick={top ? undefined : onTap}
        tabIndex={top ? -1 : slot < 3 ? 0 : -1}
        aria-hidden={slot > 2 ? true : undefined}
        aria-label={top ? `${item.name} poster` : `Show ${item.name} poster`}
        initial={false}
        animate={pose}
        transition={{ type: 'spring', stiffness: 190, damping: 22, mass: 0.9 }}
        style={{ pointerEvents: slot < 3 ? 'auto' : 'none' }}
        className="relative block h-full w-full overflow-hidden rounded-[1.6rem] bg-white p-1.5 text-left shadow-[0_30px_60px_-22px_rgba(6,21,74,0.6)] ring-1 ring-black/5 sm:rounded-[2rem] sm:p-2"
      >
        <img
          src={item.src}
          alt={item.name}
          width={760}
          height={1075}
          loading={preload ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          className="pointer-events-none h-full w-full select-none rounded-[1.2rem] object-cover sm:rounded-[1.6rem]"
        />

        {/* "Your business" strip - product ka asli kaam */}
        <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
          <div className="flex items-center gap-2 rounded-xl border border-white/25 bg-plum/80 px-2.5 py-2 text-white shadow-lg backdrop-blur-md">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 font-serif text-sm font-black text-plum">
              {item.initial}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-bold leading-tight sm:text-sm">{item.biz}</span>
              <span className="block truncate text-[10px] leading-tight text-white/70">+91 98XXX XXXXX</span>
            </span>
            <span className="hidden shrink-0 rounded-md bg-white/20 px-1.5 py-0.5 text-[9px] min-[400px]:block font-bold uppercase tracking-wider">
              Your brand
            </span>
          </div>
        </div>

        {top && <span aria-hidden="true" className="stage-sheen pointer-events-none absolute inset-2 rounded-[1.2rem] sm:rounded-[1.6rem]" />}
      </motion.button>
    </motion.div>
  )
}

export default function FestivalStage() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const [tick, setTick] = useState(0) // har manual action par badhta hai -> autoplay timer reset
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const wheelLock = useRef(0)
  const dragX = useMotionValue(0)
  const inView = useInView(rootRef, { amount: 0.35 })
  const near = useInView(rootRef, { once: true, margin: '900px 0px' })
  const current = FESTIVALS[active]

  const step = useCallback((d) => {
    setDir(d)
    setActive((a) => (a + d + N) % N)
  }, [])
  const manual = useCallback((d) => { step(d); setTick((t) => t + 1) }, [step])
  const select = useCallback((i) => {
    setActive((a) => { setDir(i >= a ? 1 : -1); return i })
    setTick((t) => t + 1)
  }, [])

  // Auto-advance (offscreen / reduced-motion par band)
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => step(1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [inView, step, tick])

  // Trackpad / shift+wheel horizontal scroll; vertical scroll page ko normal chalta hai
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0
      if (Math.abs(dx) < 8) return
      e.preventDefault()
      const now = Date.now()
      if (now - wheelLock.current < 380) return
      wheelLock.current = now
      manual(dx > 0 ? 1 : -1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [manual])

  // Mouse drag + touch swipe: top poster ungli ke saath chalta hai
  const onPan = (_, info) => dragX.set(info.offset.x)
  const onPanEnd = (_, info) => {
    const fling = info.offset.x < -70 || info.velocity.x < -500 ? 1 : info.offset.x > 70 || info.velocity.x > 500 ? -1 : 0
    if (fling) manual(fling)
    animate(dragX, 0, { type: 'spring', stiffness: 260, damping: 28 })
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') manual(1)
    else if (e.key === 'ArrowLeft') manual(-1)
    else return
    e.preventDefault()
  }

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="Festival posters you can create"
      onKeyDown={onKeyDown}
      className="relative overflow-hidden border-y border-mist bg-white pt-10 pb-28 sm:pt-14 sm:pb-36 lg:pt-16 lg:pb-44"
    >
      <style>{`
        @keyframes stage-sheen-sweep {
          0%, 55% { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
          65% { opacity: 1; }
          100% { transform: translateX(260%) skewX(-18deg); opacity: 0; }
        }
        .stage-sheen { overflow: hidden; }
        .stage-sheen::after {
          content: ''; position: absolute; inset: 0; width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: stage-sheen-sweep 4.5s ease-in-out infinite;
        }
        @keyframes stage-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .stage-progress { transform-origin: left; animation: stage-progress ${AUTOPLAY_MS}ms linear forwards; }
        @media (prefers-reduced-motion: reduce) {
          .stage-sheen::after { animation: none; }
          .stage-progress { animation: none; transform: scaleX(1); }
        }
      `}</style>

      {/* Per-festival glow + ghost text */}
      <AnimatePresence>
        <motion.div
          key={current.id}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ background: `radial-gradient(ellipse 60% 70% at 70% 50%, ${current.glow}45, transparent 70%)` }}
        >
          <span
            className="absolute -bottom-[0.06em] left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-[26vw] font-black uppercase leading-none tracking-tighter lg:text-[15vw]"
            style={{ color: current.glow, opacity: 0.1 }}
          >
            {current.id === 'rakhi' ? 'Rakhi' : current.chip}
          </span>
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        {/* Poster deck */}
        <motion.div
          ref={stageRef}
          onPan={onPan}
          onPanEnd={onPanEnd}
          style={{ touchAction: 'pan-y' }}
          className="relative order-1 mx-auto min-w-0 w-[min(66vw,300px)] cursor-grab select-none active:cursor-grabbing sm:w-[300px] lg:order-2 lg:w-[340px]"
        >
          <div className="relative aspect-[5/7] w-full">
            {FESTIVALS.map((item, i) => (
              <Poster
                key={item.id}
                item={item}
                slot={(i - active + N) % N}
                dir={dir}
                dragX={dragX}
                onTap={() => select(i)}
                near={near}
              />
            ))}
          </div>
          <p aria-hidden="true" className="mt-12 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted sm:mt-14 lg:hidden">
            ← Swipe the poster →
          </p>
        </motion.div>

        {/* Copy + controls */}
        <div className="order-2 min-w-0 text-center lg:order-1 lg:text-left" aria-live="polite">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            <Sparkles size={13} aria-hidden="true" /> Ready-made festival posters
          </p>
          <div className="mt-4 min-h-[8.5rem] sm:min-h-[9.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">{current.tag}</p>
                <h3 className="festive-animated-text mt-1.5 inline-block pb-1 pr-2 font-serif text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  {current.name}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-base text-ink/80 lg:mx-0">
                  Your logo, name and number go on automatically. Pick the poster, share it in one tap.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
            <button
              type="button"
              onClick={() => manual(-1)}
              aria-label="Previous poster"
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-plum shadow-md ring-1 ring-mist transition hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <div className="w-24 sm:w-32" aria-hidden="true">
              <p className="mb-1.5 text-center font-mono text-xs font-bold text-plum">
                {String(active + 1).padStart(2, '0')} <span className="text-muted">/ {String(N).padStart(2, '0')}</span>
              </p>
              <div className="h-1 overflow-hidden rounded-full bg-mist">
                <div key={`${active}-${tick}`} className="stage-progress h-full rounded-full bg-brand" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => manual(1)}
              aria-label="Next poster"
              className="grid h-11 w-11 place-items-center rounded-full bg-plum text-white shadow-md transition hover:scale-105 active:scale-95"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>

          <div
            role="tablist"
            aria-label="Choose a festival"
            className="no-scrollbar -mx-5 mt-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 lg:justify-start"
          >
            {FESTIVALS.map((f, i) => {
              const on = i === active
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => select(i)}
                  className={`shrink-0 snap-start rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm sm:first:ml-0 ${
                    on ? 'bg-plum text-white shadow-md' : 'bg-pale text-plum ring-1 ring-mist hover:bg-mist'
                  } max-sm:first:ml-0`}
                >
                  {f.chip}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
