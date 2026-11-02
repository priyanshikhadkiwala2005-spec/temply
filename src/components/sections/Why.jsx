import { motion } from 'framer-motion'
import { Sparkles, BadgeCheck, Coins } from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import BenefitStack from '../ui/BenefitStack'
import { Reveal, Stagger } from '../ui/Reveal'
import { item } from '../ui/motion'

const BENEFITS = [
  { Icon: Sparkles, t: 'Creative festival promotion concepts', d: 'Templates and editing tools made for the festive calendar.' },
  { Icon: BadgeCheck, t: 'Organized business membership experience', d: 'Plans, profile and access explained in one clear place.' },
  { Icon: Coins, t: 'Clear rewards presentation', d: 'Balances and history presented so nothing feels hidden.' },

]

export default function Why() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal><Eyebrow>Why Festivo</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="festive-animated-text mt-5 inline-block pb-1 pr-2 font-serif text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Built to Make Every Celebration More Engaging
            </h2>
          </Reveal>
          <Stagger className="mt-12 divide-y divide-mist border-y border-mist">
            {BENEFITS.map(({ Icon, t, d }, i) => (
              <motion.div key={t} variants={item} className="group flex items-start gap-5 py-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon size={22} className="festive-color-cycle" style={{ animationDelay: `${-i * 1.3}s` }} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-plum">{t}</h3>
                  <p className="mt-1 text-muted">{d}</p>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>

        <Reveal className="w-full">
          <BenefitStack />
        </Reveal>
      </div>
    </section>
  )
}
