import { motion } from 'framer-motion'
import { ease, stagger } from './motion'

export function Reveal({ delay = 0, y = 24, className = '', children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ className = '', children, ...rest }) {
  return (
    <motion.div
      {...rest}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
