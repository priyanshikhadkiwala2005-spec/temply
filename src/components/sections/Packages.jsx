import { motion } from 'framer-motion'
import { Sparkles, Crown, MapPin, Globe, CheckCircle2, ArrowUpRight, Check } from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import { Reveal, Stagger } from '../ui/Reveal'
import { item } from '../ui/motion'

const spring = { type: 'spring', stiffness: 300, damping: 24 }

const PLANS = [
  {
    Icon: Sparkles,
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
    Icon: Crown,
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
    Icon: Globe,
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

/* Shared card look — matching our existing features & packages color theme */
const CARD =
  'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-brand/10 bg-white p-7 max-md:p-6 shadow-[0_16px_40px_-12px_rgba(168,85,247,0.22)] transition-[box-shadow,border-color,transform] duration-300 hover:border-purple-300 hover:shadow-[0_24px_50px_-12px_rgba(168,85,247,0.38)]'

function TopBar({ i = 0 }) {
  return (
    <span
      className="festive-progress-flow absolute inset-x-0 top-0 h-2 shadow-[0_0_10px_rgba(236,72,153,0.35)]"
      style={{ animationDelay: `${-i * 0.75}s` }}
      aria-hidden="true"
    />
  )
}

function IconTile({ Icon, i = 0 }) {
  return (
    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-brand/15 bg-gradient-to-br from-white via-mist to-lav/25 shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:shadow-md">
      <Icon size={26} className="festive-color-cycle" style={{ animationDelay: `${-i}s` }} aria-hidden="true" />
    </span>
  )
}

export default function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden bg-pale py-20 sm:py-24 lg:py-28">
      {/* Multi-color ambient background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-12 h-[460px] w-[460px] rounded-full bg-gradient-to-br from-fuchsia-400/22 via-purple-500/18 to-transparent blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-[440px] w-[440px] rounded-full bg-gradient-to-bl from-amber-300/22 via-orange-400/18 to-transparent blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-[480px] w-[480px] rounded-full bg-gradient-to-tr from-rose-400/20 via-pink-500/18 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_25%,rgba(192,38,211,0.08),transparent_70%)]" />
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

        <Stagger data-stack="" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-md:mt-10 max-md:gap-5">
          {PLANS.map(({ Icon, price, name, subtitle, validity, features, badge, popular, btnText }, i) => (
            <motion.article
              key={name}
              data-stack-item=""
              variants={item}
              whileHover={{ y: -8 }}
              transition={spring}
              className={`${CARD} ${popular ? 'border-brand/40 ring-2 ring-brand/20 shadow-[0_22px_50px_-12px_rgba(132,61,160,0.32)]' : ''}`}
            >
              <TopBar i={i} />

              <div>
                {/* Header row with Icon and Badge */}
                <div className="flex items-start justify-between gap-2">
                  <IconTile Icon={Icon} i={i} />
                  {badge && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 shadow-xs">
                      <Check size={12} strokeWidth={3} className="text-emerald-600" />
                      {badge}
                    </span>
                  )}
                </div>

                {/* Plan Name & Subtitle */}
                <div className="mt-6">
                  <h3 className="font-serif text-2xl font-bold text-plum">{name}</h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed min-h-[32px]">{subtitle}</p>
                </div>

                {/* Price & Validity */}
                <div className="mt-5 border-t border-brand/10 pt-5">
                  <div className="font-serif text-4xl sm:text-[42px] font-bold text-plum leading-none">
                    {price}
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-muted/90">{validity}</p>
                </div>

                {/* Features List */}
                <ul className="mt-6 space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-plum">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 size={13} aria-hidden="true" />
                      </span>
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* View Plan Details Button */}
              <div className="mt-8 pt-4 border-t border-brand/5">
                <a
                  href="#community"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-brand/20 bg-mist/75 px-4 py-2.5 text-xs sm:text-sm font-bold text-plum shadow-xs transition-all duration-300 hover:bg-brand hover:text-white hover:border-brand hover:shadow-sm"
                >
                  <span>{btnText}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
