import { motion } from 'framer-motion'
import { Sparkles, User, MapPin, Crown, CheckCircle2, ArrowUpRight, Check } from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import { Reveal, Stagger } from '../ui/Reveal'
import { item } from '../ui/motion'

const spring = { type: 'spring', stiffness: 300, damping: 24 }

const PLANS = [
  {
    Icon: Sparkles,
    theme: 'free',
    name: 'Free',
    subtitle: 'Get started with Temply',
    price: 'Free',
    validity: 'Ongoing (to be confirmed)',
    features: [
      'Temply account and profile',
      'Manual festival post editor',
      'Earn Purchasing Points (registration, daily login, referrals)',
    ],
    btnText: 'View plan details',
  },
  {
    Icon: User,
    theme: 'member',
    name: 'Member',
    subtitle: 'For individuals and growing referrers',
    price: '₹2,300',
    validity: '1 year (to be confirmed)',
    badge: 'Current plan',
    popular: true,
    features: [
      'Everything in Free',
      'Referral commission eligibility (Level 1: 30%, Level 2: 5%)',
      'Saved designs and full template library',
    ],
    btnText: 'View plan',
  },
  {
    Icon: MapPin,
    theme: 'business',
    name: 'Business Listing',
    subtitle: 'List your business on Temply',
    price: '₹10,000',
    validity: '1 year (to be confirmed)',
    features: [
      'Business listing in the Temply directory',
      'Website or catalogue link on your listing',
      'Configure eligible coupon offers (subject to approval)',
    ],
    btnText: 'View plan details',
  },
  {
    Icon: Crown,
    theme: 'premium',
    name: 'Premium',
    subtitle: 'Higher tier for established businesses',
    price: '₹23,000',
    validity: '1 year (to be confirmed)',
    features: [
      'Everything in Business Listing',
      'Additional higher-tier benefits — to be confirmed',
    ],
    btnText: 'View plan details',
  },
]


/* Per-plan color themes (full class strings so Tailwind can detect them) */
const THEMES = {
  free: {
    card: 'border-emerald-200 bg-gradient-to-b from-emerald-50 via-white to-white shadow-[0_20px_50px_-10px_rgba(16,185,129,0.50)] hover:border-emerald-400 hover:shadow-[0_28px_60px_-10px_rgba(16,185,129,0.70)]',
    bar: 'from-emerald-400 via-teal-400 to-green-500',
    tile: 'border-emerald-200 from-emerald-50 via-white to-emerald-100',
    icon: 'text-emerald-600',
    name: 'text-emerald-900',
    price: 'text-emerald-700',
    divider: 'border-emerald-200/70',
    check: 'bg-emerald-100 text-emerald-600',
    btn: 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:border-emerald-600',
  },
  member: {
    card: 'border-blue-200 bg-gradient-to-b from-blue-50 via-white to-white shadow-[0_20px_50px_-10px_rgba(59,130,246,0.52)] hover:border-blue-400 hover:shadow-[0_28px_60px_-10px_rgba(59,130,246,0.72)]',
    bar: 'from-sky-400 via-blue-500 to-indigo-500',
    tile: 'border-blue-200 from-sky-50 via-white to-blue-100',
    icon: 'text-blue-600',
    name: 'text-blue-900',
    price: 'text-blue-700',
    divider: 'border-blue-200/70',
    check: 'bg-blue-100 text-blue-600',
    btn: 'border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-600 hover:border-blue-600',
  },
  business: {
    card: 'border-violet-200 bg-gradient-to-b from-violet-50 via-white to-white shadow-[0_20px_50px_-10px_rgba(139,92,246,0.52)] hover:border-violet-400 hover:shadow-[0_28px_60px_-10px_rgba(139,92,246,0.72)]',
    bar: 'from-violet-500 via-purple-500 to-fuchsia-500',
    tile: 'border-violet-200 from-violet-50 via-white to-purple-100',
    icon: 'text-violet-600',
    name: 'text-violet-900',
    price: 'text-violet-700',
    divider: 'border-violet-200/70',
    check: 'bg-violet-100 text-violet-600',
    btn: 'border-violet-300 bg-violet-50 text-violet-800 hover:bg-violet-600 hover:border-violet-600',
  },
  premium: {
    card: 'border-amber-300 bg-gradient-to-b from-amber-100 via-amber-50 to-white shadow-[0_20px_50px_-10px_rgba(245,158,11,0.55)] hover:border-amber-500 hover:shadow-[0_28px_60px_-10px_rgba(245,158,11,0.75)]',
    bar: 'from-yellow-300 via-amber-400 to-yellow-600',
    tile: 'border-amber-300 from-yellow-50 via-amber-50 to-amber-200',
    icon: 'text-amber-600',
    name: 'text-amber-900',
    price: 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent',
    divider: 'border-amber-300/70',
    check: 'bg-amber-100 text-amber-600',
    btn: 'border-amber-400 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-amber-950 hover:from-amber-500 hover:to-yellow-600 hover:border-amber-600',
  },
}

/* Shared card look — matching our existing features & packages color theme */
const CARD =
  'group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-7 max-md:p-6 transition-[box-shadow,border-color,transform] duration-300'

function TopBar({ bar }) {
  return (
    <span
      className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${bar}`}
      aria-hidden="true"
    />
  )
}

function IconTile({ Icon, t }) {
  return (
    <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border bg-gradient-to-br ${t.tile} shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:shadow-md`}>
      <Icon size={26} className={t.icon} aria-hidden="true" />
    </span>
  )
}

export default function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden bg-pale py-20 sm:py-24 lg:py-28">
      {/* Multi-color ambient background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-12 h-[460px] w-[460px] rounded-full bg-gradient-to-br from-sky-400/22 via-blue-500/18 to-transparent blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-[440px] w-[440px] rounded-full bg-gradient-to-bl from-amber-300/22 via-amber-400/18 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-cyan-400/20 via-indigo-500/18 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_25%,rgba(14,165,233,0.08),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-5xl">
          <Reveal>
            <Eyebrow>Membership plans</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="festive-animated-text mt-5 inline-block pb-1 pr-2 font-serif text-[clamp(1.65rem,3.2vw,2.85rem)] font-semibold leading-[1.15] tracking-tight">
              Simple & Transparent Membership Plans
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg text-muted">
              Choose the plan that fits your business, from free community access to premium business growth.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-md:mt-10 max-md:gap-5">
          {PLANS.map(({ Icon, theme, price, name, subtitle, validity, features, badge, popular, btnText }) => {
            const t = THEMES[theme]
            return (
            <motion.article
              key={name}
              variants={item}
              whileHover={{ y: -8 }}
              transition={spring}
              className={`${CARD} ${t.card} ${popular ? 'ring-2 ring-blue-400/40' : ''}`}
            >
              <TopBar bar={t.bar} />

              <div>
                {/* Header row with Icon and Badge */}
                <div className="flex items-start justify-between gap-2">
                  <IconTile Icon={Icon} t={t} />
                  {badge && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 shadow-xs">
                      <Check size={12} strokeWidth={3} className="text-emerald-600" />
                      {badge}
                    </span>
                  )}
                </div>

                {/* Plan Name & Subtitle */}
                <div className="mt-6">
                  <h3 className={`font-serif text-2xl font-bold ${t.name}`}>{name}</h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed min-h-[32px]">{subtitle}</p>
                </div>

                {/* Price & Validity */}
                <div className={`mt-5 border-t ${t.divider} pt-5`}>
                  <div className={`font-serif text-4xl sm:text-[42px] font-bold leading-none ${t.price}`}>
                    {price}
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-muted/90">{validity}</p>
                </div>

                {/* Features List */}
                <ul className="mt-6 space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-plum">
                      <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${t.check}`}>
                        <CheckCircle2 size={13} aria-hidden="true" />
                      </span>
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* View Plan Details Button */}
              <div className={`mt-8 pt-4 border-t ${t.divider}`}>
                <a
                  href="#community"
                  className={`inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-bold shadow-xs transition-all duration-300 hover:text-white hover:shadow-sm ${t.btn}`}
                >
                  <span>{btnText}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
