import { motion } from 'framer-motion'

const shapes = [
  '60% 40% 55% 45% / 50% 60% 40% 50%',
  '45% 55% 40% 60% / 60% 40% 60% 40%',
  '55% 45% 60% 40% / 40% 55% 45% 60%',
]

// Slowly morphing organic shape. Decorative only.
export default function Blob({ className = '', from = '#b66bc8', to = '#843da0', gradient, duration = 22 }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute ${className}`}
      style={{ background: gradient || `linear-gradient(135deg, ${from}, ${to})` }}
      animate={{ borderRadius: [...shapes, shapes[0]], rotate: [0, 8, -4, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
