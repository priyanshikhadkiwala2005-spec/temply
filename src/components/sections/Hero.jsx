import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '../ui/Button'
import Blob from '../ui/Blob'
import Eyebrow from '../ui/Eyebrow'
import Phone, { Tilt } from '../ui/Phone'
import { EditorScreen, RewardsScreen } from '../screens'
import { ease, stagger, item } from '../ui/motion'

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yDevices = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -50])
  const yBlob = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70])

  return (
    <section id="home" ref={ref} className="relative overflow-hidden bg-pale pt-[72px] max-md:pt-4">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_30%,rgba(182,107,200,0.28),transparent),radial-gradient(40%_40%_at_0%_100%,rgba(238,221,245,0.9),transparent)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 pb-20 pt-10 md:px-8 lg:min-h-[calc(100vh-72px)] lg:grid-cols-[1.05fr_1fr] lg:pb-16 lg:pt-6">
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 min-w-0">
          <motion.div variants={item}>
            <Eyebrow>Festival-ready business platform</Eyebrow>
          </motion.div>
          <motion.h1
            variants={item}
            className="festive-animated-text mt-6 inline-block pb-1 pr-2 font-serif text-[clamp(2.4rem,7.2vw,5.9rem)] font-semibold leading-[1.04] tracking-tight"
          >
            Celebrate.
            <br />
            Create.
            <br />
            Grow.
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Festivo brings festival post creation, business discovery, membership benefits and a rewards
            experience into one platform, so every celebration becomes a chance to connect with customers.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Button href="#showcase">
              Explore the Platform <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href="#features" variant="secondary">
              Discover Features
            </Button>
          </motion.div>
        </motion.div>
        {[[8, 18, 16], [44, 10, 12], [52, 82, 18], [4, 70, 12], [92, 12, 14]].map(([l, t, s], i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute text-lav"
            style={{ left: `${l}%`, top: `${t}%` }}
            animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.8, 1.2, 0.8], rotate: [0, 45, 0] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          >
            <Sparkles size={s} />
          </motion.span>
        ))}

        <div className="relative mx-auto flex h-[400px] w-full max-w-[560px] items-center justify-center sm:h-[500px] lg:h-[600px]">
          <motion.div style={{ y: yBlob }} className="absolute inset-0" aria-hidden="true">
            <Blob className="left-[8%] top-[8%] h-[85%] w-[88%] opacity-90" duration={26} />
            <Blob className="-right-2 bottom-2 h-24 w-24 opacity-60" from="#dbe9ff" to="#6aa8ff" duration={18} />
          </motion.div>

          <motion.div style={{ y: yDevices }} className="relative flex items-center justify-center [--ps:0.6] sm:[--ps:0.8] lg:[--ps:0.9]">
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: -12 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 1, ease, delay: 0.3 }}
              className="z-10"
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <Tilt>
                  <Phone label="Festivo festival post editor preview showing a Happy Diwali poster">
                    <EditorScreen />
                  </Phone>
                </Tilt>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 80, rotate: 14 }}
              animate={{ opacity: 1, y: 40, rotate: 6 }}
              transition={{ duration: 1, ease, delay: 0.5 }}
              className="-ml-6 sm:-ml-10"
            >
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
                <Tilt>
                  <Phone label="Festivo rewards dashboard preview with sample points and referral progress">
                    <RewardsScreen />
                  </Phone>
                </Tilt>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
