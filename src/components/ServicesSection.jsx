import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'branding',
    number: '01',
    title: 'Branding & Visual Identity',
    short: 'Bangun identitas brand yang kuat dan konsisten dari nol. Cocok untuk bisnis baru maupun rebranding',
    description:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod.',
    price: 'Rp 1.500.000',
    priceNote: 'Tergantung scope & kompleksitas',
    features: [
      'Riset & konsep brand',
      'Logo design (3 konsep awal + revisi)',
      'Color palette & typography',
      'Brand guideline dokumen',
      'Aplikasi di kartu nama & stationery',
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
    accent: '#006effff',
  },
  {
    id: 'sosmed',
    number: '02',
    title: 'Desain Konten Sosmed',
    short: 'Konten visual Instagram, TikTok, & Facebook yang on-brand dan menarik perhatian.',
    description:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod.',
    price: 'Rp 800.000',
    priceNote: 'Min. 3 bulan kontrak',
    features: [
      'Feed Instagram (template + konten)',
      'Story & highlight cover',
      'Caption copywriting',
      'Jadwal posting terstruktur',
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 24l6 6 10-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: '#B4FF2EFF',
  },
  {
    id: 'yearbook',
    number: '03',
    title: 'Buku Tahunan / Yearbook',
    short: 'Desain buku tahunan profesional untuk sekolah, kampus, dan organisasi. Kami sudah berpengalaman.',
    description:
      'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod.',
    price: 'Rp 2.500.000',
    priceNote: 'Tergantung jumlah halaman',
    features: [
      'Konsep & layout keseluruhan',
      'Desain cover & isi',
      'Pengolahan foto & infografis',
      'File siap cetak (PDF print-ready)',
    ],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="10" y="4" width="28" height="40" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 14h16M16 21h16M16 28h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="33" cy="35" r="6" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
        <path d="M31 35l1.5 1.5L35 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: '#001a4dff',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const cardsRef = useRef([])
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Head reveal
      gsap.fromTo(
        headRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
        }
      )
      // Cards stagger
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current[0], start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // 3-D tilt on hover
  const handleMouseMove = (e, el) => {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    el.style.transform = `perspective(1000px) rotateY(${dx * 3.5}deg) rotateX(${-dy * 2.5}deg) translateY(-6px)`
  }
  const handleMouseLeave = (el) => {
    el.style.transform = ''
  }

  const toggle = (id) => setActiveId(prev => prev === id ? null : id)

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: 'linear-gradient(135deg, #1F2FA6 0%, #2D4BCE 100%)' }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-[-8%] left-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[120px] opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #4A73F0 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[100px] opacity-[0.10]"
        style={{ background: 'radial-gradient(circle, #4A73F0 0%, transparent 70%)' }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headRef} className="mb-16 md:mb-24">
          <p className="label mb-5 text-white">Layanan Kami</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="heading-xl max-w-[22ch] text-white leading-[1.1]">
              Apa yang bisa{' '}
              <span className="text-[#B4FF2E]">kami lakukan</span>{' '}
              untukmu?
            </h2>
            <p className="body-copy max-w-[38ch] lg:text-right text-white/70">
              Setiap layanan dirancang untuk memperkuat kehadiran brand kamu — dari identitas hingga konten harian.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="flex flex-col gap-6">
          {services.map((svc, i) => {
            const isOpen = activeId === svc.id
            return (
              <div
                key={svc.id}
                ref={el => cardsRef.current[i] = el}
                style={{ transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s' }}
                onMouseMove={e => !isOpen && handleMouseMove(e, cardsRef.current[i])}
                onMouseLeave={() => !isOpen && handleMouseLeave(cardsRef.current[i])}
              >
                {/* Card Header — always visible */}
                <div
                  onClick={() => toggle(svc.id)}
                  className="group relative rounded-2xl border cursor-pointer overflow-hidden shadow-sm"
                  style={{
                    background: isOpen
                      ? `linear-gradient(135deg, ${svc.accent}0d 0%, #ffffff 100%)`
                      : '#ffffff',
                    borderColor: isOpen ? svc.accent + '33' : 'rgba(0,0,0,0.04)',
                    transition: 'background 0.5s, border-color 0.4s',
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${svc.accent}, transparent)`,
                      opacity: isOpen ? 1 : 0,
                    }}
                  />

                  <div className="flex items-center gap-6 p-7 md:p-8">
                    {/* Number */}
                    <span
                      className="hidden sm:block text-5xl md:text-6xl font-black tracking-tighter shrink-0 transition-colors duration-300"
                      style={{ color: isOpen ? svc.accent : 'rgba(0,0,0,0.03)', fontVariantNumeric: 'tabular-nums' }}
                    >
                      {svc.number}
                    </span>

                    {/* Icon */}
                    <div
                      className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500"
                      style={{
                        background: isOpen ? svc.accent + '0d' : 'rgba(0,0,0,0.02)',
                        color: isOpen ? svc.accent : 'rgba(0,0,0,0.3)',
                        border: `1px solid ${isOpen ? svc.accent + '20' : 'rgba(0,0,0,0.04)'}`,
                      }}
                    >
                      {svc.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-sm md:text-lg font-bold text-black mb-1 transition-colors duration-300 group-hover:text-black"
                      >
                        {svc.title}
                      </h3>
                      <p className="text-sm text-zinc-500 hidden sm:block">{svc.short}</p>
                    </div>

                    {/* Price Badge */}
                    <div className="hidden md:flex flex-col items-end shrink-0">
                      <span
                        className="text-lg md:text-xl font-black tracking-tight transition-colors duration-300"
                        style={{ color: svc.accent }}
                      >
                        {svc.price}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium mt-0.5">
                        mulai dari
                      </span>
                    </div>

                    {/* Dropdown Icon */}
                    <div
                      className="shrink-0 w-8 h-8 flex items-center justify-center transition-all duration-500"
                      style={{
                        transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                        color: isOpen ? svc.accent : 'rgba(0,0,0,0.15)',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                  </div>

                  {/* Expandable Detail */}
                  <div
                    style={{
                      maxHeight: isOpen ? '600px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.55s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <div
                      className="mx-7 md:mx-8 mb-8 pt-2 border-t"
                      style={{ borderColor: 'rgba(0,0,0,0.04)' }}
                    >
                      <div className="flex flex-col md:flex-row gap-8 pt-6">
                        {/* Description + Price */}
                        <div className="flex-1">
                          {/* Price highlight block */}
                          <div
                            className="inline-flex flex-col mb-5 px-5 py-4 rounded-xl border"
                            style={{
                              background: svc.accent + '0d',
                              borderColor: svc.accent + '30',
                            }}
                          >
                            <span
                              className="text-2xl md:text-3xl font-black tracking-tight"
                              style={{ color: svc.accent }}
                            >
                              {svc.price}
                            </span>
                            <span className="text-xs text-[var(--muted)] mt-1 max-w-[36ch] leading-relaxed">
                              {svc.priceNote}
                            </span>
                          </div>

                          <p className="text-[var(--muted)] leading-relaxed text-[0.95rem] mb-6">
                            {svc.description}
                          </p>
                          <a
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-x-0 group/link"
                            style={{ color: svc.accent }}
                            onClick={e => e.stopPropagation()}
                          >
                            Konsultasi Gratis
                            <span className="transition-transform duration-300 group-hover/link:translate-x-1">↗</span>
                          </a>
                        </div>

                        {/* Features */}
                        <div className="md:w-[280px] shrink-0">
                          <p
                            className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
                            style={{ color: svc.accent }}
                          >
                            Yang Kamu Dapatkan
                          </p>
                          <ul className="flex flex-col gap-3">
                            {svc.features.map((feat) => (
                              <li
                                key={feat}
                                className="flex items-center gap-3 text-sm text-zinc-700"
                              >
                                <span
                                  className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                                  style={{ background: svc.accent + '15', color: svc.accent }}
                                >
                                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
