import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ClientsSection from '../components/ClientsSection'

gsap.registerPlugin(ScrollTrigger)

export default function Clients() {
  const heroRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out', delay: 0.1 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <main className="pt-24 md:pt-32">
      {/* Hero */}
      <section ref={heroRef} className="container mx-auto px-4 sm:px-8 py-16 md:py-24 flex flex-col items-center text-center relative">
        {/* Subtle glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[var(--green)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
        
        <p className="text-[var(--green)] text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-6">
          Partnerships
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.03em] text-[var(--white)] max-w-5xl leading-[1.05] mb-8">
          Trusted by visionary <br className="hidden md:block"/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--white)] via-[var(--green)] to-[#c5ff98]">brands & creators.</span>
        </h1>
        <p className="text-base md:text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
          Kami telah berkolaborasi dengan berbagai perusahaan, startup, dan kreator terkemuka untuk menghidupkan identitas visual mereka ke tingkat selanjutnya.
        </p>
      </section>

      {/* Clients Component */}
      <ClientsSection />

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[var(--bg2)] text-center relative overflow-hidden border-t border-[var(--dimmer)]">
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[var(--green)] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4">
            Join Our Growing Family
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-[-0.03em] text-[var(--white)] mb-10 max-w-3xl mx-auto leading-tight">
            Be our next <span className="text-[var(--green)]">success story.</span>
          </h2>
          <a
            href="https://wa.me/6281234567890"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--white)] text-[var(--bg)] font-bold text-xs md:text-sm tracking-[0.05em] uppercase hover:bg-[var(--green)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(143,255,58,0.25)] hover:-translate-y-1"
          >
            Let's Collaborate <span className="text-base leading-none">↗</span>
          </a>
        </div>
      </section>
    </main>
  )
}
