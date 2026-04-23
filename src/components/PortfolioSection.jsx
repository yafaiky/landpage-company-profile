import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'Fotografi', 'Videografi', 'Design Sosmed', 'Reels', 'Random Thing']

const portfolioItems = [
  // img nya nanti tambahin sendiri  id bisa tambahin sendiri juga ya
  { id: 1, title: 'Summer Campaign', category: 'Fotografi', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: 2, title: 'Brand Story', category: 'Videografi', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 3, title: 'Digital Campaign', category: 'Design Sosmed', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 4, title: 'Fashion Reel', category: 'Reels', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-2' },
  { id: 5, title: 'Abstract Art', category: 'Random Thing', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 md:col-span-2 row-span-1' },
  { id: 6, title: 'Product Shoot', category: 'Fotografi', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
]

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('All')
  const sectionRef = useRef(null)
  const buttonsRef = useRef([])
  const gridRef = useRef([])

  const filteredItems = activeTab === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeTab)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate buttons
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
    // Animate grid items when tab changes
    if (gridRef.current.length > 0) {
      gsap.fromTo(gridRef.current.filter(Boolean),
        { scale: 0.95, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out', clearProps: 'all' }
      )
    }
  }, [activeTab, filteredItems.length])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-[var(--bg2)] min-h-screen">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Interaction Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16 md:mb-24">
          {categories.map((cat, i) => (
            <button
              key={cat}
              ref={el => buttonsRef.current[i] = el}
              onClick={() => setActiveTab(cat)}
              className={`relative px-6 py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 overflow-hidden group border ${
                activeTab === cat 
                  ? 'border-[var(--green)] text-[var(--bg)] shadow-[0_4px_20px_rgba(143,255,58,0.25)]' 
                  : 'border-[var(--dimmer)] text-[var(--muted)] hover:border-[var(--green-border)] hover:text-[var(--white)]'
              }`}
            >
              {/* Active Tab Background Fill */}
              <div 
                className={`absolute inset-0 bg-[var(--green)] transition-transform duration-300 ease-out z-0 ${activeTab === cat ? 'translate-y-0' : 'translate-y-[101%]'}`} 
              />
              
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Portfolio Grid - Editorial Dense Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[360px] grid-flow-row-dense">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              ref={el => gridRef.current[i] = el}
              className={`group relative overflow-hidden rounded-[20px] bg-[var(--card)] cursor-pointer ${item.span}`}
            >
              {/* Image Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,15,13,0.95)] via-[rgba(14,15,13,0.4)] to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              
              {/* Content overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <span className="inline-block px-3 py-1 mb-3 w-max rounded-full border border-[var(--green)] bg-[rgba(143,255,58,0.1)] text-[var(--green)] text-[0.65rem] font-bold tracking-[0.2em] uppercase backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.category}
                </span>
                <h3 className="text-[var(--white)] text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">
                  {item.title}
                </h3>
              </div>

              {/* Hover icon */}
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-[var(--white)] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="10 5 19 5 19 14"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}