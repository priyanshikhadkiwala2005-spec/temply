/* ------------------------------------------------------------------ */
/*  TORAN: genda phool + aam ke patton ki latkan (mobile only)        */
/*  Har card ke top par latakti hai. Card aate hi "khulti" hai        */
/*  (.deck-lit) aur scroll speed ke hisaab se jhoolti hai.     */
/* ------------------------------------------------------------------ */

const TONES = {
  marigold: { a: '#f59e0b', b: '#fbbf24', c: '#fbbf24', rope: '#b45309' },
  rose: { a: '#22d3ee', b: '#f59e0b', c: '#c7d2fe', rope: '#3730a3' },
  lavender: { a: '#6aa8ff', b: '#f59e0b', c: '#dbe9ff', rope: '#1f5ae6' },
}

const N = 9 // strands

function Flower({ cy, r, fill, ring }) {
  return (
    <g>
      <circle cx="9" cy={cy} r={r} fill={fill} />
      <circle cx="9" cy={cy} r={r - 0.6} fill="none" stroke={ring} strokeWidth="2.2" strokeDasharray="1.6 1.2" />
      <circle cx="9" cy={cy} r={r * 0.32} fill={ring} opacity="0.9" />
    </g>
  )
}

function Leaf({ y, flip }) {
  return (
    <path
      d={`M9 ${y} C ${flip ? 2 : 16} ${y + 6} ${flip ? 3 : 15} ${y + 16} 9 ${y + 22} C ${flip ? 15 : 3} ${y + 15} ${flip ? 14 : 4} ${y + 6} 9 ${y} Z`}
      fill={flip ? '#4d7c0f' : '#65a30d'}
      stroke="#365314"
      strokeWidth="0.6"
    />
  )
}

function Strand({ i, t }) {
  const leaf = i % 2 === 1
  const flowers = leaf ? 1 : i % 4 === 0 ? 4 : 3
  const len = leaf ? 40 : 12 + flowers * 11 + 8
  return (
    <svg width="18" height={len} viewBox={`0 0 18 ${len}`} aria-hidden="true" focusable="false">
      <line x1="9" y1="0" x2="9" y2={len - 6} stroke={t.rope} strokeWidth="1" opacity="0.7" />
      {leaf ? (
        <>
          <Flower cy={7} r={4.6} fill={t.a} ring={t.b} />
          <Leaf y={13} flip={i % 4 === 1} />
        </>
      ) : (
        <>
          {Array.from({ length: flowers }).map((_, k) => (
            <Flower key={k} cy={8 + k * 11} r={5.4} fill={k % 2 ? t.c : t.a} ring={t.b} />
          ))}
          {/* tassel / ghungroo */}
          <circle cx="9" cy={len - 4} r="2.6" fill="#fde68a" stroke="#b45309" strokeWidth="0.8" />
        </>
      )}
    </svg>
  )
}

export default function Toran({ tone = 'marigold' }) {
  const t = TONES[tone] ?? TONES.marigold
  // scalloped rope between strand anchor points
  const seg = 100 / N
  let d = `M0 3`
  for (let i = 0; i < N; i++) {
    const x0 = i * seg
    const x1 = x0 + seg
    d += ` Q ${x0 + seg / 2} 15 ${x1} 3`
  }

  return (
    <div className="toran" aria-hidden="true">
      <svg className="toran-rope" viewBox="0 0 100 18" preserveAspectRatio="none">
        <path d={d} fill="none" stroke={t.rope} strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
        <path d={d} fill="none" stroke={t.c} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      {Array.from({ length: N + 1 }).map((_, i) => (
        <span
          key={i}
          className="toran-strand"
          style={{
            left: `${i * seg}%`,
            '--d': `${Math.abs(i - N / 2) * 55}ms`,
          }}
        >
          <span className="toran-sway">
            <Strand i={i} t={t} />
          </span>
        </span>
      ))}
    </div>
  )
}
