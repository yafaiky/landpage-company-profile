import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const partners = [
  'Aruna Brand', 'TechFlow Co.', 'Natura Organics', 'Summit Corp', 'Luxe Hotel',
  'Kreativa Agency', 'Biru Laut Studio', 'Panen Digital', 'Seruni Events', 'Mandiri Karya',
  'Aurora Media', 'Zenith Films', 'Prisma Creative', 'Solara Group', 'Kilas Balik',
]

export default function Clients() {
  const heroRef    = useRef(null)
  const gridRef    = useRef([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current.children,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(gridRef.current.filter(Boolean),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.55, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current[0], start: 'top 84%' } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <main style={{ paddingTop: '5.5rem' }}>
      {/* Hero */}
      <div ref={heroRef} className="container section-pad" style={{ paddingBottom: '1rem' }}>
        <p className="label" style={{ marginBottom: '1rem' }}>Our Clients</p>
        <h1 className="heading-display" style={{ maxWidth: '14ch', marginBottom: '1.25rem' }}>
          ini adalah bagian <span style={{ color: 'var(--green)' }}>our clients.</span>
        </h1>
        <p className="body-copy" style={{ maxWidth: '44ch' }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, vel saepe libero eveniet ducimus pariatur illo tempora atque. Ducimus sit cumque sunt perferendis, mollitia reprehenderit labore aut repellat quibusdam suscipit!.
        </p>
      </div>


      {/* CTA */}
      <section className="section-pad" style={{ background: 'var(--bg)', textAlign: 'center' }}>
        <div className="container">
          <p className="label" style={{ marginBottom: '1rem', textAlign: 'center' }}>Join Our Growing Family</p>
          <h2 className="heading-xl" style={{ margin: '0 auto 2.5rem', maxWidth: '16ch' }}>
            Be our next <span style={{ color: 'var(--green)' }}>success story.</span>
          </h2>
          <a
            href="https://wa.me/6281234567890"
            target="_blank" rel="noreferrer"
            id="clients-cta-btn"
            className="btn-green"
          >
            Let's Collaborate ↗
          </a>
        </div>
      </section>
    </main>
  )
}
