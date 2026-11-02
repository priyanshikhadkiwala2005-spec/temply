import { useSyncExternalStore } from 'react'

/* ------------------------------------------------------------------ */
/*  Mobile breakpoint (Tailwind `md` se neeche).                      */
/*  Saare mobile-only effects isi hook / isi query par chalte hain,   */
/*  isliye desktop (>= 768px) par kuch bhi change nahi hota.          */
/* ------------------------------------------------------------------ */
export const MOBILE_QUERY = '(max-width: 767.98px)'

function subscribe(cb) {
  const mq = window.matchMedia(MOBILE_QUERY)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  )
}
