export default function Brand({ light = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <img
        src="/glovion-g-sm.png"
        alt=""
        width="44"
        height="44"
        className={light ? 'h-10 w-auto' : 'h-9 w-auto'}
        style={{
          display: 'block',
          filter: light ? 'drop-shadow(0 0 8px rgba(125,211,252,0.55))' : 'drop-shadow(0 2px 4px rgba(29,78,216,0.25))',
        }}
      />
      <span
        className={`font-serif text-2xl font-bold leading-none tracking-tight ${
          light ? 'festive-bright-text' : 'festive-animated-text'
        }`}
      >
        Glovion
      </span>
    </span>
  )
}
