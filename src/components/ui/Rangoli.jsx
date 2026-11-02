import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const C = 200
const ring = (n, radius, rx, ry, fills, extra = {}) =>
  [...Array(n)].map((_, i) => (
    <ellipse
      key={i}
      cx={C}
      cy={C - radius}
      rx={rx}
      ry={ry}
      fill={fills[i % fills.length]}
      transform={`rotate(${(360 / n) * i} ${C} ${C})`}
      {...extra}
    />
  ))

const spin = (d, dir = 1) => ({
  animate: { rotate: 360 * dir },
  transition: { duration: d, repeat: Infinity, ease: 'linear' },
})

export default function Rangoli() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[500px]" role="img" aria-label="Animated rangoli-style festival pattern with a glowing diya at the centre">
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="rg-core" cx="50%" cy="40%" r="70%">
              <stop offset="0" stopColor="#843da0" />
              <stop offset="1" stopColor="#54245f" />
            </radialGradient>
            <radialGradient id="rg-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#fcd34d" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fcd34d" stopOpacity="0" />
            </radialGradient>
          </defs>

          <motion.circle
            cx={C} cy={C} r="190" fill="none" stroke="#b66bc8" strokeWidth="1.2" strokeDasharray="3 7"
            {...spin(90, -1)}
          />

          <motion.g {...spin(80)}>{ring(12, 145, 16, 46, ['#b66bc8', '#843da0'])}</motion.g>
          <motion.g {...spin(60, -1)}>{ring(16, 102, 12, 30, ['#54245f', '#eeddf5'], { stroke: '#843da0', strokeWidth: 1 })}</motion.g>
          <motion.g {...spin(45)}>{ring(8, 66, 13, 26, ['#fcd34d', '#b66bc8'])}</motion.g>

          {[...Array(24)].map((_, i) => {
            const a = (i * 15 * Math.PI) / 180
            return (
              <motion.circle
                key={i}
                cx={C + 185 * Math.cos(a)}
                cy={C + 185 * Math.sin(a)}
                r="3.5"
                fill={i % 2 ? '#843da0' : '#fcd34d'}
                animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.4, 0.8] }}
                transition={{ duration: 2.4, delay: i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            )
          })}

          <circle cx={C} cy={C} r="70" fill="url(#rg-glow)" />
          <circle cx={C} cy={C} r="40" fill="url(#rg-core)" stroke="#eeddf5" strokeWidth="2" />
          <path d="M178 214 Q200 236 222 214 Z" fill="#fcd34d" />
          <motion.path
            d="M200 176 C211 190 212 200 200 210 C188 200 189 190 200 176 Z"
            fill="#fbbf24"
            animate={{ scaleY: [1, 1.15, 0.92, 1.1, 1], scaleX: [1, 0.92, 1.05, 0.95, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
          />
          <path d="M200 190 C205 197 205 202 200 207 C195 202 195 197 200 190 Z" fill="#fff7d6" />
        </svg>
      </motion.div>

      {[12, 30, 48, 66, 82].map((l, i) => (
        <motion.span
          key={l}
          aria-hidden="true"
          className="pointer-events-none absolute text-amber-400"
          style={{ left: `${l}%`, top: '55%' }}
          animate={{ y: [0, -170 - i * 15], opacity: [0, 1, 0], scale: [0.6, 1.1, 0.5] }}
          transition={{ duration: 4 + i * 0.6, delay: i * 0.9, repeat: Infinity, ease: 'easeOut' }}
        >
          <Sparkles size={12 + (i % 3) * 4} />
        </motion.span>
      ))}
    </div>
  )
}
