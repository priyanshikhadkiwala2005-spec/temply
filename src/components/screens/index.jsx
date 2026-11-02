import {
  ChevronLeft, Type, Image as ImageIcon, LayoutTemplate, Share2, Check, Gift, Flame,
  Link2, Download, Sparkles, Crown,
} from 'lucide-react'

const base = 'h-full w-full bg-pale pt-10 text-[11px] text-ink'

function Bar({ title, right }) {
  return (
    <div className="flex items-center justify-between px-4 pb-2">
      <ChevronLeft size={16} aria-hidden="true" />
      <span className="text-[12px] font-semibold">{title}</span>
      <span className="text-[11px] font-semibold text-brand">{right}</span>
    </div>
  )
}

export function EditorScreen() {
  return (
    <div className={base}>
      <Bar title="Festival Editor" right="Save" />
      <div className="relative mx-3 h-[236px] overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_50%_100%,rgba(245,158,11,0.5)_0%,transparent_60%),linear-gradient(135deg,#3b0764_0%,#701a75_35%,#c026d3_70%,#e11d48_100%)] shadow-xl">
        {/* Festive Toran garland at the top (like SS 4) */}
        <div className="absolute inset-x-0 top-0 flex justify-center gap-1.5 px-3 pt-1">
          {[
            { bg: '#f59e0b', h: 'h-2 w-3.5' },
            { bg: '#ec4899', h: 'h-2.5 w-3.5' },
            { bg: '#f97316', h: 'h-2 w-3.5' },
            { bg: '#a855f7', h: 'h-2.5 w-3.5' },
            { bg: '#fbbf24', h: 'h-2 w-3.5' },
            { bg: '#f43f5e', h: 'h-2.5 w-3.5' },
            { bg: '#38bdf8', h: 'h-2 w-3.5' },
            { bg: '#ec4899', h: 'h-2.5 w-3.5' },
            { bg: '#f59e0b', h: 'h-2 w-3.5' },
          ].map((t, i) => (
            <span
              key={i}
              className={`${t.h} rounded-b-full shadow-xs`}
              style={{ backgroundColor: t.bg }}
            />
          ))}
        </div>

        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-sm" />
        <div className="absolute -left-8 top-20 h-24 w-24 rounded-full bg-white/10 blur-sm" />

        {/* Twinkling festive stars and sparkles */}
        {[...Array(8)].map((_, i) => (
          <Sparkles
            key={i}
            size={7 + (i % 3) * 3}
            className={`absolute ${i % 2 === 0 ? 'text-amber-200' : 'text-white/90'}`}
            style={{ left: `${8 + i * 12}%`, top: `${10 + ((i * 19) % 45)}%` }}
            aria-hidden="true"
          />
        ))}

        {/* Glowing Diwali diyas with radiant warm halo */}
        <div className="absolute inset-x-0 bottom-9 flex items-end justify-center gap-3">
          {[18, 26, 18].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-3.5 w-2.5 rounded-full bg-gradient-to-t from-amber-500 via-amber-200 to-white shadow-[0_0_12px_4px_rgba(251,191,36,0.95)]" />
              <div
                className="rounded-b-full bg-gradient-to-r from-amber-500 via-amber-200 to-amber-600 shadow-sm"
                style={{ width: s + 12, height: s / 2 + 1 }}
              />
            </div>
          ))}
        </div>

        {/* Happy Diwali typographic layout */}
        <div className="absolute left-1/2 top-9 -translate-x-1/2 text-center">
          <div className="relative border border-dashed border-white/80 px-2 py-1 backdrop-blur-2xs">
            {['-left-1 -top-1', '-right-1 -top-1', '-left-1 -bottom-1', '-right-1 -bottom-1'].map((p) => (
              <span key={p} className={`absolute ${p} h-1.5 w-1.5 bg-white shadow-xs`} />
            ))}
            <p className="whitespace-nowrap font-serif text-[27px] font-semibold leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
              Happy Diwali
            </p>
          </div>
          <p className="mt-2 text-[9px] font-medium tracking-wide text-amber-200">Wishing you light &amp; joy</p>
        </div>

        {/* Business bar */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-[9px] font-bold text-plum shadow-xs">
            B
          </span>
          <span className="text-[9px] font-semibold text-white">Your Business Name</span>
        </div>
      </div>

      {/* Editor action buttons */}
      <div className="mt-3 grid grid-cols-4 gap-2 px-3 text-center text-[9px] font-medium">
        {[[LayoutTemplate, 'Templates'], [Type, 'Text'], [ImageIcon, 'Photo'], [Crown, 'Logo']].map(([Icon, l], i) => (
          <div
            key={l}
            className={`rounded-lg py-2 transition-transform ${
              i === 1
                ? 'bg-gradient-to-r from-brand via-fuchsia-600 to-rose-500 text-white shadow-sm'
                : 'bg-mist text-plum'
            }`}
          >
            <Icon size={14} className="mx-auto mb-1" aria-hidden="true" />
            {l}
          </div>
        ))}
      </div>

      {/* Colorful festive swatches (SS 4 style) */}
      <div className="mt-3 flex gap-2 px-3">
        {['from-amber-400 to-orange-500', 'from-fuchsia-600 to-rose-500', 'from-purple-600 to-brand', 'from-rose-500 to-amber-500'].map((g, i) => (
          <div
            key={i}
            className={`h-11 flex-1 rounded-lg bg-gradient-to-br ${g} shadow-xs ${i === 1 ? 'ring-2 ring-fuchsia-500 scale-105' : ''}`}
          />
        ))}
      </div>

      {/* Share action */}
      <div className="mx-3 mt-3 flex gap-2">
        <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand via-fuchsia-600 to-rose-500 py-2.5 text-[11px] font-semibold text-white shadow-md">
          <Share2 size={12} aria-hidden="true" /> Share
        </div>
        <div className="grid w-10 place-items-center rounded-lg bg-mist text-plum">
          <Download size={13} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

export function RewardsScreen() {
  return (
    <div className={base}>
      <Bar title="Rewards" right="Demo" />
      <div className="relative mx-3 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#3b0764_0%,#701a75_35%,#c026d3_70%,#e11d48_100%)] p-4 text-white shadow-xl">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/15 blur-sm" />
        <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-amber-400/20 blur-sm" />
        <Sparkles size={10} className="absolute right-4 top-3 text-amber-200" aria-hidden="true" />
        <p className="text-[10px] font-medium text-amber-100/90">Points balance</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-serif text-[38px] font-semibold leading-none drop-shadow-sm">100</span>
          <span className="h-5 w-5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.95)]" />
        </div>
        <p className="mt-2 text-[9px] text-white/80">Welcome reward · sample value</p>
      </div>
      <div className="mx-3 mt-3 rounded-xl border border-mist bg-white p-3 shadow-xs">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1 font-semibold text-plum">
            <Flame size={12} className="text-rose-500" aria-hidden="true" /> Daily login
          </span>
          <span className="font-bold text-rose-500">+5</span>
        </div>
        <div className="flex gap-1.5">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div
              key={i}
              className={`grid h-6 flex-1 place-items-center rounded-md text-[9px] font-semibold ${
                i < 4
                  ? 'bg-gradient-to-br from-brand via-fuchsia-600 to-rose-500 text-white shadow-xs'
                  : 'bg-mist text-muted'
              }`}
            >
              {i < 4 ? <Check size={10} aria-hidden="true" /> : d}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-3 mt-3 rounded-xl border border-mist bg-white p-3 shadow-xs">
        <div className="mb-1.5 flex justify-between font-semibold">
          <span>Referral progress</span>
          <span className="text-muted">2 / 5</span>
        </div>
        <div className="h-2 rounded-full bg-mist">
          <div className="h-2 w-2/5 rounded-full bg-gradient-to-r from-brand via-fuchsia-600 to-rose-500" />
        </div>
      </div>
      <p className="mx-4 mb-1.5 mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted">Sample offers</p>
      {[['Café voucher', '50 pts'], ['Store discount', '80 pts']].map(([n, p]) => (
        <div key={n} className="mx-3 mb-2 flex items-center gap-2 rounded-xl bg-white p-2 ring-1 ring-mist shadow-2xs">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-rose-50 text-rose-500">
            <Gift size={14} aria-hidden="true" />
          </span>
          <span className="flex-1 font-semibold text-plum">{n}</span>
          <span className="rounded-md bg-gradient-to-r from-brand via-fuchsia-600 to-rose-500 px-2 py-1 text-[9px] font-semibold text-white shadow-2xs">
            {p}
          </span>
        </div>
      ))}
    </div>
  )
}

export function MembershipScreen() {
  return (
    <div className={base}>
      <Bar title="Membership" right="Demo" />
      <div className="relative mx-3 overflow-hidden rounded-2xl bg-gradient-to-br from-plum via-grape to-brand p-4 text-white shadow-lg">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-lav/30" />
        <Crown size={18} className="text-amber-300" aria-hidden="true" />
        <p className="mt-6 font-serif text-[20px] font-semibold leading-tight">Business Membership</p>
        <p className="mt-1 text-[10px] text-mist">365-day validity · sample plan</p>
        <div className="mt-4 flex justify-between text-[9px] text-mist">
          <span>MEMBER ID<br /><b className="text-white">FV-DEMO-0001</b></span>
          <span className="text-right">STATUS<br /><b className="text-white">Preview</b></span>
        </div>
      </div>
      <p className="mx-4 mb-2 mt-4 text-[10px] font-semibold uppercase tracking-wider text-muted">Concept benefits</p>
      {['Festival post editor access', 'Business profile & listing', 'Website or catalogue link', 'Points & referral dashboard'].map((b) => (
        <div key={b} className="mx-3 mb-2 flex items-center gap-2 rounded-xl bg-white p-2.5 ring-1 ring-mist">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-white"><Check size={11} aria-hidden="true" /></span>
          <span className="font-medium">{b}</span>
        </div>
      ))}
      <div className="mx-3 mt-3 rounded-xl bg-brand py-2.5 text-center text-[11px] font-semibold text-white">View plan details</div>
    </div>
  )
}

export function ReferralScreen() {
  const dot = (c, s = 'h-6 w-6') => <span className={`${s} grid place-items-center rounded-full ${c}`} />
  return (
    <div className={base}>
      <Bar title="Referral Network" right="Demo" />
      <div className="mx-3 rounded-xl border border-dashed border-brand/50 bg-white p-3">
        <p className="text-[10px] text-muted">Your referral link</p>
        <div className="mt-1.5 flex items-center justify-between rounded-lg bg-mist px-2.5 py-2">
          <span className="font-semibold text-plum">festivo / ref / DEMO</span>
          <Link2 size={13} className="text-brand" aria-hidden="true" />
        </div>
      </div>
      <div className="relative mx-3 mt-3 rounded-xl bg-white py-4 ring-1 ring-mist">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            {dot('bg-gradient-to-br from-plum to-brand text-white', 'h-9 w-9')}
            <span className="mt-1 text-[9px] font-semibold">You</span>
          </div>
          <div className="h-px w-3/5 bg-lav" />
          <div className="flex gap-6">{[0, 1, 2].map((i) => <div key={i} className="flex flex-col items-center">{dot('bg-lav')}<span className="mt-1 text-[8px] text-muted">Level 1</span></div>)}</div>
          <div className="h-px w-4/5 bg-mist" />
          <div className="flex gap-3">{[...Array(5)].map((_, i) => <div key={i}>{dot('bg-mist', 'h-5 w-5')}</div>)}</div>
          <span className="text-[8px] text-muted">Level 2</span>
        </div>
      </div>
      <div className="mx-3 mt-3 grid grid-cols-2 gap-2">
        {[['Direct', '3'], ['Indirect', '5']].map(([l, v]) => (
          <div key={l} className="rounded-xl bg-white p-2.5 text-center ring-1 ring-mist">
            <p className="font-serif text-[22px] font-semibold text-plum">{v}</p>
            <p className="text-[9px] text-muted">{l} · sample</p>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3 flex items-center justify-between rounded-xl bg-mist px-3 py-2.5 text-[10px] font-semibold text-plum">
        <span>Pending</span><span>›</span><span>Approved</span><span>›</span><span>Paid</span>
      </div>
    </div>
  )
}

export function HowScreen() {
  return (
    <div className={`${base} bg-white`}>
      <Bar title="How it works" right="" />
      <div className="mx-4 rounded-2xl bg-plum px-4 py-4 text-white">
        <p className="text-[9px] text-mist">Welcome to</p>
        <p className="font-serif text-[22px] font-semibold leading-tight">Festivo</p>
      </div>
      <div className="mt-5 space-y-4 px-4">
        {[['3', 'Earn rewards', 'Points and referral benefits shown in one place'], ['2', 'Share', 'Preview and share festival posts'], ['1', 'Create', 'Pick a template and make it yours']].map(([n, t, d]) => (
          <div key={n} className="flex items-start gap-3 border-b border-mist pb-3">
            <span className="font-serif text-[40px] font-semibold leading-none text-lav">{n}</span>
            <div>
              <p className="text-[12px] font-semibold">{t}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-muted">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
