import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from './components/Navbar'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Clients from './pages/Clients'

function PageTransition({ children }) {
  const location = useLocation()
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [location.pathname])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

function AppContent() {
  return (
    <div className="noise">
      <Navbar />
      <WhatsAppFloat />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </PageTransition>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}