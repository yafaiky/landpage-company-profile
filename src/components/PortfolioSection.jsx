import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'Fotografi', 'Videografi', 'Design Sosmed', 'Reels', 'Random Thing']

const portfolioItems = [
  {
    id: 1,
    title: 'Lorem Ipsum Dolor',
    category: 'Fotografi',
    type: 'image',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 md:col-span-2 row-span-2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
    date: 'Lorem Ipsum 2024',
    client: 'Lorem Ipsum Co.'
  },
  {
    id: 2,
    title: 'Lorem Ipsum Sit',
    category: 'Videografi',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 row-span-1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
    date: 'Lorem Ipsum 2024',
    client: 'Lorem Ipsum Inc.'
  },
  {
    id: 3,
    title: 'Lorem Amet Consectetur',
    category: 'Design Sosmed',
    type: 'image',
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 row-span-1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
    date: 'Lorem Ipsum 2024',
    client: 'Lorem Ipsum Agency'
  },
  {
    id: 4,
    title: 'Lorem Dolor Amet',
    category: 'Reels',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 row-span-2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
    date: 'Lorem Ipsum 2024',
    client: 'Lorem Ipsum Boutique'
  },
  {
    id: 5,
    title: 'Lorem Ipsum Elit',
    category: 'Random Thing',
    type: 'image',
    img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 md:col-span-2 row-span-1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
    date: 'Lorem Ipsum 2024',
    client: 'Lorem Ipsum Gallery'
  },
  {
    id: 6,
    title: 'Lorem Consectetur Sed',
    category: 'Fotografi',
    type: 'image',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 row-span-1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.',
    date: 'Lorem Ipsum 2024',
    client: 'Lorem Ipsum Store'
  },
]

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const sectionRef = useRef(null)
  const buttonsRef = useRef([])
  const gridRef = useRef([])

  const filteredItems = activeTab === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeTab)

  const handleItemClick = (item) => {
    setSelectedItem(item)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedItem(null)
    document.body.style.overflow = 'unset'
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(buttonsRef.current.filter(Boolean),
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (gridRef.current.length > 0) {
      gsap.fromTo(gridRef.current.filter(Boolean),
        { scale: 0.95, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out', clearProps: 'all' }
      )
    }
  }, [activeTab, filteredItems.length])

  return (
    <>
      <section ref={sectionRef} className="py-20 md:py-32 bg-[var(--bg)] min-h-screen">
        <div className="container mx-auto px-4 sm:px-8">

          {/* Interaction Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16 md:mb-24">
            {categories.map((cat, i) => (
              <button
                key={cat}
                ref={el => buttonsRef.current[i] = el}
                onClick={() => setActiveTab(cat)}
                className={`relative px-6 py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 overflow-hidden group border ${activeTab === cat
                  ? 'border-[var(--accent)] text-white shadow-[0_4px_20px_rgba(0,90,230,0.2)]'
                  : 'border-[var(--dimmer)] text-slate-500 hover:border-black hover:text-black'
                  }`}
              >
                <div className={`absolute inset-0 bg-[var(--accent)] transition-transform duration-300 ease-out z-0 ${activeTab === cat ? 'translate-y-0' : 'translate-y-[101%]'}`} />
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[360px] grid-flow-row-dense">
            {filteredItems.map((item, i) => (
              <div
                key={item.id}
                ref={el => gridRef.current[i] = el}
                onClick={() => handleItemClick(item)}
                className={`group relative overflow-hidden rounded-[20px] bg-[var(--card)] cursor-pointer ${item.span}`}
              >
                {/* Image / Video Background */}
                {item.type === 'video' ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={item.img}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    src={item.videoUrl}
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Content overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <span className="inline-block px-3 py-1 mb-3 w-max rounded-full border border-[var(--accent)] bg-[rgba(0,102,255,0.15)] text-white text-[0.65rem] font-bold tracking-[0.2em] uppercase backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.category}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Hover icon */}
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                  {item.type === 'video' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="19" x2="19" y2="5"></line>
                      <polyline points="10 5 19 5 19 14"></polyline>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out; }
      `}</style>

      {/* Modal Detail */}
      {selectedItem && createPortal(
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-[30px] w-full max-w-3xl shadow-2xl animate-scale-in flex flex-col"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image/Video */}
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-t-[30px] bg-black shrink-0">
              {selectedItem.type === 'video' ? (
                <video
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                  src={selectedItem.videoUrl}
                  poster={selectedItem.img}
                />
              ) : (
                <img
                  src={selectedItem.img}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none" />

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.7)] backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 z-10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 md:p-12 shrink-0">
              <div className="inline-block px-4 py-2 mb-4 rounded-full border border-[var(--accent)] bg-[rgba(0,102,255,0.05)] text-[var(--accent)] text-sm font-bold tracking-[0.1em] uppercase">
                {selectedItem.category}
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4 leading-tight">
                {selectedItem.title}
              </h2>

              <p className="text-zinc-600 mb-8">
                {selectedItem.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 rounded-full border-2 border-[var(--accent)] text-[var(--accent)] font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[var(--accent)] hover:text-white"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}