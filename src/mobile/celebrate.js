import confetti from 'canvas-confetti'

/* ------------------------------------------------------------------ */
/*  MOBILE SCROLL CELEBRATION (halka version)                         */
/*  - anar(): naya card aate hi dono kinaron se chhoti sparks         */
/*  - finale(): page ke end par teen chhote fireworks                 */
/*  Phone par load na pade isliye:                                    */
/*   * drawing alag thread (worker) me hoti hai, scroll free rehta    */
/*   * kam particles, chhoti umar; kamzor phone par aur bhi kam       */
/*   * tez scroll par back-to-back bursts nahi chalte                 */
/* ------------------------------------------------------------------ */

const COLORS = ['#f59e0b', '#fbbf24', '#6aa8ff', '#1f5ae6', '#22d3ee', '#ffffff']
const GAP_MS = 700

export function createCelebration() {
  const weak = (navigator.hardwareConcurrency ?? 8) <= 4 || (navigator.deviceMemory ?? 8) <= 4
  const scale = weak ? 0.6 : 1
  const timers = []
  let fire = null
  let lastBurst = -Infinity

  const shoot = ({ particleCount, ...options }) => {
    if (document.hidden) return
    // pehli baar zaroorat padne par hi banta hai -> page load par koi kharcha nahi
    fire ??= confetti.create(undefined, { resize: true, useWorker: true, disableForReducedMotion: true })
    fire({
      colors: COLORS,
      shapes: ['star', 'circle'],
      zIndex: 80,
      ...options,
      particleCount: Math.round(particleCount * scale),
    })
  }

  return {
    anar(y) {
      const now = performance.now()
      if (now - lastBurst < GAP_MS) return
      lastBurst = now
      const base = { particleCount: 10, spread: 36, startVelocity: 34, gravity: 1.05, ticks: 90, scalar: 0.75 }
      shoot({ ...base, angle: 72, origin: { x: 0.08, y } })
      shoot({ ...base, angle: 108, origin: { x: 0.92, y } })
    },
    finale() {
      const base = { particleCount: 28, spread: 360, startVelocity: 24, gravity: 0.7, ticks: 130, scalar: 0.8 }
      ;[
        [0.25, 0.3],
        [0.75, 0.22],
        [0.5, 0.42],
      ].forEach(([x, y], i) => {
        timers.push(setTimeout(() => shoot({ ...base, origin: { x, y } }), i * 380))
      })
    },
    stop() {
      timers.forEach(clearTimeout)
      fire?.reset()
    },
  }
}
