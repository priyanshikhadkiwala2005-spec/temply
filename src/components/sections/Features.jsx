import { motion } from 'framer-motion'
import { Palette, BadgeCheck, Coins, Share2, ArrowUpRight } from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import { Reveal, Stagger } from '../ui/Reveal'
import { item } from '../ui/motion'

const FEATURES = [
  {
    tab: 'create',
    Icon: Palette,
    title: 'Festival Post Editor',
    text: 'Create festival-themed promotional posts using templates, text, and sharing options.',
    tint: 'bg-purple-50 text-purple-600',
    bar: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500',
    shadow: 'shadow-[0_16px_40px_-12px_rgba(168,85,247,0.22)] hover:shadow-[0_24px_50px_-12px_rgba(168,85,247,0.38)] hover:border-purple-300',
  },
  {
    tab: 'membership',
    Icon: BadgeCheck,
    title: 'Business Membership',
    text: 'Explore membership plans and business profile benefits.',
    tint: 'bg-fuchsia-50 text-fuchsia-600',
    bar: 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500',
    shadow: 'shadow-[0_16px_40px_-12px_rgba(236,72,153,0.22)] hover:shadow-[0_24px_50px_-12px_rgba(236,72,153,0.38)] hover:border-pink-300',
  },
  {
    tab: 'rewards',
    Icon: Coins,
    title: 'Points & Rewards',
    text: 'View reward points, redemption concepts, and available benefits.',
    tint: 'bg-amber-50 text-amber-600',
    bar: 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500',
    shadow: 'shadow-[0_16px_40px_-12px_rgba(245,158,11,0.22)] hover:shadow-[0_24px_50px_-12px_rgba(245,158,11,0.38)] hover:border-amber-300',
  },
  {
    tab: 'referrals',
    Icon: Share2,
    title: 'Referral Network',
    text: 'Present a referral system and referral progress interface.',
    tint: 'bg-rose-50 text-rose-600',
    bar: 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500',
    shadow: 'shadow-[0_16px_40px_-12px_rgba(225,29,72,0.22)] hover:shadow-[0_24px_50px_-12px_rgba(225,29,72,0.38)] hover:border-rose-300',
  },
]

export default function Features({ onPreview }) {
  return (
    <section id="features" className="relative overflow-hidden bg-pale pt-20 pb-12 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-16">
      {/* Multi-color ambient background shadows & glows (SS 2 style) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-12 h-[460px] w-[460px] rounded-full bg-gradient-to-br from-fuchsia-400/22 via-purple-500/18 to-transparent blur-3xl" />
        <div className="absolute -right-20 top-1/4 h-[440px] w-[440px] rounded-full bg-gradient-to-bl from-amber-300/22 via-orange-400/18 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-rose-400/20 via-pink-500/18 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_25%,rgba(192,38,211,0.08),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-5xl">
          <Reveal>
            <Eyebrow>Core features</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="festive-animated-text mt-5 inline-block pb-1 pr-2 font-serif text-[clamp(1.65rem,3.2vw,2.85rem)] font-semibold leading-[1.15] tracking-tight lg:whitespace-nowrap">
              Everything Your Business Needs to Stand Out
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg text-muted">
              Explore the tools designed to make festival promotions and rewards more engaging.
            </p>
          </Reveal>
        </div>

        <Stagger data-stack="" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:pb-8 max-md:mt-10 max-md:gap-5">
          {FEATURES.map(({ tab, Icon, title, text, tint, bar, shadow }, i) => (
            <motion.article
              key={tab}
              data-stack-item=""
              variants={item}
              whileHover={{ y: -8 }}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white p-7 max-md:p-6 ${shadow} transition-[box-shadow,border-color,transform] duration-300 ${
                i % 2 ? 'lg:mt-10' : ''
              }`}
            >
              <span
                className="festive-progress-flow absolute inset-x-0 top-0 h-2 shadow-[0_0_10px_rgba(236,72,153,0.35)]"
                style={{ animationDelay: `${-i * 0.75}s` }}
                aria-hidden="true"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(182,107,200,0.22), transparent 70%)' }}
              />
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand/15 bg-gradient-to-br from-white via-mist to-lav/25 shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:shadow-md">
                  <Icon size={26} className="festive-color-cycle" style={{ animationDelay: `${-i * 1}s` }} aria-hidden="true" />
                </span>
                <span className="font-serif text-5xl font-semibold leading-none text-mist" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-8 font-serif text-2xl font-semibold text-plum">{title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{text}</p>
              <a
                href="#showcase"
                onClick={() => onPreview(tab)}
                className="mt-7 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand after:absolute after:inset-0 after:content-['']"
              >
                Preview <span className="sr-only">{title}</span>
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
