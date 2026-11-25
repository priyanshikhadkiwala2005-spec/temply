import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import Phone from '../ui/Phone'
import Blob from '../ui/Blob'
import { Reveal } from '../ui/Reveal'
import { TABS } from '../../data/showcase'
import { useIsMobile } from '../../mobile/useIsMobile'

export default function Showcase({ active, setActive }) {
  const refs = useRef({})
  const current = TABS.find((t) => t.id === active) ?? TABS[0]
  const { Screen } = current
  const mobile = useIsMobile()

  // Mobile only: phone ko left/right swipe karke tabs badlo (card swipe feel)
  const swipeTo = (dir) => {
    const i = TABS.findIndex((t) => t.id === active)
    setActive(TABS[(i + dir + TABS.length) % TABS.length].id)
  }
  const onDragEnd = (_, info) => {
    if (info.offset.x < -50 || info.velocity.x < -450) swipeTo(1)
    else if (info.offset.x > 50 || info.velocity.x > 450) swipeTo(-1)
  }

  const onKeyDown = (e) => {
    const i = TABS.findIndex((t) => t.id === active)
    let n = null
    if (e.key === 'ArrowRight') n = (i + 1) % TABS.length
    if (e.key === 'ArrowLeft') n = (i - 1 + TABS.length) % TABS.length
    if (e.key === 'Home') n = 0
    if (e.key === 'End') n = TABS.length - 1
    if (n === null) return
    e.preventDefault()
    setActive(TABS[n].id)
    refs.current[TABS[n].id]?.focus()
  }

  return (
    <section
      id="showcase"
      className="on-dark relative flex flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_90%_8%,rgba(251,191,36,0.42)_0%,transparent_42%),radial-gradient(ellipse_at_8%_10%,rgba(168,85,247,0.50)_0%,transparent_46%),radial-gradient(ellipse_at_92%_60%,rgba(236,72,153,0.38)_0%,transparent_44%),radial-gradient(ellipse_at_10%_92%,rgba(34,211,238,0.50)_0%,transparent_50%),radial-gradient(ellipse_at_85%_95%,rgba(52,211,153,0.45)_0%,transparent_46%),radial-gradient(ellipse_at_50%_50%,rgba(37,99,235,0.50)_0%,transparent_60%),linear-gradient(160deg,#1e1b6e_0%,#1d3fb8_30%,#2563eb_55%,#0ea5e9_80%,#5eead4_100%)] py-10 max-md:pt-16 max-md:pb-12 sm:py-14 lg:min-h-screen text-white"
    >
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-25" />

      {/* Multi-color ambient background glow shadows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-sky-400/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 bottom-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 -top-10 h-80 w-80 rounded-full bg-fuchsia-400/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-10 bottom-1/3 h-72 w-72 rounded-full bg-violet-400/25 blur-3xl"
      />

      {/* Decorative soft colorful morphing blobs */}
      <Blob
        className="-left-32 top-10 h-[420px] w-[420px] opacity-25"
        gradient="linear-gradient(135deg, #38bdf8 0%, #2563eb 55%, #6366f1 100%)"
        duration={28}
      />
      <Blob
        className="-right-24 bottom-0 h-[360px] w-[360px] opacity-25"
        gradient="linear-gradient(135deg, #22d3ee 0%, #fbbf24 70%, #fde68a 100%)"
        duration={22}
      />

      <div className="relative mx-auto my-auto w-full max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow light>Product showcase</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="festive-shimmer-text mt-2 inline-block pb-1 pr-2 font-serif text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-[2.6rem]">
              Simple Tools. Meaningful Engagement.
            </h2>
          </Reveal>
        </div>

        <div
          role="tablist"
          aria-label="Festivo product areas"
          onKeyDown={onKeyDown}
          className="no-scrollbar -mx-5 mt-4 flex snap-x gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:mt-4 md:justify-center md:px-0"
        >
          {TABS.map(({ id, label, icon: Icon }) => {
            const on = id === active
            return (
              <button
                key={id}
                ref={(el) => (refs.current[id] = el)}
                role="tab"
                id={`tab-${id}`}
                aria-selected={on}
                aria-controls="showcase-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(id)}
                className={`relative flex min-h-10 shrink-0 snap-start items-center gap-2 rounded-xl px-4 py-1.5 text-sm font-semibold transition-colors ${
                  on ? 'text-plum font-bold' : 'text-mist hover:text-white hover:bg-white/10'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl bg-white shadow-lg"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id="showcase-panel"
          aria-labelledby={`tab-${active}`}
          className="mt-4 grid items-center gap-6 md:mt-5 lg:grid-cols-2 lg:gap-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current.id}`}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.35 }}
              className="order-2 lg:order-1 lg:pl-8"
            >
              <h3 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">{current.title}</h3>
              <p className="mt-4 max-w-lg text-lg sm:text-xl leading-relaxed text-mist">{current.desc}</p>
              <ul className="mt-6 sm:mt-7 space-y-3.5">
                {current.points.map((p) => (
                  <li key={p} className="flex items-center gap-3.5 text-base sm:text-lg font-medium text-white">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20 text-white backdrop-blur-xs">
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="order-1 flex flex-col items-center lg:order-2">
            <motion.div
              drag={mobile ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.45}
              dragSnapToOrigin
              onDragEnd={mobile ? onDragEnd : undefined}
              whileDrag={{ rotate: -2, scale: 0.98 }}
              style={mobile ? { touchAction: 'pan-y' } : undefined}
              className="relative [--ps:0.72] sm:[--ps:0.75] md:[--ps:0.78] lg:[--ps:0.78] xl:[--ps:0.82]">
              <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-white/25 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`phone-${current.id}`}
                  initial={{ opacity: 0, y: 24, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <Phone label={`${current.label} screen preview`}>
                    <Screen />
                  </Phone>
                  {current.chips.map(([k, v], i) => (
                    <motion.div
                      key={k}
                      animate={{ y: [0, i ? 8 : -8, 0] }}
                      transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
                      className={`absolute z-10 hidden sm:block ${
                        i ? 'bottom-14 left-full ml-8 sm:ml-10' : 'right-full top-20 mr-8 sm:mr-10'
                      }`}
                    >
                      <div className="whitespace-nowrap rounded-xl border border-white/30 bg-white/95 px-3.5 py-2.5 text-plum shadow-[0_20px_40px_-15px_rgba(0,0,0,0.45)]">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{k}</p>
                        <p className="font-serif text-base font-semibold leading-tight">{v}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            {mobile && (
              <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-mist" aria-hidden="true">
                <span className="swipe-hint">←</span>
                <span className="flex items-center gap-1.5">
                  {TABS.map((t) => (
                    <span
                      key={t.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${t.id === active ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`}
                    />
                  ))}
                </span>
                <span>Swipe to explore</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
