import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlayRef = useRef(null)
  const itemsRef = useRef([])
  const tl = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    const items = itemsRef.current.filter(Boolean)

    tl.current = gsap.timeline({ paused: true })
    tl.current
      .set(overlay, { display: 'flex' })
      .fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      .fromTo(items,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )

    return () => tl.current?.kill()
  }, [])

  const toggleMenu = () => {
    if (!open) { 
      tl.current?.play() 
    } else { 
      tl.current?.reverse() 
    }
    setOpen(!open)
  }

  const handleNav = (path, hash) => {
    tl.current?.reverse().eventCallback('onReverseComplete', () => {
      setOpen(false)
      if (hash && location.pathname === '/') {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate(path)
        if (hash) setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
        }, 400)
      }
    })
  }

  const links = [
    { label: 'About', path: '/', hash: 'about' },
    { label: 'Pricelist', path: '/', hash: 'pricelist' },
    { label: 'Portfolio', path: '/portfolio', hash: null },
    { label: 'Our Clients', path: '/clients', hash: null },
  ]

  return (
    <>
      {/* ── Navbar ────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0a0b09]/80 backdrop-blur-lg border-b border-[#8fff3a]/10' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Logo */}
        <a 
          href="/" 
          className="relative z-[60] font-black text-lg tracking-widest text-white uppercase"
        >
          byvisco<span className="text-[#8fff3a]"> creative</span>
        </a>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="relative z-[60] flex flex-col justify-center items-end gap-[6px] w-10 h-10 group"
          aria-label="Toggle menu"
        >
          <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${
            open ? 'w-8 bg-[#8fff3a] rotate-45 translate-y-[7.5px]' : 'w-8'
          }`} />
          <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${
            open ? 'w-0 opacity-0' : 'w-5 group-hover:w-8'
          }`} />
          <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${
            open ? 'w-8 bg-[#8fff3a] -rotate-45 -translate-y-[7.5px]' : 'w-8'
          }`} />
        </button>
      </nav>

      {/* ── Menu Overlay ──────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col justify-center bg-[#0a0b09]/98 backdrop-blur-2xl px-8 md:px-32 lg:px-48"
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8fff3a] to-transparent opacity-40" />

        <p className="label mb-10 opacity-50">Navigation</p>

        <nav className="flex flex-col">
          {links.map((link, i) => (
            <div key={link.label} className="group/item overflow-hidden">
              {/* Divider */}
              <div className="h-[1px] w-full bg-white/5" />
              
              <button
                ref={el => itemsRef.current[i] = el}
                onClick={() => handleNav(link.path, link.hash)}
                className="flex items-center justify-between w-full py-6 md:py-8 text-left transition-colors duration-300 group"
              >
                <span className="text-4xl md:text-7xl font-bold tracking-tighter text-white group-hover:text-[#8fff3a] group-hover:translate-x-4 transition-all duration-500">
                  {link.label}
                </span>
                <span className="text-2xl md:text-4xl text-white/20 group-hover:text-[#8fff3a] transition-colors duration-300">
                  ↗
                </span>
              </button>
            </div>
          ))}
          <div className="h-[1px] w-full bg-white/5" />
        </nav>

        {/* Social Links */}
        <div className="flex gap-8 mt-12">
          {['lorem ipsum', 'lorem ipsum', 'lorem ipsum'].map(s => (
            <a 
              key={s} 
              href="#"
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-[#8fff3a] transition-colors"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}