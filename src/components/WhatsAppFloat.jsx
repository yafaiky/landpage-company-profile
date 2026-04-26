import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function WhatsAppFloat() {
  const btnRef = useRef(null)
  const rippleRef = useRef(null)

  useEffect(() => {
    const btn = btnRef.current
    const ripple = rippleRef.current

    // ── Animasi Floating (Naik Turun) ──
    gsap.to(btn, { 
      y: -10, 
      duration: 2.2, 
      ease: 'sine.inOut', 
      yoyo: true, 
      repeat: -1 
    })

    // ── Animasi Ripple (Denyut) ──
    gsap.fromTo(ripple,
      { scale: 1, opacity: 0.5 },
      { 
        scale: 1.8, 
        opacity: 0, 
        duration: 2, 
        ease: 'power2.out', 
        repeat: -1, 
        repeatDelay: 0.6 
      }
    )

    // ── Hover Effects ──
    const onEnter = () => gsap.to(btn, { scale: 1.12, duration: 0.3, ease: 'back.out(1.7)' })
    const onLeave = () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' })

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf([btn, ripple])
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
      <div className="relative group">
        
        {/* ── Ripple Effect ── */}
        <div 
          ref={rippleRef} 
          className="absolute inset-0 rounded-full bg-[#003399]/30 origin-center pointer-events-none" 
        />

        {/* ── Button ── */}
        <button
          ref={btnRef}
          id="whatsapp-float-btn"
          onClick={() => window.open('https://api.whatsapp.com/send?phone=6281234567890', '_blank')}
          aria-label="Chat on WhatsApp"
          className="
            relative w-[56px] h-[56px] rounded-full 
            bg-gradient-to-br from-[#003399] to-[#002673] 
            shadow-[0_10px_30px_rgba(0,102,255,0.3)] 
            flex items-center justify-center 
            border-none cursor-pointer transition-shadow duration-300
            hover:shadow-[0_15px_40px_rgba(0,102,255,0.4)]
          "
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="white" 
            className="w-[28px] h-[28px] drop-shadow-sm"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>

      </div>
    </div>
  )
}
