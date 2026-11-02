export default function Eyebrow({ children, light = false, className = '' }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] ${
        light ? 'text-mist' : 'text-brand'
      } ${className}`}
    >
      <span className={`h-px w-8 ${light ? 'bg-lav' : 'bg-brand'}`} aria-hidden="true" />
      {children}
    </p>
  )
}
