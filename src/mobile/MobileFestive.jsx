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

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)

function anar(y) {
  const base = {
    particleCount: 18,
    spread: 34,
    startVelocity: 34,
    gravity: 1.05,
    ticks: 120,
    scalar: 0.72,
    colors: FEST,
    shapes: ['star', 'circle'],
    zIndex: 80,
    disableForReducedMotion: true,
  }
  confetti({ ...base, angle: 72, origin: { x: 0.08, y } })
  confetti({ ...base, angle: 108, origin: { x: 0.92, y } })
}

function fireworks() {
  const shot = (x, y, delay) =>
    setTimeout(
      () =>
        confetti({
          particleCount: 48,
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
    let vh = window.innerHeight
    let heights = []
    let stackHeights = []
    let raf = 0
    let lastY = window.scrollY
    let lastT = performance.now()
    let lastScrollT = 0
    let sw = 0
    let swVel = 0
    let finale = false

    const measure = () => {
      vh = window.innerHeight
      heights = cards.map((c) => c.offsetHeight)
      cards.forEach((c, i) => {
        if (c.dataset.deck === 'sticky') c.style.top = `${Math.min(0, vh - heights[i])}px`
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

      /* ---------- READ ---------- */
      const tops = cards.map((c) => c.getBoundingClientRect().top)
      const stackTops = stacks.map((items) => items.map((el) => el.getBoundingClientRect().top))
      const maxScroll = Math.max(1, doc.scrollHeight - vh)
      const progress = clamp(y / maxScroll)

      /* ---------- toran swing (damped spring) ---------- */
      const target = reduced ? 0 : clamp(-v * 0.5, -16, 16)
      swVel += (target - sw) * 0.09
      swVel *= 0.8
      sw += swVel

      /* ---------- WRITE: deck cards ---------- */
      cards.forEach((c, i) => {
        const top = tops[i]
        const h = heights[i]
        const next = cards[i + 1]
        const nextTop = next && next.dataset.deck === 'sticky' ? tops[i + 1] : Infinity
        const e = i === 0 ? 1 : easeOut(clamp((vh - top) / (vh * 0.62)))
        const cover = clamp(1 - nextTop / vh)
        const visible = top < vh && top + h > 0

        // Sirf viewport ke paas wale cards ko transform do (mobile GPU memory bachane ke liye)
        const near = top < vh * 1.02 && nextTop > -4
        if (!reduced) {
          if (near && cover > 0.001) {
            // purana card deck me peeche "lean back" hota hai
            const originY = Math.max(h - vh, 0) + vh * 0.12
            c.style.transformOrigin = `50% ${originY}px`
            c.style.transform = `perspective(1400px) rotateX(${-cover * 4}deg) scale(${1 - cover * 0.085})`
          } else if (near && e < 0.999) {
            // naya card neeche se "khade" hote hue aata hai (greeting card khulne jaisa)
            c.style.transformOrigin = '50% 0px'
            c.style.transform = `perspective(1100px) rotateX(${-(1 - e) * 12}deg) scale(${0.93 + e * 0.07})`
          } else if (c.style.transform) {
            c.style.transform = ''
          }
        }
        c.style.setProperty('--shade', (cover * 0.55).toFixed(3))
        c.style.visibility = nextTop < -4 ? 'hidden' : ''
        if (visible) c.style.setProperty('--sw', sw.toFixed(2))

        // card arrival: toran opens + anar sparks (sirf ek baar)
        if (i > 0 && !lit.has(i) && top < vh * 0.55) {
          lit.add(i)
          c.classList.add('deck-lit')
          if (!reduced && top > -40) anar(clamp((top + 26) / vh, 0.05, 0.95))
        }
      })

      /* ---------- WRITE: inner card stacks ---------- */
      stacks.forEach((items, s) => {
        items.forEach((el, j) => {
          const nt = stackTops[s][j + 1]
          if (nt === undefined) return
          const stick = STACK_TOP + (j + 1) * STACK_STEP
          const c = clamp(1 - (nt - stick) / Math.max(1, stackHeights[s][j]))
          el.style.setProperty('--c', c.toFixed(3))
          if (!reduced) {
            el.style.scale = `${1 - c * 0.06}`
            el.style.rotate = `${(j % 2 ? 1 : -1) * c * 1.8}deg`
          }
        })
      })

      /* ---------- WRITE: phuljhadi progress ---------- */
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress})`
      if (headRef.current) {
        headRef.current.style.transform = `translate3d(${progress * window.innerWidth}px,0,0)`
        headRef.current.style.opacity = progress > 0.004 && progress < 0.999 ? '1' : '0'
        headRef.current.classList.toggle('is-burning', now - lastScrollT < 260)
      }

      if (!finale && progress > 0.985) {
        finale = true
        if (!reduced) fireworks()
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
    const onResize = () => {
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

    const ro = new ResizeObserver(onResize)
    cards.forEach((c) => ro.observe(c))
    stacks.flat().forEach((el) => ro.observe(el))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('click', onClick)

    // welcome: hero par halka sa celebration burst
    const hello =
      !reduced && window.scrollY < 40
        ? setTimeout(() => {
            confetti({
              particleCount: 40,
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
      clearTimeout(hello)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('click', onClick)
      // desktop par switch ho to sab inline styles saaf
      cards.forEach((c) => {
        c.classList.remove('deck-lit')
        for (const p of ['top', 'transform', 'transform-origin', 'visibility', '--shade', '--sw']) c.style.removeProperty(p)
      })
      stacks.flat().forEach((el) => {
        for (const p of ['top', 'scale', 'rotate', '--c']) el.style.removeProperty(p)
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
