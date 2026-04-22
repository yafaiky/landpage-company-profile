import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  const heroRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current.children,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <main style={{ paddingTop: '5.5rem' }}>
      {/* Page hero */}
      <div ref={heroRef} className="container section-pad" style={{ paddingBottom: '1rem' }}>
        <p className="label" style={{ marginBottom: '1rem' }}>Portfolio</p>
        <h1 className="heading-display" style={{ maxWidth: '14ch', marginBottom: '1.25rem' }}>
          Our <span style={{ color: 'var(--green)' }}>portfolio</span> section
        </h1>
        <p className="body-copy" style={{ maxWidth: '44ch' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, maxime! Ea deserunt, architecto cupiditate ipsam eligendi dolor excepturi optio quia ducimus explicabo tenetur dignissimos voluptate, commodi quod, quo quas deleniti..
        </p>
      </div>

      {/* CTA */}
      <section className="section-pad" style={{
        background: 'var(--bg2)', borderTop: '1px solid var(--dimmer)', textAlign: 'center',
      }}>
        <div className="container">
          <p className="label" style={{ marginBottom: '1rem', textAlign: 'center' }}>
            Ready to create something amazing?
          </p>
          <h2 className="heading-xl" style={{ marginBottom: '2.5rem', maxWidth: '14ch', margin: '0 auto 2.5rem' }}>
            Let's work <span style={{ color: 'var(--green)' }}>together.</span>
          </h2>
          <a
            href="https://wa.me/6281234567890"
            target="_blank" rel="noreferrer"
            id="portfolio-cta-btn"
            className="btn-green"
          >
            Start a Project ↗
          </a>
        </div>
      </section>
    </main>
  )
}
