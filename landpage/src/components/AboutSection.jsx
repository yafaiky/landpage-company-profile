import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: 200, suffix: '+', lbl: 'Lorem Ipsum' },
  { num: 50, suffix: '+', lbl: 'Lorem Ipsum' },
  { num: 5, suffix: '+', lbl: 'Lorem Ipsum' },
  { num: 15, suffix: '', lbl: 'Lorem Ipsum' },
]

const services = [
  { icon: '◉', title: 'Lorem', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { icon: '▶', title: 'Lorem', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { icon: '◈', title: 'Lorem', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { icon: '◆', title: 'Lorem', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
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
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = (e.clientX - cx) / (rect.width / 2)
  const dy = (e.clientY - cy) / (rect.height / 2)
  el.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) scale(1.03)`
  el.style.boxShadow = `${-dx * 12}px ${dy * 10}px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,102,255,0.1)`
  el.style.zIndex = '2'
}

function resetTilt(el) {
  el.style.transform = ''
  el.style.boxShadow = ''
  el.style.zIndex = ''
}

export default function AboutSection() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const bodyRef = useRef(null)
  const statsRef = useRef([])
  const statNumRef = useRef([])
  const svcRef = useRef([])
  const vmRef = useRef([])
  const dividerRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      reveal(headRef.current)
      reveal(bodyRef.current, { delay: 0.1 })

      gsap.fromTo(statsRef.current.filter(Boolean),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current[0], start: 'top 84%', once: true },
        }
      )

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

      gsap.fromTo(svcRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: svcRef.current[0], start: 'top 82%', once: true },
        }
      )

      gsap.fromTo(vmRef.current.filter(Boolean),
        { y: 30, opacity: 0, x: -20 },
        {
          y: 0, opacity: 1, x: 0, stagger: 0.18, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: vmRef.current[0], start: 'top 82%', once: true },
        }
      )

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
      className="relative overflow-hidden bg-white py-24 md:py-32 px-4 lg:px-8"
    >
      {/* Subtle blue ambient blob */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full pointer-events-none blur-[100px] opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #0066ff 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Top header row ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-20 gap-12">
          <div className="max-w-[600px]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-5">
              01 — Tentang Kami
            </p>
            <h2 ref={headRef} className="text-4xl md:text-6xl font-bold leading-[1.1] text-black mb-6">
              Lorem ipsum<br />
              <span className="text-[#0066ff]">Lorem ipsum dolor sit amet consectetur.</span>
            </h2>
            <p ref={bodyRef} className="text-zinc-600 text-lg leading-relaxed max-w-[44ch]">
              Byvisco adalah creative agency berbasis di Jakarta Timur yang berfokus pada branding, visual identity, dan konten kreatif untuk UMKM dan bisnis lokal.
              <span className={isExpanded ? 'inline' : 'hidden md:inline'}>
                {" "}Kami percaya bahwa setiap bisnis — sekecil apapun — berhak tampil profesional dan punya identitas yang kuat. Didukung oleh tim muda berpengalaman di industri media dan produksi, kami siap menjadi mitra kreatif jangka panjang bisnis kamu.
              </span>
              {!isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="md:hidden text-[#0066ff] font-semibold ml-1 hover:text-[#0052cc] transition-colors"
                >
                  ... Baca Selengkapnya
                </button>
              )}
            </p>
          </div>

          {/* ── Stats grid ──────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-[1px] bg-zinc-200 border border-zinc-200 rounded-xl overflow-hidden self-start min-w-[300px]">
            {stats.map((s, i) => (
              <div
                key={s.lbl}
                ref={el => statsRef.current[i] = el}
                className="p-6 bg-white group/stat hover:bg-[#0066ff]/5 transition-colors duration-300 relative"
              >
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0066ff] to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300" />
                <div
                  ref={el => statNumRef.current[i] = el}
                  className="text-3xl font-extrabold text-[#0066ff] tracking-tight leading-none"
                >
                  0{s.suffix}
                </div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div
          ref={dividerRef}
          className="h-[1px] w-full bg-gradient-to-r from-[#0066ff] to-transparent opacity-20 mb-20"
        />

        {/* ── Services grid ───────────────────────────────────── */}
        <div className="mb-20">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-8">Lorem ipsum dolor sit</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                ref={el => svcRef.current[i] = el}
                className="bg-white p-8 rounded-2xl border border-black/5 cursor-default group/svc hover:bg-[#005ae6]/5 active:bg-[#005ae6]/10 transition-all duration-500 relative overflow-hidden shadow-sm"
                onMouseLeave={e => resetTilt(e.currentTarget)}
                onMouseMove={e => applyTilt(e.currentTarget, e)}
              >
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#005ae6] to-transparent scale-x-0 group-hover/svc:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl text-slate-300 transition-all duration-300 group-hover/svc:text-[#005ae6] group-hover/svc:scale-110 group-hover/svc:-rotate-12">
                    {svc.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {svc.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-500">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider (Simple) ─────────────────────────────────── */}
        <div className="h-[1px] w-full bg-zinc-100 mb-20" />

        {/* ── Vision & Mission ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {[
            {
              title: 'Lorem',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
              title: 'Misi',
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              ref={el => vmRef.current[i] = el}
              className="relative pl-8 group/vm"
            >
              <div className="absolute left-0 top-0 w-[2px] h-[30%] bg-[#0066ff] opacity-20 group-hover/vm:h-full group-hover/vm:opacity-100 transition-all duration-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold block mb-4">
                {item.title}
              </span>
              <p className="text-xl md:text-2xl font-semibold leading-snug text-black">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}