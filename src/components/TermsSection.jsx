import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const terms = [
  {
    id: 'pembayaran',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <rect x="3" y="8" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M3 14h26" stroke="currentColor" strokeWidth="2" />
        <path d="M9 20h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Pembayaran',
    summary: 'DP 50% di awal, pelunasan sebelum file final dikirimkan. Transfer via BCA / BRI / GoPay / OVO.',
    details: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    ],
    color: '#8fff3a',
  },
  {
    id: 'revisi',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M5 16a11 11 0 1 1 22 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 16c0 6.075 4.925 11 11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
        <polyline points="2 13 5 16 8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 10v6l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Revisi',
    summary: 'Revisi sesuai paket yang dipilih. Revisi di luar ketentuan dikenakan biaya tambahan yang disepakati bersama.',
    details: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    ],
    color: '#3af0ff',
  },
  {
    id: 'deliverable',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M6 4h13l7 7v17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2" />
        <polyline points="19 4 19 11 26 11" stroke="currentColor" strokeWidth="2" />
        <path d="M11 17l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Deliverable',
    summary: 'File dikirim via Google Drive dalam format yang disepakati (PNG, PDF, AI, atau sesuai kebutuhan klien).',
    details: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    ],
    color: '#ff8c3a',
  },
  {
    id: 'waktu',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M16 9v7l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Estimasi Waktu',
    summary: 'Branding: 7–14 hari kerja. Konten bulanan: diserahkan H-3 sebelum tanggal posting. Yearbook: sesuai kesepakatan.',
    details: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    ],
    color: '#b03aff',
  },
  {
    id: 'brief',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M10 10h12M10 16h12M10 22h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Brief Klien',
    summary: 'Klien wajib mengisi form brief sebelum project dimulai. Keterlambatan brief dapat mempengaruhi timeline pengerjaan.',
    details: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    ],
    color: '#ff3a8c',
  },
  {
    id: 'hak-cipta',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M20 13.5A5 5 0 1 0 20 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Hak Cipta',
    summary: 'Hak cipta desain berpindah penuh ke klien setelah pelunasan. Byvisco berhak menampilkan karya sebagai portofolio.',
    details: [
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    ],
    color: '#ffd03a',
  },
]

export default function TermsSection() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const gridRef = useRef(null)
  const [activeId, setActiveId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
        }
      )
      gsap.fromTo(
        gridRef.current.children,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const toggle = (id) => setActiveId(prev => prev === id ? null : id)

  return (
    <section
      ref={sectionRef}
      id="terms"
      className="relative overflow-hidden bg-[#11120f] py-24 md:py-36 px-6 lg:px-12"
    >
      {/* Ambient blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none blur-[150px] opacity-[0.04]"
        style={{ background: 'radial-gradient(ellipse, #8fff3a 0%, transparent 70%)' }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headRef} className="mb-16 md:mb-24">
          <p className="label mb-5">Ketentuan Kerja Sama</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="heading-xl max-w-[20ch] text-[var(--white)] leading-[1.1]">
              lorem ipsum dolor sit amet{' '}
              <span className="text-[#8fff3a]">lorem ipsum dolor sit amet.</span>
            </h2>
            <p className="body-copy max-w-[42ch] lg:text-right">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {terms.map((term) => {
            const isOpen = activeId === term.id
            const isHovered = hoveredId === term.id

            return (
              <div
                key={term.id}
                onClick={() => toggle(term.id)}
                onMouseEnter={() => setHoveredId(term.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative rounded-2xl border cursor-pointer overflow-hidden group"
                style={{
                  background: isOpen
                    ? `linear-gradient(145deg, ${term.color}0d 0%, #161714 60%)`
                    : '#161714',
                  borderColor: isOpen
                    ? term.color + '60'
                    : isHovered
                      ? 'rgba(248,248,242,0.12)'
                      : 'rgba(248,248,242,0.06)',
                  transition: 'background 0.45s, border-color 0.3s, box-shadow 0.4s',
                  boxShadow: isOpen
                    ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${term.color}30`
                    : isHovered
                      ? '0 8px 30px rgba(0,0,0,0.3)'
                      : 'none',
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${term.color} 50%, transparent 100%)`,
                    opacity: isOpen ? 1 : isHovered ? 0.4 : 0,
                    transform: isOpen ? 'scaleX(1)' : 'scaleX(0.6)',
                  }}
                />

                {/* Corner number */}
                <div
                  className="absolute top-4 right-5 text-[0.65rem] font-black tracking-[0.15em] transition-all duration-300"
                  style={{
                    color: isOpen ? term.color : 'rgba(248,248,242,0.08)',
                  }}
                >
                  {String(terms.indexOf(term) + 1).padStart(2, '0')}
                </div>

                {/* Card content */}
                <div className="p-7">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500"
                    style={{
                      background: isOpen ? term.color + '18' : 'rgba(248,248,242,0.04)',
                      color: isOpen ? term.color : 'rgba(248,248,242,0.4)',
                      border: `1px solid ${isOpen ? term.color + '35' : 'rgba(248,248,242,0.06)'}`,
                      transform: isHovered && !isOpen ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    {term.icon}
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-[var(--white)] font-bold text-lg mb-2 leading-tight transition-colors duration-300">
                    {term.title}
                  </h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">{term.summary}</p>

                  {/* See more / less */}
                  <div
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300"
                    style={{ color: isOpen ? term.color : 'rgba(248,248,242,0.3)' }}
                  >
                    {isOpen ? 'Tutup detail' : 'Lihat detail'}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{
                        transition: 'transform 0.4s',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Expandable detail list */}
                  <div
                    style={{
                      maxHeight: isOpen ? '500px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.55s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <div
                      className="mt-5 pt-5 border-t"
                      style={{ borderColor: 'rgba(248,248,242,0.07)' }}
                    >
                      <ul className="flex flex-col gap-3">
                        {term.details.map((d, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-[0.82rem] text-[var(--muted)] leading-relaxed"
                          >
                            <span
                              className="mt-[3px] w-[6px] h-[6px] rounded-full shrink-0"
                              style={{ background: term.color, flexShrink: 0 }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 md:mt-20 p-8 md:p-10 rounded-2xl border border-[rgba(248,248,242,0.06)] bg-[#161714] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[var(--white)] font-bold text-xl md:text-2xl mb-2">
              lorem ipsum dolor sit amet
            </p>
            <p className="text-[var(--muted)] text-sm max-w-[50ch]">
              lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
          </div>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="btn-green shrink-0 whitespace-nowrap"
            id="terms-cta-btn"
          >
            Chat WhatsApp ↗
          </a>
        </div>
      </div>
    </section>
  )
}
