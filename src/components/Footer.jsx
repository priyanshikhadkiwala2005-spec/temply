import Brand from './ui/Brand'

const NAV = [
  ['Home', '#home'],
  ['Platform', '#platform'],
  ['Features', '#features'],
  ['Packages', '#packages'],
  ['How It Works', '#how-it-works'],
  ['About', '#about'],
]
const PLATFORM = [
  ['Festival Post Editor', '#showcase'],
  ['Business Membership', '#showcase'],
  ['Points & Rewards', '#showcase'],
  ['Referral Network', '#showcase'],
]

function Col({ title, links }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.18em]">
        <span
          className="festive-bright-text inline-block"
          style={{ animationDelay: title === 'Platform' ? '-2s' : '0s' }}
        >
          {title}
        </span>
      </h3>
      <ul className="mt-5 space-y-1">
        {links.map(([l, h]) => (
          <li key={l}>
            <a href={h} className="inline-block py-1.5 text-mist transition-colors hover:text-white">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-plum text-white">
      <div className="festive-animated-bg absolute inset-x-0 top-0 h-1 shadow-[0_0_12px_rgba(236,72,153,0.5)]" />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-30" />
      <svg aria-hidden="true" className="absolute -bottom-16 -right-16 h-72 w-72 text-white/[0.06]" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 1l3.6 11.4L31 16l-11.4 3.6L16 31l-3.6-11.4L1 16l11.4-3.6z" />
      </svg>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 max-md:pt-20 md:px-8 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Brand light colorful />
          <p className="mt-5 max-w-sm leading-relaxed text-mist">
            A festival-ready business platform concept: create festive posts, present your business, and
            explore membership, rewards and referrals.
          </p>
        </div>
        <Col title="Navigate" links={NAV} />
        <Col title="Platform" links={PLATFORM} />
      </div>
      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-sm text-mist md:px-8">
          © 2026 Festivo. All rights reserved.{' '}
          <span className="festive-bright-text font-serif font-semibold">Celebrate. Create. Grow.</span>
        </p>
      </div>
    </footer>
  )
}
