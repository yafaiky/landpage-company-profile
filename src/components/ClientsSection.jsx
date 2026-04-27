import { useRef } from 'react'

const clientsRow1 = [
  'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum',
  'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'
]
const clientsRow2 = [
  'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum',
  'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'
]

export default function ClientsSection() {
  return (
    <section
      className="py-16 md:py-24 relative"
      style={{
        background: 'linear-gradient(135deg, #1F2FA6 0%, #2A2E8A 100%)'
      }}
    >
      {/* Konten Teks */}
      <div className="container relative z-10 text-center mb-12">
        <h2 className="heading-xl mb-4 text-3xl md:text-5xl text-white">Lorem Ipsum Dolor</h2>
        <p className="body-copy max-w-xl mx-auto text-sm md:text-base text-white/60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
        </p>
      </div>

      {/* Marquee Wrapper - Overflow-hidden dipindah ke sini saja */}
      <div className="relative overflow-hidden py-4">

        {/* Masking Pinggir (Fade Effect) */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#1F2FA6] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#2A2E8A] to-transparent z-20 pointer-events-none" />

        {/* Row 1 */}
        <div className="flex animate-marquee whitespace-nowrap gap-4 md:gap-5 mb-5">
          {[...clientsRow1, ...clientsRow1].map((client, i) => (
            <div
              key={i}
              className="px-6 md:px-8 py-2 md:py-3 rounded-full border border-white/10 bg-white/10 text-white/70 font-bold text-[10px] md:text-xs tracking-widest hover:text-white hover:border-white/30 hover:bg-white/15 hover:shadow-md transition-all duration-300 cursor-default backdrop-blur-sm"
            >
              {client.toUpperCase()}
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="flex animate-marquee [animation-direction:reverse] whitespace-nowrap gap-4 md:gap-5 mb-5">
          {[...clientsRow2, ...clientsRow2].map((client, i) => (
            <div
              key={i}
              className="px-6 md:px-8 py-2 md:py-3 rounded-full border border-white/10 bg-white/10 text-white/70 font-bold text-[10px] md:text-xs tracking-widest hover:text-white hover:border-white/30 hover:bg-white/15 hover:shadow-md transition-all duration-300 cursor-default backdrop-blur-sm"
            >
              {client.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
