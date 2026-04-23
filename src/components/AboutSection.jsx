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
  { icon: '◉', title: 'Photography',     desc: 'Product, portrait, brand, and editorial photography with cinematic precision.' },
  { icon: '▶',  title: 'Videography',    desc: 'Brand films, promos, and documentary-style content from concept to final cut.' },
  { icon: '◈',  title: 'Content Studio', desc: 'Reels, short films, and social content built for engagement and reach.'          },
  { icon: '◆',  title: 'Branding',       desc: 'Visual identity, creative direction, and brand strategy for modern businesses.'  },
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
  const dx = (e.clientX - cx) / (rect.width  / 2)
  const dy = (e.clientY - cy) / (rect.height / 2)
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
      className="relative overflow-hidden bg-zinc-950 py-24 md:py-32 px-6 lg:px-12"
    >
      {/* Subtle green ambient blob */}
      <div 
        className="absolute top-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full pointer-events-none blur-[100px] opacity-20" 
        style={{ background: 'radial-gradient(circle, #8fff3a 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Top header row ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-start justify-between mb-20 gap-12">
          <div className="max-w-[600px]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-5">
              01 — About Us
            </p>
            <h2 ref={headRef} className="text-4xl md:text-6xl font-bold leading-[1.1] text-white mb-6">
              We believe visual stories<br />
              <span className="text-[#8fff3a]">drive real results.</span>
            </h2>
            <p ref={bodyRef} className="text-zinc-400 text-lg leading-relaxed max-w-[44ch]">
              VisuArt Studio adalah creative agency premium yang mengkhususkan diri dalam fotografi, videografi, dan produksi konten visual — membantu brand berkomunikasi lebih kuat dan lebih otentik.
            </p>
          </div>

          {/* ── Stats grid ──────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-[1px] bg-zinc-800/50 border border-zinc-800 rounded-xl overflow-hidden self-start min-w-[300px]">
            {stats.map((s, i) => (
              <div
                key={s.lbl}
                ref={el => statsRef.current[i] = el}
                className="p-6 bg-zinc-900 group/stat hover:bg-[#8fff3a]/5 transition-colors duration-300 relative"
              >
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8fff3a] to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300" />
                <div
                  ref={el => statNumRef.current[i] = el}
                  className="text-3xl font-extrabold text-[#8fff3a] tracking-tight leading-none"
                >
                  0{s.suffix}
                </div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div
          ref={dividerRef}
          className="h-[1px] w-full bg-gradient-to-r from-[#8fff3a] to-transparent opacity-30 mb-20"
        />

        {/* ── Services grid ───────────────────────────────────── */}
        <div className="mb-20">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-8">What We Do</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-zinc-800/50 border border-zinc-800 rounded-xl overflow-hidden">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                ref={el => svcRef.current[i] = el}
                className="bg-zinc-900 p-8 cursor-default group/svc hover:bg-[#8fff3a]/5 transition-all duration-500 relative overflow-hidden"
                onMouseLeave={e => resetTilt(e.currentTarget)}
                onMouseMove={e => applyTilt(e.currentTarget, e)}
              >
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8fff3a] to-transparent scale-x-0 group-hover/svc:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="text-2xl mb-5 text-zinc-600 transition-all duration-300 group-hover/svc:text-[#8fff3a] group-hover/svc:scale-125 group-hover/svc:-rotate-12 inline-block">
                  {svc.icon}
                </div>
                <h3 className="text-base font-bold mb-3 text-white">
                  {svc.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider (Simple) ─────────────────────────────────── */}
        <div className="h-[1px] w-full bg-zinc-800 mb-20" />

        {/* ── Vision & Mission ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
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
              className="relative pl-8 group/vm"
            >
              <div className="absolute left-0 top-0 w-[2px] h-[30%] bg-[#8fff3a] opacity-40 group-hover/vm:h-full group-hover/vm:opacity-100 transition-all duration-500" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-4">
                {item.title}
              </span>
              <p className="text-xl md:text-2xl font-semibold leading-snug text-white">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}