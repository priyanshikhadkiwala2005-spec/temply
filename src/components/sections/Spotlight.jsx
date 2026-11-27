import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Crown, Coins, Users, ArrowRight } from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import Blob from '../ui/Blob'
import { Reveal } from '../ui/Reveal'
import { useLoop } from '../../mobile/useIsMobile'

const FLOW = [
  { Icon: Crown, t: 'Membership', d: 'unlocks the creative and business tools' },
  { Icon: Coins, t: 'Rewards', d: 'recognise activity with traceable points' },
  { Icon: Users, t: 'Referrals', d: 'grow the network through shared links' },
]

function Ring({ value = 0.4 }) {
  const r = 42
  const c = 2 * Math.PI * r
  // iOS Safari SVG ke andar ke <circle> ko "in view" detect nahi karta,
  // isliye bahar wale div ko observe karte hain
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width="110" height="110" viewBox="0 0 110 110" role="img" aria-label="Sample referral progress, 2 of 5">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#dbe9ff" strokeWidth="10" />
        <motion.circle
          cx="55" cy="55" r={r} fill="none" strokeWidth="10" strokeLinecap="round"
          stroke="#1f5ae6" /* fallback rang; animation ise badalti rehti hai */
          className="festive-stroke-cycle"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: inView ? c * (1 - value) : c }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          transform="rotate(-90 55 55)"
        />
      </svg>
      <span className="festive-animated-text absolute font-serif text-2xl font-bold leading-none">
        2/5
      </span>
    </div>
  )
}

export default function Spotlight() {
  const loop = useLoop()

  return (
    <section id="spotlight" className="relative overflow-hidden bg-gradient-to-b from-pale to-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* layered UI composition */}
        <div className="relative order-2 mx-auto h-[500px] w-full max-w-[560px] max-sm:h-[590px] sm:h-[560px] lg:order-1" style={{ perspective: 1400 }}>
          <Blob className="left-[4%] top-[8%] h-[80%] w-[86%] opacity-70" from="#dbe9ff" to="#6aa8ff" duration={26} />

          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -18, rotateX: 6 }}
            whileInView={{ opacity: 1, y: 0, rotateY: -10, rotateX: 4 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-4 w-[78%] sm:w-[72%]"
          >
            <motion.div animate={loop({ y: [0, -8, 0] })} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-plum via-grape to-brand p-6 text-white shadow-[0_40px_70px_-30px_rgba(10,42,143,0.8)] sm:p-7">
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lav/30" />
              <Crown className="festive-color-cycle drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" size={26} aria-hidden="true" />
              <p className="festive-animated-text mt-10 inline-block pb-1 pr-2 font-serif text-2xl font-semibold sm:text-3xl">
                Business Membership
              </p>
              <p className="mt-1 text-sm text-mist">Sample plan · 365-day validity</p>
              <div className="mt-8 flex justify-between text-xs text-mist">
                <span>MEMBER<br /><b className="text-base text-white">Your Business</b></span>
                <span className="text-right">ID<br /><b className="text-base text-white">FV-DEMO-0001</b></span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateY: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 8 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute bottom-0 right-0 w-[68%] sm:w-[58%]"
          >
            <motion.div animate={loop({ y: [0, 10, 0] })} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-2xl border border-white bg-white/90 p-5 shadow-[0_30px_60px_-25px_rgba(10,42,143,0.55)]">
              <p className="festive-animated-text inline-block text-xs font-bold uppercase tracking-wider">
                Rewards dashboard
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="festive-animated-text inline-block font-serif text-5xl font-bold leading-none">
                  100
                </span>
                <span className="pb-1 text-sm text-muted">sample pts</span>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {[['Welcome reward', '+100'], ['Daily login', '+5']].map(([a, b]) => (
                  <div key={a} className="flex justify-between rounded-lg bg-pale px-3 py-2">
                    <span>{a}</span><span className="font-semibold text-brand">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-[38%] left-[2%] z-10 max-sm:bottom-auto max-sm:top-[262px] sm:bottom-[36%] sm:left-[6%]"
          >
            <motion.div animate={loop({ y: [0, -9, 0] })} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-[0_25px_50px_-20px_rgba(10,42,143,0.6)]">
              <div className="scale-75 sm:scale-90" style={{ margin: '-10px' }}><Ring value={0.4} /></div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Referrals</p>
                <p className="font-serif text-lg font-semibold text-plum">Sample progress</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal><Eyebrow>Membership &amp; rewards spotlight</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="festive-animated-text mt-5 inline-block pb-1 pr-2 font-serif text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Membership, rewards and referrals, working together
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Membership gives a business its tools. Rewards make everyday activity feel recognised.
              Referrals let the community grow through people who already trust you.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <ol className="mt-8 space-y-4">
              {FLOW.map(({ Icon, t, d }, i) => (
                <li key={t} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-brand/10">
                    <Icon
                      size={20}
                      className="festive-color-cycle"
                      style={{ animationDelay: `${-i * 1.3}s` }}
                      aria-hidden="true"
                    />
                  </span>
                  <p className="pt-2.5 text-ink">
                    <b className="festive-animated-text font-bold mr-1">{t}</b> {d}
                    {i < FLOW.length - 1 && <ArrowRight size={14} className="ml-2 inline text-lav" aria-hidden="true" />}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
