import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    title: 'Starter',
    price: 'Rp 1.200.000',
    period: 'Sekali bayar, revisi 2x',
    popular: false,
    desc: 'Untuk bisnis yang baru mulai & butuh identitas dasar.',
    features: [
      'Logo design (2 konsep)',
      'Color palette',
      '4 template konten sosmed',
      'File format lengkap (PNG, JPG, PDF)',
    ],
    cta: 'Pilih Starter',
  },
  {
    id: 'pro',
    name: 'Growth',
    title: 'Brand Ready',
    price: 'Rp 2.800.000',
    period: 'Kontrak 3 bulan, revisi unlimited',
    popular: true,
    desc: 'Untuk UMKM yang siap tampil profesional di semua platform.',
    features: [
      'Full branding (logo + guideline)',
      '12 konten sosmed/bulan',
      'Story & highlight cover',
      'Kartu nama & stationery',
      'Konsultasi brand 1x/bulan',
    ],
    cta: 'Pilih Pro',
  },
  {
    id: 'enterprise',
    name: 'Premium',
    title: 'Full Scale',
    price: 'Rp 4.500.000',
    period: 'Kontrak 3 bulan, all-inclusive',
    popular: false,
    desc: 'Untuk bisnis yang butuh solusi kreatif menyeluruh.',
    features: [
      'Semua di paket Brand Ready',
      'Manajemen sosmed aktif',
      'Copywriting caption',
      'Laporan performa bulanan',
      'Priority response & support',
    ],
    cta: 'Hubungi Kami',
  },
]

export default function PricelistSection() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%' }
        }
      )

      // Cards Animation (Staggered)
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricelist"
      className="section-pad bg-[var(--bg-subtle)]" 
    >
      <div className="container">

        {/* ── Header ─────────────────────────────────────────── */}
        <div ref={headRef} className="mb-16 md:mb-24">
          <p className="label mb-4 opacity-60">02 — Paket Bundling</p>
          <h2 className="heading-xl max-w-[18ch] text-black">
            Lorem ipsum <br />
            <span className="text-[#003399]">Lorem ipsum.</span>
          </h2>
        </div>

        {/* ── Pricing Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              ref={el => cardsRef.current[i] = el}
              className={`
                relative p-8 rounded-2xl transition-all duration-500 group
                ${plan.popular
                  ? 'bg-white border-2 border-[var(--accent)] shadow-[0_30px_60px_-10px_rgba(0,90,230,0.15)]'
                  : 'bg-white border border-black/5 hover:border-[var(--accent)]/30'
                }
                hover:-translate-y-3 hover:shadow-xl hover:shadow-black/5
              `}
            >
              {/* Most Popular Tag */}
              {plan.popular && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Most Popular</span>
                </div>
              )}

              {/* Plan Title */}
              <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-6 
                ${plan.popular ? 'text-[#003399]' : 'text-zinc-400'}`}>
                {plan.name}
              </p>

              <p className={`text-xl md:text-3xl font-black tracking-tighter 
                ${plan.popular ? 'text-[#003399]' : 'text-black'}`}>
                {plan.title}
              </p>

              <p className="text-sm text-zinc-500 leading-relaxed mb-8 h-12">
                {plan.desc}
              </p>

              {/* Price Tag */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className={`text-4xl md:text-5xl font-black tracking-tighter 
                  ${plan.popular ? 'text-[#003399]' : 'text-black'}`}>
                  {plan.price}
                </span>
              </div>

              {/* Description */}

              {/* Divider */}
              <div className={`h-[1px] w-full mb-8 transition-colors duration-500
                ${plan.popular ? 'bg-[#003399]/10' : 'bg-black/5 group-hover:bg-[#003399]/10'}`}
              />

              {/* Features List */}
              <ul className="space-y-4 mb-10">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[13px] text-zinc-600 font-medium">
                    <span className="text-[#003399] mt-0.5 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className={`
                  flex items-center justify-center gap-2 w-full py-4 rounded-xl
                  text-[11px] font-black uppercase tracking-widest transition-all duration-300
                  ${plan.popular
                    ? 'bg-black text-white hover:bg-[#003399]'
                    : 'bg-transparent border border-black/10 text-black hover:bg-black hover:text-white hover:border-black'
                  }
                `}
              >
                {plan.cta} <span className="text-base">↗</span>
              </a>

              {/* Period */}
              <p className="mt-5 text-xs text-zinc-500 font-medium">{plan.period}</p>
            </div>
          ))}
        </div>

        {/* ── Footer Note ────────────────────────────────────── */}
        <div className="mt-16 text-center">
          <p className="text-xs text-zinc-500 font-medium tracking-wide">
            Semua harga dapat disesuaikan. <br className="md:hidden" />
            <span className="text-zinc-400">Konsultasi gratis via WhatsApp.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
