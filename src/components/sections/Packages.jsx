import { motion } from 'framer-motion'
import {
  CalendarCheck,
  Coins,
  Sparkles,
  Target,
  ClipboardCheck,
  Megaphone,
  Crown,
  Star,
  Infinity as InfinityIcon,
  Briefcase,
  MapPin,
  Rocket,
  Building2,
  CheckCircle2,
  Gift,
  UserCheck,
  TrendingUp,
  Globe,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import { Reveal, Stagger } from '../ui/Reveal'
import { item } from '../ui/motion'

export default function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden bg-pale py-20 sm:py-24 lg:py-32">
      {/* Festive ambient background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-fuchsia-400/15 via-purple-500/10 to-transparent blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-[520px] w-[520px] rounded-full bg-gradient-to-bl from-amber-300/18 via-orange-400/12 to-transparent blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-rose-400/15 via-brand/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow>Membership & Earning Packages</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-plum sm:text-4xl lg:text-5xl">
              <span className="festive-animated-text inline-block">
                Packages Built for Rewards, Growth & Leadership
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Explore daily engagement rewards, business memberships, and strategic consulting opportunities designed to maximize your festival growth.
            </p>
          </Reveal>
        </div>

        {/* Packages Grid */}
        <Stagger data-stack="" className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8 max-md:mt-10">
          
          {/* 01 DAILY LOGIN CARD */}
          <motion.article
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-blue-200/60 bg-white p-6 sm:p-7 shadow-[0_20px_45px_-15px_rgba(37,99,235,0.14)] transition-all duration-300 hover:border-blue-400 hover:shadow-[0_25px_55px_-15px_rgba(37,99,235,0.25)]"
          >
            {/* Top flowing colorful accent line */}
            <span
              className="festive-progress-flow absolute inset-x-0 top-0 h-2 shadow-[0_0_10px_rgba(37,99,235,0.35)]"
              aria-hidden="true"
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[11px] font-black">01</span>
                  <span>DAILY LOGIN</span>
                </span>
              </div>

              {/* Main Headline & Tag */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-plum">
                  LOGIN EVERY DAY
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-amber-900 shadow-xs">
                  <Sparkles size={13} className="text-amber-600" />
                  EARN REWARD POINTS
                </span>
              </div>

              {/* Graphic + Feature List */}
              <div className="mt-6 grid items-center gap-5 sm:grid-cols-[100px_1fr]">
                {/* Visual Icons */}
                <div className="flex sm:flex-col items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-600 text-white shadow-md">
                    <CalendarCheck size={26} className="festive-color-cycle" />
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Coins size={22} className="festive-color-cycle" style={{ animationDelay: '-1s' }} />
                    <Sparkles size={16} className="text-amber-500" />
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {[
                    'Daily Login Rewards',
                    'Accumulate Points',
                    'Redeem According to Program Rules',
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm font-semibold text-plum/90">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 size={15} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-muted">Daily engagement booster</span>
              <a
                href="#community"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand transition-colors hover:text-plum"
              >
                <span>Explore Check-in</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </motion.article>

          {/* 02 PROMOTIONAL TASKS CARD */}
          <motion.article
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-purple-200/60 bg-white p-6 sm:p-7 shadow-[0_20px_45px_-15px_rgba(168,85,247,0.14)] transition-all duration-300 hover:border-purple-400 hover:shadow-[0_25px_55px_-15px_rgba(168,85,247,0.25)]"
          >
            {/* Top flowing colorful accent line */}
            <span
              className="festive-progress-flow absolute inset-x-0 top-0 h-2 shadow-[0_0_10px_rgba(168,85,247,0.35)]"
              style={{ animationDelay: '-0.75s' }}
              aria-hidden="true"
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 via-brand to-pink-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[11px] font-black">02</span>
                  <span>PROMOTIONAL TASKS</span>
                </span>
              </div>

              {/* Subtitle */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-plum">
                  <span className="festive-animated-text inline-block">SEE • PARTICIPATE • EARN</span>
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-purple-700 shadow-xs">
                  <Target size={13} className="text-purple-600" />
                  TASK REWARDS
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                Complete eligible promotional tasks and earn Reward Points to fuel your business festive growth.
              </p>

              {/* Circular Action Badges */}
              <div className="mt-6 grid grid-cols-4 gap-3">
                {[
                  { Icon: Target, label: 'Target', bg: 'bg-purple-100 text-purple-700 border-purple-200' },
                  { Icon: ClipboardCheck, label: 'Tasks', bg: 'bg-blue-100 text-blue-700 border-blue-200' },
                  { Icon: Megaphone, label: 'Promote', bg: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200' },
                  { Icon: Coins, label: 'Reward', bg: 'bg-amber-100 text-amber-700 border-amber-200' },
                ].map(({ Icon, label, bg }, idx) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl border ${bg} shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                      <Icon size={22} className="festive-color-cycle" style={{ animationDelay: `${-idx * 0.8}s` }} />
                    </span>
                    <span className="text-[11px] font-bold text-plum/80">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-muted">Activity-based rewards</span>
              <a
                href="#community"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand transition-colors hover:text-plum"
              >
                <span>View Tasks</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </motion.article>

          {/* 03 PREMIUM SUBSCRIPTION CARD */}
          <motion.article
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-indigo-200/80 bg-white p-6 sm:p-7 shadow-[0_20px_45px_-15px_rgba(99,102,241,0.18)] transition-all duration-300 hover:border-indigo-400 hover:shadow-[0_25px_60px_-15px_rgba(99,102,241,0.3)]"
          >
            {/* Top flowing colorful accent line */}
            <span
              className="festive-progress-flow absolute inset-x-0 top-0 h-2.5 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
              style={{ animationDelay: '-1.5s' }}
              aria-hidden="true"
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[11px] font-black">03</span>
                  <span>PREMIUM SUBSCRIPTION</span>
                </span>
                <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-800 border border-amber-300">
                  POPULAR
                </span>
              </div>

              {/* Price & Crown Banner */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-md">
                    <Crown size={26} className="drop-shadow" />
                  </div>
                  <div>
                    <div className="font-serif text-3xl sm:text-4xl font-black text-plum">
                      ₹10,000
                    </div>
                  </div>
                </div>

                <span className="rounded-full border border-amber-400 bg-amber-300 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-amber-950 shadow-sm">
                  5-YEAR MEMBERSHIP
                </span>
              </div>

              {/* Subheader Badge */}
              <div className="mt-6 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-xs">
                  <ShieldCheck size={13} />
                  PREMIUM BENEFITS
                </span>
              </div>

              {/* Benefits List */}
              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/40 p-4">
                <ul className="space-y-2.5">
                  {[
                    { Icon: Star, text: 'Global Turnover Linked Reward Points' },
                    { Icon: InfinityIcon, text: 'Unlimited Access' },
                    { Icon: Briefcase, text: 'Business Consultancy' },
                    { Icon: MapPin, text: 'Free Business Listing' },
                    { Icon: Rocket, text: 'Premium Business Opportunities' },
                  ].map(({ Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-plum">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                        <Icon size={13} />
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-muted">Complete 5-year coverage</span>
              <a
                href="#community"
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-plum hover:scale-[1.02]"
              >
                <span>Get Membership</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.article>

          {/* 04 BUSINESS DEVELOPMENT CARD */}
          <motion.article
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-200/80 bg-white p-6 sm:p-7 shadow-[0_20px_45px_-15px_rgba(16,185,129,0.18)] transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.3)]"
          >
            {/* Top flowing colorful accent line */}
            <span
              className="festive-progress-flow absolute inset-x-0 top-0 h-2 shadow-[0_0_10px_rgba(16,185,129,0.35)]"
              style={{ animationDelay: '-2.25s' }}
              aria-hidden="true"
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[11px] font-black">04</span>
                  <span>BUSINESS DEVELOPMENT</span>
                </span>
              </div>

              {/* Price & Towers Banner */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                    <Building2 size={26} className="drop-shadow" />
                  </div>
                  <div>
                    <div className="font-serif text-3xl sm:text-4xl font-black text-plum">
                      ₹1,00,000
                    </div>
                  </div>
                </div>

                <span className="rounded-full border border-amber-300 bg-amber-200/90 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-950 shadow-xs">
                  BENEFITS INDICATED UP TO ₹2,00,000
                </span>
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-700">
                Strategic Business Scale & Promotion
              </p>

              {/* Checklist */}
              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
                <ul className="space-y-3">
                  {[
                    'Business Development Benefits',
                    'Eligible Subscription Promotion',
                    'Opportunity to Promote & Sell Subscriptions',
                    'Additional Incentives as per Plan',
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-plum">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 size={15} />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-muted">2x Indicated value</span>
              <a
                href="#community"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-700 hover:scale-[1.02]"
              >
                <span>Enquire Now</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.article>

          {/* 05 MASTER BUSINESS CONSULTANT CARD (FULL WIDTH) */}
          <motion.article
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-brand/20 bg-gradient-to-br from-white via-mist/20 to-white p-6 sm:p-8 lg:col-span-2 shadow-[0_25px_60px_-15px_rgba(84,36,95,0.25)] transition-all duration-300 hover:border-brand/40 hover:shadow-[0_30px_70px_-15px_rgba(84,36,95,0.35)]"
          >
            {/* Top flowing colorful accent line */}
            <span
              className="festive-progress-flow absolute inset-x-0 top-0 h-3 shadow-[0_0_15px_rgba(236,72,153,0.5)]"
              style={{ animationDelay: '-3s' }}
              aria-hidden="true"
            />

            <div>
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-rose-500 to-purple-700 px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-md">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-xs font-black">05</span>
                  <span>MASTER BUSINESS CONSULTANT</span>
                </span>
                
                <span className="rounded-full border border-amber-300 bg-amber-300 px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-amber-950 shadow-sm">
                  SUBSCRIPTION-RELATED BENEFITS INDICATED UP TO ₹30 LAC
                </span>
              </div>

              {/* Price & Crown Banner */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-b border-brand/10 pb-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-white shadow-lg ring-4 ring-amber-100">
                    <Crown size={34} className="drop-shadow-md" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">Flagship Leadership Tier</span>
                    <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-plum">
                      <span className="festive-animated-text inline-block">₹10,00,000</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#community"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand via-plum to-purple-800 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_15px_30px_-8px_rgba(132,61,160,0.5)] transition-all hover:scale-105 hover:shadow-[0_20px_40px_-8px_rgba(132,61,160,0.6)] active:scale-95"
                  >
                    <Crown size={18} className="text-amber-300" />
                    <span>Apply for Master Consultant</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>

              {/* 5 Strategic Feature Pillars Grid */}
              <div className="mt-8">
                <p className="text-xs font-extrabold uppercase tracking-wider text-brand mb-4">
                  Strategic Consultant Opportunities & Rewards
                </p>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {[
                    {
                      Icon: Megaphone,
                      title: 'Advertisement Activity Points',
                      bg: 'bg-rose-50 border-rose-200 text-rose-600',
                    },
                    {
                      Icon: Gift,
                      title: 'Loyalty Bonus on Eligible Global Subscription',
                      bg: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-600',
                    },
                    {
                      Icon: UserCheck,
                      title: 'Master Business Consultancy Opportunities',
                      bg: 'bg-purple-50 border-purple-200 text-purple-600',
                    },
                    {
                      Icon: TrendingUp,
                      title: 'Strategic Business Development Support',
                      bg: 'bg-indigo-50 border-indigo-200 text-indigo-600',
                    },
                    {
                      Icon: Globe,
                      title: 'Premium Business Opportunities',
                      bg: 'bg-blue-50 border-blue-200 text-blue-600',
                    },
                  ].map(({ Icon, title, bg }) => (
                    <div
                      key={title}
                      className="group/card flex flex-col items-center gap-3 rounded-2xl border border-brand/10 bg-white/80 p-4 text-center shadow-xs backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1"
                    >
                      <span className={`grid h-12 w-12 place-items-center rounded-2xl border ${bg} shadow-sm transition-transform duration-300 group-hover/card:scale-110`}>
                        <Icon size={22} className="festive-color-cycle" />
                      </span>
                      <p className="text-xs font-bold leading-snug text-plum">
                        {title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>

        </Stagger>
      </div>
    </section>
  )
}

