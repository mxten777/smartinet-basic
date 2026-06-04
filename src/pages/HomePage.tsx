import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import SocialProblemSection from '../components/sections/SocialProblemSection'
import SolutionSection from '../components/sections/SolutionSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import ProductsSection from '../components/sections/ProductsSection'
import PartnersSection from '../components/sections/PartnersSection'
import BusinessModelSection from '../components/sections/BusinessModelSection'
import CasesSection from '../components/sections/CasesSection'
import SnsHubSection from '../components/sections/SnsHubSection'
import AboutSection from '../components/sections/AboutSection'
import CTASection from '../components/sections/CTASection'
import ContactModal from '../components/common/ContactModal'

export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Header onContactClick={() => setContactOpen(true)} />
      <main>
        <HeroSection onContactClick={() => setContactOpen(true)} />
        <SocialProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <ProductsSection />
        <PartnersSection />
        <BusinessModelSection />
        <CasesSection />
        <SnsHubSection />
        <AboutSection />
        <CTASection onContactClick={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
