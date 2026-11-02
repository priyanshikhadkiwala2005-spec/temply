import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CelebrationHub from '../ui/CelebrationHub'
import Eyebrow from '../ui/Eyebrow'
import { Reveal } from '../ui/Reveal'

export default function Intro() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 40, reduced ? 0 : -40])

  return (
    <section id="platform" ref={ref} className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <Eyebrow>A platform built for festivals</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="festive-animated-text mt-5 inline-block pb-1 pr-2 font-serif text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.4rem]">
              Make Every Celebration Count
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Festivals are the busiest moments in a business year. Festivo is designed to help members
              create festive posts, present their business to customers and keep people engaged through
              points and referrals, all from a single account.
            </p>
            <a
              href="#features"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b-2 border-brand/30 pb-1 font-semibold text-brand transition-colors hover:border-brand"
            >
              Explore the platform
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <motion.div style={{ y }} className="relative mx-auto flex w-full max-w-[540px] items-center justify-center">
          <CelebrationHub />
        </motion.div>
      </div>
    </section>
  )
}
