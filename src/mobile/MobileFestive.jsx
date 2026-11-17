import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useIsMobile } from './useIsMobile'

/* ------------------------------------------------------------------ */
/*  MOBILE FESTIVE SCROLL ENGINE                                      */
/*  Ek hi requestAnimationFrame loop jo mobile par:                   */
/*   1. Section cards ko deck ki tarah stack karta hai               */
/*      (aane wala card tilt se khulta hai, purana peeche dabta hai)  */
/*   2. Toran ko scroll speed ke saath jhulata hai                    */
/*   3. Har naye card par "anar" sparks chhodta hai                   */
/*   4. Features / Progress ke andar cards ka mini-stack chalata hai  */
/*   5. Top par phuljhadi (sparkler) progress bar jalata hai          */
/*   6. Page ke end par fireworks                                     */
/*  Desktop par ye component kuch bhi nahi karta.                     */
/* ------------------------------------------------------------------ */

const FEST = ['#f59e0b', '#fbbf24', '#fb923c', '#b66bc8', '#843da0', '#ffffff', '#e8618c']
const STACK_TOP = 18
const STACK_STEP = 16

// Low-end phone? Bhaari particle effects skip karo taaki scroll smooth rahe
const LOW_END =
  typeof navigator !== 'undefined' &&
  ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4))

// Confetti alag thread (OffscreenCanvas worker) par chalta hai -> main thread free
let fire = null
function getFire() {
  if (!fire) fire = confetti.create(undefined, { resize: true, useWorker: true, disableForReducedMotion: true })
  return fire
}

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

function anar(y) {
  const f = getFire()
  const base = {
    particleCount: 9,
    spread: 34,
    startVelocity: 34,
    gravity: 1.05,
    ticks: 90,
    scalar: 0.72,
    colors: FEST,
    shapes: ['star', 'circle'],
    zIndex: 80,
    disableForReducedMotion: true,
  }
  f({ ...base, angle: 72, origin: { x: 0.08, y } })
  f({ ...base, angle: 108, origin: { x: 0.92, y } })
}

function fireworks() {
  const shot = (x, y, delay) =>
    setTimeout(
      () =>
        getFire()({
          particleCount: 28,
          spread: 360,
          startVelocity: 24,
          gravity: 0.7,
          ticks: 160,
          scalar: 0.8,
          origin: { x, y },
          colors: FEST,
          shapes: ['star', 'circle'],
          zIndex: 80,
          disableForReducedMotion: true,
        }),
      delay,
    )
  shot(0.25, 0.3, 0)
  shot(0.75, 0.22, 380)
  shot(0.5, 0.42, 760)
}

export default function MobileFestive() {
  const mobile = useIsMobile()
  const reduced = useReducedMotion()
  const fillRef = useRef(null)
  const headRef = useRef(null)

  useEffect(() => {
    if (!mobile) return
    const doc = document.documentElement
    const cards = [...document.querySelectorAll('[data-deck]')]
    const stacks = [...document.querySelectorAll('[data-stack]')].map((el) => [
      ...el.querySelectorAll(':scope > [data-stack-item]'),
    ])
    const lit = new Set()
    const shades = cards.map((c) => c.querySelector(':scope > .deck-shade'))
    const torans = cards.map((c) => c.querySelector(':scope > .toran'))
    const lastShade = cards.map(() => -1)
    const lastHidden = cards.map(() => false)
    let vh = window.innerHeight
    let vw = window.innerWidth
    let heights = []
    let stackHeights = []
    let raf = 0
    let lastY = window.scrollY
    let lastT = performance.now()
    let lastScrollT = 0
    let sw = 0
    let swVel = 0
    let lastSw = 999
    let finale = false
    let resizeTimer = 0

    const measure = () => {
      vh = window.innerHeight
      vw = window.innerWidth
      heights = cards.map((c) => c.offsetHeight)
      cards.forEach((c, i) => {
        // lvh: address bar ghatne/badhne se value nahi badalti -> scroll ke beech relayout nahi
        if (c.dataset.deck === 'sticky') c.style.top = `min(0px, calc(100lvh - ${heights[i]}px))`
      })
      stackHeights = stacks.map((items) => items.map((el) => el.offsetHeight))
      stacks.forEach((items) =>
        items.forEach((el, j) => {
          el.style.top = `${STACK_TOP + j * STACK_STEP}px`
        }),
      )
    }

    const frame = (now) => {
      raf = 0
      const y = window.scrollY
      const dt = Math.max(8, now - lastT)
      const v = ((y - lastY) / dt) * 16 // px per ~frame
      lastY = y
      lastT = now

      /* ---------- READ (ek hi baar) ---------- */
      const tops = cards.map((c) => c.getBoundingClientRect().top)
      const stackTops = stacks.map((items) => items.map((el) => el.getBoundingClientRect().top))
      const maxScroll = Math.max(1, doc.scrollHeight - vh)
      const progress = clamp(y / maxScroll)

      /* ---------- toran swing (damped spring) ---------- */
      const target = reduced ? 0 : clamp(-v * 0.5, -16, 16)
      swVel += (target - sw) * 0.09
      swVel *= 0.8
      sw += swVel
      const swChanged = Math.abs(sw - lastSw) > 0.05
      if (swChanged) lastSw = sw

      /* ---------- WRITE: deck cards (card par transform/CSS-var nahi -> bada layer re-raster nahi) ---------- */
      cards.forEach((c, i) => {
        const top = tops[i]
        const h = heights[i]
        const next = cards[i + 1]
        const nextTop = next && next.dataset.deck === 'sticky' ? tops[i + 1] : Infinity
        const cover = clamp(1 - nextTop / vh)
        const visible = top < vh && top + h > 0

        // peeche dabte card par halka andhera: sirf shade layer ki opacity
        const shade = shades[i]
        if (shade) {
          const o = Math.round(cover * 55) / 100
          if (o !== lastShade[i]) {
            lastShade[i] = o
            shade.style.opacity = o
          }
        }
        // poori tarah dhake card ko hide karo (paint bachta hai)
        const hide = nextTop < -4
        if (hide !== lastHidden[i]) {
          lastHidden[i] = hide
          c.style.visibility = hide ? 'hidden' : ''
        }
        if (visible && swChanged && torans[i]) torans[i].style.setProperty('--sw', sw.toFixed(1))

        // card arrival: toran opens + anar sparks (sirf ek baar)
        if (i > 0 && !lit.has(i) && top < vh * 0.55) {
          lit.add(i)
          c.classList.add('deck-lit')
          if (!reduced && !LOW_END && top > -40) anar(clamp((top + 26) / vh, 0.05, 0.95))
        }
      })

      /* ---------- WRITE: inner card stacks ---------- */
      if (!reduced) {
        stacks.forEach((items, s) => {
          items.forEach((el, j) => {
            const nt = stackTops[s][j + 1]
            if (nt === undefined) return
            const stick = STACK_TOP + (j + 1) * STACK_STEP
            const c = clamp(1 - (nt - stick) / Math.max(1, stackHeights[s][j]))
            el.style.scale = (1 - c * 0.06).toFixed(3)
          })
        })
      }

      /* ---------- WRITE: phuljhadi progress ---------- */
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress.toFixed(4)})`
      if (headRef.current) {
        headRef.current.style.transform = `translate3d(${(progress * vw).toFixed(1)}px,0,0)`
        headRef.current.style.opacity = progress > 0.004 && progress < 0.999 ? '1' : '0'
        headRef.current.classList.toggle('is-burning', now - lastScrollT < 260)
      }

      if (!finale && progress > 0.985) {
        finale = true
        if (!reduced && !LOW_END) fireworks()
      }

      const settling = Math.abs(swVel) > 0.02 || Math.abs(sw - target) > 0.05
      if (settling || now - lastScrollT < 300) raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }
    const onScroll = () => {
      lastScrollT = performance.now()
      kick()
    }
    // Address bar se height badalti hai -> relayout nahi; sirf width badle to measure (debounced)
    const onResize = () => {
      if (window.innerWidth !== vw) {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          measure()
          kick()
        }, 120)
      } else {
        vh = window.innerHeight
      }
    }
    const onBoxResize = () => {
      measure()
      kick()
    }

    // anchor links: sticky cards ki "asli" position par smooth scroll
    const onClick = (ev) => {
      const a = ev.target.closest?.('a[href^="#"]')
      if (!a) return
      const id = decodeURIComponent(a.getAttribute('href').slice(1))
      const target = id && document.getElementById(id)
      const card = target?.closest('[data-deck]')
      const marker = card?.previousElementSibling
      if (!marker || !marker.hasAttribute('data-deck-anchor')) return
      ev.preventDefault()
      const top = marker.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
      history.replaceState(null, '', `#${id}`)
    }

    measure()
    // jo cards pehle se upar hain (refresh / anchor load) unka toran khula rakho
    cards.forEach((c, i) => {
      if (i > 0 && c.getBoundingClientRect().top < vh * 0.55) {
        lit.add(i)
        c.classList.add('deck-lit')
      }
    })
    kick()

    const ro = new ResizeObserver(onBoxResize)
    cards.forEach((c) => ro.observe(c))
    stacks.flat().forEach((el) => ro.observe(el))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('click', onClick)

    // welcome: hero par halka sa celebration burst
    const hello =
      !reduced && !LOW_END && window.scrollY < 40
        ? setTimeout(() => {
            getFire()({
              particleCount: 24,
              spread: 360,
              startVelocity: 18,
              gravity: 0.6,
              ticks: 140,
              scalar: 0.7,
              origin: { x: 0.78, y: 0.26 },
              colors: FEST,
              shapes: ['star', 'circle'],
              zIndex: 80,
              disableForReducedMotion: true,
            })
          }, 1100)
        : 0

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      clearTimeout(hello)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('click', onClick)
      // desktop par switch ho to sab inline styles saaf
      cards.forEach((c, i) => {
        c.classList.remove('deck-lit')
        for (const p of ['top', 'visibility']) c.style.removeProperty(p)
        shades[i]?.style.removeProperty('opacity')
        torans[i]?.style.removeProperty('--sw')
      })
      stacks.flat().forEach((el) => {
        for (const p of ['top', 'scale']) el.style.removeProperty(p)
      })
    }
  }, [mobile, reduced])

  if (!mobile) return null
  return (
    <div className="sparkler" aria-hidden="true">
      <div ref={fillRef} className="sparkler-fill" />
      <div ref={headRef} className="sparkler-head">
        <span className="sparkler-core" />
        {Array.from({ length: 10 }).map((_, i) => (
          <i key={i} style={{ '--a': `${i * 36 + (i % 3) * 7}deg`, animationDelay: `${-(i * 0.09).toFixed(2)}s` }} />
        ))}
      </div>
    </div>
  )
}
