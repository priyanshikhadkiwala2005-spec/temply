import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Sparkles, Palette, Share2, Coins, CheckCircle2, Wand2 } from 'lucide-react'

const FESTIVALS = [
  {
    id: 'diwali',
    name: 'Diwali',
    emoji: '🪔',
    badge: 'Grand Lights',
    title: 'Happy Diwali & Prosperity',
    subtitle: 'Wishing your family & business radiant growth, divine light and endless joy!',
    bgGradient: 'from-[#0a1f6b] via-[#1d4ed8] to-[#0ea5e9]',
    accent: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.45)',
    business: 'Sharma Sweets & Cafe',
    category: 'Gourmet Treats · Since 1998',
  },
  {
    id: 'holi',
    name: 'Holi',
    emoji: '🎨',
    badge: 'Color Blast',
    title: 'Vibrant Happy Holi',
    subtitle: 'Celebrate the splash of togetherness, sweet gujiyas and bright new beginnings!',
    bgGradient: 'from-[#0b1f6e] via-[#2563eb] to-[#22d3ee]',
    accent: '#6366f1',
    glow: 'rgba(99,102,241, 0.45)',
    business: 'Sharma Sweets & Cafe',
    category: 'Gourmet Treats · Since 1998',
  },
  {
    id: 'eid',
    name: 'Eid',
    emoji: '🌙',
    badge: 'Divine Blessings',
    title: 'Eid Mubarak & Peace',
    subtitle: 'May this sacred celebration bring peace, abundant blessings and warmth to all.',
    bgGradient: 'from-[#0b1b3c] via-[#1e3a8a] to-[#0e7490]',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.45)',
    business: 'Sharma Sweets & Cafe',
    category: 'Gourmet Treats · Since 1998',
  },
  {
    id: 'newyear',
    name: 'New Year',
    emoji: '✨',
    badge: 'Fresh Start',
    title: 'Cheers to New Horizons',
    subtitle: 'Stepping into a glorious year of big milestones, happy customers and success.',
    bgGradient: 'from-[#0a1f6b] via-[#1f5ae6] to-[#f59e0b]',
    accent: '#fcd34d',
    glow: 'rgba(252, 211, 77, 0.45)',
    business: 'Sharma Sweets & Cafe',
    category: 'Gourmet Treats · Since 1998',
  },
]

function FestivalVisual({ type }) {
  if (type === 'diwali') {
    return (
      <div className="relative flex h-24 w-full items-center justify-center">
        {/* Radiating diya glow */}
        <div className="absolute h-20 w-20 rounded-full bg-amber-400/25 blur-xl animate-pulse" />
        
        {/* Diya SVG */}
        <svg viewBox="0 0 120 70" className="h-16 w-28 drop-shadow-[0_10px_15px_rgba(245,158,11,0.5)]">
          {/* Base */}
          <path d="M20 38 Q60 68 100 38 Q85 52 60 52 Q35 52 20 38 Z" fill="#d97706" />
          <path d="M24 38 C40 48 80 48 96 38 C75 44 45 44 24 38 Z" fill="#fde68a" opacity="0.6" />
          {/* Wick */}
          <path d="M58 38 Q60 28 60 24" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          {/* Flame */}
          <motion.path
            d="M60 8 C68 20 68 26 60 32 C52 26 52 20 60 8 Z"
            fill="url(#diwali-flame)"
            animate={{
              scaleY: [1, 1.18, 0.94, 1.12, 1],
              scaleX: [1, 0.9, 1.08, 0.94, 1],
            }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
          />
          {/* Flame Core */}
          <path d="M60 17 C64 23 64 27 60 30 C56 27 56 23 60 17 Z" fill="#fffbeb" />
          <defs>
            <linearGradient id="diwali-flame" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Sparkles */}
        {[
          { x: -35, y: -12, s: 12, d: 0 },
          { x: 38, y: -16, s: 14, d: 0.4 },
          { x: -20, y: 18, s: 10, d: 0.8 },
          { x: 28, y: 16, s: 11, d: 1.2 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute text-amber-300"
            style={{ left: `calc(50% + ${pt.x}px)`, top: `calc(50% + ${pt.y}px)` }}
            animate={{
              scale: [0.6, 1.3, 0.6],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 45, 0],
            }}
            transition={{ duration: 2.2, delay: pt.d, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles size={pt.s} />
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'holi') {
    return (
      <div className="relative flex h-24 w-full items-center justify-center">
        {/* Gulal powder splashes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="relative h-20 w-20"
        >
          <div className="absolute -left-2 -top-2 h-10 w-10 rounded-full bg-indigo-500/60 blur-md" />
          <div className="absolute -right-2 -top-1 h-11 w-11 rounded-full bg-amber-400/60 blur-md" />
          <div className="absolute -bottom-2 left-1 h-12 w-12 rounded-full bg-blue-500/60 blur-md" />
          <div className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-cyan-400/50 blur-md" />
        </motion.div>

        <div className="absolute flex items-center justify-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 shadow-lg text-2xl"
          >
            🎨
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.12, 1], y: [0, -4, 0] }}
            transition={{ duration: 2.4, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/30 backdrop-blur-md border border-amber-300/50 text-lg"
          >
            ✨
          </motion.div>
        </div>
      </div>
    )
  }

  if (type === 'eid') {
    return (
      <div className="relative flex h-24 w-full items-center justify-center">
        <div className="absolute h-20 w-20 rounded-full bg-sky-400/20 blur-xl" />
        <svg viewBox="0 0 100 80" className="h-16 w-24 drop-shadow-[0_8px_16px_rgba(56,189,248,0.4)]">
          {/* Crescent Moon */}
          <path
            d="M36 12 C52 12 65 25 65 41 C65 57 52 70 36 70 C47 64 54 53 54 41 C54 29 47 18 36 12 Z"
            fill="#fef08a"
          />
          {/* Hanging Lantern (Fanoos) */}
          <line x1="68" y1="8" x2="68" y2="28" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="2 2" />
          <rect x="63" y="28" width="10" height="15" rx="3" fill="#f59e0b" />
          <rect x="65" y="31" width="6" height="9" rx="1.5" fill="#fef08a" />
          <polygon points="68,43 64,48 72,48" fill="#d97706" />
          {/* Small Star */}
          <motion.polygon
            points="58,22 60,26 64,27 61,30 62,34 58,32 54,34 55,30 52,27 56,26"
            fill="#ffffff"
            animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative flex h-24 w-full items-center justify-center">
      <div className="absolute h-20 w-20 rounded-full bg-amber-300/25 blur-xl" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="relative flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="h-20 w-20">
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2="50"
              y2="14"
              stroke="#fcd34d"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={i % 2 ? '0.4' : '0.9'}
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
          <circle cx="50" cy="50" r="12" fill="#f59e0b" />
          <circle cx="50" cy="50" r="6" fill="#fffbeb" />
        </svg>
      </motion.div>
    </div>
  )
}

export default function CelebrationHub() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const reduced = useReducedMotion()

  const current = FESTIVALS[activeIdx]

  useEffect(() => {
    if (reduced || isPaused) return
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % FESTIVALS.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [reduced, isPaused])

  return (
    <div
      className="relative mx-auto flex w-full max-w-[540px] items-center justify-center py-6 px-2 select-none max-sm:pt-16 max-sm:pb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Interactive Festival Celebration Studio"
    >
      {/* Dynamic Ambient Aura Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-full blur-3xl opacity-60 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle, ${current.glow} 0%, rgba(10,42,143,0.12) 65%, transparent 80%)`,
        }}
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Modern Sacred Geometry & Orbital Rings */}
      <svg
        viewBox="0 0 460 460"
        className="pointer-events-none absolute -inset-8 -z-10 h-[calc(100%+4rem)] w-[calc(100%+4rem)] animate-[spin_120s_linear_infinite]"
        aria-hidden="true"
      >
        <circle cx="230" cy="230" r="215" fill="none" stroke="#6aa8ff" strokeWidth="1" strokeDasharray="4 8" opacity="0.35" />
        <circle cx="230" cy="230" r="170" fill="none" stroke="#dbe9ff" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />
        <circle cx="230" cy="230" r="125" fill="none" stroke="#1f5ae6" strokeWidth="0.8" strokeDasharray="8 12" opacity="0.4" />
        {/* Accent Star/Orbit Points */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const x = 230 + 215 * Math.cos(rad)
          const y = 230 + 215 * Math.sin(rad)
          return (
            <circle
              key={deg}
              cx={x}
              cy={y}
              r={deg % 90 === 0 ? '4' : '2.5'}
              fill={deg % 90 === 0 ? '#f59e0b' : '#6aa8ff'}
              opacity="0.8"
            />
          )
        })}
      </svg>

      {/* Floating Golden Sparks */}
      {[
        { top: '8%', left: '12%', s: 13, d: 0 },
        { top: '15%', right: '14%', s: 16, d: 1 },
        { bottom: '12%', right: '10%', s: 14, d: 1.8 },
        { bottom: '18%', left: '10%', s: 12, d: 2.4 },
      ].map((pt, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute text-amber-300"
          style={{ top: pt.top, left: pt.left, right: pt.right }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: 3.5, delay: pt.d, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={pt.s} />
        </motion.span>
      ))}

      {/* CENTRAL SHOWCASE CARD */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[365px]">
        {/* Interactive Festival Selector Tabs */}
        <div className="mb-3 flex items-center justify-center gap-1.5 rounded-2xl bg-white/80 p-1.5 shadow-[0_10px_25px_-8px_rgba(10,42,143,0.18)] backdrop-blur-md border border-white">
          {FESTIVALS.map((fest, idx) => {
            const isActive = idx === activeIdx
            return (
              <button
                key={fest.id}
                onClick={() => setActiveIdx(idx)}
                type="button"
                className={`relative flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  isActive ? 'text-plum shadow-sm font-bold' : 'text-muted hover:text-plum hover:bg-mist/40'
                }`}
                aria-label={`Show ${fest.name} card`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFestivalPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-mist to-white shadow-[0_2px_8px_rgba(31,90,230,0.18)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10 text-sm leading-none">{fest.emoji}</span>
                <span className="relative z-10 text-[11px] sm:text-xs">{fest.name}</span>
              </button>
            )
          })}
        </div>

        {/* Masterpiece Festive Canvas Card */}
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2.5 shadow-[0_25px_60px_-15px_rgba(10,42,143,0.45)]"
          whileHover={{ y: -3, transition: { duration: 0.3 } }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className={`relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${current.bgGradient} p-4 sm:p-5 text-white`}
            >
              {/* Subtle Card Background Pattern & Lighting */}
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.7) 1px, transparent 0)',
                  backgroundSize: '16px 16px',
                }}
              />
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

              {/* Top Card Bar: Live Template Badge */}
              <div className="relative flex items-center justify-between pb-2 border-b border-white/15">
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-amber-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  {current.badge}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium backdrop-blur-md">
                  <Wand2 size={10} className="text-amber-300" />
                  1-Tap Edit
                </span>
              </div>

              {/* Dynamic Festival Visual Display */}
              <div className="my-2 flex items-center justify-center">
                <FestivalVisual type={current.id} />
              </div>

              {/* Festive Greeting Typography */}
              <div className="relative text-center">
                <h3 className="font-serif text-xl sm:text-[22px] font-bold tracking-tight text-white leading-tight drop-shadow-sm">
                  {current.title}
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-mist/90 max-w-[280px] mx-auto line-clamp-2">
                  {current.subtitle}
                </p>
              </div>

              {/* Real Business Member Signature (Footer of Card) */}
              <div className="relative mt-4 flex items-center justify-between rounded-xl bg-plum/75 px-3 py-2 backdrop-blur-md border border-white/20">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber-300 to-amber-500 font-serif font-black text-xs text-plum shadow-sm">
                    S
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1 text-[11px] font-bold text-white truncate">
                      {current.business}
                      <CheckCircle2 size={12} className="text-amber-300 shrink-0" aria-label="Verified Member" />
                    </p>
                    <p className="text-[9px] text-mist/80 truncate">{current.category}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="inline-block rounded-md bg-white/20 px-1.5 py-0.5 text-[8px] font-semibold text-white uppercase tracking-wider">
                    Member Post
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* THREE CONNECTED SATELLITE ACTION PODS */}

      {/* 1. CREATE POD (Top-Left) */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 -left-3 max-sm:top-0 max-sm:left-1 sm:-left-10 z-20"
      >
        <div className="group flex items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 px-3.5 py-2.5 max-sm:gap-2 max-sm:px-2.5 max-sm:py-2 shadow-[0_16px_35px_-10px_rgba(10,42,143,0.35)] backdrop-blur-md transition-all hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(31,90,230,0.45)]">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-plum to-brand text-white shadow-sm">
            <Palette size={16} aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-serif text-xs font-bold text-plum">Create</span>
              <span className="rounded-full bg-amber-100 px-1.5 py-0.2 text-[9px] font-bold text-amber-700">AI</span>
            </div>
            <p className="text-[10px] font-medium text-muted">100+ Festive Designs</p>
          </div>
        </div>
      </motion.div>

      {/* 2. SHARE POD (Middle-Right) */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[48%] -right-3 max-sm:top-0 max-sm:right-1 sm:-right-10 z-20"
      >
        <div className="group flex items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 px-3.5 py-2.5 max-sm:gap-2 max-sm:px-2.5 max-sm:py-2 shadow-[0_16px_35px_-10px_rgba(10,42,143,0.35)] backdrop-blur-md transition-all hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(31,90,230,0.45)]">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
            <Share2 size={16} aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xs font-bold text-plum">Share</span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-[10px] font-medium text-muted">WhatsApp &amp; Instagram</p>
          </div>
        </div>
      </motion.div>

      {/* 3. EARN REWARDS POD (Bottom-Left) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -left-3 max-sm:bottom-2 max-sm:left-1/2 max-sm:-translate-x-1/2 sm:-left-8 z-20"
      >
        <div className="group flex items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 px-3.5 py-2.5 max-sm:gap-2 max-sm:px-2.5 max-sm:py-2 shadow-[0_16px_35px_-10px_rgba(10,42,143,0.35)] backdrop-blur-md transition-all hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(31,90,230,0.45)]">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-sm">
            <Coins size={16} aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-serif text-xs font-bold text-plum">Earn Rewards</span>
              <span className="text-[10px]">🪙</span>
            </div>
            <p className="text-[10px] font-semibold text-brand">+250 Points / Referral</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
