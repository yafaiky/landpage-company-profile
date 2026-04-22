import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Rp 1.5jt',
    period: '/ sesi',
    popular: false,
    desc: 'Untuk personal branding, couple, dan produk sederhana.',
    features: [
      '2 jam sesi foto',
      '30 foto edited',
      '1 lokasi',
      'File digital HD',
      'Konsultasi outfit',
    ],
    cta: 'Pilih Starter',
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 'Rp 3.5jt',
    period: '/ sesi',
    popular: true,
    desc: 'Paket terlengkap untuk brand, bisnis, dan event profesional.',
    features: [
      '4 jam sesi foto + video',
      '60 foto edited premium',
      '1 video reels 60 detik',
      '2 lokasi bebas',
      'File digital 4K',
      'Konsultasi brand visual',
      'Revisi unlimited',
    ],
    cta: 'Pilih Pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    popular: false,
    desc: 'Solusi penuh untuk korporat, produksi film, dan kampanye besar.',
    features: [
      'Full-day production',
      'Tim foto + video profesional',
      'Drone shot opsional',
      'Color grading sinematik',
      'Master file RAW',
      'Dedicated project manager',
      'After-service support',
    ],
    cta: 'Hubungi Kami',
  },
]

export default function PricelistSection() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const cardsRef   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 82%' } }
      )
      gsap.fromTo(cardsRef.current.filter(Boolean),
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current[0], start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricelist"
      className="section-pad"
      style={{ background: 'var(--bg2)' }}
    >
      <div className="container">

        {/* Header */}
        <div ref={headRef} style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
          <p className="label" style={{ marginBottom: '1rem' }}>02 — Pricing</p>
          <h2 className="heading-xl" style={{ maxWidth: '18ch' }}>
            Simple, transparent<br />
            <span style={{ color: 'var(--green)' }}>pricing.</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          alignItems: 'start',
        }}>
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              ref={el => cardsRef.current[i] = el}
              style={{
                background: plan.popular ? 'var(--green-faint)' : 'var(--card)',
                border: plan.popular ? '1px solid var(--green-border)' : '1px solid var(--dimmer)',
                borderRadius: '12px',
                padding: '2rem',
                position: 'relative',
                transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = plan.popular
                  ? '0 20px 50px rgba(143,255,58,0.12)'
                  : '0 20px 50px rgba(0,0,0,0.5)'
                if (!plan.popular) e.currentTarget.style.borderColor = 'var(--green-border)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
                if (!plan.popular) e.currentTarget.style.borderColor = 'var(--dimmer)'
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '2rem' }}>
                  <span className="tag">Most Popular</span>
                </div>
              )}

              {/* Plan name */}
              <p style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: plan.popular ? 'var(--green)' : 'var(--muted)',
                marginBottom: '1rem',
              }}>
                {plan.name}
              </p>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800,
                  color: plan.popular ? 'var(--green)' : 'var(--white)',
                  letterSpacing: '-0.03em',
                }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{plan.period}</span>
                )}
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {plan.desc}
              </p>

              {/* Divider */}
              <div style={{ height: '1px', background: plan.popular ? 'var(--green-border)' : 'var(--dimmer)', marginBottom: '1.5rem' }} />

              {/* Features */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--white)' }}>
                    <span style={{ color: 'var(--green)', fontSize: '0.7rem', flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://wa.me/6281234567890"
                target="_blank" rel="noreferrer"
                id={`price-cta-${plan.id}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  width: '100%', padding: '0.8rem',
                  background: plan.popular ? 'var(--green)' : 'transparent',
                  border: plan.popular ? 'none' : '1px solid var(--green-border)',
                  color: plan.popular ? 'var(--bg)' : 'var(--white)',
                  borderRadius: '8px',
                  fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  if (!plan.popular) {
                    e.currentTarget.style.background = 'var(--green-faint)'
                    e.currentTarget.style.borderColor = 'var(--green)'
                    e.currentTarget.style.color = 'var(--green)'
                  } else {
                    e.currentTarget.style.background = 'var(--white)'
                  }
                }}
                onMouseLeave={e => {
                  if (!plan.popular) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'var(--green-border)'
                    e.currentTarget.style.color = 'var(--white)'
                  } else {
                    e.currentTarget.style.background = 'var(--green)'
                  }
                }}
              >
                {plan.cta} <span>↗</span>
              </a>
            </div>
          ))}
        </div>

        {/* Note */}
        <p style={{
          textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2.5rem',
        }}>
          Semua harga dapat disesuaikan. Konsultasi gratis via WhatsApp.
        </p>
      </div>
    </section>
  )
}
