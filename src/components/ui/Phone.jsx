import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const W = 280
const H = 580

// Phone frame drawn at 280x580 and scaled with the --ps CSS variable,
// so each usage can pick its own size per breakpoint.
export default function Phone({ children, label, className = '' }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative shrink-0 ${className}`}
      style={{ width: `calc(${W}px * var(--ps, 1))`, height: `calc(${H}px * var(--ps, 1))` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: 'scale(var(--ps, 1))' }}
      >
        <div className="relative h-full w-full rounded-[44px] bg-[#1d1024] p-2 shadow-[0_40px_80px_-30px_rgba(84,36,95,0.7),0_0_0_1px_rgba(255,255,255,0.12)_inset]">
          <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-white">
            <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-[#1d1024]" />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Small, capped pointer tilt for desktop mice only.
export function Tilt({ children, max = 6, className = '' }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 })

  const move = (e) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
