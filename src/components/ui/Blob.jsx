import { motion } from 'framer-motion'
import { useLoop } from '../../mobile/useIsMobile'

const shapes = [
  '60% 40% 55% 45% / 50% 60% 40% 50%',
  '45% 55% 40% 60% / 60% 40% 60% 40%',
  '55% 45% 60% 40% / 40% 55% 45% 60%',
]

// Slowly morphing organic shape. Decorative only.
export default function Blob({ className = '', from = '#6aa8ff', to = '#1f5ae6', gradient, duration = 22 }) {
  const loop = useLoop()

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute ${className}`}
      style={{ borderRadius: shapes[0], background: gradient || `linear-gradient(135deg, ${from}, ${to})` }}
      animate={loop({ borderRadius: [...shapes, shapes[0]], rotate: [0, 8, -4, 0] })}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
