import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import Brand from './ui/Brand'
import Button from './ui/Button'

const LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Platform', href: '#showcase' },
  { name: 'Packages', href: '#packages' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About', href: '#about' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(10,42,143,0.08)] border-b border-plum/10'
          : 'bg-pale/80 backdrop-blur-sm border-b border-plum/5'
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-8">
        {/* LOGO */}
        <a href="#home" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
          <Brand />
        </a>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav aria-label="Main Navigation" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-plum/80 transition-colors hover:text-brand"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT ACTION CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button href="#showcase" className="!min-h-10 !px-5 !py-2 !text-sm">
            Download App<ArrowRight size={15} aria-hidden="true" />
          </Button>
        </div>

        {/* MOBILE HAMBURGER TOGGLE */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-plum/15 text-plum transition-colors hover:bg-mist/50 lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileOpen && (
        <div className="border-b border-plum/10 bg-white/95 px-5 py-5 shadow-xl backdrop-blur-lg lg:hidden">
          <nav className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-plum transition-colors hover:bg-mist/40 hover:text-brand"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-2 pt-3 border-t border-plum/10">
              <Button
                href="#showcase"
                onClick={() => setMobileOpen(false)}
                className="w-full !min-h-11 justify-center !text-sm"
              >
                Explore Platform <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

