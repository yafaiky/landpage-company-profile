import HeroVideo from '../components/HeroVideo'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import TermsSection from '../components/TermsSection'
import PricelistSection from '../components/PricelistSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <AboutSection />
      <ServicesSection />
      <TermsSection />
      <PricelistSection />
      <Footer />
    </main>
  )
}
