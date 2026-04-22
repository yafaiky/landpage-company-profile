import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: 200, suffix: '+', lbl: 'Projects Done' },
  { num: 50,  suffix: '+', lbl: 'Happy Clients'  },
  { num: 5,   suffix: '+', lbl: 'Years Active'   },
  { num: 15,  suffix: '',  lbl: 'Awards Won'      },
]

const services = [
  { icon: '◉', title: 'Photography',     desc: 'Product, portrait, brand, and editorial photography with cinematic precision.',    accent: '#8fff3a' },
  { icon: '▶',  title: 'Videography',    desc: 'Brand films, promos, and documentary-style content from concept to final cut.',    accent: '#8fff3a' },
  { icon: '◈',  title: 'Content Studio', desc: 'Reels, short films, and social content built for engagement and reach.',           accent: '#8fff3a' },
  { icon: '◆',  title: 'Branding',       desc: 'Visual identity, creative direction, and brand strategy for modern businesses.',   accent: '#8fff3a' },
]

/* ── Utility: reveal on scroll ───────────────────────────────── */
function reveal(el, opts = {}) {
  if (!el) return
  gsap.fromTo(el,
    { y: opts.y ?? 36, opacity: 0, x: opts.x ?? 0 },
    {
      y: 0, opacity: 1, x: 0,
      duration: opts.dur ?? 0.85,
      delay: opts.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    }
  )
}

/* ── Utility: 3-D tilt from mouse pos ────────────────────────── */
function applyTilt(el, e) {
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width  / 2
  const cy = rect.top  + rect.height / 2
  const dx = (e.clientX - cx) / (rect.width  / 2)   // -1 … 1
  const dy = (e.clientY - cy) / (rect.height / 2)   // -1 … 1
  el.style.transform   = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) scale(1.03)`
  el.style.boxShadow   = `${-dx * 12}px ${dy * 10}px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(143,255,58,0.18)`
  el.style.zIndex      = '2'
}

function resetTilt(el) {
  el.style.transform   = ''
  el.style.boxShadow   = ''
  el.style.zIndex      = ''
}

export default function AboutSection() {
  const sectionRef   = useRef(null)
  const headRef      = useRef(null)
  const bodyRef      = useRef(null)
  const statsRef     = useRef([])
  const statNumRef   = useRef([])
  const svcRef       = useRef([])
  const vmRef        = useRef([])
  const dividerRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── headline / body reveal ───────────────────────────── */
      reveal(headRef.current)
      reveal(bodyRef.current, { delay: 0.1 })

      /* ── stat cards stagger ───────────────────────────────── */
      gsap.fromTo(statsRef.current.filter(Boolean),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current[0], start: 'top 84%', once: true },
        }
      )

      /* ── animated number counters ────────────────────────── */
      statNumRef.current.filter(Boolean).forEach((el, i) => {
        const proxy = { val: 0 }
        const suffix = stats[i].suffix
        const target = stats[i].num
        ScrollTrigger.create({
          trigger: statsRef.current[0],
          start: 'top 84%',
          once: true,
          onEnter() {
            gsap.to(proxy, {
              val: target,
              duration: 1.6,
              delay: i * 0.08,
              ease: 'power2.out',
              onUpdate() { el.textContent = Math.round(proxy.val) + suffix },
            })
          },
        })
      })

      /* ── service cards ────────────────────────────────────── */
      gsap.fromTo(svcRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: svcRef.current[0], start: 'top 82%', once: true },
        }
      )

      /* ── vision / mission ─────────────────────────────────── */
      gsap.fromTo(vmRef.current.filter(Boolean),
        { y: 30, opacity: 0, x: -20 },
        {
          y: 0, opacity: 1, x: 0, stagger: 0.18, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: vmRef.current[0], start: 'top 82%', once: true },
        }
      )

      /* ── divider width reveal ─────────────────────────────── */
      if (dividerRef.current) {
        gsap.fromTo(dividerRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 1, duration: 1, ease: 'power3.inOut',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: dividerRef.current, start: 'top 88%', once: true },
          }
        )
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pad"
      style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
    >
      {/* subtle green ambient blob */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '420px', height: '420px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(143,255,58,0.045) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />

      <div className="container">

        {/* ── Top header row ──────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          marginBottom: 'clamp(3rem, 6vw, 6rem)',
          flexWrap: 'wrap', gap: '2rem',
        }}>
          <div style={{ maxWidth: '600px' }}>
            <p className="label" style={{ marginBottom: '1.25rem' }}>01 — About Us</p>
            <h2 ref={headRef} className="heading-xl" style={{ marginBottom: '1.25rem' }}>
              We believe visual stories<br />
              <span style={{ color: 'var(--green)' }}>drive real results.</span>
            </h2>
            <p ref={bodyRef} className="body-copy" style={{ maxWidth: '44ch' }}>
              VisuArt Studio adalah creative agency premium yang mengkhususkan diri dalam fotografi, videografi, dan produksi konten visual — membantu brand berkomunikasi lebih kuat dan lebih otentik.
            </p>
          </div>

          {/* ── Stats grid ──────────────────────────────────── */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
            border: '1px solid var(--dimmer)', borderRadius: '12px', overflow: 'hidden',
            alignSelf: 'flex-start', minWidth: '240px',
          }}>
            {stats.map((s, i) => (
              <div
                key={s.lbl}
                ref={el => statsRef.current[i] = el}
                style={{
                  padding: '1.4rem 1.25rem',
                  background: 'var(--card)',
                  borderRight:  i % 2 === 0 ? '1px solid var(--dimmer)' : 'none',
                  borderBottom: i < 2 ? '1px solid var(--dimmer)' : 'none',
                  cursor: 'default',
                  transition: 'background 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--green-faint)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--card)'
                }}
              >
                {/* hover accent line */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--green), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
                  className="stat-accent-line"
                />
                <div
                  ref={el => statNumRef.current[i] = el}
                  style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--green)', letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  0{s.suffix}
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.3rem' }}>
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div
          ref={dividerRef}
          className="divider-green"
          style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
        />

        {/* ── Services grid ───────────────────────────────────── */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>
          <p className="label" style={{ marginBottom: '2rem' }}>What We Do</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1px',
            border: '1px solid var(--dimmer)', borderRadius: '12px', overflow: 'hidden',
          }}>
            {services.map((svc, i) => (
              <div
                key={svc.title}
                ref={el => svcRef.current[i] = el}
                className="card"
                style={{
                  padding: '2rem 1.75rem',
                  borderRadius: 0,
                  border: 'none',
                  borderRight:  i % 2 === 0 ? '1px solid var(--dimmer)' : 'none',
                  borderBottom: i < 2 ? '1px solid var(--dimmer)' : 'none',
                  cursor: 'default',
                  transition: 'background 0.3s, transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1)',
                  willChange: 'transform',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--green-faint)'
                  e.currentTarget.querySelector('.svc-icon').style.color = 'var(--green)'
                  e.currentTarget.querySelector('.svc-icon').style.transform = 'scale(1.2) rotate(-10deg)'
                  e.currentTarget.querySelector('.svc-bar').style.transform = 'scaleX(1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--card)'
                  e.currentTarget.querySelector('.svc-icon').style.color = 'var(--dimmer)'
                  e.currentTarget.querySelector('.svc-icon').style.transform = ''
                  e.currentTarget.querySelector('.svc-bar').style.transform = 'scaleX(0)'
                  resetTilt(e.currentTarget)
                }}
                onMouseMove={e => applyTilt(e.currentTarget, e)}
              >
                {/* bottom accent bar */}
                <div className="svc-bar" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--green), transparent)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left center',
                  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                }} />

                <div className="svc-icon" style={{
                  fontSize: '1.4rem', marginBottom: '1.25rem',
                  color: 'var(--dimmer)',
                  transition: 'color 0.25s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  display: 'inline-block',
                }}>
                  {svc.icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--white)' }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--muted)' }}>
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div className="divider" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }} />

        {/* ── Vision & Mission ────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', flexWrap: 'wrap' }}>
          {[
            {
              title: 'Visi',
              text: 'Menjadi studio kreatif terdepan di Asia Tenggara yang menghadirkan visual berkualitas sinema untuk setiap brand.',
            },
            {
              title: 'Misi',
              text: 'Memperkuat komunikasi visual brand melalui fotografi, videografi, dan produksi konten yang autentik dan berdampak.',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              ref={el => vmRef.current[i] = el}
              style={{
                position: 'relative',
                paddingLeft: '1.5rem',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const bar = e.currentTarget.querySelector('.vm-bar')
                if (bar) { bar.style.height = '100%'; bar.style.opacity = '1' }
              }}
              onMouseLeave={e => {
                const bar = e.currentTarget.querySelector('.vm-bar')
                if (bar) { bar.style.height = '30%'; bar.style.opacity = '0.4' }
              }}
            >
              {/* left accent bar */}
              <div className="vm-bar" style={{
                position: 'absolute', left: 0, top: 0,
                width: '2px', height: '30%',
                background: 'var(--green)',
                borderRadius: '2px',
                opacity: 0.4,
                transition: 'height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s',
              }} />

              <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>
                {item.title}
              </span>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 600, lineHeight: 1.4, color: 'var(--white)', marginBottom: '1rem' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ── Inline styles for stat hover lines ──────────────────── */}
      <style>{`
        #about .stat-accent-line { opacity: 0; transition: opacity 0.3s; }
        #about [style*="background: var(--green-faint)"] .stat-accent-line { opacity: 1; }
        @media (max-width: 640px) {
          #about [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
