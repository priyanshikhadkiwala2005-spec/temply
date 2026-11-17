export default function Brand({ light = false }) {
  return (
    <img
      src="/logo.png"
      alt="Glovion"
      className={light ? 'h-12 w-auto' : 'h-10 w-auto'}
      style={{ display: 'block' }}
    />
  )
}
