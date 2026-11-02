export default function Brand({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c880de 0%, #6b2080 100%)',
          flexShrink: 0,
          boxShadow: '0 0 0 1.5px rgba(182,107,200,0.35)',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 40 40"
          aria-hidden="true"
          style={{ animation: 'rangoli-spin 10s linear infinite', display: 'block' }}
        >
          <style>{`
            @keyframes rangoli-spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
          `}</style>

          {/* ── Outermost ring of 8 tiny dots ── */}
          {[0,45,90,135,180,225,270,315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            const x = 20 + 16 * Math.cos(rad)
            const y = 20 + 16 * Math.sin(rad)
            return <circle key={deg} cx={x} cy={y} r="1.3" fill="#fff" fillOpacity="0.7" />
          })}

          {/* ── 8 slim petal lines from center ── */}
          {[0,45,90,135,180,225,270,315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            const x2 = 20 + 13.5 * Math.cos(rad)
            const y2 = 20 + 13.5 * Math.sin(rad)
            return (
              <line
                key={`l${deg}`}
                x1="20" y1="20"
                x2={x2} y2={y2}
                stroke="#fff"
                strokeWidth="0.7"
                strokeOpacity="0.5"
              />
            )
          })}

          {/* ── 4 overlapping diamond petals (rangoli shape) ── */}
          {[0, 45, 90, 135].map((deg) => (
            <ellipse
              key={`p${deg}`}
              cx="20" cy="20"
              rx="2" ry="8"
              fill="#fff"
              fillOpacity="0.18"
              stroke="#fff"
              strokeWidth="0.6"
              strokeOpacity="0.65"
              transform={`rotate(${deg} 20 20)`}
            />
          ))}

          {/* ── Inner ring of 8 medium dots ── */}
          {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((deg) => {
            const rad = (deg * Math.PI) / 180
            const x = 20 + 9 * Math.cos(rad)
            const y = 20 + 9 * Math.sin(rad)
            return <circle key={`d${deg}`} cx={x} cy={y} r="1.1" fill="#fff" fillOpacity="0.85" />
          })}

          {/* ── Small inner diamond ring ── */}
          {[0, 45, 90, 135].map((deg) => (
            <ellipse
              key={`ip${deg}`}
              cx="20" cy="20"
              rx="1.1" ry="5"
              fill="#fff"
              fillOpacity="0.3"
              transform={`rotate(${deg + 22.5} 20 20)`}
            />
          ))}

          {/* ── Center glow circle ── */}
          <circle cx="20" cy="20" r="2.8" fill="#fff" fillOpacity="0.95" />
          <circle cx="20" cy="20" r="1.3" fill="#c880de" />
        </svg>
      </span>

      <span
        className={`font-serif text-2xl font-semibold tracking-tight ${
          light ? 'text-white' : 'text-plum'
        }`}
      >
        Festivo
      </span>
    </span>
  )
}
