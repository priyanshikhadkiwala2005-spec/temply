import { motion } from 'framer-motion'
import Eyebrow from '../ui/Eyebrow'
import { Reveal, Stagger } from '../ui/Reveal'
import { item } from '../ui/motion'

const PHASES = [
  {
    label: 'Phase 1',
    title: 'Initial product experience',
    text: 'The core platform: accounts, festival post editor, business membership, points and rewards, and the referral network.',
    status: 'In Development',
    on: true,
  },
  {
    label: 'Phase 2',
    title: 'Expanded application experience',
    text: 'Additional creative tools and enhancements, to be evaluated and scoped separately once the core platform is in place.',
    status: 'Planned',
    on: true,
  },
  {
    label: 'Next Steps',
    title: 'Further development and integration',
    text: 'Remaining integrations, testing and refinement before any public release.',
    status: 'Planned',
    on: true,
  },
]

export default function Progress() {
  return (
    <section id="progress" className="bg-pale py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="w-full">
          <Reveal><Eyebrow>Project progress</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl md:text-[38px] lg:text-[46px] xl:text-5xl font-semibold leading-[1.15] tracking-tight text-plum md:whitespace-nowrap">
              <span className="festive-animated-text inline-block">
                Building the Experience, One Step at a Time
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Festivo is a work in progress. This is where the project stands and where it is heading.
            </p>
          </Reveal>
        </div>

        <Stagger data-stack="" className="relative mt-16 grid gap-6 md:grid-cols-3 max-md:mt-10 max-md:gap-5">
          {/* mobile par cards stack hote hain, isliye purani timeline line hide */}
          <div aria-hidden="true" className="absolute left-[1.05rem] top-3 bottom-3 w-px bg-gradient-to-b from-brand to-mist hidden" />
          {PHASES.map(({ label, title, text, status, on }) => (
            <motion.div
              key={label}
              data-stack-item=""
              variants={item}
              className={`relative overflow-hidden rounded-2xl p-7 pl-12 md:pl-7 ${
                on
                  ? 'bg-gradient-to-br from-plum to-brand text-white shadow-[0_30px_60px_-30px_rgba(10,42,143,0.8),0_0_25px_rgba(99,102,241,0.18)]'
                  : 'border border-brand/15 bg-white'
              }`}
            >
              {/* Colorful top border line */}
              <div className="festive-animated-bg absolute inset-x-0 top-0 h-1.5" />

              <span className={`absolute left-4 top-8 h-3.5 w-3.5 rounded-full md:hidden ${on ? 'bg-brand ring-4 ring-lav/50' : 'bg-lav'}`} aria-hidden="true" />
              
              <div className="flex items-center justify-between gap-3">
                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${on ? 'text-mist' : 'text-brand'}`}>{label}</p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    on ? 'bg-white text-plum' : 'bg-mist text-plum'
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* Colorful animated accent line above the title */}
              <div className="festive-animated-bg mt-5 mb-2.5 h-1 w-14 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />

              <h3 className="font-serif text-2xl font-semibold leading-snug">
                <span className="festive-bright-text inline-block">{title}</span>
              </h3>
              
              <p className={`mt-3 leading-relaxed ${on ? 'text-mist' : 'text-muted'}`}>{text}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
