import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-brand text-white shadow-[0_10px_30px_-10px_rgba(132,61,160,0.7)] hover:bg-grape',
  secondary: 'border border-brand/30 bg-white/60 text-plum hover:border-brand hover:bg-white',
  light: 'bg-white text-plum shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] hover:bg-mist',
  outlineLight: 'border border-white/40 text-white hover:bg-white/10',
}

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-[15px] font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  )
}
