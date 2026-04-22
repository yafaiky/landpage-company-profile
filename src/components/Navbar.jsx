import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlayRef = useRef(null)
  const itemsRef = useRef([])
  const lineRef = useRef(null)
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
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
      .fromTo(items,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out' },
        '-=0.1'
      )

    return () => tl.current?.kill()
  }, [])

  const toggleMenu = () => {
    if (!open) { tl.current?.play() }
    else { tl.current?.reverse() }
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
    tl.current?.reverse()
    setTimeout(() => setOpen(false), 500)
  }

  const links = [
    { label: 'About', path: '/', hash: 'about' },
    { label: 'Pricelist', path: '/', hash: 'pricelist' },
    { label: 'Portfolio', path: '/portfolio', hash: null },
    { label: 'Our Clients', path: '/clients', hash: null },
  ]

  return (
    <>
      {/* Nav bar */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.1rem 2rem',
          background: scrolled ? 'rgba(14,15,13,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(143,255,58,0.08)' : 'none',
          transition: 'background 0.4s, border-color 0.4s',
        }}
      >
        {/* Logo */}
        <a href="/" style={{
          fontFamily: 'var(--font)', fontWeight: 800, fontSize: '1.05rem',
          letterSpacing: '0.08em', color: 'var(--white)',
          zIndex: 60, textTransform: 'uppercase',
        }}>
          byvisco<span style={{ color: 'var(--green)' }}>.</span>
        </a>

        {/* Hamburger */}
        <button
          id="hamburger-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          style={{
            position: 'relative', zIndex: 60, display: 'flex', flexDirection: 'column',
            gap: '5px', padding: '6px', cursor: 'pointer',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: i === 1 ? '18px' : '24px',
              height: '1.5px', background: open ? 'var(--green)' : 'var(--white)',
              borderRadius: '2px',
              transform: open
                ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                  : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'scaleX(0)'
                : 'none',
              transition: 'transform 0.3s, opacity 0.3s, background 0.3s',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Overlay */}
      <div
        ref={overlayRef}
        style={{
          display: 'none', position: 'fixed', inset: 0, zIndex: 40,
          flexDirection: 'column', justifyContent: 'center',
          background: 'rgba(14,15,13,0.97)',
          backdropFilter: 'blur(20px)',
          paddingLeft: 'clamp(2rem, 8vw, 8rem)',
        }}
      >
        {/* Neon glow top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--green), transparent)',
          opacity: 0.6,
        }} />

        <p className="label" style={{ marginBottom: '2.5rem', opacity: 0.6 }}>Navigation</p>

        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {links.map((link, i) => (
            <div key={link.label}>
              <div ref={el => lineRef.current = el} style={{
                height: '1px', background: 'var(--dimmer)', marginBlock: '0',
              }} />
              <button
                ref={el => itemsRef.current[i] = el}
                onClick={() => handleNav(link.path, link.hash)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', maxWidth: '600px',
                  padding: '1.4rem 0', background: 'none', border: 'none',
                  textAlign: 'left', cursor: 'pointer',
                  color: 'var(--white)', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--white)'}
              >
                <span style={{
                  fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  transition: 'color 0.2s',
                }}>
                  {link.label}
                </span>
                <span style={{ fontSize: '1.2rem', opacity: 0.5, marginRight: '1rem' }}>↗</span>
              </button>
            </div>
          ))}
          <div style={{ height: '1px', background: 'var(--dimmer)' }} />
        </nav>

        {/* Social */}
        <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
          {['Instagram', 'WhatsApp', 'LinkedIn'].map(s => (
            <a key={s} href="#"
              style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
