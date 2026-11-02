import Toran from './Toran'

/* ------------------------------------------------------------------ */
/*  DeckCard: har section ko mobile par ek "greeting card" banata hai */
/*  - mode="sticky": card scroll ke end par chipak jaata hai aur agla */
/*    card upar se slide hokar aata hai (stacked deck feel)           */
/*  - mode="flow": sirf entry tilt + toran (footer ke liye)           */
/*  Desktop par ye sirf ek plain <div> hai, koi style nahi lagti.     */
/* ------------------------------------------------------------------ */
export default function DeckCard({ index, mode = 'sticky', tone, children }) {
  const decorated = Boolean(tone)
  return (
    <>
      <div data-deck-anchor="" aria-hidden="true" />
      <div
        data-deck={mode}
        data-round={decorated ? '' : undefined}
        style={{ '--z': index + 1 }}
      >
        {decorated && <Toran tone={tone} />}
        {children}
        <div className="deck-shade" aria-hidden="true" />
      </div>
    </>
  )
}
