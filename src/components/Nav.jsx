import { Sparkles } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Continuous festival strip: poster thumbnail + name, endless loop  */
/*  - Jis festival ka poster ho uska `src` do, baaki sirf naam dikhega */
/*  - Naya poster add karna ho: us item me  src: '/poster/xyz.webp'   */
/* ------------------------------------------------------------------ */
const ITEMS = [
  { name: 'Diwali', src: '/poster/Diwali.webp' },
  { name: 'Christmas' },
  { name: 'Holi', src: '/poster/Holi.webp' },
  { name: 'Ganesh Chaturthi' },
  { name: 'Raksha Bandhan', src: '/poster/Raksha%20Bandhan.webp' },
  { name: 'Baisakhi' },
  { name: 'Eid', src: '/poster/Eid.webp' },
  { name: 'Pongal' },
  { name: 'Navratri', src: '/poster/Navratri.webp' },
  { name: 'Onam' },
]

function Row({ hidden = false }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
    >
      {ITEMS.map((item, i) => (
        <li key={`${item.name}-${i}`} className="flex shrink-0 items-center gap-10 sm:gap-14">
          <div className="flex items-center gap-4">
            {item.src && (
              <span
                className="block h-16 w-[46px] shrink-0 overflow-hidden rounded-lg bg-mist shadow-[0_10px_22px_-10px_rgba(10,42,143,0.55)] ring-1 ring-plum/10 transition-transform duration-300 hover:scale-110"
                style={{ transform: `rotate(${i % 4 === 0 ? -4 : 4}deg)` }}
              >
                <img
                  src={item.src}
                  alt={hidden ? '' : `${item.name} festival poster`}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  className="h-full w-full select-none object-cover"
                />
              </span>
            )}
            <span className="whitespace-nowrap font-serif text-2xl font-semibold text-plum/85 sm:text-[1.7rem]">
              {item.name}
            </span>
          </div>
          <Sparkles size={20} className="shrink-0 text-brand/80" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
}

export default function FestivalMarquee() {
  return (
    <section
      aria-label="Festivals you can create posts for"
      className="group relative overflow-hidden border-y border-mist bg-white py-4"
    >
      <style>{`
        @keyframes festival-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .festival-marquee-track {
          animation: festival-marquee 55s linear infinite;
          will-change: transform;
        }
        .group:hover .festival-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .festival-marquee-track { animation: none; }
        }
      `}</style>

      <div className="festival-marquee-track flex w-max items-center">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
